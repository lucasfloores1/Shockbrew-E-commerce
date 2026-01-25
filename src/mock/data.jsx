const products = [
        {
            id: '1',
            name: "Colombia",
            price: 2000,
            image: "/images/example.jpg",
            type: "honey",
            stock: 10,
            description: "Café de Colombia con proceso honey, sabor balanceado con notas a caramelo y frutos secos."
        },
        {
            id: '2',
            name: "Brasil",
            price: 2000,
            image: "/images/example.jpg",
            type: "lavado",
            stock: 15,
            description: "Café de Brasil con proceso lavado, sabor suave con notas a chocolate y nueces."
        },
        {
            id: '3',
            name: "Etiopía",
            price: 2000,
            image: "/images/example.jpg",
            type: "natural",
            stock: 8,
            description: "Café de Etiopía con proceso natural, sabor afrutado con notas a berries y flores."
        },
        {
            id:'4',
            name: "Perú",
            price: 2000,
            image: "/images/example.jpg",
            type: "honey",
            stock: 12,
            description: "Café de Perú con proceso honey, sabor dulce con notas a miel y frutas tropicales."
        },
        {
            id: '5',
            name: "Honduras",
            price: 2000,
            image: "/images/example.jpg",
            type: "lavado",
            stock: 20,
            description: "Café de Honduras con proceso lavado, sabor limpio con notas a cítricos y caramelo."
        }
    ];

    let err = false;
    export const getProducts = () => {
        return new Promise((resolve) => { 
            setTimeout(() => {
                if (err) {
                    reject ("Error al obtener los productos");
                } else {
                resolve(products);
                }
            }, 1000);
        });
    }

    export const getProductById = (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (err) {
                    reject ("Error al obtener el producto");
                }else  { 
                let product = products.find(prod => prod.id === id);
                resolve(product);
                }
            }, 1000);
        });
    }