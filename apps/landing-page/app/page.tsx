"use client";

import React, { useState } from 'react';
import { Shield, Zap, Globe, CheckCircle, ArrowRight, Leaf, Clock, TrendingUp, Users, Star, ChevronDown, Menu, X } from 'lucide-react';

export default function AgroShieldLanding() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [crop, setCrop] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate with your backend API
    console.log('Form submitted:', { name, email, area, crop });
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      setName('');
      setArea('');
      setCrop('');
    }, 3000);
  };

  const benefits = [
    {
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      title: "Pagamentos em 72h",
      description: "Indenizações automáticas baseadas em dados climáticos, sem burocracias ou vistorias demoradas."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: "Segurança Blockchain",
      description: "Contratos inteligentes garantem transparência total e proteção contra fraudes."
    },
    {
      icon: <Globe className="w-6 h-6 text-purple-500" />,
      title: "Interface Simples",
      description: "Toda a potência da Web3 com a facilidade de uso de um aplicativo tradicional."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-orange-500" />,
      title: "Preços Justos",
      description: "Até 16% mais barato que seguros tradicionais, sem intermediários desnecessários."
    }
  ];

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

  const testimonials = [
    {
      name: "Carlos Silva",
      location: "Sorriso, MT",
      text: "Finalmente um seguro que funciona! Recebi minha indenização em 2 dias após a seca.",
      crop: "Soja - 450ha"
    },
    {
      name: "Maria Santos", 
      location: "Pelotas, RS",
      text: "Transparente e confiável. Posso ver tudo na blockchain, sem pegadinhas.",
      crop: "Arroz - 120ha"
    },
    {
      name: "João Oliveira",
      location: "Barreiras, BA", 
      text: "O preço é muito melhor que os seguros tradicionais. Recomendo!",
      crop: "Soja - 280ha"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">AgroShield</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#como-funciona" className="text-gray-600 hover:text-green-600 transition-colors">Como Funciona</a>
              <a href="#beneficios" className="text-gray-600 hover:text-green-600 transition-colors">Benefícios</a>
              <a href="#depoimentos" className="text-gray-600 hover:text-green-600 transition-colors">Depoimentos</a>
              <a href="#cadastro" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Começar Agora
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a href="#como-funciona" className="text-gray-600 hover:text-green-600 transition-colors">Como Funciona</a>
                <a href="#beneficios" className="text-gray-600 hover:text-green-600 transition-colors">Benefícios</a>
                <a href="#depoimentos" className="text-gray-600 hover:text-green-600 transition-colors">Depoimentos</a>
                <a href="#cadastro" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-center">
                  Começar Agora
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              O Primeiro Seguro Rural
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Descentralizado</span>
              <br />do Brasil
            </h1>
            
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
              <p className="text-2xl font-semibold text-gray-800 mb-2">
                "Experiência de Web3 com usabilidade da Web2"
              </p>
              <p className="text-gray-600">
                Toda a segurança e transparência do blockchain, com a simplicidade de um app tradicional
              </p>
            </div>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Proteja sua safra contra seca, chuva excessiva, calor e frio extremos com pagamentos automáticos em 72 horas. 
              Tecnologia blockchain, preços justos e transparência total.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a href="#cadastro" className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg">
                Cadastre-se na Lista de Espera
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </a>
              <a href="#como-funciona" className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-50 transition-colors">
                Saiba Como Funciona
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">72h</div>
                <div className="text-gray-600">Tempo máximo para pagamento</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">16%</div>
                <div className="text-gray-600">Mais barato que seguros tradicionais</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-600">Monitoramento climático</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que 80% dos produtores brasileiros ainda não têm seguro rural?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              A maioria das soluções existentes são complexas ou não atendem às necessidades reais dos produtores
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-3">Seguros Tradicionais</h3>
                <ul className="text-red-700 space-y-2">
                  <li>• Pagamentos em 6-9 meses</li>
                  <li>• Vistorias burocráticas</li>
                  <li>• Prêmios caros e opacos</li>
                  <li>• Cobertura limitada</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">Soluções Web3 Complexas</h3>
                <ul className="text-yellow-700 space-y-2">
                  <li>• Interface confusa</li>
                  <li>• Necessita conhecimento técnico</li>
                  <li>• Carteiras complicadas</li>
                  <li>• Experiência frustrante</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-3">AgroShield</h3>
                <ul className="text-green-700 space-y-2">
                  <li>• Pagamentos em até 72h</li>
                  <li>• Interface simples e intuitiva</li>
                  <li>• Blockchain transparente</li>
                  <li>• Fácil como usar WhatsApp</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl text-white">
              <h3 className="text-xl font-bold mb-2">O Melhor dos Dois Mundos</h3>
              <p className="text-lg">
                <strong>Web3:</strong> Segurança, transparência e contratos inteligentes automáticos<br />
                <strong>Web2:</strong> Interface familiar, suporte ao cliente e experiência sem fricção
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher o AgroShield?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              <strong>Experiência de Web3 com usabilidade da Web2:</strong> toda a segurança do blockchain com a simplicidade que você já conhece
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
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

      {/* Coverage Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cobertura Especializada
            </h2>
            <p className="text-xl text-gray-600">
              Proteção completa para soja e arroz contra os principais riscos climáticos
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Soja */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <Leaf className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Soja</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Seca:</strong> ≥18 dias com menos de 5mm de chuva
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Chuva excessiva:</strong> ≥130mm em 5 dias durante floração
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Calor extremo:</strong> ≥42°C por 3 dias durante floração
                  </div>
                </div>
              </div>
            </div>

            {/* Arroz */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <Leaf className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Arroz</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Chuva excessiva:</strong> ≥120mm em 72h na colheita
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Calor extremo:</strong> ≥37°C por 2 dias na floração
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <strong>Frio extremo:</strong> ≤15°C por 4 dias na germinação
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              O que os produtores estão dizendo
            </h2>
            <p className="text-xl text-gray-600">
              Depoimentos reais de quem já usa o AgroShield
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                  <div className="text-sm text-green-600 font-medium">{testimonial.crop}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cadastro" className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white px-4">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Seja um dos primeiros a usar o AgroShield
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Cadastre-se na nossa lista de espera e garanta acesso prioritário quando lançarmos oficialmente
            </p>
            
            {!isSubmitted ? (
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="number"
                    placeholder="Área (hectares)"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="" className="text-gray-900">Selecione a cultura</option>
                    <option value="soja" className="text-gray-900">Soja</option>
                    <option value="arroz" className="text-gray-900">Arroz</option>
                    <option value="ambos" className="text-gray-900">Soja e Arroz</option>
                  </select>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Garantir Meu Lugar na Lista
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </button>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
                <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Cadastro realizado com sucesso!</h3>
                <p className="text-lg opacity-90">
                  Obrigado por se juntar à nossa lista de espera. Em breve entraremos em contato com mais informações.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-8 h-8 text-green-500" />
                <span className="text-xl font-bold">AgroShield</span>
              </div>
              <p className="text-gray-400">
                O primeiro seguro rural descentralizado do Brasil, protegendo produtores com tecnologia blockchain.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a></li>
                <li><a href="#beneficios" className="hover:text-white transition-colors">Benefícios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 AgroShield. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Política de Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

