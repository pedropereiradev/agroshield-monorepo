import { Bell, CheckCircle, Clock, Shield, Star, User } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Cadastre Seu Interesse',
      description: 'Seja um dos primeiros a testar nossa plataforma',
      icon: <User className="w-6 h-6" />,
      time: 'Agora',
    },
    {
      number: '02',
      title: 'Receba Atualizações',
      description: 'Acompanhe o desenvolvimento e lançamento',
      icon: <Bell className="w-6 h-6" />,
      time: 'Durante desenvolvimento',
    },
    {
      number: '03',
      title: 'Acesso Prioritário',
      description: 'Primeiros cadastrados terão condições especiais',
      icon: <Star className="w-6 h-6" />,
      time: 'No lançamento',
    },
    {
      number: '04',
      title: 'Proteja Sua Lavoura',
      description: 'Contrate e monitore sua cobertura online',
      icon: <Shield className="w-6 h-6" />,
      time: 'Após lançamento',
    },
  ];

  const processHighlights = [
    {
      icon: <Clock className="w-8 h-8 text-green-400" />,
      title: 'Processo',
      value: 'Simples',
      description: 'Cadastro online rápido',
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-400" />,
      title: 'Acompanhamento',
      value: 'Transparente',
      description: 'Atualizações constantes',
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-400" />,
      title: 'Tecnologia',
      value: 'Inovadora',
      description: 'Blockchain e automação',
    },
  ];

  return (
    <section
      id="como-funciona"
      className="relative py-20 bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 text-white px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-green-300/20 rounded-full blur-lg animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300/20 rounded-full blur-md animate-pulse delay-500" />
      <div className="container mx-auto relative z-10">
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
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">O que você recebe</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3 mt-0.5" />
                  <span className="text-sm">
                    Atualizações exclusivas sobre o desenvolvimento
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3 mt-0.5" />
                  <span className="text-sm">
                    Convites para demonstrações da plataforma
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3 mt-0.5" />
                  <span className="text-sm">Acesso antecipado</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-300 mr-3 mt-0.5" />
                  <span className="text-sm">
                    Condições especiais no lançamento oficial
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">
                Tecnologia em desenvolvimento
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-300 mr-3 mt-0.5" />
                  <span className="text-sm">
                    Análise automatizada de dados climáticos
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-300 mr-3 mt-0.5" />
                  <span className="text-sm">
                    Contratos inteligentes em blockchain
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-300 mr-3 mt-0.5" />
                  <span className="text-sm">
                    Interface simplificada para produtores
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
