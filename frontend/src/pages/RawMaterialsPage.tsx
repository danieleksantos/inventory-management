import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Header } from '../components/Header';
import { RawMaterialModal } from '../components/RawMaterialModal';
import { Button } from '../components/Button';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { Plus, Edit3, Loader2 } from 'lucide-react';
import {
  fetchRawMaterials,
  deleteRawMaterial,
} from '../store/rawMaterialSlice';
import { rawMaterialService } from '../services/rawMaterialService';
import { Toast } from '../utils/alerts';
import type { RawMaterial } from '../types/inventory';

export function RawMaterialsPage() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.rawMaterials);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RawMaterial | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', stockQuantity: 0 });

  useEffect(() => {
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({ name: '', stockQuantity: 0 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: RawMaterial) => {
    setEditingItem(item);
    setFormData({ name: item.name, stockQuantity: item.stockQuantity });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingItem?.id) {
        await rawMaterialService.update(editingItem.id, formData);
        Toast.fire({ icon: 'success', title: 'Insumo atualizado!' });
      } else {
        await rawMaterialService.create(formData);
        Toast.fire({ icon: 'success', title: 'Insumo cadastrado!' });
      }
      dispatch(fetchRawMaterials());
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      Toast.fire({ icon: 'error', title: 'Falha ao processar solicitação' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!editingItem?.id) return;

    setIsModalOpen(false);

    const result = await Swal.fire({
      title: 'REMOVER INSUMO',
      text: `Deseja realmente excluir "${editingItem.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      buttonsStyling: false,
      backdrop: `rgba(15, 23, 42, 0.5)`,
      customClass: {
        popup:
          'rounded-4xl border-none shadow-2xl p-6 md:p-10 bg-white w-[90%] max-w-md',
        title:
          'text-lg md:text-xl font-black text-inventory-800 italic tracking-tighter',
        actions: 'flex flex-col md:flex-row gap-3 w-full mt-6',
        confirmButton:
          'bg-red-500 text-white w-full md:w-auto px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-600 transition-all order-2 md:order-1 cursor-pointer',
        cancelButton:
          'bg-accent-primary text-white w-full md:w-auto px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:brightness-110 shadow-lg shadow-accent-primary/20 order-1 md:order-2 cursor-pointer',
      },
    });

    if (result.isConfirmed) {
      setIsSubmitting(true);
      try {
        await dispatch(deleteRawMaterial(editingItem.id)).unwrap();
        Toast.fire({ icon: 'success', title: 'Excluído com sucesso!' });
      } catch (error) {
        console.error(error);
        Toast.fire({ icon: 'error', title: 'Erro: Item em uso.' });
        setIsModalOpen(true);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <Header
        title="Gestão de"
        highlight="Matéria-Prima"
        subtitle="Controle de estoque industrial"
      />

      <div className="mb-8">
        <Button
          variant="primary"
          icon={Plus}
          onClick={handleOpenCreate}
          className="w-full md:w-auto py-5 md:py-4"
        >
          Novo Insumo
        </Button>
      </div>

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center rounded-4xl">
            <Loader2 className="animate-spin text-accent-primary" />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:hidden">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-4xl border border-inventory-100 shadow-sm overflow-hidden flex flex-col"
            >
              <div className="p-8 flex flex-col gap-5">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-inventory-300 uppercase tracking-[0.2em]">
                    Insumo
                  </p>
                  <h4 className="text-lg font-black text-inventory-800 uppercase italic tracking-tighter leading-tight wrap-break-word">
                    {item.name}
                  </h4>
                </div>

                <div className="flex items-end justify-between border-t border-inventory-50 pt-4">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-inventory-300 uppercase tracking-[0.2em]">
                      Quantidade
                    </p>
                    <p className="text-xl font-black text-accent-primary italic tracking-tighter">
                      {item.stockQuantity}{' '}
                      <span className="text-[10px] text-inventory-400 not-italic ml-1 uppercase">
                        unid.
                      </span>
                    </p>
                  </div>

                  <Button
                    variant="secondary"
                    icon={Edit3}
                    onClick={() => handleOpenEdit(item)}
                    className="py-3! px-5! text-[10px]! rounded-2xl! shadow-lg shadow-accent-primary/10 transition-transform active:scale-95"
                  >
                    Editar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block bg-white rounded-4xl border border-inventory-100 shadow-sm overflow-hidden">
          <table className="w-full text-left font-bold">
            <thead className="bg-inventory-50 text-xs text-inventory-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">Insumo</th>
                <th className="px-8 py-5 text-center">Quantidade</th>
                <th className="px-8 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-inventory-50 uppercase text-sm">
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-inventory-50/10 transition-colors"
                >
                  <td className="px-8 py-4 text-inventory-800 font-black">
                    {item.name}
                  </td>
                  <td className="px-8 py-4 text-center text-inventory-600">
                    {item.stockQuantity}{' '}
                    <span className="text-[10px] text-inventory-400 ml-1">
                      unid.
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <Button
                      variant="secondary"
                      icon={Edit3}
                      onClick={() => handleOpenEdit(item)}
                      className="ml-auto py-2! px-4! text-[10px]! rounded-xl!"
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RawMaterialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
        editingItem={editingItem}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
