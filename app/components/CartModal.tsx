"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from "@/app/components/ui/dialog";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {

    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: "1",
            name: "XX99 MK II",
            price: 2999,
            quantity: 1,
            image: "https://api.builder.io/api/v1/image/assets/TEMP/1433dcb711203c3eefd09aaf8a099e5710e6f532?width=72",
        },
        {
            id: "2",
            name: "XX59",
            price: 899,
            quantity: 2,
            image: "https://api.builder.io/api/v1/image/assets/TEMP/4f695447ae4bdc134927e6403f6c6094310bca6b?width=77",
        },
        {
            id: "3",
            name: "YX1",
            price: 599,
            quantity: 1,
            image: "https://api.builder.io/api/v1/image/assets/TEMP/6c04e4a179f32382f9e24a804f76a60d26952550?width=93",
        },
    ]);

    const updateQuantity = (id: string, delta: number) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    const removeAll = () => {
        setCartItems([]);
    };
    const handleCheckout = () => {
        onClose();               // close modal
        router.push("/checkout"); // navigate to checkout page
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogPortal>
                <DialogOverlay className="bg-black/40" />
                <DialogContent className="fixed top-[120px] right-4 sm:right-8 lg:right-[10%] translate-x-0 translate-y-0 left-auto max-w-[377px] w-[calc(100vw-2rem)] sm:w-[377px] bg-white rounded-lg p-8 shadow-xl">
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <h2 className="text-lg font-bold tracking-[1.3px] uppercase">
                                cart ({itemCount})
                            </h2>
                            <button
                                onClick={removeAll}
                                className="text-[15px] opacity-50 hover:opacity-100 hover:text-[#D87D4A] transition-all underline"
                            >
                                Remove all
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-[#F1F1F1] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="max-w-[40px] max-h-[42px] object-contain"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-[15px] font-bold leading-[25px]">
                                            {item.name}
                                        </h3>
                                        <p className="text-[14px] font-bold opacity-50 leading-[25px]">
                                            $ {item.price.toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="flex items-center bg-[#F1F1F1] w-24 h-8">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="flex-1 text-[13px] font-bold opacity-25 hover:opacity-100 hover:text-[#D87D4A] transition-all uppercase tracking-wide"
                                        >
                                            -
                                        </button>
                                        <span className="flex-1 text-center text-[13px] font-bold uppercase tracking-wide">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="flex-1 text-[13px] font-bold opacity-25 hover:opacity-100 hover:text-[#D87D4A] transition-all uppercase tracking-wide"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="flex items-center justify-between">
                            <span className="text-[15px] opacity-50 leading-[25px] uppercase">
                                Total
                            </span>
                            <span className="text-lg font-bold uppercase">
                                $ {total.toLocaleString()}
                            </span>
                        </div>

                        {/* Checkout Button */}

                        <Button
                            onClick={handleCheckout}
                            className="w-full bg-[#D87D4A] hover:bg-[#FBAF85] transition-colors text-white h-12 text-[13px] font-bold uppercase tracking-wide">
                            Checkout
                        </Button>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
}
