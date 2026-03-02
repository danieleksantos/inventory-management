import { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { Header } from '../components/Header';
import { ProductModal } from '../components/ProductModal';
import { Button } from '../components/Button';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { Plus, Edit3, Loader2 } from 'lucide-react';
import {
  fetchProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from '../store/productSlice';
import { Toast } from '../utils/alerts';
import type { Product } from '../types/inventory';

export function ProductsPage() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: 0 });

  const loadInitialData = useCallback(async () => {
    try {
      await dispatch(fetchProducts()).unwrap();
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      Toast.fire({
        icon: 'error',
        title: 'ERRO AO CARREGAR DADOS',
      });
    }
  }, [dispatch]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: 0 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({ name: product.name, price: product.price });
    setIsModalOpen(true);
  };

  const getErrorMessage = (error: unknown): string => {
    if (error && typeof error === 'object' && 'message' in error) {
      return String(error.message);
    }
    return 'OCORREU UM ERRO INESPERADO';
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingProduct?.id) {
        await dispatch(
          updateProduct({ id: editingProduct.id, ...formData }),
        ).unwrap();
        Toast.fire({ icon: 'success', title: 'PRODUTO ATUALIZADO!' });
      } else {
        await dispatch(createProduct(formData)).unwrap();
        Toast.fire({ icon: 'success', title: 'PRODUTO CADASTRADO!' });
      }
      setIsModalOpen(false);
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      Toast.fire({ icon: 'error', title: message.toUpperCase() });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!editingProduct?.id) return;

    setIsModalOpen(false);

    const result = await Swal.fire({
      title: 'REMOVER PRODUTO',
      text: `Deseja realmente excluir "${editingProduct.name}"?`,
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
        await dispatch(deleteProduct(editingProduct.id)).unwrap();
        Toast.fire({ icon: 'success', title: 'PRODUTO EXCLUÍDO!' });
      } catch (error: unknown) {
        const message = getErrorMessage(error);
        Toast.fire({ icon: 'error', title: message.toUpperCase() });
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
        highlight="Produtos"
        subtitle="Catálogo e precificação"
      />

      <div className="mb-8">
        <Button
          variant="primary"
          icon={Plus}
          onClick={handleOpenCreate}
          className="w-full md:w-auto py-5 md:py-4"
        >
          Novo Produto
        </Button>
      </div>

      <div className="relative min-h-100">
        {loading && (
          <div
            className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center rounded-4xl backdrop-blur-[2px]"
            data-testid="skeleton-loader"
          >
            <Loader2 className="animate-spin text-accent-primary" size={32} />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:hidden">
          {items.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-4xl border border-inventory-100 shadow-sm overflow-hidden flex flex-col hover:border-accent-primary/30 transition-colors"
            >
              <div className="p-8 flex flex-col gap-5">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-inventory-300 uppercase tracking-[0.2em]">
                    Produto
                  </p>
                  <h4 className="text-lg font-black text-inventory-800 uppercase italic tracking-tighter leading-tight wrap-break-words">
                    {product.name}
                  </h4>
                </div>

                <div className="flex items-end justify-between border-t border-inventory-50 pt-4">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-inventory-300 uppercase tracking-[0.2em]">
                      Preço de Venda
                    </p>
                    <p className="text-xl font-black text-accent-primary italic tracking-tighter">
                      R${' '}
                      {product.price.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <Button
                    variant="secondary"
                    icon={Edit3}
                    onClick={() => handleOpenEdit(product)}
                    className="py-3! px-5! text-[10px]! rounded-2xl! shadow-lg shadow-accent-primary/10"
                  >
                    Editar
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="hidden md:block bg-white rounded-4xl border border-inventory-100 shadow-sm overflow-hidden">
          <table className="w-full text-left font-bold" role="table">
            <thead className="bg-inventory-50 text-xs text-inventory-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">Produto</th>
                <th className="px-8 py-5 text-center">Preço</th>
                <th className="px-8 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-inventory-50 uppercase text-sm">
              {items.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-inventory-50/10 transition-colors group"
                >
                  <td className="px-8 py-4 text-inventory-800 font-black wrap-break-word max-w-xs">
                    {product.name}
                  </td>
                  <td className="px-8 py-4 text-center text-inventory-600 font-black italic">
                    R${' '}
                    {product.price.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-8 py-4 text-right">
                    <Button
                      variant="secondary"
                      icon={Edit3}
                      onClick={() => handleOpenEdit(product)}
                      className="ml-auto py-2! px-4! text-[10px]! rounded-xl! opacity-80 group-hover:opacity-100"
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!loading && items.length === 0 && (
          <div className="text-center py-20 bg-white rounded-4xl border-2 border-dashed border-inventory-100">
            <p className="text-inventory-400 italic font-medium uppercase tracking-widest">
              Nenhum produto catalogado
            </p>
          </div>
        )}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
        editingItem={editingProduct}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
