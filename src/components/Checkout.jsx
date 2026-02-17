import { CartContext } from "@/context/CartContext";
import { db } from "@/service/firebase";
import { collection, serverTimestamp, addDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import EmptyCart from "./EmptyCart";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

function IconInput({ icon : Icon, className = "", ...props }) {
    return(
        <div className={`relative ${className}`}>
            <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10" {...props} />
        </div>            
    )
}

export default function Checkout() {
    const { cart, getTotal, clearCart, cartQuantity } = useContext(CartContext)

    const [buyer, setBuyer] = useState({});
    const [validEmail, setValidEmail] = useState('')
    const [orderId, setOrderId] = useState(null)
    const [error, setError] = useState(null)
    const [process, setProcess] = useState(false)

    const buyerData = (e) => {
        setBuyer({
            ...buyer,
            [e.target.name]: e.target.value
        });
    }

    const createOrder = (e) => {
        setError(null)
        if (!buyer.name || !buyer.lastname || !buyer.email || !validEmail || !buyer.phone) {
            setError("Por favor complete los campos")
            return
        }

        if (buyer.email !== validEmail) {
            setError("Los correos no coinciden")
            return
        }
        e.preventDefault()
        if(!buyer.name || !buyer.lastname || !buyer.email || !validEmail){
            setError('Por favor complete los campos')
        }else if (buyer.email !== validEmail){
            setError('Los correos no coiciden')
        }else{
            setProcess(true)
            setError(null)
            let order = {
                buyer : buyer,
                products : cart,
                total : getTotal(),
                date : serverTimestamp()
            }
            const sales = collection(db, 'orders')
            addDoc(sales, order)
                .then((res) => {
                    setOrderId(res.id)
                    clearCart()
                })
                .catch((error) => {
                    setError('Error al crear la orden')
                    console.log(error)
                })
                .finally(()=>setProcess(false))
            }        
    }

    if (!cart.length && !orderId) {
        return(
            <EmptyCart></EmptyCart>
        )
    }
    return(
        <>
        {
            orderId ? 
            <div className="pt-10 flex justify-center">
                <Card className="w-full max-w-xl">
                    <CardHeader>
                        <CardTitle>¡Muchas gracias por tu compra!</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        <p className="text-muted-foreground">
                        Tu orden fue generada correctamente.
                        </p>

                        <div className="rounded-md border p-4">
                        <p className="text-sm text-muted-foreground">Número de orden</p>
                        <p className="font-mono text-lg font-semibold break-all">{orderId}</p>
                        </div>
                    </CardContent>

                    <CardFooter className="gap-2 flex flex-col sm:flex-row sm:justify-end">
                        <Button asChild className="w-full sm:w-auto">
                        <Link to="/store">Volver a la tienda</Link>
                        </Button>
                        <Button variant="outline" asChild className="w-full sm:w-auto">
                        <Link to="/">Home</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            :<div className="grid grid-cols-1 gap-6 lg:grid-cols-3 pt-10">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Datos del comprador</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-5">
                    {error && (
                        <Alert variant="destructive">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                        <form className="space-y-4" onSubmit={createOrder}>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre</Label>
                                    <IconInput id="name" name="name" placeholder="Ingresá tu nombre" value={buyer.name} onChange={buyerData} disabled={process} icon={User}/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastname">Apellido</Label>
                                    <IconInput id="lastname" name="lastname" placeholder="Ingresá tu apellido" value={buyer.lastname} onChange={buyerData} disabled={process} icon={User}/>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Correo</Label>
                                    <IconInput id="email" name="email" type="email" placeholder="Ingresá tu correo" value={buyer.email} onChange={buyerData} disabled={process} icon={Mail}/>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="validEmail">Repetir correo</Label>
                                    <IconInput id="validEmail" name="validEmail" type="email" placeholder="Repetí tu correo" value={validEmail} onChange={(e) => setValidEmail(e.target.value)} disabled={process} icon={Mail} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Teléfono</Label>
                                <IconInput id="phone" name="phone" type="tel" placeholder="Ej: 261 555-1234" value={buyer.phone} onChange={buyerData} disabled={process} icon={Phone} />
                            </div>

                            <div className="pt-2 flex flex-col sm:flex-row gap-2 sm:justify-end">
                                <Button type="submit" disabled={process}>
                                    {process ? "Procesando orden..." : "Generar orden"}
                                </Button>

                                <Button type="button" variant="outline" asChild disabled={process}>
                                    <Link to="/cart">Volver al carrito</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-1 lg:sticky lg:top-24">
                    <CardHeader>
                    <CardTitle>Resumen</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Productos</span>
                            <span className="font-medium">{cartQuantity()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Total</span>
                            <span className="font-semibold">${getTotal()}</span>
                        </div>
                        <Separator />
                        <p className="text-xs text-muted-foreground">
                            Al generar la orden, guardaremos tus datos y el detalle de compra.
                        </p>
                    </CardContent>
                </Card>
            </div>
        }
        </>
    )
}