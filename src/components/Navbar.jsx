import { useEffect, useState } from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import CartWidget from "./CartWidget"
import Logo from "../assets/logo.svg"

const Navbar = () => {

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth"
    });
  }

  // Logic for Hero Scrolled
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.9);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 z-50 w-full h-16 px-6 flex items-center justify-between ${scrolled ? "bg-white text-black shadow-sm" : " bg-transparent text-white"}`}>

      <a href="/" className="flex items-center gap-2">
        <img src={Logo} alt="Logo" className="w-10 h-10" />
      </a>

      <NavigationMenu>

        <NavigationMenuList className="flex items-center gap-4">

          <NavigationMenuItem>

            <NavigationMenuLink className={`${scrolled ? "hover:bg-blue-500" : ""}`} onClick={() => scrollToSection("hero")}>Home</NavigationMenuLink>

          </NavigationMenuItem>

          <NavigationMenuItem>

            <NavigationMenuLink className={`${scrolled ? "hover:bg-blue-500" : ""}`} onClick={() => scrollToSection("ItemListContainer")}>Tienda</NavigationMenuLink>

          </NavigationMenuItem>

          <NavigationMenuItem>

            <NavigationMenuLink href="/cart">

              <CartWidget count={1} />

            </NavigationMenuLink>

          </NavigationMenuItem>

        </NavigationMenuList>

      </NavigationMenu>

    </nav>
  )
}

export default Navbar;