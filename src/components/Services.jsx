import React from 'react';
import ServiceCard from './ServiceCard';

const servicesData = [
  { icon: 'key', title: 'Cópia de Chaves', description: 'Cópias precisas de todos os tipos de chaves, incluindo chaves residenciais, comerciais, automotivas e especiais.' },
  { icon: 'unlock-alt', title: 'Abertura de Portas', description: 'Serviço emergencial 24 horas para abertura de portas quando você ficar trancado para fora.' },
  { icon: 'car', title: 'Chaveiro Automotivo', description: 'Soluções para veículos, incluindo cópias de chaves, programação de chaves codificadas e abertura de carros.' },
  { icon: 'lock', title: 'Troca de Fechaduras', description: 'Instalação e substituição de fechaduras residenciais e comerciais para maior segurança.' },
  { icon: 'shield-alt', title: 'Sistemas de Segurança', description: 'Instalação e manutenção de fechaduras eletrônicas e cadeados.' },
  { icon: 'building', title: 'Carimbos e Impressão', description: 'Contamos também com a criação de carimbos personalizados e serviços de papelaria como impressão em papel fotográfico, xerox, gravação, plastificação, entre outros.' },
];

const Services = () => {
  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section-title-container">
          <h2 className="section-title fade-in">Nossos Serviços</h2>
        </div>
        
        <div className="services-grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
