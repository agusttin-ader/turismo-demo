'use client';

interface AdminTopBarProps {
  onMenuClick: () => void;
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

export function AdminTopBar({ onMenuClick }: AdminTopBarProps) {
  return (
    <header
      className="fixed left-0 right-0 top-0 z-30 flex min-h-14 items-center gap-3 border-b border-slate-200 bg-white px-4 lg:hidden"
      style={{ paddingTop: 'max(env(safe-area-inset-top), 0px)' }}
    >
      <button
        type="button"
        onClick={onMenuClick}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        aria-label="Abrir menú"
      >
        <MenuIcon className="h-6 w-6" />
      </button>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
          <span className="text-sm font-bold text-white">R</span>
        </div>
        <span className="truncate text-sm font-semibold tracking-tight text-slate-900">Refugio Nahuel</span>
      </div>
    </header>
  );
}
