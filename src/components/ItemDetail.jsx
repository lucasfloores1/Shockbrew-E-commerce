import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card.jsx";
import ItemCount from "./ItemCount.jsx";

const ItemDetail = ( {product } ) => {

    const onAdd = (cantidad)=>{
        console.log(`Se agregaron ${cantidad} unidades al carrito`);
    }
    return (
        <div className="pt-20">
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
                <ItemCount onAdd={onAdd} stock={product.stock}></ItemCount>
            </CardFooter>
        </Card>
        </div>
  );
}

export default ItemDetail;