export default function CartItem({
    image,
    name,
    price,
    quantity,
}: {
    image: string;
    name: string;
    price: string;
    quantity: number;
}) {
    return (
        <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-checkout-bg rounded-lg flex items-center justify-center flex-shrink-0">
                <img src={image} alt={name} className="w-10 h-10 object-contain" />
            </div>
            <div className="flex-1">
                <div className="text-[15px] font-bold leading-[25px]">{name}</div>
                <div className="text-[14px] font-bold leading-[25px] opacity-50">{price}</div>
            </div>
            <div className="text-[15px] font-bold leading-[25px] opacity-50">x{quantity}</div>
        </div>
    );
}