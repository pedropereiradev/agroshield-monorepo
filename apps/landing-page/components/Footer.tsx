import { HelpCircle, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import logo from '../public/logo-icon.png';

export default function Footer() {
  const productLinks = [
    {
      title: 'Como Funciona',
      href: '#como-funciona',
      description: 'Processo simples em 4 passos',
    },
    {
      title: 'Benefícios',
      href: '#beneficios',
      description: 'Vantagens do seguro digital',
    },
    {
      title: 'Cobertura',
      href: '#cobertura',
      description: 'Proteção para soja e arroz',
    },
  ];

  const supportLinks = [
    {
      title: 'Central de Ajuda',
      href: '#faq',
      description: 'Perguntas frequentes',
      icon: <HelpCircle className="w-4 h-4" />,
    },
    {
      title: 'Contato',
      href: 'mailto:contato@agroshield.com.br',
      description: 'Fale conosco',
      icon: <Mail className="w-4 h-4" />,
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-1 mb-6">
              <div className="bg-gradient-to-r rounded-lg">
                <Image src={logo} width={128} height={128} alt="Logo" />
              </div>
              <span className="text-2xl font-bold">AgroShield</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              O primeiro seguro rural descentralizado do Brasil. Protegemos sua
              produção com tecnologia blockchain, oferecendo transparência total
              e pagamentos automáticos.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-green-400" />
                <span>contato@agroshield.co</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-green-400" />
                <span>Pelotas, RS - Brasil</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2" />

          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold mb-6 text-white">Produto</h4>
            <ul className="space-y-4">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group block hover:bg-gray-800 p-3 rounded-lg transition-colors"
                  >
                    <div className="font-semibold text-white group-hover:text-green-400 transition-colors">
                      {link.title}
                    </div>
                    <div className="text-sm text-gray-400">
                      {link.description}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold mb-6 text-white">Suporte</h4>
            <ul className="space-y-4">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group flex items-start hover:bg-gray-800 p-3 rounded-lg transition-colors"
                  >
                    <div className="mr-3 mt-0.5 text-green-400">
                      {link.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-green-400 transition-colors">
                        {link.title}
                      </div>
                      <div className="text-sm text-gray-400">
                        {link.description}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-4 lg:mb-0">
              <p className="text-gray-400 text-sm">
                © 2025 AgroShield. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
