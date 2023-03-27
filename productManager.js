class ProductManager {
    constructor(){
        this.products = []
    }

    getProducts(){
        if(this.products.length === 0){
            console.log('Esta vacio');
        }
        console.log(this.products);
        return this.products
    }

    addProduct(title,description,price,thumbnail,code,stock){
        const repeatCode = this.products.find(product => product.code === code)
        if(repeatCode){
            console.log(`El codigo del producto ya existe, por favor intente con otro codigo`);
            return
        } 
        const id = this.products.length + 1;
        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.products.push(product)
        console.log(`El producto ${title} fue agregado correctamente`);
    }

    getProductById(id){
        const product = this.products.find(product => product.id === id)
        if(product){
            console.log(product);
            return product
        } else{
            console.log('El id del producto que esta buscando no existe');
        }
    } 
}

const productos = new ProductManager();

productos.addProduct('Pantalón', 'Nike', 10000, './multimedia/pantalon.jpeg', 11264557889, 2);
productos.addProduct('Remera', 'Adidas', 7000, './multimedia/remera.jpeg', 11245697858, 5);
productos.addProduct('Zapatillas', 'Puma', 23500, './multimedia/zapatillas.jpeg', 32154568777, 8)
productos.getProducts();
productos.getProductById(4);

