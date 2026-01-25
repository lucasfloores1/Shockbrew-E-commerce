import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail.jsx";
import React, { useEffect, useState } from "react";
import { getProductById } from "../mock/data.jsx";

const ItemDetailContainer = ( props ) => {
    const [product, setProduct] = useState({});
    const { id } = useParams();


    useEffect(() => {
        getProductById(id)
            .then(res => setProduct(res))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <ItemDetail product={product}></ItemDetail>
        </div>
    )
}

export default ItemDetailContainer;