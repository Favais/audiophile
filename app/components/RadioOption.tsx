export default function RadioOption({
    selected,
    onClick,
    label,
}: {
    selected: boolean;
    onClick: () => void;
    label: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full h-[56px] px-4 rounded-lg border ${selected ? "border-checkout-orange" : "border-checkout-border"
                } bg-white flex items-center gap-4 hover:border-checkout-orange transition-colors`}
        >
            <div className="w-5 h-5 rounded-full border border-checkout-border flex items-center justify-center flex-shrink-0">
                {selected && <div className="w-2.5 h-2.5 rounded-full bg-checkout-orange" />}
            </div>
            <span className="text-[14px] font-bold tracking-[-0.25px]">{label}</span>
        </button>
    );
}