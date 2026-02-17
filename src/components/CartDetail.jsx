import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "./ui/card";
import { AlertDialog,  AlertDialogAction,  AlertDialogCancel,  AlertDialogContent,  AlertDialogDescription,  AlertDialogFooter,  AlertDialogHeader,  AlertDialogTitle,  AlertDialogTrigger } from "@/components/ui/alert-dialog"
import EmptyCart from "./EmptyCart";
import { Link } from "react-router-dom";

export default function CartDetail() {
    const { cart, clearCart, removeProduct, getTotal, cartQuantity, updateQuantity } = useContext(CartContext);

    if (!cart.length) {
        return(
            <EmptyCart> </EmptyCart>
        )
    }
    return(
        <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h1 className="text-3xl font-semibold">Carrito</h1>
                <p className="text-muted-foreground">
                    {cartQuantity()} {cartQuantity() === 1 ? "ítem" : "ítems"} en tu carrito
                </p>
            </div>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">Vaciar carrito</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Vaciar carrito?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción eliminará todos los productos del carrito.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={clearCart}>Vaciar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>

        <Separator className="my-6" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-4">
                        <div className="flex gap-4">
                            <div className="h-24 w-24 shrink-0 rounded-md bg-muted overflow-hidden">
                                <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="font-semibold leading-tight">{item.name}</h3>
                                        <div className="mt-1 flex flex-wrap items-center gap-2">
                                            <span className="text-xs text-muted-foreground">
                                                Stock: {item.stock}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-muted-foreground">Precio</div>
                                        <div className="font-semibold">${item.price}</div>
                                    </div>
                                </div>
                                <Separator className="my-3" />
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-2">
                                        <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                        disabled={item.quantity <= 1}
                                        >
                                        -
                                        </Button>

                                        <Input
                                        className="w-20 text-center"
                                        value={item.quantity}
                                        onChange={(e) => {
                                            const val = Number(e.target.value)
                                            if (Number.isNaN(val)) return
                                            const safe = Math.min(item.stock, Math.max(1, val))
                                            updateQuantity(item.id, safe)
                                        }}
                                        inputMode="numeric"
                                        />

                                        <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                            updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))
                                        }
                                        disabled={item.quantity >= item.stock}
                                        >
                                        +
                                        </Button>

                                        {item.quantity >= item.stock && (
                                        <span className="text-xs text-muted-foreground">
                                            Máximo stock
                                        </span>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-3">
                                        <div className="text-right">
                                            <div className="text-sm text-muted-foreground">Subtotal</div>
                                            <div className="font-semibold">
                                                ${item.price * item.quantity}
                                            </div>
                                        </div>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive">Eliminar</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Eliminar producto</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        ¿Querés eliminar <span className="font-medium">{item.name}</span> del carrito?
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => removeProduct(item.id)}>Eliminar</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
            </div>
                <div className="lg:col-span-1">
                    <Card className="lg:sticky lg:top-24">
                        <CardHeader>
                            <CardTitle>Resumen</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">SubTotal</span>
                                <span className="font-medium">${getTotal()}</span>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Envío</span>
                                <span className="font-medium">$0</span>
                            </div>
                            <Separator/>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold">Total</span>
                                <span className="text-lg font-semibold">${getTotal()}</span>
                            </div>
                            <Separator />
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            <Button className="w-full" asChild>
                                <Link to="/checkout">Finalizar compra</Link>
                            </Button>
                            <Button variant="outline" className="w-full" asChild>
                                <Link to="/store">Seguir comprando</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}