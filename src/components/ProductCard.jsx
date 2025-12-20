import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }) => {
  return (
        <Card className= "overflow-hidden">
            <img
                src={product.image}
                alt={product.name}
                className= "h-72 w-full object-contain"
            />

            <CardContent className="p-4">
                <h3 className="pl-3 text-lg font-medium">{product.name}</h3>
                <p className="pl-3 text-sm text-muted-foreground">{product.price}</p>
            </CardContent>

            <CardFooter>
                <Button className="w-full">Agregar al carrito</Button>
            </CardFooter>
        </Card>
  );
}

export default ProductCard;