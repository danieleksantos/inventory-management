import { X, Trash2 } from 'lucide-react';
import type { RawMaterial } from '../types/inventory';
import { Button } from './Button'; 

interface RawMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  onDelete: () => void;
  editingItem: RawMaterial | null;
  formData: { name: string; stockQuantity: number };
  setFormData: (data: { name: string; stockQuantity: number }) => void;
  isSubmitting: boolean;
}

export function RawMaterialModal({
  isOpen, onClose, onSave, onDelete, editingItem, formData, setFormData, isSubmitting
}: RawMaterialModalProps) {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
      <div className="absolute inset-0 bg-inventory-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-md rounded-4xl md:rounded-[40px] shadow-2xl overflow-hidden border border-inventory-100">
        <div className="p-8 md:p-10">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl md:text-2xl font-black text-inventory-800 uppercase italic tracking-tighter">
              {editingItem ? 'Editar Insumo' : 'Novo Insumo'}
            </h3>
            <button onClick={onClose} className="text-inventory-400 hover:text-inventory-800 cursor-pointer p-2">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={onSave} className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase text-inventory-500 ml-1 mb-2 block tracking-widest">Nome</label>
              <input 
                type="text" required
                className="w-full bg-inventory-100/50 border-2 border-inventory-100 p-4 rounded-2xl outline-none focus:border-accent-primary focus:bg-white transition-all font-bold text-inventory-800"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-inventory-500 ml-1 mb-2 block tracking-widest">Quantidade</label>
              <input 
                type="number" required min="0"
                className="w-full bg-inventory-100/50 border-2 border-inventory-100 p-4 rounded-2xl outline-none focus:border-accent-primary focus:bg-white transition-all font-bold text-inventory-800"
                value={formData.stockQuantity}
                onChange={e => setFormData({...formData, stockQuantity: Number(e.target.value)})}
              />
            </div>

            <div className="pt-6 md:pt-8 flex flex-col gap-4">
              <Button variant={editingItem ? "secondary" : "primary"} loading={isSubmitting} className="w-full py-5">
                {editingItem ? 'Confirmar Alterações' : 'Salvar Novo Insumo'}
              </Button>

              {editingItem && (
                <Button variant="danger" icon={Trash2} onClick={onDelete} loading={isSubmitting} className="w-full py-4">
                  Excluir Insumo
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}