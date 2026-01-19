import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import Chatbot from './components/Chatbot';
import FAQ from './components/FAQ';
import InfoModal from './components/InfoModal';
import { PRODUCTS, INSTITUTIONAL_CONTENT } from './constants';
import { Product, CartItem } from './types';
import { ArrowRight, Check, Shield, Truck, Award, MapPin, Leaf, Star, Zap, ChevronRight, ShieldCheck, PlayCircle, CreditCard, Lock } from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeInfoPage, setActiveInfoPage] = useState<keyof typeof INSTITUTIONAL_CONTENT | null>(null);
  
  // Single Product Logic (since we only have one now)
  const mainProduct = PRODUCTS[0];

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p);
      }
      return [...prev, { ...product, quantity }];
    });
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Checkout Handler (Simulation)
  const handleBuyKit = (quantity: number) => {
    addToCart(mainProduct, quantity);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />
      
      {/* HERO SECTION - DEEP PREMIUM EMERALD */}
      <section id="home" className="relative bg-[#064e3b] overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-emerald-500 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left animate-fadeIn">
              
              {/* Highlighted Location Badge - Enlarged */}
              <div className="inline-flex items-center gap-3 bg-emerald-900/90 border-2 border-emerald-400 rounded-full px-6 py-3 mb-10 backdrop-blur-md shadow-lg shadow-emerald-500/30 animate-pulse hover:scale-105 transition-transform duration-300">
                <MapPin className="w-6 h-6 text-emerald-400 drop-shadow-md" fill="currentColor" fillOpacity={0.2} />
                <span className="text-base sm:text-lg font-black text-white uppercase tracking-widest drop-shadow-sm">
                  Lançamento Oficial em <span className="text-emerald-400 underline decoration-2 underline-offset-4">Arujá</span>
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                A Revolução Natural que o seu Corpo <span className="text-emerald-400">Implorava</span>.
              </h1>

              <p className="text-lg text-emerald-100/90 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                Esqueça os sintéticos. A VitaLife traz para Arujá o puro <strong>Melão de São Caetano</strong>. Tecnologia de <strong className="text-white font-bold">Absorção Rápida</strong> que combate os danos do açúcar, desinflama o corpo e resolve problemas crônicos na raiz.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#checkout" className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-xl shadow-emerald-900/20 ring-4 ring-emerald-500/20">
                  Ver Ofertas Exclusivas
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-emerald-200/60 text-sm font-medium">
                 <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" /> Compra Segura
                 </div>
                 <div className="flex items-center gap-2">
                    <Check className="w-5 h-5" /> Ingredientes Certificados
                 </div>
              </div>
            </div>

            {/* Hero Image / Composition */}
            <div className="flex-1 relative w-full max-w-lg lg:max-w-none animate-fadeIn delay-100">
               <div className="relative z-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl animate-float transition-all duration-500 hover:shadow-[0_20px_50px_rgba(16,185,129,0.2)]">
                  <div className="relative aspect-[4/5] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-emerald-900 shadow-inner">
                     <img 
                       src={mainProduct.images[0]} 
                       alt="VitaLife Premium em Arujá" 
                       className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                     />
                     <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white font-bold text-lg">Melão de São Caetano</p>
                        <p className="text-emerald-300 text-sm">Concentrado Puro</p>
                     </div>
                  </div>
                  <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg animate-bounce duration-[3000ms]">
                     <Leaf className="w-8 h-8 text-emerald-600" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="bg-white border-b border-slate-100 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
             {[
               { icon: Truck, title: "Frete Expresso", desc: "Prioridade para Arujá" },
               { icon: Leaf, title: "100% Natural", desc: "Extrato Puro Concentrado" },
               { icon: ShieldCheck, title: "Compra Blindada", desc: "Dados criptografados" },
               { icon: Award, title: "Alta Potência", desc: "Tecnologia de Absorção" },
             ].map((item, i) => (
               <div 
                  key={i} 
                  className="group flex items-center gap-5 p-5 rounded-2xl hover:bg-slate-50 transition-all duration-300 cursor-default border border-transparent hover:border-emerald-100"
               >
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-emerald-200 group-hover:shadow-lg transition-all duration-500 ease-out">
                      <item.icon className="w-8 h-8 group-hover:rotate-6 transition-transform duration-500" strokeWidth={1.5} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 shadow-sm"></div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-emerald-700 transition-colors tracking-tight">{item.title}</h3>
                    <p className="text-sm text-slate-500 group-hover:text-slate-600 font-medium">{item.desc}</p>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* SINGLE PRODUCT DISPLAY SECTION */}
      <section id="products" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-2 block">Destaque Exclusivo</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">O Fim da Inflamação Silenciosa</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Conheça o único encapsulado do mercado com concentração máxima de Melão de São Caetano.
          </p>
        </div>

        <div className="flex justify-center">
            {/* Large Feature Card */}
            <div 
              onClick={() => setSelectedProduct(mainProduct)}
              className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-emerald-500 hover:shadow-2xl transition-all duration-500 cursor-pointer max-w-4xl w-full flex flex-col md:flex-row"
            >
              {/* Product Image Section - Left */}
              <div className="md:w-1/2 relative overflow-hidden bg-slate-100">
                 <img 
                   src={mainProduct.images[0]} 
                   alt={mainProduct.name}
                   className="w-full h-full object-cover min-h-[400px] transition-transform duration-700 group-hover:scale-105" 
                 />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                 <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                       Mais Vendido
                    </span>
                 </div>
              </div>
              
              {/* Product Info - Right */}
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-4 flex items-center gap-2">
                   <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                   </div>
                   <span className="text-slate-400 text-sm font-medium">({mainProduct.reviews} avaliações)</span>
                </div>

                <h3 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors">
                  {mainProduct.name}
                </h3>
                
                <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                  {mainProduct.tagline}
                </p>

                <ul className="space-y-3 mb-8">
                  {mainProduct.benefits.slice(0,3).map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                  <div className="text-left">
                    <p className="text-sm text-slate-400 line-through font-medium">De R$ {(mainProduct.price * 1.5).toFixed(2)}</p>
                    <p className="text-3xl font-bold text-slate-900">Por R$ {mainProduct.price.toFixed(2)}</p>
                  </div>
                  <button className="h-14 w-14 rounded-full bg-slate-900 flex items-center justify-center text-white group-hover:bg-emerald-500 transition-all shadow-lg group-hover:shadow-emerald-500/30">
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-xs text-center text-slate-400 mt-4">Clique para ver mais detalhes e fotos</p>
              </div>
            </div>
        </div>
      </section>

      {/* VIDEO SECTION ("Vídeo à parte") */}
      <section className="bg-slate-900 py-20 relative overflow-hidden">
         {/* Decoration */}
         <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
         
         <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-6">
              Assista à Análise
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
               Entenda como o <span className="text-emerald-400">Melão de São Caetano</span> age no seu organismo
            </h2>

            <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
               <video 
                 controls 
                 playsInline
                 className="w-full h-auto"
                 poster="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070"
               >
                  <source src="https://res.cloudinary.com/dhsn2oxv5/video/upload/v1768833243/SVXtract-20260119-708476_oz0wj8.mp4" type="video/mp4" />
                  Seu navegador não suporta a reprodução de vídeo.
               </video>
            </div>
         </div>
      </section>

      {/* CHECKOUT / OFFERS SECTION */}
      <section id="checkout" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">Ofertas Exclusivas Arujá</h2>
              <p className="text-slate-500">Escolha o melhor tratamento para você. Estoque limitado.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
              {/* Option 1 */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-slate-300 transition-all flex flex-col items-center text-center">
                 <h3 className="text-xl font-bold text-slate-800 mb-2">Tratamento Inicial</h3>
                 <p className="text-slate-500 mb-6">1 Frasco</p>
                 <div className="mb-6">
                    <p className="text-sm text-slate-400 line-through">R$ 199,90</p>
                    <p className="text-4xl font-black text-slate-900">R$ 149,90</p>
                    <p className="text-sm text-green-600 font-bold">À vista</p>
                 </div>
                 <button onClick={() => handleBuyKit(1)} className="w-full py-4 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors">
                    Comprar 1 Pote
                 </button>
              </div>

              {/* Option 2 - Featured */}
              <div className="relative bg-white rounded-2xl p-8 border-2 border-emerald-500 shadow-2xl scale-105 z-10 flex flex-col items-center text-center">
                 <div className="absolute -top-4 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                    Mais Popular
                 </div>
                 <h3 className="text-2xl font-bold text-slate-800 mb-2">Tratamento Recomendado</h3>
                 <p className="text-slate-500 mb-6">3 Frascos (Leve 3, Pague 2)</p>
                 <div className="mb-6">
                    <p className="text-sm text-slate-400 line-through">R$ 449,70</p>
                    <p className="text-5xl font-black text-emerald-600">R$ 299,80</p>
                    <p className="text-sm text-emerald-700 font-bold">Economia de R$ 149,90</p>
                 </div>
                 <ul className="text-sm text-slate-600 space-y-2 mb-8 text-left w-full pl-8">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500"/> Frete GRÁTIS Arujá</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500"/> Tratamento para 3 meses</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500"/> Guia Alimentar Digital</li>
                 </ul>
                 <button onClick={() => handleBuyKit(3)} className="w-full py-4 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/30 animate-pulse">
                    Comprar Kit 3 Potes
                 </button>
              </div>

              {/* Option 3 */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-slate-300 transition-all flex flex-col items-center text-center">
                 <h3 className="text-xl font-bold text-slate-800 mb-2">Tratamento Completo</h3>
                 <p className="text-slate-500 mb-6">5 Frascos (Desconto Máximo)</p>
                 <div className="mb-6">
                    <p className="text-sm text-slate-400 line-through">R$ 749,50</p>
                    <p className="text-4xl font-black text-slate-900">R$ 449,70</p>
                    <p className="text-sm text-green-600 font-bold">Por apenas R$ 89,94/pote</p>
                 </div>
                 <button onClick={() => handleBuyKit(5)} className="w-full py-4 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors">
                    Comprar 5 Potes
                 </button>
              </div>
           </div>

           <div className="mt-12 flex justify-center items-center gap-6 text-slate-400 grayscale opacity-70">
              <div className="flex flex-col items-center gap-1"><Lock className="w-6 h-6"/><span className="text-xs">Seguro</span></div>
              <div className="flex flex-col items-center gap-1"><CreditCard className="w-6 h-6"/><span className="text-xs">Cartões</span></div>
              <div className="flex flex-col items-center gap-1"><ShieldCheck className="w-6 h-6"/><span className="text-xs">Garantia</span></div>
           </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="bg-white">
        <FAQ />
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-12 mb-16">
           <div className="max-w-sm">
              <span className="text-2xl font-bold text-white tracking-tight">Vita<span className="text-emerald-500">Life</span></span>
              <p className="mt-6 text-slate-400 leading-relaxed">
                Compromisso com sua saúde e longevidade. Entregamos o melhor da natureza com a precisão da ciência, direto para sua casa em Arujá.
              </p>
           </div>
           <div className="flex gap-16">
              <div>
                <h4 className="font-bold text-white mb-6">Empresa</h4>
                <ul className="space-y-4">
                  <li><button onClick={() => setActiveInfoPage('about')} className="hover:text-emerald-400 transition-colors">Sobre nós</button></li>
                  <li><button onClick={() => setActiveInfoPage('science')} className="hover:text-emerald-400 transition-colors">Tecnologia</button></li>
                  <li><button onClick={() => setActiveInfoPage('contact')} className="hover:text-emerald-400 transition-colors">Contato</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-6">Ajuda</h4>
                <ul className="space-y-4">
                  <li><a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
                  <li><button onClick={() => setActiveInfoPage('shipping')} className="hover:text-emerald-400 transition-colors">Frete e Entregas</button></li>
                  <li><button onClick={() => setActiveInfoPage('shipping')} className="hover:text-emerald-400 transition-colors">Trocas</button></li>
                </ul>
              </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>© 2024 VitaLife Suplementos. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Chatbot Integration */}
      <Chatbot />

      {/* Modals */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          isOpen={!!selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={addToCart}
        />
      )}

      {activeInfoPage && (
        <InfoModal 
          pageKey={activeInfoPage} 
          onClose={() => setActiveInfoPage(null)} 
        />
      )}
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={removeFromCart}
      />
    </div>
  );
};

export default App;