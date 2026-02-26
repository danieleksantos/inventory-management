import { X, Trash2, Loader2, Save } from 'lucide-react';
import { Button } from './Button';
import type { Product } from '../types/inventory';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
  onDelete: () => void;
  editingItem: Product | null;
  formData: { name: string; price: number };
  setFormData: (data: { name: string; price: number }) => void;
  isSubmitting: boolean;
}

export function ProductModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  editingItem,
  formData,
  setFormData,
  isSubmitting,
}: ProductModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
      <div
        className="absolute inset-0 bg-inventory-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-md rounded-4xl md:rounded-[40px] shadow-2xl overflow-hidden border border-inventory-100">
        <div className="p-8 md:p-10">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl md:text-2xl font-black text-inventory-800 uppercase italic tracking-tighter">
              {editingItem ? 'Editar Produto' : 'Novo Produto'}
            </h3>
            <button
              onClick={onClose}
              className="text-inventory-400 hover:text-inventory-800 cursor-pointer p-2 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={onSave} className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase text-inventory-500 ml-1 mb-2 block tracking-widest">
                Nome do Produto
              </label>
              <input
                type="text"
                required
                placeholder="EX: PRODUTO FINAL"
                className="w-full bg-inventory-100/50 border-2 border-inventory-100 p-4 rounded-2xl outline-none focus:border-accent-primary focus:bg-white transition-all font-bold text-inventory-800 uppercase wrap-break-word"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-inventory-500 ml-1 mb-2 block tracking-widest">
                Preço de Venda (R$)
              </label>
              <input
                type="number"
                required
                step="0.01"
                min="0"
                placeholder="0,00"
                className="w-full bg-inventory-100/50 border-2 border-inventory-100 p-4 rounded-2xl outline-none focus:border-accent-primary focus:bg-white transition-all font-bold text-inventory-800"
                value={formData.price === 0 ? '' : formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: e.target.value === '' ? 0 : Number(e.target.value),
                  })
                }
                onFocus={(e) => e.target.select()}
              />
            </div>

            <div className="pt-6 md:pt-8 flex flex-col gap-4">
              <Button
                type="submit"
                variant={editingItem ? 'secondary' : 'primary'}
                disabled={isSubmitting}
                className="w-full py-5 rounded-2xl flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Processando...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>
                      {editingItem
                        ? 'Confirmar Alterações'
                        : 'Salvar Novo Produto'}
                    </span>
                  </>
                )}
              </Button>

              {editingItem && (
                <Button
                  type="button"
                  variant="danger"
                  icon={Trash2}
                  onClick={onDelete}
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl"
                >
                  Excluir Produto
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
