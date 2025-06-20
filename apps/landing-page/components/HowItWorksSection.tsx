import {
  ArrowRight,
  Calculator,
  CheckCircle,
  Clock,
  FileCheck,
  Shield,
  Smartphone,
} from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Cadastre sua propriedade',
      description: 'Informe dados da sua fazenda, cultivo e localização',
      time: '2 minutos',
      icon: <Smartphone className="w-6 h-6 text-white" />,
    },
    {
      number: '02',
      title: 'Receba sua cotação',
      description:
        'Nosso sistema gera uma estimativa com base em dados climáticos históricos',
      time: '1 minuto',
      icon: <Calculator className="w-6 h-6 text-white" />,
    },
    {
      number: '03',
      title: 'Contrate sua apólice',
      description:
        'Finalize a contratação de forma digital com facilidade e segurança',
      time: '2 minutos',
      icon: <FileCheck className="w-6 h-6 text-white" />,
    },
    {
      number: '04',
      title: 'Proteção ativa',
      description:
        'Acompanhe sua apólice e alertas climáticos em tempo real na plataforma',
      time: '24/7',
      icon: <Shield className="w-6 h-6 text-white" />,
    },
  ];

  const processHighlights = [
    {
      icon: <Clock className="w-8 h-8 text-green-400" />,
      title: 'Tempo Total',
      value: '5 minutos',
      description: 'Do cadastro à contratação',
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-400" />,
      title: 'Aprovação',
      value: 'Instantânea',
      description: 'Sem análise manual',
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-400" />,
      title: 'Proteção',
      value: 'Imediata',
      description: 'Ativa após confirmação',
    },
  ];

  return (
    <section
      id="como-funciona"
      className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white px-4"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Como o AgroShield funciona
          </h2>
          <p className="text-xl opacity-90 max-w-4xl mx-auto mb-8">
            Processo simples e totalmente digital, do cadastro ao
            acompanhamento. Sem burocracia, sem papelada, sem espera.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {processHighlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
              >
                <div className="mb-3">{highlight.icon}</div>
                <div className="text-2xl font-bold mb-1">{highlight.value}</div>
                <div className="text-sm opacity-90 mb-2">{highlight.title}</div>
                <div className="text-xs opacity-75">
                  {highlight.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                  <span className="text-2xl font-bold">{step.number}</span>
                </div>
                <div className="absolute -top-2 -right-2 bg-white/20 backdrop-blur-sm rounded-full p-2">
                  {step.icon}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 group-hover:bg-white/20 transition-colors">
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="opacity-90 mb-4 text-sm leading-relaxed">
                  {step.description}
                </p>

                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  <Clock className="w-4 h-4 mr-1" />
                  {step.time}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-white/50" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Durante o processo</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3 mt-0.5" />
                  <span className="text-sm">
                    Análise de risco em tempo real usando dados meteorológicos
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3 mt-0.5" />
                  <span className="text-sm">
                    Cálculo de prêmio baseado no risco específico da sua região
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3 mt-0.5" />
                  <span className="text-sm">
                    Contrato inteligente gerado automaticamente
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3 mt-0.5" />
                  <span className="text-sm">
                    Confirmação por blockchain para máxima segurança
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Após a contratação</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-300 mr-3 mt-0.5" />
                  <span className="text-sm">
                    Monitoramento climático automático da sua propriedade
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-300 mr-3 mt-0.5" />
                  <span className="text-sm">
                    Dashboard para acompanhar sua apólice 24/7
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-300 mr-3 mt-0.5" />
                  <span className="text-sm">
                    Indenização processada automaticamente quando necessário
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
