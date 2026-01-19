import React from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onRemove }) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const checkoutWhatsapp = () => {
    if (cart.length === 0) return;
    
    let message = "Olá! Gostaria de finalizar meu pedido na VitaLife:\n\n";
    cart.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (R$ ${item.price.toFixed(2)})\n`;
    });
    message += `\nTotal: R$ ${total.toFixed(2)}`;
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Seu Carrinho</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <ShoppingBagIcon className="w-16 h-16 mb-4 opacity-20" />
              <p>Seu carrinho está vazio.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-20 rounded-lg bg-slate-50 overflow-hidden flex-shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 text-sm">{item.name}</h3>
                  <p className="text-xs text-slate-500 mb-2">{item.quantity} unidade(s)</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-600">R$ {(item.price * item.quantity).toFixed(2)}</span>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-600 font-medium">Total</span>
            <span className="text-2xl font-bold text-slate-900">R$ {total.toFixed(2)}</span>
          </div>
          <button 
            onClick={checkoutWhatsapp}
            disabled={cart.length === 0}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 group"
          >
            Finalizar Compra
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </>
  );
};

const ShoppingBagIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
)

export default CartDrawer;
