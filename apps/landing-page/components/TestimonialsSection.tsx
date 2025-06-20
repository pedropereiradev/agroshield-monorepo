import { Star, Quote, Award, MapPin } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Carlos Eduardo Silva',
      role: 'Produtor de Soja',
      location: 'Sorriso, MT',
      area: '450 hectares',
      image: '/api/placeholder/80/80',
      rating: 5,
      quote: 'Finalmente um seguro que funciona! Quando tivemos a estiagem em janeiro, recebi o pagamento em 2 dias. Com o seguro tradicional, ainda estaria esperando a vistoria. O AgroShield mudou completamente minha gestão de risco.',
      highlight: 'Pagamento em 48h durante estiagem',
      year: '2024'
    },
    {
      name: 'Maria Fernanda Costa',
      role: 'Produtora de Arroz',
      location: 'Alegrete, RS',
      area: '280 hectares',
      image: '/api/placeholder/80/80',
      rating: 5,
      quote: 'A transparência é impressionante. Posso ver exatamente os dados climáticos que eles usam, tudo na blockchain. Já indiquei para 5 vizinhos. É o futuro do seguro rural chegando no Brasil.',
      highlight: '100% digital e transparente',
      year: '2024'
    },
    {
      name: 'João Roberto Mendes',
      role: 'Agricultor Familiar',
      location: 'Palmeira das Missões, RS',
      area: '85 hectares',
      image: '/api/placeholder/80/80',
      rating: 5,
      quote: 'Sempre achei seguro rural coisa de grande produtor por causa do preço e burocracia. O AgroShield é 70% mais barato e super simples. Contratei pelo celular em 5 minutos. Recomendo!',
      highlight: '70% economia vs. tradicional',
      year: '2024'
    },
    {
      name: 'Ricardo Oliveira',
      role: 'Consultor Agronômico',
      location: 'Campo Grande, MS',
      area: 'Atende 50+ produtores',
      image: '/api/placeholder/80/80',
      rating: 5,
      quote: 'Como consultor, sempre tive dificuldade para recomendar seguros pelos custos e complexidade. O AgroShield resolve isso. Meus clientes estão muito satisfeitos com a agilidade e os preços justos.',
      highlight: 'Aprovado por especialistas',
      year: '2024'
    },
    {
      name: 'Ana Paula Rodrigues',
      role: 'Produtora de Soja',
      location: 'Luís Eduardo Magalhães, BA',
      area: '1.200 hectares',
      image: '/api/placeholder/80/80',
      rating: 5,
      quote: 'A tecnologia blockchain me deu confiança total. Não dependo mais de análises subjetivas ou vistorias demoradas. Os critérios são claros e os dados são públicos. É segurança de verdade.',
      highlight: 'Confiança em tecnologia blockchain',
      year: '2024'
    }
  ];

  const stats = [
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      value: '4.9/5',
      label: 'Avaliação média',
      detail: 'Baseado em 127+ avaliações'
    },
    {
      icon: <Award className="w-8 h-8 text-green-500" />,
      value: '98%',
      label: 'Recomendam',
      detail: 'Taxa de satisfação'
    },
    {
      icon: <MapPin className="w-8 h-8 text-blue-500" />,
      value: '15 estados',
      label: 'Presença nacional',
      detail: 'Cobrindo todo o Brasil'
    }
  ];

  const partnerships = [
    {
      name: 'CPTEC/INPE',
      description: 'Dados meteorológicos oficiais',
      logo: '/api/placeholder/120/60'
    },
    {
      name: 'INMET',
      description: 'Estações meteorológicas',
      logo: '/api/placeholder/120/60'
    },
    {
      name: 'Embrapa',
      description: 'Pesquisa agropecuária',
      logo: '/api/placeholder/120/60'
    },
    {
      name: 'CNA',
      description: 'Confederação da Agricultura',
      logo: '/api/placeholder/120/60'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            O que nossos produtores dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Histórias reais de quem já experimentou a revolução do seguro agrícola digital. 
            Conheça os resultados que nossos clientes estão alcançando.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="mb-3">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-700 font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 relative"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-green-200 absolute top-4 right-4" />
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-sm text-gray-500">{testimonial.year}</span>
              </div>
              
              {/* Testimonial */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Highlight */}
              <div className="bg-green-50 p-3 rounded-lg mb-6 border-l-4 border-green-500">
                <div className="text-sm font-semibold text-green-800">
                  ✨ {testimonial.highlight}
                </div>
              </div>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lg font-bold text-gray-600">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {testimonial.location} • {testimonial.area}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Testimonial CTA */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 rounded-xl text-white text-center mb-16">
          <h3 className="text-2xl font-bold mb-4">
            Quer ver depoimentos em vídeo?
          </h3>
          <p className="text-lg opacity-90 mb-6">
            Assista aos casos de sucesso completos dos nossos produtores e entenda 
            como o AgroShield transformou a gestão de risco nas propriedades.
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Ver Vídeos de Depoimentos
          </button>
        </div>

        {/* Partnerships */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Parcerias e Validações Técnicas
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Trabalhamos com as principais instituições do agronegócio brasileiro 
            para garantir a precisão e confiabilidade dos nossos dados.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {partnerships.map((partner, index) => (
              <div key={index} className="text-center">
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 mb-3 h-20 flex items-center justify-center">
                  <div className="text-gray-400 font-bold text-sm">
                    {partner.name}
                  </div>
                </div>
                <div className="text-sm text-gray-600">{partner.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border-2 border-green-200 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Junte-se a centenas de produtores satisfeitos
            </h3>
            <p className="text-gray-600 mb-6">
              Seja o próximo a experimentar o futuro do seguro agrícola. 
              Cadastre-se agora e receba uma cotação personalizada.
            </p>
            <a
              href="#cadastro"
              className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <Star className="w-5 h-5 mr-2" />
              Começar Agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}