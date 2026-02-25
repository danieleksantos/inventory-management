interface HeaderProps {
  title: string;
  subtitle: string;
  highlight?: string;
}

export function Header({ title, subtitle, highlight }: HeaderProps) {
  return (
    <header className="pt-20 md:pt-0 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-inventory-100 pb-6 animate-in slide-in-from-top-4 duration-700">
      <div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-inventory-800 uppercase italic leading-none">
          {title} <span className="text-accent-primary block md:inline">{highlight}</span>
        </h1>
        <div className="flex items-center gap-3 mt-4">
          <div className="h-1 w-12 bg-accent-primary rounded-full" />
          <p className="text-inventory-500 font-bold uppercase text-[10px] md:text-xs tracking-[0.2em]">
            {subtitle}
          </p>
        </div>
      </div>
    </header>
  );
}