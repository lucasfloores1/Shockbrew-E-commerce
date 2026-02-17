import React from "react"
import {  NavigationMenu,  NavigationMenuItem,  NavigationMenuLink,  NavigationMenuList,} from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import CartWidget from "./CartWidget"
import Logo from "../assets/logo.svg"
import { useLocation, Link, NavLink } from "react-router-dom"


const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav
      className={`
        z-50 w-full h-16 px-6 flex items-center justify-between
        ${isHome
          ? "fixed top-0 bg-transparent text-white"
          : "sticky top-0 bg-white text-black shadow-sm"}
      `}
    >
      <Link to="/" className="flex items-center gap-2">
        <img src={Logo} alt="Shock Brew Logo" className="w-10 h-10" />
      </Link>

      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-4">

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <button
                className={`
                  px-3 py-2 rounded-md transition-colors
                  ${isHome ? "text-white" : "text-black"}
                  hover:bg-blue-500
                `}
              >
                <Link to="/">Home</Link>
              </button>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`
                    px-3 py-2 rounded-md transition-colors hover:bg-blue-500
                    ${isHome ? "text-white" : "text-black"}
                  `}
                >
                  Tienda
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-40">
                <DropdownMenuItem asChild>
                  <Link to="/store">Todos los productos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/store/category/cold-brew">Cold Brew</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to="/store/category/en-grano">En grano</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to="/store/category/molido">Molido</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to="/cart"
                className={`
                  px-3 py-2 rounded-md transition-colors
                  ${isHome ? "text-white" : "text-black"}
                  hover:bg-blue-500
                `}
              >
                <CartWidget/>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};


export default Navbar;