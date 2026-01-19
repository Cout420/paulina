import React, { useState } from 'react';
import { ShoppingBag, Menu, ShieldCheck, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const NavLinks = () => (
    <>
      <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-emerald-600 font-medium transition-colors block py-2 md:py-0">Início</a>
      <a href="#products" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-emerald-600 font-medium transition-colors block py-2 md:py-0">Produtos</a>
      <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-emerald-600 font-medium transition-colors block py-2 md:py-0">Dúvidas</a>
    </>
  );

  return (
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-emerald-200 shadow-lg">
                <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-slate-800 tracking-tight">Vita<span className="text-emerald-500">Life</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          {/* Cart & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors group"
            >
              <ShoppingBag className="w-6 h-6 group-hover:text-emerald-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              onClick={toggleMenu}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-lg animate-fadeIn">
          <div className="px-4 py-6 space-y-2">
            <NavLinks />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;