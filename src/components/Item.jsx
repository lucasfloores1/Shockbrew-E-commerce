import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Item = ({ product }) => {
  return (
        <Card className= "overflow-hidden">
            <img
                src={product.image}
                alt={product.name}
                className= "h-72 w-full object-contain"
            />

            <CardContent className="p-4">
                <h3 className="pl-3 text-lg font-medium">{product.name}</h3>
                <p className="pl-3 text-sm text-muted-foreground">${product.price}</p>
            </CardContent>

            <CardFooter>
                <Button asChild className="w-full">
                    <Link to={`/item/${product.id}`}>Ver Más</Link>
                </Button>
            </CardFooter>
        </Card>
  );
}

export default Item;