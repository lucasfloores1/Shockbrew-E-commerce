import React, { use } from "react";
import { getProducts } from "../mock/data";
import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";

const ItemListContainer = ( {greeting } ) => {

    const [products, setProducts] = useState([]);
    const { type } = useParams();

    useEffect(() => {
        getProducts()
            .then(res => {
            if (type) {
                const filteredProducts = res.filter(product => product.type === type);
                setProducts(filteredProducts);
            } else {
                setProducts(res);
            }
        });
    }), [type];
    
    return (
        // Section de productos
        <section id="ItemListContainer" className="mx-auto max-w-7xl px-6 py-24">

            <h2 className="mb-12 text-center text-3xl font-semibold">
                {greeting} {type ? type.charAt(0).toUpperCase() + type.slice(1) : "Todos los tipos"}
            </h2>

            <ItemList products={products}/>

        </section>
    )
}

export default ItemListContainer;