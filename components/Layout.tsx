import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Edit, Play, Menu, X, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const navItems = [
    { to: '/', label: t.nav.settings, icon: <Home size={20} /> },
    { to: '/template', label: t.nav.editor, icon: <Edit size={20} /> },
    { to: '/generate', label: t.nav.generate, icon: <Play size={20} /> },
  ];

  const toggleLanguage = () => {
    setLanguage(language === Language.EN ? Language.ZH : Language.EN);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto md:p-4 gap-4">
      {/* Sidebar / Navbar */}
      <aside className={`
        fixed md:relative z-50 w-64 bg-white/90 backdrop-blur-md md:bg-white h-full md:h-auto md:min-h-[800px] border-r-2 md:border-2 border-airi-base md:rounded-3xl shadow-xl transition-transform duration-300 ease-in-out flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 flex flex-col items-center border-b-2 border-airi-skin bg-gradient-to-b from-airi-base/20 to-transparent">
           {/* Airi Icon Placeholder - Pure CSS Art */}
           <div className="w-24 h-24 rounded-full bg-airi-base border-4 border-white shadow-lg mb-3 flex items-center justify-center overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-full bg-[#ffaacc]"></div>
              <div className="z-20 text-4xl text-white font-bold drop-shadow-md">Airi</div>
           </div>
           <h1 className="text-xl font-bold text-gray-700">Airi Power</h1>
           <p className="text-xs text-airi-shadow2 font-bold tracking-widest uppercase">{t.nav.subtitle}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => `
                flex items-center px-4 py-3 rounded-xl transition-all duration-200 font-bold
                ${isActive 
                  ? 'bg-airi-base text-white shadow-md translate-x-1' 
                  : 'text-gray-600 hover:bg-airi-skin hover:text-airi-shadow2'}
              `}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 flex flex-col items-center gap-3">
           <button 
            onClick={toggleLanguage}
            className="flex items-center justify-center px-4 py-2 rounded-lg bg-white border-2 border-airi-skin text-airi-shadow2 font-bold hover:bg-airi-skin transition-colors w-full"
           >
             <Languages size={18} className="mr-2" />
             {language === Language.ZH ? 'English' : '中文'}
           </button>
           
           <div className="inline-block px-3 py-1 bg-airi-shadow2 text-white text-xs rounded-full">
             {t.nav.ver}
           </div>
        </div>
      </aside>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-airi-base text-white rounded-full shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};