import React, { useContext } from "react"
import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { CartContext } from "@/context/CartContext"

const CartWidget = () => {
  const { cart, cartQuantity } = useContext(CartContext);

  return (
    <div className="relative flex items-center gap-1">
      <ShoppingCart className="w-10 h-10" />
      {cart.length > 0 && 
        <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600">
          {cartQuantity()}
        </Badge>
      }
    </div>
  )
}

export default CartWidget