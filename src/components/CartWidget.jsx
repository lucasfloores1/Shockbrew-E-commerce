import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const CartWidget = ({ count = 0 }) => {
  return (
    <div className="relative flex items-center gap-1">
      <ShoppingCart className="w-10 h-10" />
      <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600">
        {count}
      </Badge>
    </div>
  )
}

export default CartWidget