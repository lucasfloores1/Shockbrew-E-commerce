import React from "react";
import { Button } from "./ui/button";

const ItemCount = ( { stock, onAdd } ) => {

    const [counter, setCounter] = React.useState(1);

    const sumar = () => {
        if (counter < stock) {
            setCounter(counter + 1);
        }
    }

    const restar = () => {
        if (counter > 1) {
            setCounter(counter - 1);
        }
    }

    const agregar = () => {
        onAdd(counter);
    }    

    return (
        <div className="flex flex-col items-center gap-4 width-full">

            <div className="flex items-center gap-4">
                <Button variant="outline" onClick={restar} disabled={counter <= 1}>-</Button>

                <span>{counter}</span>

                <Button variant="outline" onClick={sumar} disabled={counter >= stock}>+</Button>
            </div>

            <Button className="w-full" onClick={agregar} disabled={stock === 0}>Agregar al carrito</Button>

        </div>
    )
}

export default ItemCount;