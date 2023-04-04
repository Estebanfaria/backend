const fs = require('fs');

class ProductManager {
    constructor(){
        this.products = this.loadProducts()
    }

    getProducts(){
        if(this.products.length === 0){
            console.log('La lista de productos esta vacia');
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
        this.saveProducts()
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

    updateProduct(id, data) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            const product = this.products[productIndex];
            const updatedProduct = {...product, ...data, id};
            this.products.splice(productIndex, 1, updatedProduct);
            this.saveProducts()
            console.log(`El producto con id ${id} ha sido actualizado correctamente`);
            return updatedProduct;
        } else {
            console.log(`No se encontró un producto con el id ${id}`);
            return null;
        }
    }

    deleteProduct(id){
        const productIndex = this.products.findIndex(product => product.id === id);
        if(productIndex !== -1){
            this.products.splice(productIndex, 1);
            this.saveProducts()
            console.log(`El producto con id ${id} ha sido eliminado correctamente`);
            return true;
        } else{
            console.log(`No se encontró un producto con el id ${id}`);
            return false;
        }
    }

    saveProducts() {
        const productsJSON = JSON.stringify(this.products);
        fs.writeFileSync('./products.json', productsJSON);
    }

    loadProducts() {
        try {
            const productsJSON = fs.readFileSync('./products.json', 'utf8');
            return JSON.parse(productsJSON) || [];
        } catch (error) {
            console.error(`No se pudo cargar los productos: ${error.message}`);
            return [];
        }
    }
}

const producto = new ProductManager(); 

// producto.addProduct('pantalon', 'nike', 200, './multimedia/pantalon.jpeg', 321, 21)
// producto.addProduct('remera', 'adidas', 450, './multimedia/remera.jpeg', 231, 245)
producto.getProducts()
producto.getProductById(1)
