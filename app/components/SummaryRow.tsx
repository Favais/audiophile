export default function SummaryRow({
    label,
    value,
    isGrandTotal = false,
}: {
    label: string;
    value: string;
    isGrandTotal?: boolean;
}) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-[15px] font-normal leading-[25px] opacity-50">{label}</span>
            <span
                className={`text-[18px] font-bold leading-normal uppercase ${isGrandTotal ? "text-checkout-orange" : ""
                    }`}
            >
                {value}
            </span>
        </div>
    );
}