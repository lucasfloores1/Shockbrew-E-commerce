import React, { useContext } from "react";
import { Card, CardContent, CardFooter } from "./ui/card.jsx";
import ItemCount from "./ItemCount.jsx";
import { CartContext } from "@/context/CartContext.jsx";

const ItemDetail = ( {product } ) => {

    const {addProduct, updateQuantity} = useContext(CartContext);

    const onAdd = (qty)=>{
        addProduct(product, qty)
    }

    const onUpdateCart = (qty) => {
        updateQuantity(product.id, qty)
    }
    
    return (
        <div className="pt-10">
        <Card className="mx-auto max-w-md overflow-hidden">
            <img
                src={product.image}
                alt={product.name}
                className="h-80 w-full object-contain bg-muted"
            />

            <CardContent className="space-y-4 p-6">
                <h2 className="text-2xl font-semibold text-center">
                {product.name}
                </h2>

                <p className="text-center text-muted-foreground">
                {product.description}
                </p>

                <p className="text-center text-sm">
                Stock: <span className="font-medium">{product.stock}</span>
                </p>

                <p className="text-center text-2xl font-bold">
                ${product.price}
                </p>
            </CardContent>

            <CardFooter className="flex flex-col p-6 items-center">
                <ItemCount onAdd={onAdd} onUpdateCart={onUpdateCart} stock={product.stock}></ItemCount>
            </CardFooter>
        </Card>
        </div>
  );
}

export default ItemDetail;