'use client';
import {
  BarChart3,
  Calculator,
  Clock,
  Globe,
  Shield,
  Smartphone,
  Users,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

export default function BenefitsSection() {
  const [activeTab, setActiveTab] = useState('features');

  const benefits = [
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: 'Indenização Automática',
      description:
        'Processos automatizados com base em dados climáticos — sem necessidade de vistoria ou análise manual.',
      detail:
        'Utilizamos estações meteorológicas e dados de satélite para detectar eventos que acionam o pagamento.',
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: 'Segurança Blockchain',
      description:
        'Contratos inteligentes garantem total transparência e proteção contra fraudes.',
      detail:
        'Todos os contratos são armazenados na blockchain, garantindo imutabilidade e auditabilidade completa.',
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-500" />,
      title: 'Interface Simples',
      description:
        'Tecnologia Web3 com usabilidade pensada para quem está acostumado a apps convencionais.',
      detail:
        'Não precisa entender blockchain - nossa interface funciona como qualquer app do seu celular.',
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      title: 'Pagamento Express',
      description:
        'Receba sua indenização em 24-48 horas após confirmação do evento climático.',
      detail:
        'Sem espera de meses: detectado o evento, o pagamento é processado automaticamente.',
    },
    {
      icon: <Calculator className="w-8 h-8 text-indigo-500" />,
      title: 'Preços Justos',
      description: 'Cálculo baseado em dados históricos reais da sua região.',
      detail:
        'Eliminamos intermediários e usamos nosso próprio algoritmo para precificar com base no risco real da sua área.',
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-cyan-500" />,
      title: 'Monitoramento 24/7',
      description:
        'Acompanhe condições climáticas e status da sua apólice em tempo real.',
      detail:
        'Dashboard completo com alertas personalizados e previsões meteorológicas específicas para sua cultura.',
    },
  ];

  const comparisons = [
    {
      feature: 'Tempo de Contratação',
      traditional: 'Até 60 dias',
      agroshield: '5 minutos',
      improvement: '99% mais rápido',
    },
    {
      feature: 'Documentação',
      traditional: '15+ documentos físicos',
      agroshield: 'Formulário online simples',
      improvement: 'Sem papelada',
    },
    {
      feature: 'Avaliação de Risco',
      traditional: 'Vistoria presencial',
      agroshield: 'Análise por satélite/dados',
      improvement: 'Sem visita técnica',
    },
    {
      feature: 'Pagamento de Indenização',
      traditional: '3-6 meses',
      agroshield: '24-48 horas',
      improvement: '98% mais rápido',
    },
    {
      feature: 'Transparência',
      traditional: 'Processos opacos',
      agroshield: 'Blockchain auditável',
      improvement: '100% transparente',
    },
  ];

  const socialProof = [
    {
      metric: '98%',
      description: 'dos usuários recomendam',
      detail: 'Pesquisa com produtores beta',
    },
    {
      metric: '73%',
      description: 'economia média vs tradicional',
      detail: 'Comparação de prêmios pagos',
    },
    {
      metric: '24h',
      description: 'tempo médio de pagamento',
      detail: 'Após confirmação do evento',
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
            <strong>Experiência de Web3 com usabilidade da Web2:</strong> toda a
            segurança do blockchain com a simplicidade que você já conhece
          </p>

          {/* Social Proof Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            {socialProof.map((proof, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-200"
              >
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {proof.metric}
                </div>
                <div className="text-gray-800 font-semibold mb-1">
                  {proof.description}
                </div>
                <div className="text-xs text-gray-600">{proof.detail}</div>
              </div>
            ))}
          </div>
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
              onClick={() => setActiveTab('comparison')}
              className={`px-6 py-3 rounded-md font-semibold transition-colors ${
                activeTab === 'comparison'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Comparação Detalhada
            </button>
          </div>
        </div>

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
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

        {/* Comparison Tab */}
        {activeTab === 'comparison' && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6">
                <h3 className="text-2xl font-bold text-white text-center">
                  Comparação Completa: Tradicional vs. AgroShield
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Aspecto
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-red-600">
                        Seguro Tradicional
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-green-600">
                        AgroShield
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">
                        Vantagem
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {comparisons.map((comp, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {comp.feature}
                        </td>
                        <td className="px-6 py-4 text-sm text-center text-red-600 bg-red-50">
                          {comp.traditional}
                        </td>
                        <td className="px-6 py-4 text-sm text-center text-green-600 bg-green-50 font-semibold">
                          {comp.agroshield}
                        </td>
                        <td className="px-6 py-4 text-sm text-center text-blue-600 bg-blue-50 font-semibold">
                          {comp.improvement}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border-2 border-green-200 max-w-3xl mx-auto">
            <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Junte-se aos produtores inovadores
            </h3>
            <p className="text-gray-600 mb-6">
              Seja um dos primeiros a experimentar o futuro do seguro agrícola
              no Brasil. Sem compromisso, sem burocracia.
            </p>
            <a
              href="#cadastro"
              className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <Smartphone className="w-5 h-5 mr-2" />
              Cadastrar na Lista de Espera
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
