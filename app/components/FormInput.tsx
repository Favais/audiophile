interface FormInputProps {
    label: string;
    placeholder: string;
    fullWidth?: boolean;
    value: string;
    onChange: (value: string) => void;
    error: string | null;
}
export default function FormInput({
    label,
    placeholder,
    fullWidth = false,
    value,
    onChange,
    error
}: FormInputProps) {
    const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    return (
        <div className={fullWidth ? "md:col-span-2" : ""}>
            <label htmlFor={id} className="text-[12px] font-bold tracking-[-0.214px] block mb-2">
                {label}
            </label>
            <input
                id={id}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
                type="text"
                placeholder={placeholder}
                className="w-full h-[56px] px-6 rounded-lg border border-checkout-border bg-white text-[14px] font-bold tracking-[-0.25px] placeholder:text-black placeholder:opacity-40 focus:outline-none focus:border-checkout-orange"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <p id={`${id}-error`} role="alert" aria-live="assertive" className="text-red-500 text-xs mt-1">
                {error}
            </p>
        </div>
    );
}