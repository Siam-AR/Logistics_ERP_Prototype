"use client";

type Props = {
  title: string;
  icon: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
};

export default function Modal({ title, icon, onClose, children, maxWidth = "max-w-lg" }: Props) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/40 p-4 backdrop-blur-xs">
      <div className={`w-full ${maxWidth} overflow-hidden rounded-xl bg-surface-container-lowest shadow-xl`}>
        <div className="flex items-center justify-between border-b border-surface-container bg-surface-container-low px-space-lg py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container text-primary">
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
            </div>
            <h2 className="text-headline-sm text-on-surface">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div className="p-space-lg">{children}</div>
      </div>
    </div>
  );
}
