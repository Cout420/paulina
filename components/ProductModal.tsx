import React, { useState } from 'react';
import { Product } from '../types';
import { X, ShoppingCart, Star, CheckCircle, Play, Phone, PauseCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'video'>('details');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  if (!isOpen) return null;

  const handleWhatsApp = () => {
    const message = `Olá! Gostaria de comprar o ${product.name} (Qtd: ${quantity}). Poderia me ajudar?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] animate-fadeIn">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6 text-slate-600" />
        </button>

        {/* Left Side: Imagery */}
        <div className="w-full md:w-1/2 bg-slate-50 p-6 flex flex-col gap-4 overflow-y-auto no-scrollbar">
          <div className="aspect-square w-full rounded-xl overflow-hidden shadow-sm bg-white border border-slate-100 relative group">
             <img 
               src={activeImage} 
               alt={product.name} 
               className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
             />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === img ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Info & Actions */}
        <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full">
              Premium
            </span>
            <div className="flex items-center text-yellow-400 text-sm">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-slate-600 font-medium">{product.rating} ({product.reviews} reviews)</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h2>
          <p className="text-lg text-slate-500 mb-6">{product.tagline}</p>

          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl font-bold text-slate-900">R$ {product.price.toFixed(2)}</span>
            <span className="text-lg text-slate-400 line-through">R$ {(product.price * 1.4).toFixed(2)}</span>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 mb-6">
            <button 
              className={`pb-3 pr-6 text-sm font-semibold transition-colors ${activeTab === 'details' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
              onClick={() => setActiveTab('details')}
            >
              Detalhes & Benefícios
            </button>
            <button 
              className={`pb-3 pr-6 text-sm font-semibold transition-colors ${activeTab === 'video' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
              onClick={() => setActiveTab('video')}
            >
              Vídeo Review
            </button>
          </div>

          <div className="flex-grow">
            {activeTab === 'details' ? (
              <div className="animate-fadeIn">
                <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>
                <h4 className="font-semibold text-slate-900 mb-3">Por que escolher o {product.name}?</h4>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="animate-fadeIn h-full min-h-[200px] flex flex-col gap-4">
                 <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 group shadow-lg">
                    {!isVideoPlaying ? (
                      <>
                        <img src={product.videoThumbnail} className="w-full h-full object-cover opacity-60" alt="Video thumbnail" />
                        <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={() => setIsVideoPlaying(true)}>
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-8 h-8 text-white fill-current ml-1" />
                            </div>
                        </div>
                        <div className="absolute bottom-4 left-4 text-white pointer-events-none">
                            <p className="font-bold text-sm">Assista como funciona</p>
                            <p className="text-xs opacity-80">2:45 min</p>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-black flex flex-col items-center justify-center relative">
                        {/* Simulate Video Player */}
                         <div className="absolute top-4 right-4 z-10">
                            <button onClick={() => setIsVideoPlaying(false)} className="bg-black/50 p-2 rounded-full text-white hover:bg-black/70">
                              <X className="w-4 h-4"/>
                            </button>
                         </div>
                         <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/S2q8-4pW6i0?autoplay=1&mute=1&controls=1" 
                            title="Product Video"
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="w-full h-full"
                         ></iframe>
                      </div>
                    )}
                 </div>
                 <p className="text-sm text-slate-500 italic text-center">
                   * {isVideoPlaying ? 'Vídeo demonstrativo.' : 'Clique no play para assistir a análise completa.'}
                 </p>
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-4">
            
            {/* Quantity & Add to Cart */}
            <div className="flex gap-4">
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden h-12">
                <button onClick={decrement} className="px-4 hover:bg-slate-100 text-slate-600 font-bold h-full">-</button>
                <span className="w-12 text-center font-semibold text-slate-900">{quantity}</span>
                <button onClick={increment} className="px-4 hover:bg-slate-100 text-slate-600 font-bold h-full">+</button>
              </div>
              <button 
                onClick={() => onAddToCart(product, quantity)}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg h-12 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <ShoppingCart className="w-5 h-5" />
                Adicionar
              </button>
            </div>

            {/* Direct Buy (WhatsApp) */}
            <button 
              onClick={handleWhatsApp}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg h-12 flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-200 active:scale-95"
            >
              <Phone className="w-5 h-5 fill-current" />
              Comprar Agora via WhatsApp
            </button>
             <div className="flex justify-center items-center gap-2 text-xs text-slate-400 mt-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                Compra 100% Segura e Verificada
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
