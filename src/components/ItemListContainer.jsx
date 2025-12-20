import ProductCard from "./ProductCard";

const ItemListContainer = ( props ) => {

    const { greeting } = props;

    // products Mock (add backend later)
    const products = [
        {
            id: 1,
            name: "Colombia",
            price: "$2000",
            image: "/images/example.jpg",
        },
        {
            id: 2,
            name: "Brasil",
            price: "$2000",
            image: "/images/example.jpg",
        },
        {
            id: 3,
            name: "Etiopía",
            price: "$2000",
            image: "/images/example.jpg",
        },
        {
            id: 4,
            name: "Perú",
            price: "$2000",
            image: "/images/example.jpg",
        },
        {
            id: 5,
            name: "Honduras",
            price: "$2000",
            image: "/images/example.jpg",
        }
    ];
    
    return (
        // Section de productos
        <section id="ItemListContainer" className="mx-auto max-w-7xl px-6 py-24">

            <h2 className="mb-12 text-center text-3xl font-semibold">
                {greeting}
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

        </section>
    )
}

export default ItemListContainer;