'use strict';

const Product = require('../models/product-model');

const getAllProducts = (req, res)=>{
    Product.find({}, (err, allProducts)=>{
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${error}`});
        if(!allProducts) return res.status(404).send({message: `Los productos no existen`});

        res.status(200).send({allProducts});
    });
}

const getProduct = (request, response)=>{
    let productId = request.params.id;

    Product.findById(productId, (error, product)=>{
        if(error) return response.status(500).send({message: `Error al realizar la petición: ${error}`});
        if(!product) return response.status(404).send({message: `El producto no existe`, product});
        response.status(200).send({product});
    });
}

const saveProduct = (req, res)=>{
    console.log('POST /api/product');
    console.log(req.body);
    let productNew = new Product();
    productNew.name = req.body.name;
    productNew.price = req.body.price;
    productNew.category = req.body.category;
    productNew.createdAt = req.body.createdAt;

    productNew.save((err, productStored)=>{
        if(err) return res.status(500).send(err);
        // {message: `error al salvar en la base de datos: ${err}`},
        res.status(200).send({productNew: productStored, message: 'Producto guardado'});
    });
}

const updateProduct = (req, res)=>{
    let productId = req.params.id;
    let update = req.body;

    // Product.findByIdAndUpdate(productId, update, (err, productUpdated)=>{
    //     if(err) return res.status(500).send({message: `Error al actualizar producto: ${err}`});
    //     res.status(200).send({productUpdated, message: 'Product updated!'});
    // });
    Product.findOneAndUpdate(productId, update, (err, productUpdated)=>{
        if(err) return res.status(500).send({message: `Error al actualizar producto: ${err}`});
        res.status(200).send({productUpdated: update, message: 'Product updated!'});
    });
}

const deleteProduct = (request, response)=>{
    let productId = request.params.productId;
    Product.findById(productId, (error, product)=>{
        if(error) return response.status(500).send({message: `Error al borrar producto: ${error}`});
        product.remove((err) =>{
            if(error) return response.status(500).send({message: `Error al borrar producto: ${error}`});
            response.status(200).send({message: `El producto ha sido eliminado`});
        });
    });
}


module.exports = {
    getAllProducts,
    getProduct,
    saveProduct, 
    updateProduct, 
    deleteProduct}