import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const ItemCount = ( { stock, onAdd, onUpdateCart } ) => {

    const [counter, setCounter] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    const sumar = () => {
        if (counter < stock) {
            const newValue = counter + 1;
            setCounter(newValue);

            if (addedToCart) {
                onUpdateCart(newValue);
            }
        }
    }

    const restar = () => {
        if (counter > 1) {
            const newValue = counter -1
            setCounter(counter - 1);
            
            if (addedToCart) {
                onUpdateCart(newValue)
            }
        }

    }

    const agregar = () => {
        setAddedToCart(true)
        onAdd(counter);
    }    

    return (
        <div className="flex flex-col items-center gap-4 width-full">

            <div className="flex items-center gap-4">
                <Button variant="outline" onClick={restar} disabled={counter <= 1}>-</Button>

                <span>{counter}</span>

                <Button variant="outline" onClick={sumar} disabled={counter >= stock}>+</Button>
            </div>

            { !addedToCart ? <Button className="w-full" onClick={agregar} disabled={stock === 0}>Agregar al carrito</Button>
            :
            <Button className="w-full" asChild variant="secondary">
                <Link to="/cart">Ir al carrito</Link>
            </Button>
            }

        </div>
    )
}

export default ItemCount;