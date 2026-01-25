import React from "react";
import Item from "./Item";

const ItemList = ( props ) => {

    const { products } = props;

    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {products.map(product => (
                    <Item key={product.id} product={product} />
                ))}
        </div>
    )
    
}
export default ItemList;