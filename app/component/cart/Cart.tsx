"use client";

import React from 'react';
import { Trash2, Plus, Minus, Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import PageNavigate from '../PageNavigate';

const CartItem = ({ image, name, size, color, price, quantity, onRemove, onUpdateQuantity }: any) => {
    return (
        <div className="flex gap-4 py-6 border-b border-gray-100 last:border-0">
            <div className="relative w-24 h-24 bg-[#F0EEED] rounded-lg overflow-hidden flex-shrink-0">
                <Image src={image} alt={name} fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-between flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold md:text-lg tracking-tight">{name}</h3>
                        <p className="text-sm text-gray-500">Size: <span className="text-gray-900">{size}</span></p>
                        <p className="text-sm text-gray-500">Color: <span className="text-gray-900">{color}</span></p>
                    </div>
                    <button onClick={onRemove} className="text-red-500 hover:opacity-70 p-2">
                        <Trash2 size={20} />
                    </button>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold md:text-xl text-lg">${price}</span>
                    <div className="flex items-center bg-[#F0F0F0] rounded-full px-4 py-2 gap-4">
                        <button
                            onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
                            className="hover:opacity-70"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="font-medium text-sm">{quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(quantity + 1)}
                            className="hover:opacity-70"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Cart = () => {
    const [cartItems, setCartItems] = React.useState<any[]>([]);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        const loadCart = () => {
            const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCartItems(savedCart);
            setIsLoaded(true);
        };

        loadCart();
        window.addEventListener('cartUpdated', loadCart);
        return () => window.removeEventListener('cartUpdated', loadCart);
    }, []);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discount = subtotal * 0.2;
    const deliveryFee = cartItems.length > 0 ? 15 : 0;
    const total = subtotal - discount + deliveryFee;

    if (!isLoaded) return <div className="p-20 text-center">Loading cart...</div>;
    if (cartItems.length === 0) return (
        <div className="max-w-[1440px] mx-auto px-6 md:px-17 py-20 text-center">
            <h1 className="text-4xl font-extrabold mb-4">Your Cart is Empty</h1>
            <Link href="/home/category" className="text-black underline">Continue Shopping</Link>
        </div>
    );

    const handleRemove = (index: number) => {
        const newCart = [...cartItems];
        newCart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCartItems(newCart);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const handleUpdateQuantity = (index: number, newQty: number) => {
        const newCart = [...cartItems];
        newCart[index].quantity = newQty;
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCartItems(newCart);
    };

    return (
        <div className="max-w-[1440px] mx-auto px-0 md:px-17">
            {/* Breadcrumb */}
            <PageNavigate />

            <h1 className="text-lg md:text-4xl font-extrabold uppercase tracking-tighter mb-8 px-6 py-4">Your Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8 px-6">
                {/* Left Side - Cart Items */}
                <div className="flex-1 border border-gray-200 rounded-2xl px-6 lg:w-[400px] w-full mt-0">
                    {cartItems.map((item, index) => (
                        <CartItem
                            key={`${item.id}-${item.size}-${item.color}-${index}`}
                            {...item}
                            onRemove={() => handleRemove(index)}
                            onUpdateQuantity={(q: number) => handleUpdateQuantity(index, q)}
                        />
                    ))}
                </div>

                {/* Right Side - Order Summary */}
                <div className="w-full lg:w-[500px]">
                    <div className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-6">
                        <h2 className="text-xl font-bold">Order Summary</h2>

                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center text-gray-500">
                                <span>Subtotal</span>
                                <span className="text-black font-bold text-lg">${subtotal}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-500">
                                <span>Discount (-20%)</span>
                                <span className="text-red-500 font-bold text-lg">-${Math.round(discount)}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-500">
                                <span>Delivery Fee</span>
                                <span className="text-black font-bold text-lg">${deliveryFee}</span>
                            </div>
                            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                                <span className="text-lg">Total</span>
                                <span className="text-black font-extrabold text-2xl">${Math.round(total)}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Tag size={20} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Add promo code"
                                    className="w-full bg-[#F0F0F0] rounded-full py-3 pl-12 pr-4 outline-none text-sm"
                                />
                            </div>
                            <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                                Apply
                            </button>
                        </div>

                        <button className="bg-black text-white w-full py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors">
                            Go to Checkout
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
