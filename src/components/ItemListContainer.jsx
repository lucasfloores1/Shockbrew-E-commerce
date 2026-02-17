import React from "react";
import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "@/service/firebase";
import { Skeleton } from "./ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Card, CardContent, CardFooter } from "./ui/card";

const ItemListContainer = ( {greeting } ) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { type } = useParams();

    useEffect(() => {
        setLoading(true)
        setError(null)
        const prodCollection = type ? query(collection(db, "products"), where("type", "==", type)) : collection(db, "products")      
        getDocs(prodCollection)
            .then((res) => {              
                const list = res.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })
                setProducts(list)
            })
            .catch((error) => {
                console.log(error)
                setError("No pudimos cargar los productos. Probá de nuevo")
            })
            .finally(()=>{setLoading(false)})
    }, [type]);

    const formatCategory = (type) => {
        if (!type) return "Nuestros Cafés"

        return type
            .split("-")
            .map( word => word.charAt(0).toUpperCase() + word.slice(1)) 
            .join(" ")
    }
    
    return (
        <section id="ItemListContainer" className="mx-auto max-w-7xl px-6 py-10">

            <h2 className="mb-12 text-center text-3xl font-semibold">
                {greeting} {formatCategory(type)}
            </h2>

            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {loading ? <ItemsSkeleton /> : <ItemList products={products} />}

        </section>
    )
}

export default ItemListContainer;

function ItemsSkeleton() {
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-72 w-full" />

                    <CardContent className="p-4 space-y-2">
                        <Skeleton className="h-5 w-3/4 ml-3" />
                        <Skeleton className="h-4 w-24 ml-3" />
                    </CardContent>

                    <CardFooter>
                        <Skeleton className="h-10 w-full rounded-md" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}