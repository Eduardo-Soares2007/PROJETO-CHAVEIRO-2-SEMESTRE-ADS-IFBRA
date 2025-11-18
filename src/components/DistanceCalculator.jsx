import React, { useState } from 'react';
import axios from 'axios';

const DistanceCalculator = () => {
  const [formData, setFormData] = useState({
    service: '',
    gps_coordinates: '',
  });
  const [locationStatus, setLocationStatus] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const servicesOptions = [
    { value: 'instalar-fechadura', label: 'Instalar Fechadura (R$ 150,00)', price: 150 },
    { value: 'abrir-porta-carro', label: 'Abrir Porta de Carro (R$ 120,00)', price: 120 },
    { value: 'abrir-porta-casa', label: 'Abrir Porta de Casa (R$ 100,00)', price: 100 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUseLocation = () => {
    setLocationStatus('loading');
    setIsLoading(true);
        if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude},${position.coords.longitude}`;
          setFormData(prev => ({ 
            ...prev, 
            gps_coordinates: coords,
          }));
          setLocationStatus('success');
          setIsLoading(false);
          alert('Localização obtida com sucesso! Agora você pode calcular o orçamento.');
        },
        (error) => {
          console.error("Erro de Geolocalização:", error);
          setLocationStatus('error');
          setIsLoading(false);
          alert('Não foi possível obter sua localização. Verifique as permissões do navegador.');
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setLocationStatus('error');
      setIsLoading(false);
      alert('Seu navegador não suporta Geolocalização.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    const selectedService = servicesOptions.find(opt => opt.value === formData.service);
    
    if (!selectedService) {
      setResult({ type: 'error', message: 'Por favor, selecione um serviço.' });
      setIsLoading(false);
      return;
    }

    if (!formData.gps_coordinates) {
      setResult({ type: 'error', message: 'Por favor, clique em "Usar Localização Atual" primeiro.' });
      setIsLoading(false);
      return;
    }

    // ATENÇÃO: Mude esta URL para a URL do seu servidor no deploy
    const apiUrl = 'http://localhost:3000/calculate-distance'; 

    const payload = {
      service: formData.service,
      coordinates: formData.gps_coordinates,
      
      rua: '',
      numero: '',
      cep: '',
    };

    axios.post(apiUrl, payload)
      .then(response => {
        const data = response.data;
        const serviceLabel = servicesOptions.find(opt => opt.value === data.servicoNome).label.split('(')[0].trim();
        
        setResult({
          type: 'success',
          message: 'Orçamento calculado com sucesso!',
          details: [
            { label: 'Serviço', value: serviceLabel },
            { label: 'Valor do Serviço', value: `R$ ${data.precoServico.replace('.', ',')}` },
            { label: 'Distância (Real)', value: data.distancia },
            { label: 'Custo de Deslocamento (R$ 2,50/km)', value: `R$ ${data.precoFrete.replace('.', ',')}` },
          ],
          total: `R$ ${data.precoTotal.replace('.', ',')}`,
        });
      })
      .catch(error => {
        console.error('Erro ao calcular distância:', error.response ? error.response.data : error.message);
        const errorMessage = error.response && error.response.data && error.response.data.error 
          ? error.response.data.error 
          : 'Erro ao conectar com o servidor de cálculo. Verifique se o servidor está rodando (node server.cjs).';
        setResult({ type: 'error', message: errorMessage });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClearForm = () => {
    setFormData({
      service: '',
      gps_coordinates: '',
    });
    setLocationStatus('');
    setResult(null);
    setIsLoading(false);
  };

  return (
    <section id="distance-calculator" className="section distance-calculator">
      <div className="container">
        <div className="section-title-container">
          <h2 className="section-title fade-in">Calculadora de Distância</h2>
          <p className="section-subtitle fade-in">Use sua localização atual para calcular o orçamento do serviço de emergência.</p>
        </div>

        <div className="calculator-form-container fade-in">
          <form id="distance-form" onSubmit={handleSubmit}>
            <button 
              type="button" 
              id="use-location-btn" 
              className="btn btn-secondary"
              onClick={handleUseLocation}
              disabled={isLoading}
              style={{ width: '100%', marginBottom: 'var(--spacing-sm)' }} // Estilo inline para garantir
            >
              <i className="fas fa-map-marker-alt"></i> Usar Localização Atual
            </button>
            <p id="location-status" className={locationStatus}>
              {locationStatus === 'loading' && 'Obtendo localização...'}
              {locationStatus === 'success' && 'Localização obtida!'}
              {locationStatus === 'error' && 'Erro ao obter localização.'}
            </p>
            <input type="hidden" id="gps_coordinates" name="gps_coordinates" value={formData.gps_coordinates} />
            
            <div className="form-group">
              <label htmlFor="service">Serviço Desejado:</label>
              <select 
                id="service" 
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Selecione um serviço</option>
                {servicesOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <p className="text-light">O custo de deslocamento (R$ 2,50/km) será adicionado ao valor do serviço.</p>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              id="submit-request"
              disabled={isLoading}
            >
              <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-calculator'} btn-icon`}></i> 
              {isLoading ? 'Calculando...' : 'Calcular Orçamento'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              id="clear-form"
              onClick={handleClearForm}
              disabled={isLoading}
            >
              <i className="fas fa-eraser btn-icon"></i> Limpar
            </button>
          </form>

          {result && (
            <div id="result-container" className={`result-container ${result.type}`}>
              <h4>{result.message}</h4>
              {result.details && result.details.map((detail, index) => (
                <p key={index}><strong>{detail.label}:</strong> {detail.value}</p>
              ))}
              {result.total && (
                <p className="total">Total Estimado: {result.total}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DistanceCalculator;