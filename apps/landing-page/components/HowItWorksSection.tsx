import React from 'react';

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Cadastre sua propriedade",
      description: "Informe dados da sua fazenda, cultivo e localização"
    },
    {
      number: "02", 
      title: "Receba sua cotação",
      description: "Nossa IA calcula o prêmio baseado em 20 anos de dados climáticos"
    },
    {
      number: "03",
      title: "Contrate sua apólice",
      description: "Pague com PIX e receba seu NFT de seguro na carteira digital"
    },
    {
      number: "04",
      title: "Proteção ativa",
      description: "Monitoramento 24/7 e pagamentos automáticos quando necessário"
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Como o AgroShield funciona</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Processo simples e totalmente digital, do cadastro ao pagamento
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">{step.number}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="opacity-90">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 