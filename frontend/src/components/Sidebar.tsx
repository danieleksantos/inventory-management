import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Database,
  Library,
  Menu,
  X,
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Package, label: 'Produtos', path: '/products' },
  { icon: Database, label: 'Matéria Prima', path: '/materials' },
  { icon: Library, label: 'Composição', path: '/compositions' },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menu"
        aria-expanded={isOpen}
        className={`lg:hidden fixed top-6 left-6 z-60 p-3 bg-accent-primary text-white rounded-2xl shadow-lg shadow-accent-primary/30 active:scale-95 transition-all ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div
          role="presentation"
          className="fixed inset-0 bg-inventory-900/40 backdrop-blur-sm z-70 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        role="navigation"
        aria-label="Menu Principal"
        className={`
          fixed lg:static inset-y-0 left-0 z-80 w-72 bg-white border-r border-inventory-100 
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 transition-all duration-300 ease-in-out flex flex-col shadow-2xl lg:shadow-none
        `}
      >
        <div className="p-8 border-b border-inventory-50">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <img
                src="/logo.png"
                alt="Smart Inventory Logo"
                className="h-10 w-auto object-contain self-start"
              />
              <div className="mt-2">
                <h2 className="text-sm font-black text-inventory-800 uppercase italic tracking-tighter leading-tight">
                  Smart Inventory
                </h2>
                <p className="text-[10px] font-bold text-accent-primary uppercase tracking-widest italic">
                  Management
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Fechar menu"
              className="lg:hidden p-2 -mr-2 text-inventory-400 hover:text-accent-primary transition-colors cursor-pointer"
            >
              <X size={28} strokeWidth={3} />
            </button>
          </div>
        </div>

        <nav className="flex-1 px-6 py-8 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all cursor-pointer
                ${
                  isActive
                    ? 'bg-accent-primary text-white shadow-xl'
                    : 'text-inventory-400 hover:translate-x-1 hover:text-accent-primary'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={20} strokeWidth={isActive ? 3 : 2} />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-8 space-y-4">
          <div className="text-center">
            <p className="text-[8px] font-bold text-inventory-300 uppercase tracking-[0.2em]">
              © 2026 Smart Inventory Management
              <br />
              <span className="opacity-50 font-medium">
                Todos os direitos reservados
              </span>
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
