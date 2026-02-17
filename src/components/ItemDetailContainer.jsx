import { Link, useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail.jsx";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebase.jsx";
import { Button } from "./ui/button.jsx"
import { Alert, AlertTitle, AlertDescription } from "./ui/alert"
import { Skeleton } from "./ui/skeleton"
import { Card, CardContent, CardFooter } from "./ui/card"


const ItemDetailContainer = ( props ) => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const [invalid, setInvalid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        setLoading(true)
        setError(null)
        setInvalid(false)
        setProduct(null)

        const docRef = doc(db, "products", id)
        getDoc(docRef)
            .then((res)=>{
                if(res.data()){
                    setProduct({
                        id: res.id,
                        ...res.data(),
                    })
                } else{
                    setInvalid(true);
                }
            })
            .catch((error)=> {
                console.log(error);
                setError("No pudimos cargar este producto. Probá de nuevo.")
            })
            .finally(() => setLoading(false))
    }, [id]);

    if(invalid){
        return (
            <div className="mx-auto max-w-4xl px-6 py-10">
                <Alert variant="destructive" className="mb-6">
                    <AlertTitle>Producto inválido</AlertTitle>
                    <AlertDescription>El producto no existe o fue eliminado.</AlertDescription>
                </Alert>

                <Button asChild>
                    <Link to="/store">Volver a la tienda</Link>
                </Button>
            </div>
        )
    }else{
        return (
            <div className="mx-auto max-w-4xl px-6 py-10">
                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {loading ? (<ItemDetailSkeleton />) : (product && <ItemDetail product={product} />)}
            </div>
        )
    }
}

export default ItemDetailContainer;

function ItemDetailSkeleton() {
  return (
    <div className="pt-10">
      <Card className="mx-auto max-w-md overflow-hidden">
        <Skeleton className="h-80 w-full" />
        <CardContent className="space-y-4 p-6">
          <Skeleton className="h-7 w-3/4 mx-auto" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-10/12" />
          </div>
          <Skeleton className="h-4 w-32 mx-auto" />
          <Skeleton className="h-8 w-24 mx-auto" />
        </CardContent>

        <CardFooter className="flex flex-col p-6 items-center">
          <Skeleton className="h-10 w-40 rounded-md" />
        </CardFooter>
      </Card>
    </div>
  )
}