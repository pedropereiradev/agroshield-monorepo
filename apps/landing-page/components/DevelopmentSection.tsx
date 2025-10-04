'use client';
import {
  Calendar,
  CheckCircle,
  Clock,
  Code,
  Lightbulb,
  Rocket,
  Target,
  Users,
} from 'lucide-react';

export default function DevelopmentSection() {
  const milestones = [
    {
      quarter: 'Q1 2025',
      title: 'Versão Beta',
      status: 'in_progress',
      description: 'Lançamento da versão beta com funcionalidades core',
      details: [
        'Contratos inteligentes básicos',
        'Interface web responsiva',
        'Integração com dados climáticos',
      ],
    },
    {
      quarter: 'Q2 2025',
      title: 'Testes Piloto',
      status: 'planned',
      description: 'Programa piloto com produtores selecionados',
      details: [
        'Validação com usuários reais',
        'Refinamento da experiência',
        'Expansão gradual de regiões',
      ],
    },
    {
      quarter: 'Q3 2025',
      title: 'Lançamento Oficial',
      status: 'planned',
      description: 'Disponibilização para o público geral',
      details: [
        'Plataforma completa',
        'Suporte expandido',
        'Parcerias estratégicas',
      ],
    },
  ];

  const currentProgress = [
    {
      icon: <Code className="w-6 h-6 text-blue-500" />,
      title: 'Desenvolvimento Técnico',
      progress: 75,
      description: 'Contratos inteligentes e arquitetura de backend',
    },
    {
      icon: <Target className="w-6 h-6 text-green-500" />,
      title: 'Interface de Usuário',
      progress: 60,
      description: 'Design e experiência do usuário',
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
      title: 'Integração de Dados',
      progress: 80,
      description: 'APIs meteorológicas e análise de riscos',
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: 'Validação de Mercado',
      progress: 40,
      description: 'Pesquisa e feedback de potenciais usuários',
    },
  ];

  const transparency = [
    {
      title: 'O que já funciona',
      items: [
        'Análise automatizada de dados climáticos',
        'Cálculo de riscos baseado em localização',
        'Protótipo da interface web',
        'Contratos inteligentes básicos',
      ],
      color: 'green',
    },
    {
      title: 'O que estamos desenvolvendo',
      items: [
        'Sistema completo de pagamentos',
        'Integração com carteiras digitais',
        'Dashboard de monitoramento avançado',
        'Processo de verificação automática',
      ],
      color: 'blue',
    },
    {
      title: 'Próximos desafios',
      items: [
        'Certificação regulatória',
        'Parcerias com seguradoras',
        'Escalabilidade da infraestrutura',
        'Educação do mercado',
      ],
      color: 'yellow',
    },
  ];

  return (
    <section id="desenvolvimento" className="py-20 bg-white px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Transparência Total sobre o Desenvolvimento
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Acreditamos na transparência completa. Veja exatamente onde estamos
            no desenvolvimento e o que você pode esperar nos próximos meses.
          </p>
        </div>

        {/* Roadmap */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Roadmap de Lançamento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative rounded-xl p-8 border-2 ${
                  milestone.status === 'in_progress'
                    ? 'border-blue-500 bg-blue-50'
                    : milestone.status === 'planned'
                      ? 'border-gray-300 bg-gray-50'
                      : 'border-green-500 bg-green-50'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      milestone.status === 'in_progress'
                        ? 'bg-blue-500 text-white'
                        : milestone.status === 'planned'
                          ? 'bg-gray-400 text-white'
                          : 'bg-green-500 text-white'
                    }`}
                  >
                    {milestone.status === 'in_progress' ? (
                      <Clock className="w-6 h-6" />
                    ) : milestone.status === 'planned' ? (
                      <Calendar className="w-6 h-6" />
                    ) : (
                      <CheckCircle className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-600">
                      {milestone.quarter}
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {milestone.title}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{milestone.description}</p>
                <ul className="space-y-2">
                  {milestone.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start text-sm">
                      <div className="w-2 h-2 bg-current rounded-full mr-3 mt-2 opacity-60"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Progresso Atual
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentProgress.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {item.icon}
                  <h4 className="text-lg font-semibold text-gray-900 ml-3">
                    {item.title}
                  </h4>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-600 mt-2">
                  {item.progress}% concluído
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transparency */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Status Detalhado
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transparency.map((section, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h4
                  className={`text-xl font-bold mb-4 ${
                    section.color === 'green'
                      ? 'text-green-600'
                      : section.color === 'blue'
                        ? 'text-blue-600'
                        : 'text-yellow-600'
                  }`}
                >
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-sm">
                      <CheckCircle
                        className={`w-4 h-4 mr-3 mt-0.5 ${
                          section.color === 'green'
                            ? 'text-green-500'
                            : section.color === 'blue'
                              ? 'text-blue-500'
                              : 'text-yellow-500'
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-white max-w-3xl mx-auto">
            <Rocket className="w-12 h-12 mx-auto mb-4" />
            <h4 className="text-2xl font-bold mb-4">
              Seja Parte da Construção
            </h4>
            <p className="mb-6 opacity-90">
              Sua participação não é apenas testar - é ajudar a moldar o futuro
              do seguro rural no Brasil.
            </p>
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              Quero Contribuir
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
