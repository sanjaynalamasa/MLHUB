import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Brain, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Home,
  MessageSquare,
  Image as ImageIcon,
  FileText,
  Search,
  Shield,
  HelpCircle
} from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedDarkMode = localStorage.getItem('darkMode');
      return storedDarkMode === null ? true : storedDarkMode === 'true';
    }
    return true;
  });
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const navItems = [
    { to: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { to: "/chat", label: "AI Chat", icon: <MessageSquare className="w-5 h-5" /> },
    { to: "/vision", label: "Vision", icon: <ImageIcon className="w-5 h-5" /> },
    { to: "/logs", label: "Logs", icon: <FileText className="w-5 h-5" /> },
    { to: "/analysis", label: "Analysis", icon: <Search className="w-5 h-5" /> },
    { to: "/moderation", label: "Moderation", icon: <Shield className="w-5 h-5" /> },
    { to: "/faq", label: "FAQ", icon: <HelpCircle className="w-5 h-5" /> }
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="w-8 h-8" />
            <h1 className="text-2xl font-bold">ML Hub</h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link 
                    to={item.to}
                    className={`flex items-center space-x-2 hover:text-gray-300 transition-colors ${
                      location.pathname === item.to ? 'text-blue-400' : ''
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? 
                <Sun className="w-5 h-5" /> : 
                <Moon className="w-5 h-5" />
              }
            </button>
          </nav>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? 
                <Sun className="w-5 h-5" /> : 
                <Moon className="w-5 h-5" />
              }
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu with slide animation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <nav className="py-4 border-t border-gray-700">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`flex items-center space-x-3 py-2 px-4 rounded-lg transition-colors ${
                      location.pathname === item.to 
                        ? 'bg-blue-600 text-white' 
                        : 'hover:bg-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}