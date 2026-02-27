import { useState } from 'react';
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
  isOpen,
  onClose,
  onSave,
  onDelete,
  editingItem,
  formData,
  setFormData,
  isSubmitting,
}: RawMaterialModalProps) {
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    stock?: string;
  }>({});

  // Função para fechar limpando os erros locais
  const handleClose = () => {
    setFormErrors({});
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; stock?: string } = {};

    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Campo obrigatório';
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    setFormErrors({});
    onSave(e);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-inventory-900/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative bg-white w-full max-w-md rounded-4xl md:rounded-[40px] shadow-2xl overflow-hidden border border-inventory-100">
        <div className="p-8 md:p-10">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl md:text-2xl font-black text-inventory-800 uppercase italic tracking-tighter">
              {editingItem ? 'Editar Insumo' : 'Novo Insumo'}
            </h3>
            <button
              onClick={handleClose}
              className="text-inventory-400 hover:text-inventory-800 cursor-pointer p-2 transition-colors"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase text-inventory-500 ml-1 mb-2 block tracking-widest">
                Nome do Insumo
              </label>
              <input
                type="text"
                name="name"
                data-cy="input-material-name"
                placeholder="EX: AÇO GALVANIZADO"
                aria-invalid={!!formErrors.name}
                className={`w-full bg-inventory-100/50 border-2 p-4 rounded-2xl outline-none transition-all font-bold text-inventory-800 uppercase ${
                  formErrors.name
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-inventory-100 focus:border-accent-primary focus:bg-white'
                }`}
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (formErrors.name)
                    setFormErrors({ ...formErrors, name: undefined });
                }}
              />
              {formErrors.name && (
                <span className="text-red-500 text-[10px] font-black mt-1 ml-1 uppercase block">
                  {formErrors.name}
                </span>
              )}
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-inventory-500 ml-1 mb-2 block tracking-widest">
                Quantidade em Estoque
              </label>
              <input
                type="number"
                name="stockQuantity"
                data-cy="input-material-quantity"
                placeholder="0"
                className="w-full bg-inventory-100/50 border-2 border-inventory-100 p-4 rounded-2xl outline-none focus:border-accent-primary focus:bg-white transition-all font-bold text-inventory-800"
                value={
                  formData.stockQuantity === 0 ? '' : formData.stockQuantity
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stockQuantity:
                      e.target.value === '' ? 0 : Number(e.target.value),
                  })
                }
                onFocus={(e) => e.target.select()}
              />
            </div>

            <div className="pt-6 md:pt-8 flex flex-col gap-4">
              <Button
                type="submit"
                variant={editingItem ? 'secondary' : 'primary'}
                loading={isSubmitting}
                className="w-full py-5 rounded-2xl"
              >
                {editingItem ? 'Confirmar Alterações' : 'Salvar Novo Insumo'}
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
