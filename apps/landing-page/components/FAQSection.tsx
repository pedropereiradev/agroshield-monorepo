'use client';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqs = [
    {
      category: 'Sobre o Projeto',
      questions: [
        {
          question: 'O que é o AgroShield?',
          answer:
            'O AgroShield é uma plataforma inovadora de seguro rural que combina blockchain, dados climáticos e contratos inteligentes para criar uma solução mais transparente, rápida e acessível para produtores rurais. Estamos desenvolvendo o futuro do seguro agrícola no Brasil.',
        },
        {
          question: 'Por que vocês estão criando esta solução?',
          answer:
            'O seguro rural tradicional tem processos lentos, burocráticos e muitas vezes inacessíveis para pequenos e médios produtores. Nossa missão é democratizar o acesso ao seguro rural através da tecnologia, tornando-o mais simples, transparente e eficiente.',
        },
        {
          question: 'Qual é o diferencial da solução?',
          answer:
            'Combinamos três pilares: automação completa via blockchain, dados climáticos em tempo real de múltiplas fontes, e uma interface simples que qualquer produtor pode usar. Isso resulta em processos mais rápidos, custos menores e total transparência.',
        },
        {
          question: 'Como a tecnologia blockchain ajuda no seguro rural?',
          answer:
            'A blockchain garante transparência total, elimina intermediários desnecessários, automatiza pagamentos e cria um histórico imutável de todas as transações. Isso reduz custos, aumenta a confiança e acelera drasticamente os processos.',
        },
      ],
    },
    // {
    //   category: 'Programa Beta',
    //   questions: [
    //     {
    //       question: 'Como funciona o programa beta?',
    //       answer:
    //         'Estamos selecionando produtores interessados em testar nossa plataforma antes do lançamento oficial. Os participantes beta terão acesso antecipado, poderão influenciar o desenvolvimento e receberão condições especiais no lançamento.',
    //     },
    //     {
    //       question: 'Quem pode participar do beta?',
    //       answer:
    //         'Buscamos produtores rurais, cooperativas, consultores e técnicos agrícolas interessados em inovação. O ideal é ter afinidade com tecnologia e estar em regiões com boa disponibilidade de dados climáticos.',
    //     },
    //     {
    //       question: 'Quais são os benefícios de ser um beta tester?',
    //       answer:
    //         'Participantes beta terão: acesso exclusivo à plataforma em desenvolvimento, influência direta nas funcionalidades, suporte direto da nossa equipe, condições especiais no lançamento oficial e a oportunidade de ser pioneiro na transformação do seguro rural.',
    //     },
    //     {
    //       question: 'O programa beta é gratuito?',
    //       answer:
    //         'Sim! A participação no programa beta é completamente gratuita. É uma oportunidade de conhecer e testar nossa tecnologia sem qualquer custo ou compromisso.',
    //     },
    //   ],
    // },
    // {
    //   category: 'Desenvolvimento',
    //   questions: [
    //     {
    //       question: 'Quando a plataforma estará disponível?',
    //       answer:
    //         'Estamos planejando o lançamento da versão beta para o primeiro semestre de 2025, com lançamento oficial previsto para o segundo semestre. Participantes beta receberão atualizações regulares sobre o cronogamento.',
    //     },
    //     {
    //       question: 'Em que estágio está o desenvolvimento?',
    //       answer:
    //         'Já temos os contratos inteligentes funcionais, a integração com dados climáticos operacional e a interface de usuário em desenvolvimento avançado. Estamos na fase de testes e refinamento antes do lançamento beta.',
    //     },
    //     {
    //       question: 'Como posso acompanhar o progresso?',
    //       answer:
    //         'Cadastrando seu interesse, você receberá atualizações mensais por email sobre nosso progresso, demonstrações da plataforma e convites para eventos exclusivos. Também compartilhamos marcos importantes em nossas redes sociais.',
    //     },
    //   ],
    // },
    {
      category: 'Tecnologia',
      questions: [
        {
          question: 'Que tipo de dados climáticos vocês utilizam?',
          answer:
            'Coletamos dados de múltiplas fontes: estações meteorológicas oficiais, dados satelitais, APIs de previsão do tempo e sensores regionais. Isso garante alta precisão e confiabilidade nas análises climáticas.',
        },
        {
          question: 'A plataforma será segura?',
          answer:
            'Segurança é nossa prioridade máxima. Utilizamos blockchain para garantir imutabilidade, criptografia avançada para proteger dados pessoais e seguimos todas as melhores práticas de segurança da informação.',
        },
        {
          question: 'Preciso ser um expert em tecnologia para usar?',
          answer:
            'Absolutamente não! Nossa interface é projetada para ser intuitiva e acessível. Se você consegue usar aplicativos comuns no seu celular, conseguirá usar nossa plataforma sem dificuldades.',
        },
      ],
    },
  ];

  return (
    <section className="py-20 px-4 bg-white" id="faq">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">
              Perguntas Frequentes
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Esclarecemos as principais dúvidas sobre o AgroShield. Não encontrou
            sua pergunta? Entre em contato conosco.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-200">
                {category.category}
              </h3>

              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 10 + questionIndex;
                  const isOpen = openItems.includes(globalIndex);

                  return (
                    <div
                      key={questionIndex}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:border-green-300 transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                      >
                        <span className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-6 py-4 bg-white border-t border-gray-200">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border-2 border-green-200 max-w-2xl mx-auto">
            <HelpCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ainda tem dúvidas?
            </h3>
            <p className="text-gray-600 mb-6">
              Nossa equipe está pronta para esclarecer qualquer questão sobre o
              AgroShield. Fale conosco sem compromisso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#cadastro"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Falar com Especialista
              </a>
              <a
                href="mailto:contato@agroshield.co"
                className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Enviar E-mail
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
