import { X, Plus, Trash2, Save, Package, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { useAppDispatch } from '../store/hooks';
import {
  addCompositionItem,
  removeCompositionItem,
  fetchCompositions,
} from '../store/productCompositionSlice';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Toast } from '../utils/alerts';
import type {
  Product,
  RawMaterial,
  ProductComposition,
} from '../types/inventory';

interface CompositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number | null;
  products: Product[];
  materials: RawMaterial[];
  compositions: ProductComposition[];
}

export function CompositionModal({
  isOpen,
  onClose,
  productId,
  products,
  materials,
  compositions,
}: CompositionModalProps) {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [activeProductId, setActiveProductId] = useState<number | null>(null);
  const [localList, setLocalList] = useState<ProductComposition[]>([]);
  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);

  const [newEntry, setNewEntry] = useState({
    rawMaterialId: 0,
    quantityNeeded: 0,
  });

  const availableProducts = useMemo(() => {
    const productsWithCompIds = new Set(compositions.map((c) => c.product?.id));
    return products.filter(
      (p) => !productsWithCompIds.has(p.id) || p.id === productId,
    );
  }, [products, compositions, productId]);

  const availableMaterials = useMemo(() => {
    const existingMaterialIds = localList.map((item) => item.rawMaterial?.id);
    return materials.filter((m) => !existingMaterialIds.includes(m.id));
  }, [materials, localList]);

  const initializeLocalData = useCallback(() => {
    const initialData = compositions
      .filter((c) => c.product?.id === productId)
      .map((c) => ({ ...c }))
      .sort((a, b) =>
        (a.rawMaterial?.name || '').localeCompare(b.rawMaterial?.name || ''),
      );
    setLocalList(initialData);
    setIdsToDelete([]);
    setActiveProductId(productId);
  }, [compositions, productId]);

  useEffect(() => {
    if (isOpen) {
      initializeLocalData();
      setNewEntry({ rawMaterialId: 0, quantityNeeded: 0 });
    }
  }, [isOpen, initializeLocalData]);

  if (!isOpen) return null;

  const isCreating = !productId;
  const noProductsAvailable = isCreating && availableProducts.length === 0;
  const currentProduct = products.find(
    (p) => p.id === (activeProductId || productId),
  );

  const handleQtyChange = (id: number, value: number) => {
    setLocalList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantityNeeded: value } : item,
      ),
    );
  };

  const handleLocalAdd = () => {
    if (
      !newEntry.rawMaterialId ||
      !newEntry.quantityNeeded ||
      !activeProductId
    ) {
      Toast.fire({ icon: 'warning', title: 'PREENCHA OS CAMPOS' });
      return;
    }

    const selectedMaterial = materials.find(
      (m) => m.id === newEntry.rawMaterialId,
    );
    if (!selectedMaterial) return;

    const newItem: ProductComposition = {
      id: -Math.floor(Math.random() * 100000),
      productId: activeProductId,
      rawMaterialId: selectedMaterial.id,
      quantityNeeded: newEntry.quantityNeeded,
      rawMaterial: selectedMaterial,
    };

    setLocalList((prev) =>
      [...prev, newItem].sort((a, b) =>
        (a.rawMaterial?.name || '').localeCompare(b.rawMaterial?.name || ''),
      ),
    );
    setNewEntry({ rawMaterialId: 0, quantityNeeded: 0 });
  };

  const handleLocalRemove = (id: number) => {
    if (id > 0) setIdsToDelete((prev) => [...prev, id]);
    setLocalList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFinalSave = async () => {
    if (!activeProductId) return;
    setIsSubmitting(true);
    try {
      const deleteRequests = idsToDelete.map((id) =>
        dispatch(removeCompositionItem(id)).unwrap(),
      );

      const toCreate = localList.filter((item) => (item.id || 0) < 0);
      const toUpdate = localList.filter((local) => {
        const original = compositions.find((c) => c.id === local.id);
        return original && local.quantityNeeded !== original.quantityNeeded;
      });

      const upsertRequests = [...toCreate, ...toUpdate].map((item) => {
        const payload: ProductComposition = {
          productId: activeProductId,
          rawMaterialId: item.rawMaterial?.id ?? 0,
          quantityNeeded: item.quantityNeeded,
        };
        if ((item.id || 0) > 0) payload.id = item.id;
        return dispatch(addCompositionItem(payload)).unwrap();
      });

      await Promise.all([...deleteRequests, ...upsertRequests]);
      await dispatch(fetchCompositions());

      Toast.fire({ icon: 'success', title: 'COMPOSIÇÃO SALVA' });
      onClose();
    } catch {
      Toast.fire({ icon: 'error', title: 'ERRO AO SALVAR' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in zoom-in duration-200">
      <div
        className="fixed inset-0 bg-inventory-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-2xl my-auto rounded-[40px] shadow-2xl border border-inventory-100 p-8 md:p-10">
        <div className="flex justify-between items-center mb-8 border-b border-inventory-50 pb-6">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-accent-primary tracking-widest italic">
              Configuração
            </p>
            <h3 className="text-xl md:text-2xl font-black text-inventory-800 uppercase italic tracking-tighter leading-tight">
              {productId ? currentProduct?.name : 'Nova Composição'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 cursor-pointer text-inventory-400 hover:text-inventory-800 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {noProductsAvailable ? (
          <div className="py-12 flex flex-col items-center text-center space-y-6">
            <div className="bg-inventory-50 p-6 rounded-full">
              <AlertCircle size={48} className="text-inventory-300" />
            </div>
            <div className="max-w-xs">
              <h4 className="font-black text-inventory-800 uppercase italic mb-2 tracking-tighter leading-none">
                Sem Pendências
              </h4>
              <p className="text-sm text-inventory-500 font-medium">
                Todos os produtos já possuem composição cadastrada.
              </p>
            </div>
            <Button variant="secondary" onClick={onClose} className="px-10">
              Voltar
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {!productId && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 ml-1">
                  <Package size={14} className="text-accent-primary" />
                  <label className="text-[10px] font-black uppercase text-inventory-500 tracking-widest">
                    Escolha o Produto
                  </label>
                </div>
                <select
                  className="w-full bg-inventory-50 border-2 border-inventory-100 p-4 rounded-2xl font-bold text-inventory-800 outline-none focus:border-accent-primary transition-all appearance-none cursor-pointer uppercase"
                  value={activeProductId || 0}
                  onChange={(e) => setActiveProductId(Number(e.target.value))}
                >
                  <option value={0}>SELECIONE...</option>
                  {availableProducts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {(activeProductId || productId) && (
              <>
                <div className="grid gap-4">
                  {localList.map((item) => (
                    <div
                      key={item.id}
                      className="bg-inventory-50/50 p-6 rounded-3xl border border-inventory-100 flex flex-col gap-4"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="grow">
                          <span className="text-[9px] font-black text-inventory-300 uppercase block mb-1">
                            Insumo
                          </span>
                          <span className="font-bold text-inventory-800 leading-tight">
                            {item.rawMaterial?.name}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[9px] font-black text-inventory-300 uppercase mb-1">
                            Qtd
                          </span>
                          <input
                            type="number"
                            className="w-24 bg-white border-2 border-inventory-100 p-2 rounded-xl font-black text-accent-primary text-center outline-none"
                            value={item.quantityNeeded}
                            onChange={(e) =>
                              handleQtyChange(item.id!, Number(e.target.value))
                            }
                          />
                        </div>
                      </div>
                      <div className="flex justify-center pt-3 border-t border-inventory-100/50">
                        <Button
                          variant="danger"
                          icon={Trash2}
                          onClick={() => handleLocalRemove(item.id!)}
                          className="py-2! px-6! text-[9px]! rounded-xl!"
                        >
                          Excluir Insumo
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-inventory-100/30 p-8 rounded-4xl border-2 border-dashed border-inventory-200">
                  <p className="text-[10px] font-black uppercase text-inventory-500 mb-6 block italic text-center tracking-widest">
                    {availableMaterials.length > 0
                      ? '+ Adicionar Insumo'
                      : 'Todos os materiais vinculados'}
                  </p>
                  {availableMaterials.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <select
                        className="md:col-span-6 bg-white border-2 border-inventory-100 p-4 rounded-2xl font-bold text-sm outline-none cursor-pointer"
                        value={newEntry.rawMaterialId}
                        onChange={(e) =>
                          setNewEntry({
                            ...newEntry,
                            rawMaterialId: Number(e.target.value),
                          })
                        }
                      >
                        <option value={0}>Insumo...</option>
                        {availableMaterials.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        placeholder="Qtd"
                        className="md:col-span-3 bg-white border-2 border-inventory-100 p-4 rounded-2xl font-bold outline-none"
                        value={newEntry.quantityNeeded || ''}
                        onChange={(e) =>
                          setNewEntry({
                            ...newEntry,
                            quantityNeeded: Number(e.target.value),
                          })
                        }
                      />
                      <Button
                        variant="primary"
                        icon={Plus}
                        onClick={handleLocalAdd}
                        className="md:col-span-3 py-4!"
                      >
                        Adicionar
                      </Button>
                    </div>
                  )}
                </div>

                <Button
                  variant="secondary"
                  icon={Save}
                  onClick={handleFinalSave}
                  loading={isSubmitting}
                  className="w-full py-5 rounded-2xl"
                >
                  Concluir e Salvar
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
