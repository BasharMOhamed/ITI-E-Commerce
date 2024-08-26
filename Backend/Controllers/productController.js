const Product = require('../Models/Product');

const fs = require('fs');
const path = require('path');
/*
async function insertDataFromJson() {
    const dataFilePath = path.join(__dirname, '../Utils/data.json');
    try {
        const data = require(dataFilePath);
        if (Array.isArray(data.products)) {
            // Validate each product against the schema
            const validProducts = data.products.filter(product => {
                const isValid = product.id && 
                                product.title && 
                                product.description && 
                                product.category && 
                                product.price && 
                                product.discountPercentage 
                                

                if (!isValid) {
                    console.log(`Product with ID ${product.id} is invalid:`, product);
                } else {
                    console.log(`Valid product:`, product);
                }
                return isValid;
            });

            // Log the number of valid products
            console.log(`Valid products count: ${validProducts.length}`);

            await Product.insertMany(validProducts);
            console.log('Data inserted successfully');
        } else {
            console.error('Data is not an array of products');
        }
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}
*/
async function getAllProducts() {

    try {
        const data = await Product.find({}); 
        console.log(data);
        return data;
    } catch (error) {
        console.error(error); 
        throw error; 
    }

}

async function getProductById(id) {
    const data = await Product.findOne({ id: id });
    return data;
}

async function addProduct(newProduct){
    try {
        const data = await Product.create(newProduct); 
        console.log(data); 
        return data; 
    } catch (error) {
        console.error(error); 
        throw error; 
    }
}


async function deleteProduct(id) {
    try {
        const data = await Product.findOneAndDelete({ id: id }); 
        if (data) {
            console.log(`Product with id ${id} deleted successfully`); 
            return data; 
        } else {
            console.error(`Product with id ${id} not found`); 
            throw new Error(`Product with id ${id} not found`); 
        }
    } catch (error) {
        console.error(error); 
        throw error; 
    }
}

async function updateProduct(id, updates) {
    try {
        const data = await Product.findOneAndUpdate({ id: id }, updates, { new: true }); 
        if (data) {
            console.log(`Product with id ${id} updated successfully`); 
            return data; 
        } else {
            console.error(`Product with id ${id} not found`); 
            throw new Error(`Product with id ${id} not found`); 
        }
    } catch (error) {
        console.error(error); 
        throw error; 
    }
}
async function searchProduct(productSearch) {
    try {
        const trimmedSearch = productSearch.trim();
        const regex = new RegExp(trimmedSearch, 'i'); 
        const data = await Product.find({ title: { $regex: regex } }); 
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports = { getAllProducts, getProductById, addProduct,deleteProduct,updateProduct,searchProduct};