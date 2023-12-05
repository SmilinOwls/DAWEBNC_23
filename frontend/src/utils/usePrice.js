import {useState, useEffect} from 'react';
import { useSelector } from "react-redux";

function useTotalPrice() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    const {cartItems} = useSelector((state) => state.cart);

    useEffect(() =>{
        const totalPrice = cartItems.reduce((acc, item) => acc + item.qnt*(item.numOfDays * item.price), 0);
        setTotalPrice(totalPrice);
    }, [cartItems]);

    return {totalPrice, discount}; 
};

export default useTotalPrice;