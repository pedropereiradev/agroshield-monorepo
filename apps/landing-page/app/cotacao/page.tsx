import type { Metadata } from 'next';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import QuoteForm from '../../components/QuoteForm';

export const metadata: Metadata = {
  title: 'Solicitar Cotação de Seguro Agrícola',
  description:
    'Solicite uma cotação personalizada para seguro agrícola descentralizado. Proteja sua safra de soja ou arroz com tecnologia blockchain e pagamentos automáticos.',
  keywords: [
    'cotação seguro agrícola',
    'seguro rural cotação',
    'seguro soja preço',
    'seguro arroz cotação',
    'blockchain agricultura',
  ],
};

export default function CotacaoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <Header />

      <main className="py-12">
        <div className="container mx-auto px-4">
          <QuoteForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
