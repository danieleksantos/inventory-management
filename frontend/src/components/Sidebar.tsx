import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Database, 
  Settings, 
  Menu, 
  X, 
  ChevronRight 
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Package, label: 'Products', id: 'products' },
  { icon: Database, label: 'Raw Materials', id: 'materials' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('dashboard');

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-accent-primary text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-inventory-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-white border-r border-inventory-100
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        flex flex-col
      `}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-inventory-700 rounded-xl flex items-center justify-center shadow-inventory-900/10 shadow-lg">
            <Package className="text-white" size={24} />
          </div>
          <span className="text-xl font-black tracking-tight text-inventory-800">
            AUTO<span className="text-accent-primary">FLEX</span>
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActive(item.id);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200
                ${active === item.id 
                  ? 'bg-inventory-50 text-inventory-700 shadow-sm' 
                  : 'text-inventory-500 hover:bg-inventory-50/50 hover:text-inventory-800'}
              `}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={active === item.id ? 'text-accent-primary' : ''} />
                <span className="font-bold text-sm">{item.label}</span>
              </div>
              {active === item.id && <ChevronRight size={16} className="text-accent-primary" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-inventory-100">
          <div className="bg-inventory-50/50 p-4 rounded-2xl flex items-center gap-3 border border-inventory-100">
            <div className="w-8 h-8 rounded-full bg-inventory-200 border-2 border-white shadow-sm" />
            <div>
              <p className="text-xs font-bold text-inventory-800">Dev User</p>
              <p className="text-[10px] text-inventory-400 uppercase tracking-wider font-black">Admin Mode</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}