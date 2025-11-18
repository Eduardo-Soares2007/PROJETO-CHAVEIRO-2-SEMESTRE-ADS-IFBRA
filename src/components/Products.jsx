import React from 'react';
import ProductCard from './ProductCard';

const productsData = [
  { 
    icon: 'plug', 
    title: 'Acessórios Tecnológicos', 
    description: 'Carregadores, cabos USB, adaptadores e outros acessórios para seus dispositivos.', 
    features: ['Cabos Lightning e USB-C', 'Carregadores rápidos', 'Adaptadores universais'] 
  },
  { 
    icon: 'headphones', 
    title: 'Áudio e Fones', 
    description: 'Fones de ouvido sem fio e com fio de diversas marcas e modelos.', 
    features: ['Fones Bluetooth', 'Fones intra-auriculares'] 
  },
  { 
    icon: 'gem', 
    title: 'Personalizados', 
    description: 'Itens personalizados e especiais.', 
    features: ['Miniaturas especiais', 'Carimbos personalizados', 'Impressões e xerox'] 
  },
  { 
    icon: 'utensils', 
    title: 'Utilitários e Ferramentas', 
    description: 'Produtos úteis para o dia a dia e ferramentas de qualidade.', 
    features: ['Canivetes profissionais', 'Ferramentas multifuncionais', 'Acessórios para chaves'] 
  },
];

const Products = () => {
  return (
    <section id="products" className="section products">
      <div className="container">
        <div className="section-title-container">
          <h2 className="section-title fade-in">Outros Serviços e Produtos</h2>
        </div>
        
        <div className="products-grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
          {productsData.map((product, index) => (
            <ProductCard 
              key={index}
              icon={product.icon}
              title={product.title}
              description={product.description}
              features={product.features}
            />
          ))}
        </div>
        
        <div className="text-center mt-12 fade-in">
          <p className="text-light mb-6">Além de nossos serviços de chaveiro, oferecemos uma variedade de produtos úteis para seu dia a dia.</p>
        </div>
      </div>
    </section>
  );
};

export default Products;
