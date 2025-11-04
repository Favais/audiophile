"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from "@/app/components/ui/dialog";
import { useRouter } from "next/navigation";

interface OrderItem {
    name: string;
    price: string;
    quantity: number;
    image: string;
}

interface OrderSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    items: OrderItem[];
    grandTotal: string;
}

export default function OrderSuccessModal({ isOpen, onClose, items, grandTotal }: OrderSuccessModalProps) {
    const router = useRouter();
    const [showAllItems, setShowAllItems] = useState(true);

    const handleBackToHome = () => {
        onClose();
        router.push("/");
    };

    const displayItems = showAllItems ? items : items.slice(0, 1);
    const remainingCount = items.length - 1;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogPortal>
                <DialogOverlay className="bg-black/40" />
                <DialogContent 
                    showCloseButton={false}
                    className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[calc(100vw-2rem)] max-w-[540px] bg-white rounded-lg p-8 md:p-12 shadow-xl"
                >
                    <div className="space-y-6">
                        <div className="w-16 h-16 rounded-full bg-[#D87D4A] flex items-center justify-center">
                            <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5 13.5L3.5 8.5L1.5 10.5L8.5 17.5L22.5 3.5L20.5 1.5L8.5 13.5Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>

                        <h1 className="text-[24px] md:text-[32px] font-bold leading-[28px] md:leading-[36px] tracking-[0.857px] md:tracking-[1.143px] uppercase max-w-[284px]">
                            THANK YOU<br />FOR YOUR ORDER
                        </h1>

                        <p className="text-[15px] font-normal leading-[25px] opacity-50">
                            You will receive an email confirmation shortly.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] rounded-lg overflow-hidden">
                            <div className="bg-[#F1F1F1] p-6 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                                <div className="space-y-4">
                                    {displayItems.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className="w-[50px] h-[50px] bg-[#F1F1F1] rounded-lg flex items-center justify-center flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="max-w-[36px] max-h-[40px] object-contain"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-[15px] font-bold leading-[25px]">
                                                    {item.name}
                                                </h3>
                                                <p className="text-[14px] font-bold leading-[25px] opacity-50">
                                                    {item.price}
                                                </p>
                                            </div>
                                            <div className="text-[15px] font-bold leading-[25px] opacity-50">
                                                x{item.quantity}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {items.length > 1 && (
                                    <div className="mt-3 pt-3 border-t border-black/8">
                                        <button
                                            onClick={() => setShowAllItems(!showAllItems)}
                                            className="text-[12px] font-bold leading-normal tracking-[-0.214px] opacity-50 hover:opacity-100 hover:text-[#D87D4A] transition-all w-full text-center"
                                        >
                                            {showAllItems ? 'View less' : `and ${remainingCount} other item(s)`}
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="bg-black p-6 flex flex-col justify-end rounded-b-lg md:rounded-r-lg md:rounded-bl-none min-w-[198px]">
                                <div className="space-y-2">
                                    <p className="text-[15px] font-normal leading-[25px] text-white opacity-50 uppercase">
                                        GRAND TOTAL
                                    </p>
                                    <p className="text-[18px] font-bold leading-normal text-white uppercase">
                                        {grandTotal}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleBackToHome}
                            className="w-full bg-[#D87D4A] hover:bg-[#FBAF85] transition-colors text-white font-bold text-[13px] tracking-[1px] uppercase py-[15px] px-6"
                        >
                            BACK TO HOME
                        </button>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
}
