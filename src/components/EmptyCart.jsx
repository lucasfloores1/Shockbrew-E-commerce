import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EmptyCart() {
    return (
        <section className="flex min-h-[70vh] items-center justify-center px-6">
            <Card className="max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">
                        Tu carrito está vacío
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Agregá algunos productos para comenzar
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <p className="text-muted-foreground">
                        Parece que todavía no agregaste ningún producto.
                        Explorá nuestra tienda y encontrá algo que te guste.
                    </p>
                </CardContent>

                <CardFooter className="flex justify-center gap-4">
                    <Button asChild>
                        <Link to="/">Ir al inicio</Link>
                    </Button>

                    <Button variant="outline" asChild>
                        <Link to="/store">Ver productos</Link>
                    </Button>
                </CardFooter>
            </Card>
        </section>
    );
}
