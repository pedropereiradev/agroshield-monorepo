'use client';
import { DollarSign, Eye, Shield, Smartphone, Star, Zap } from 'lucide-react';
import { useState } from 'react';

export default function BenefitsSection() {
  const [activeTab, setActiveTab] = useState('features');

  // Novos benefícios conceituais
  const conceptualBenefits = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: 'Processo Simplificado',
      description: 'Contratação 100% online sem papelada nem visitas',
      detail: 'Tudo que você precisa é um formulário online simples.',
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: 'Pagamentos Acelerados',
      description: 'Indenizações muito mais rápidas que o seguro tradicional',
      detail: 'Algoritmos inteligentes aceleram drasticamente todo o processo.',
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      title: 'Preços Competitivos',
      description: 'Custos reduzidos com tecnologia e automação',
      detail:
        'Eliminamos intermediários desnecessários para oferecer preços mais justos.',
    },
    {
      icon: <Eye className="w-8 h-8 text-purple-500" />,
      title: 'Transparência Total',
      description: 'Tecnologia blockchain garante total transparência',
      detail:
        'Veja exatamente como suas decisões são tomadas e pagamentos processados.',
    },
  ];

  // Tecnologia explicada simples
  const technologyExplained = [
    {
      title: 'Sistema Digital Impossível de Fraudar',
      description:
        'Blockchain garante que todos os dados e processos sejam verificáveis',
    },
    {
      title: 'Dados Climáticos Verificados por Satélite',
      description:
        'Monitoramento 24h com múltiplas fontes de dados meteorológicos',
    },
    {
      title: 'Pagamento Automático Sem Depender de Pessoas',
      description: 'Algoritmos inteligentes processam claims automaticamente',
    },
    {
      title: 'Tudo Registrado e Transparente',
      description: 'Histórico completo e auditável de todas as operações',
    },
  ];

  return (
    <section id="beneficios" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Por que escolher o AgroShield?
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Descubra como a tecnologia pode revolucionar a proteção da sua
            lavoura com soluções inovadoras e transparentes
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-lg inline-flex">
            <button
              type="button"
              onClick={() => setActiveTab('features')}
              className={`px-6 py-3 rounded-md font-semibold transition-colors ${
                activeTab === 'features'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Principais Benefícios
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('technology')}
              className={`px-6 py-3 rounded-md font-semibold transition-colors ${
                activeTab === 'technology'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Como Funciona a Tecnologia
            </button>
          </div>
        </div>

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {conceptualBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-green-200"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {benefit.description}
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-500">{benefit.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Technology Tab */}
        {activeTab === 'technology' && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">
              Tecnologia Explicada de Forma Simples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technologyExplained.map((tech, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-200 hover:border-green-300 transition-all"
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {tech.title}
                  </h4>
                  <p className="text-gray-600">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border-2 border-green-200 max-w-3xl mx-auto">
            <Star className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Seja Pioneiro na Revolução do Seguro Rural
            </h3>
            <p className="text-gray-600 mb-6">
              Cadastre-se gratuitamente e tenha acesso prioritário quando
              lançarmos. Descubra como a tecnologia pode proteger sua lavoura.
            </p>
            <a
              href="#cadastro"
              className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <Smartphone className="w-5 h-5 mr-2" />
              Garantir Acesso Prioritário
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
