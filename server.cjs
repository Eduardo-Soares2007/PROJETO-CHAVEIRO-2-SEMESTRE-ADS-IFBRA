// server.js - Versão FINAL: Aceita Coordenadas (GPS) OU Endereço Manual (ViaCEP + GraphHopper)

// 1. Importar as ferramentas
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// 2. Configurações
const app = express();
const PORT = 3000;
const GRAPHHOPPER_API_KEY = process.env.GRAPHHOPPER_API_KEY;

// Coordenadas ATUALIZADAS do Chaveiro Gama
const CHAVEIRO_COORDS = {
    lat: -23.676667,
    lng: -46.676561
};
// === PREÇOS ===
const PRECO_POR_KM = 2.50;
const PRECOS_SERVICOS = {
    'instalar-fechadura': 150.00,
    'abrir-porta-carro': 120.00,
    'abrir-porta-casa': 100.00,
};
// ==============

// 3. Middlewares
app.use(cors());
app.use(express.json());

// 4. Nossa Rota de API (MODIFICADA para aceitar ambos os formatos)
app.post('/calculate-distance', async (req, res) => {
    try {
        const { coordinates, rua, numero, cep, service } = req.body;

        if (!service) {
             return res.status(400).json({ error: 'Serviço é obrigatório.' });
        }
        
        // Esta validação agora aceita SÓ coordinates, OU o endereço completo
        if (!coordinates && (!rua || !numero || !cep)) {
             return res.status(400).json({ error: 'Forneça coordenadas GPS ou o endereço completo (Rua, Número, CEP).' });
        }

        if (!GRAPHHOPPER_API_KEY) {
            return res.status(500).json({ error: 'Chave da API não configurada no servidor.' });
        }

        let originPoint; // Guardará {lat: xxx, lng: yyy}

        // --- LÓGICA CONDICIONAL ---
if (coordinates) {
         
            // --- CASO 1: Veio Coordenadas (GPS) ---
            console.log("[MODO GPS] Recebido coordenadas:", coordinates);
            const coordsArray = coordinates.split(',');
            if (coordsArray.length !== 2 || isNaN(parseFloat(coordsArray[0])) || isNaN(parseFloat(coordsArray[1]))) {
                return res.status(400).json({ error: 'Formato de coordenadas GPS inválido. Esperado "latitude,longitude".' });
            }
            originPoint = { lat: parseFloat(coordsArray[0]), lng: parseFloat(coordsArray[1]) };
console.log(`[MODO GPS] Coordenadas de origem: ${originPoint.lat}, ${originPoint.lng}`);
            // Pula direto para o cálculo da rota

        } else {
            // --- CASO 2: Veio Endereço Manual ---
             console.log("[MODO MANUAL] Recebido endereço:", { rua, numero, cep });
// ETAPA 1: Validar Endereço com ViaCEP
            let ruaValidada;
let bairroValidado;
            try {
                const cepLimpo = cep.replace(/\D/g, '');
const viacepUrl = `https://viacep.com.br/ws/${cepLimpo}/json/`;

                console.log(`[MODO MANUAL - ETAPA 1/3] Buscando CEP no ViaCEP: ${cepLimpo}`);
                const viacepResponse = await axios.get(viacepUrl);
if (viacepResponse.data.erro) {
                    return res.status(400).json({ error: 'CEP inválido. Por favor, verifique.' });
}
                const { logradouro, bairro: bairroViaCep } = viacepResponse.data;
bairroValidado = bairroViaCep;
                ruaValidada = logradouro ? logradouro : rua; // Usa rua do CEP se existir, senão a digitada
if (!bairroValidado) { return res.status(400).json({ error: 'CEP incompleto (sem bairro).' });
}
                console.log(`[MODO MANUAL - ETAPA 1/3] Endereço validado: ${ruaValidada}, ${bairroValidado}`);
} catch (viacepError) {
                console.error('Erro ViaCEP:', viacepError.message);
return res.status(500).json({ error: 'Falha ao validar CEP.' });
            }

            // ETAPA 2: Geocodificar com GraphHopper
            try {
                const fullAddress = `${ruaValidada}, ${numero}, ${bairroValidado}, São Paulo, SP`;
const geocodeUrl = `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(fullAddress)}&key=${GRAPHHOPPER_API_KEY}`;
                console.log(`[MODO MANUAL - ETAPA 2/3] Buscando coordenadas no GraphHopper: ${fullAddress}`);
                const geocodeResponse = await axios.get(geocodeUrl);
if (!geocodeResponse.data.hits || geocodeResponse.data.hits.length === 0) {
                    return res.status(400).json({ error: 'Endereço não encontrado pelo GraphHopper. Verifique NÚMERO e CEP.' });
}
                originPoint = geocodeResponse.data.hits[0].point;
console.log(`[MODO MANUAL - ETAPA 2/3] Coordenadas encontradas: ${originPoint.lat}, ${originPoint.lng}`);
            } catch (graphhopperError) {
                console.error('Erro GraphHopper Geocoding:', graphhopperError.response ? graphhopperError.response.data : graphhopperError.message);
return res.status(500).json({ error: 'Falha na geocodificação.' });
            }
        } // Fim do else (Modo Manual)


        // --- ETAPA FINAL: Calcular a Rota com GraphHopper ---
        console.log(`[ETAPA FINAL] Calculando rota no GraphHopper...`);
const routeUrl = `https://graphhopper.com/api/1/route?key=${GRAPHHOPPER_API_KEY}`;
        const routePayload = {
            points: [
                [originPoint.lng, originPoint.lat],
                [CHAVEIRO_COORDS.lng, CHAVEIRO_COORDS.lat]
            ],
            vehicle: 'car',
            locale: 'pt-BR',
        
};

        const routeResponse = await axios.post(routeUrl, routePayload, { headers: {'Content-Type': 'application/json'} });
if (!routeResponse.data.paths || routeResponse.data.paths.length === 0) {
            console.error("Erro GraphHopper Routing:", routeResponse.data);
return res.status(400).json({ error: 'Não foi possível calcular a rota.' });
}

        // 7. Calcular o Preço
        const distanciaEmMetros = routeResponse.data.paths[0].distance;
const distanciaEmKm = (distanciaEmMetros / 1000).toFixed(2);
        const precoServico = PRECOS_SERVICOS[service] || 0;
        const precoFrete = distanciaEmKm * PRECO_POR_KM;
const precoTotal = precoServico + precoFrete;

        // 8. Enviar a Resposta
        console.log(`[SUCESSO] Distância: ${distanciaEmKm} km, Preço Total: ${precoTotal}`);
res.json({
            distancia: `${distanciaEmKm} km`,
            servicoNome: service,
            precoServico: precoServico.toFixed(2),
            precoFrete: precoFrete.toFixed(2),
            precoTotal: precoTotal.toFixed(2),
        });
} catch (error) {
        console.error('Erro grave no servidor:', error.response ? error.response.data : error.message);
res.status(500).json({ error: 'Erro interno ao calcular a distância.' });
    }
});

// 9. Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    if (!GRAPHHOPPER_API_KEY) {
        console.warn('ATENÇÃO: A chave GRAPHHOPPER_API_KEY não foi definida no arquivo .env');
    }
});