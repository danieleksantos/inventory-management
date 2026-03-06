interface SystemWakeUpProps {
  retryCount: number;
}

export const SystemWakeUp = ({ retryCount }: SystemWakeUpProps) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFCFB] p-4 text-center">
    <div className="relative mb-8">
      <div className="w-16 h-16 border-4 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center text-accent-primary font-bold">
        API
      </div>
    </div>

    <h2 className="text-2xl font-bold text-inventory-900 mb-2">
      Acordando o Sistema
    </h2>
    <p className="text-inventory-600 max-w-md leading-relaxed">
      Estamos iniciando os serviços no Render. Isso pode levar cerca de 50
      segundos. Agradecemos a paciência!
    </p>

    <div className="mt-8 flex gap-2 justify-center">
      <span className="w-2 h-2 bg-accent-primary rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-accent-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-2 h-2 bg-accent-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
    </div>

    {retryCount > 0 && (
      <p className="mt-6 text-xs font-mono text-inventory-400">
        Tentativa de conexão: {retryCount}
      </p>
    )}
  </div>
);
