import { Database } from 'lucide-react';
import type { RawMaterial } from '../types/inventory';

interface StockCardProps {
  material: RawMaterial;
}

export function StockCard({ material }: StockCardProps) {
  const getStatusColor = (qty: number) => {
    if (qty <= 20) return 'bg-red-600';
    if (qty <= 50) return 'bg-accent-primary';
    return 'bg-emerald-700';
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-inventory-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-inventory-50 rounded-2xl group-hover:bg-inventory-100 transition-colors">
          <Database className="text-inventory-600" size={24} />
        </div>
        <span
          className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white ${getStatusColor(material.stockQuantity)}`}
        >
          {material.stockQuantity <= 20
            ? 'Critical'
            : material.stockQuantity <= 50
              ? 'Warning'
              : 'Stable'}
        </span>
      </div>

      <div>
        <h3 className="text-sm font-bold text-inventory-500 uppercase tracking-tight">
          {material.name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-inventory-800">
            {material.stockQuantity}
          </span>
          <span className="text-inventory-400 font-bold text-xs">units</span>
        </div>
      </div>

      <div className="mt-4 h-1.5 w-full bg-inventory-50 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${getStatusColor(material.stockQuantity)}`}
          style={{ width: `${Math.min(material.stockQuantity, 100)}%` }}
        />
      </div>
    </div>
  );
}
