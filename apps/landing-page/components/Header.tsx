"use client";

import React, { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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
              <a href="#cadastro" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-center">
                Começar Agora
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
