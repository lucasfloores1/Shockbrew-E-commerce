import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart , setCart]=useState([])

    const addProduct = (item, qty) =>{        
        if (isInCart(item.id)) {
            setCart(
                cart.map((prod) => {
                    if (prod.id === item.id) {
                        return {...prod, quantity: prod.quantity + qty};
                    } else {
                        return prod;
                    }
                })
            )
        } else {
            setCart([...cart, {...item, quantity : qty}])
        }
    }

    const clearCart = () => {
        setCart([])
    }

    const updateQuantity = (id, qty) =>{
        setCart(
            cart.map((prod) => {
                if (prod.id === id) {
                    return {...prod, quantity: qty};
                } else {
                    return prod;
                }
            })
        )
    }

    const removeProduct = (id) => {
        setCart(cart.filter((prod)=> prod.id !== id))
    }

    const isInCart = (id) => {
        return cart.some((prod) => prod.id === id);
    }

    const getTotal = () => {
        return cart.reduce((acc, prod) => acc += ( prod.quantity * prod.price), 0 )
    }

    const cartQuantity = () => {  
        return cart.reduce((acc, prod) => acc += prod.quantity, 0)
    }

    return(
        <CartContext.Provider value={{cart, addProduct, clearCart, removeProduct, isInCart, getTotal, cartQuantity, updateQuantity}}>
            {children}
        </CartContext.Provider>
    )
}