type Props = {
  label: string;
  value: string;
  suffix: string;
  icon: string;
  danger?: boolean;
};

export default function Card({ label, value, suffix, icon, danger }: Props) {
  return (
    <div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
      <div className="flex items-center justify-between">
        <span
          className={
            "text-label-md uppercase tracking-wider " + (danger ? "font-semibold text-error" : "text-on-surface-variant")
          }
        >
          {label}
        </span>
        <div
          className={
            "flex h-8 w-8 items-center justify-center rounded-lg " +
            (danger ? "bg-error-container text-error" : "bg-surface-container text-on-surface")
          }
        >
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className={"text-headline-xl " + (danger ? "text-error" : "text-on-surface")}>{value}</span>
        <span className="text-label-lg font-normal text-on-surface-variant">{suffix}</span>
      </div>
    </div>
  );
}
