"use client"
import { useState } from "react";
import FormInput from "../components/FormInput";
import RadioOption from "../components/RadioOption";
import CartItem from "../components/CartItem";
import SummaryRow from "../components/SummaryRow";
import OrderSuccessModal from "../components/OrderSuccessModal";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface FormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
    eMoneyNumber: string;
    eMoneyPin: string;
}

interface FormErrors {
    [key: string]: string;
}

export default function Index() {
    const [paymentMethod, setPaymentMethod] = useState<"emoney" | "cash">("emoney");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        address: '',
        zipCode: '',
        city: '',
        country: '',
        eMoneyNumber: '',
        eMoneyPin: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const createOrder = useMutation(api.orders.createOrder);

    const orderItems = [
        {
            name: "XX99 MK II",
            price: "$ 2,999",
            quantity: 1,
            image: "https://api.builder.io/api/v1/image/assets/TEMP/cc527cc3175f2e2559901541276e233cce70fd99?width=56"
        },
        {
            name: "XX59",
            price: "$ 899",
            quantity: 2,
            image: "https://api.builder.io/api/v1/image/assets/TEMP/4f12d25ccaf9405876a86e99e6425753023c53a4?width=60"
        },
        {
            name: "YX1",
            price: "$ 599",
            quantity: 1,
            image: "https://api.builder.io/api/v1/image/assets/TEMP/893c81d5630790756e06d552f80814c9efcb30eb?width=73"
        }
    ];

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (touched[field]) {
            validateField(field, value);
        }
    };

    const handleBlur = (field: keyof FormData) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateField(field, formData[field]);
    };

    const validateField = (field: keyof FormData, value: string) => {
        let error = '';

        switch (field) {
            case 'name':
                if (!value.trim()) error = 'Name is required';
                break;
            case 'email':
                if (!value.trim()) {
                    error = 'Email is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Wrong format';
                }
                break;
            case 'phone':
                if (!value.trim()) {
                    error = 'Phone is required';
                } else if (!/^\+?[0-9\s-]{10,}$/.test(value)) {
                    error = 'Wrong format';
                }
                break;
            case 'address':
                if (!value.trim()) error = 'Address is required';
                break;
            case 'zipCode':
                if (!value.trim()) error = 'ZIP Code is required';
                break;
            case 'city':
                if (!value.trim()) error = 'City is required';
                break;
            case 'country':
                if (!value.trim()) error = 'Country is required';
                break;
            case 'eMoneyNumber':
                if (paymentMethod === 'emoney' && !value.trim()) {
                    error = 'e-Money Number is required';
                } else if (paymentMethod === 'emoney' && !/^[0-9]{9}$/.test(value)) {
                    error = 'Must be 9 digits';
                }
                break;
            case 'eMoneyPin':
                if (paymentMethod === 'emoney' && !value.trim()) {
                    error = 'e-Money PIN is required';
                } else if (paymentMethod === 'emoney' && !/^[0-9]{4}$/.test(value)) {
                    error = 'Must be 4 digits';
                }
                break;
        }

        setErrors(prev => ({ ...prev, [field]: error }));
        return error === '';
    };

    const validateForm = (): boolean => {
        const fieldsToValidate: (keyof FormData)[] = [
            'name', 'email', 'phone', 'address', 'zipCode', 'city', 'country'
        ];

        if (paymentMethod === 'emoney') {
            fieldsToValidate.push('eMoneyNumber', 'eMoneyPin');
        }


        const newErrors: FormErrors = {};
        const newTouched: { [key: string]: boolean } = {};

        fieldsToValidate.forEach(field => {
            newTouched[field] = true;
            const value = formData[field];

            switch (field) {
                case 'name':
                    if (!value.trim()) newErrors[field] = 'Name is required';
                    break;
                case 'email':
                    if (!value.trim()) {
                        newErrors[field] = 'Email is required';
                    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                        newErrors[field] = 'Wrong format';
                    }
                    break;
                case 'phone':
                    if (!value.trim()) {
                        newErrors[field] = 'Phone is required';
                    } else if (!/^\+?[0-9\s-]{10,}$/.test(value)) {
                        newErrors[field] = 'Wrong format';
                    }
                    break;
                case 'address':
                    if (!value.trim()) newErrors[field] = 'Address is required';
                    break;
                case 'zipCode':
                    if (!value.trim()) newErrors[field] = 'ZIP Code is required';
                    break;
                case 'city':
                    if (!value.trim()) newErrors[field] = 'City is required';
                    break;
                case 'country':
                    if (!value.trim()) newErrors[field] = 'Country is required';
                    break;
                case 'eMoneyNumber':
                    if (!value.trim()) {
                        newErrors[field] = 'e-Money Number is required';
                    } else if (!/^[0-9]{9}$/.test(value)) {
                        newErrors[field] = 'Must be 9 digits';
                    }
                    break;
                case 'eMoneyPin':
                    if (!value.trim()) {
                        newErrors[field] = 'e-Money PIN is required';
                    } else if (!/^[0-9]{4}$/.test(value)) {
                        newErrors[field] = 'Must be 4 digits';
                    }
                    break;
            }
        });

        setTouched(newTouched);
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async () => {
        const orderData = {
            customer: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                country: formData.country,
                zip: formData.zipCode,
            },
            items: orderItems.map(item => ({
                id: item.name.toLowerCase().replace(/\s+/g, '-'),
                name: item.name,
                price: parseFloat(item.price.replace('$', '').trim()),
                quantity: item.quantity,
            })),
            totals: {
                subtotal: 5396,
                shipping: 50,
                grandTotal: 5446,
            },
        };
        console.log(orderData);

        const response = await createOrder(orderData);
        await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: orderData.customer.email,
                name: orderData.customer.name,
                orderId: response.toString(),
                items: orderData.items,
                totals: orderData.totals,
                address: orderData.customer.address,
                city: orderData.customer.city,
                country: orderData.customer.country,
                phone: orderData.customer.phone,
                orderUrl: `${window.location.origin}/order/${response.toString()}`,
            }),
        });
        console.log('Order created with ID:', response);
    };

    const handlePayment = () => {
        if (validateForm()) {
            handleSubmit();
            setShowSuccessModal(true);
        }
    };

    return (
        <div className="min-h-screen bg-[#F1F1F1] py-8 px-4 md:py-16 md:px-6 lg:px-8" >
            <div className="max-w-[1110px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 lg:gap-8">
                    {/* Checkout Form */}
                    <div className="bg-white rounded-lg p-6 md:p-12">
                        <h1 className="text-[28px] md:text-[32px] font-bold tracking-[1.143px] uppercase mb-8 md:mb-10">
                            CHECKOUT
                        </h1>

                        {/* Billing Details */}
                        <section className="mb-8 md:mb-12">
                            <h2 className="text-[13px] font-bold tracking-[0.929px] uppercase text-checkout-orange mb-4">
                                Billing Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput
                                    label="Name"
                                    placeholder="Alexei Ward"
                                    value={formData.name}
                                    onChange={handleInputChange.bind(null, 'name')}
                                    onBlur={() => handleBlur('name')}
                                    error={touched.name ? errors.name : ''}
                                />
                                <FormInput
                                    label="Email Address"
                                    placeholder="alexei@mail.com"
                                    value={formData.email}
                                    onChange={handleInputChange.bind(null, 'email')}
                                    onBlur={() => handleBlur('email')}
                                    error={touched.email ? errors.email : ''}
                                />
                                <FormInput
                                    label="Phone Number"
                                    placeholder="+1 202-555-0136"
                                    value={formData.phone}
                                    onChange={handleInputChange.bind(null, 'phone')}
                                    onBlur={() => handleBlur('phone')}
                                    error={touched.phone ? errors.phone : ''}
                                />
                            </div>
                        </section>

                        {/* Shipping Info */}
                        <section className="mb-8 md:mb-12">
                            <h2 className="text-[13px] font-bold tracking-[0.929px] uppercase text-checkout-orange mb-4">
                                Shipping Info
                            </h2>
                            <div className="grid grid-cols-1 gap-6">
                                <FormInput
                                    label="Address"
                                    placeholder="1137 Williams Avenue"
                                    fullWidth
                                    value={formData.address}
                                    onChange={handleInputChange.bind(null, 'address')}
                                    onBlur={() => handleBlur('address')}
                                    error={touched.address ? errors.address : ''}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput
                                        label="ZIP Code"
                                        placeholder="10001"
                                        value={formData.zipCode}
                                        onChange={handleInputChange.bind(null, 'zipCode')}
                                        onBlur={() => handleBlur('zipCode')}
                                        error={touched.zipCode ? errors.zipCode : ''}
                                    />
                                    <FormInput
                                        label="City"
                                        placeholder="New York"
                                        value={formData.city}
                                        onChange={handleInputChange.bind(null, 'city')}
                                        onBlur={() => handleBlur('city')}
                                        error={touched.city ? errors.city : ''}
                                    />
                                </div>
                                <FormInput
                                    label="Country"
                                    placeholder="United States"
                                    value={formData.country}
                                    onChange={handleInputChange.bind(null, 'country')}
                                    onBlur={() => handleBlur('country')}
                                    error={touched.country ? errors.country : ''}
                                />
                            </div>
                        </section>

                        {/* Payment Details */}
                        <section>
                            <h2 className="text-[13px] font-bold tracking-[0.929px] uppercase text-checkout-orange mb-4">
                                Payment Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-1">
                                    <label className="text-[12px] font-bold tracking-[-0.214px] block mb-2">
                                        Payment Method
                                    </label>
                                </div>
                                <div className="md:col-span-1 flex flex-col gap-4">
                                    <RadioOption
                                        selected={paymentMethod === "emoney"}
                                        onClick={() => setPaymentMethod("emoney")}
                                        label="e-Money"
                                    />
                                    <RadioOption
                                        selected={paymentMethod === "cash"}
                                        onClick={() => setPaymentMethod("cash")}
                                        label="Cash on Delivery"
                                    />
                                </div>
                            </div>

                            {paymentMethod === "emoney" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <FormInput
                                        label="e-Money Number"
                                        placeholder="238521993"
                                        value={formData.eMoneyNumber}
                                        onChange={handleInputChange.bind(null, 'eMoneyNumber')}
                                        onBlur={() => handleBlur('eMoneyNumber')}
                                        error={touched.eMoneyNumber ? errors.eMoneyNumber : ''}
                                    />
                                    <FormInput
                                        label="e-Money PIN"
                                        placeholder="6891"
                                        value={formData.eMoneyPin}
                                        onChange={handleInputChange.bind(null, 'eMoneyPin')}
                                        onBlur={() => handleBlur('eMoneyPin')}
                                        error={touched.eMoneyPin ? errors.eMoneyPin : ''}
                                    />
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-lg p-6 md:p-8">
                        <h2 className="text-[18px] font-bold tracking-[1.286px] uppercase mb-8">
                            Summary
                        </h2>

                        {/* Cart Items */}
                        <div className="space-y-6 mb-8">
                            <CartItem
                                image="https://api.builder.io/api/v1/image/assets/TEMP/1433dcb711203c3eefd09aaf8a099e5710e6f532?width=72"
                                name="XX99 MK II"
                                price="$ 2,999"
                                quantity={1}
                            />
                            <CartItem
                                image="https://api.builder.io/api/v1/image/assets/TEMP/4f695447ae4bdc134927e6403f6c6094310bca6b?width=77"
                                name="XX59"
                                price="$ 899"
                                quantity={2}
                            />
                            <CartItem
                                image="https://api.builder.io/api/v1/image/assets/TEMP/6c04e4a179f32382f9e24a804f76a60d26952550?width=93"
                                name="YX1"
                                price="$ 599"
                                quantity={1}
                            />
                        </div>

                        {/* Totals */}
                        <div className="space-y-2 mb-6">
                            <SummaryRow label="TOTAL" value="$ 5,396" />
                            <SummaryRow label="SHIPPING" value="$ 50" />
                            <SummaryRow label="VAT (INCLUDED)" value="$ 1,079" />
                            <SummaryRow label="GRAND TOTAL" value="$ 5,446" isGrandTotal />
                        </div>

                        {/* Continue Button */}
                        <button
                            onClick={handlePayment}
                            className="w-full bg-[#D87D4A] hover:bg-[#FBAF85] transition-colors text-white font-bold text-[13px] tracking-[1px] uppercase py-4 rounded-none"
                        >
                            CONTINUE & PAY
                        </button>
                    </div>
                </div>
            </div>

            <OrderSuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                items={orderItems}
                grandTotal="$ 5,446"
            />
        </div >
    );
}
