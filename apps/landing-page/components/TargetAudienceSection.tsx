'use client';
import {
  Heart,
  MapPin,
  Smartphone,
  Tractor,
  TrendingUp,
  Users,
} from 'lucide-react';

export default function TargetAudienceSection() {
  const targetProfiles = [
    {
      icon: <Tractor className="w-8 h-8 text-green-500" />,
      title: 'Produtores Inovadores',
      description:
        'Agricultores que buscam tecnologia para proteger seus investimentos',
      details: [
        'Interesse em soluções digitais',
        'Busca por eficiência e inovação',
        'Visão de futuro do agronegócio',
      ],
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: 'Cooperativas Progressistas',
      description:
        'Cooperativas que querem oferecer soluções modernas aos associados',
      details: [
        'Foco em agregação de valor',
        'Interesse em parcerias tecnológicas',
        'Comprometimento com inovação',
      ],
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
      title: 'Consultores e Técnicos',
      description: 'Profissionais que assessoram produtores rurais',
      details: [
        'Conhecimento técnico avançado',
        'Relacionamento com produtores',
        'Interesse em ferramentas modernas',
      ],
    },
  ];

  const idealCriteria = [
    {
      icon: <MapPin className="w-6 h-6 text-yellow-500" />,
      title: 'Localização Estratégica',
      description: 'Regiões com dados climáticos robustos',
    },
    {
      icon: <Smartphone className="w-6 h-6 text-blue-500" />,
      title: 'Afinidade Digital',
      description: 'Familiaridade com tecnologia e aplicativos',
    },
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: 'Visão de Futuro',
      description: 'Interesse em fazer parte da transformação do seguro rural',
    },
  ];

  return (
    <section id="publico-alvo" className="py-20 bg-gray-50 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Você faz parte da revolução?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Estamos procurando pioneiros dispostos a testar e moldar o futuro do
            seguro rural. Veja se você se encaixa no perfil dos nossos
            parceiros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {targetProfiles.map((profile, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="mb-6">{profile.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {profile.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {profile.description}
              </p>
              <ul className="space-y-3">
                {profile.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className="flex items-center text-sm text-gray-700"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-600/90 via-blue-600/90 to-purple-600/90 backdrop-blur-lg rounded-xl p-8 text-white border-2 border-white/30 shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Perfil Ideal</h3>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Buscamos parceiros que nos ajudem a criar a melhor solução
              possível
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {idealCriteria.map((criteria, index) => (
              <div
                key={index}
                className="bg-white/15 backdrop-blur-sm rounded-lg p-6 border border-white/30 hover:bg-white/25 transition-all"
              >
                <div className="mb-4">{criteria.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{criteria.title}</h4>
                <p className="text-sm opacity-90">{criteria.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto border border-white/30">
              <h4 className="text-xl font-bold mb-3">
                🚀 Benefícios Exclusivos para Parceiros Beta
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="text-left">
                  <p>✓ Influência no desenvolvimento</p>
                  <p>✓ Condições especiais no lançamento</p>
                </div>
                <div className="text-left">
                  <p>✓ Suporte direto da equipe</p>
                  <p>✓ Acesso antecipado a funcionalidades</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Se identifica com esse perfil? Junte-se a nós na construção do
            futuro do seguro rural.
          </p>
          <a
            href="#formulario"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors inline-block"
          >
            Quero Garantir Minha Vaga
          </a>
        </div>
      </div>
    </section>
  );
}
