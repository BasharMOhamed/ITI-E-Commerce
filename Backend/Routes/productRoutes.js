const express = require('express');
const router = express.Router();
const {getAllProducts,getProductById,addProduct,deleteProduct,updateProduct} = require('../Controllers/productController'); 






router.get("/allProducts",async (req,res)=>{
    await getAllProducts().then((productList) => {
        res.json(productList);
    }).catch((error) => {
        res.status(500).json({msg: "Error fetching products"});
    });
})
router.get("/product/:id", async (req,res)=>{
    var id = +req.params.id;
   await getProductById(id).then((product) => {
        if (product) {
            res.json(product);
        } else {
            res.json({msg: "Product not found"});
        }
    }).catch((error) => {
        res.status(500).json({msg: "Error fetching product"});
    });
})
router.post("/addproduct", async(req, res)=>{
    var newProduct = req.body;
    await addProduct(newProduct).then((product) => {
        console.log(product);
        res.json("Product added successfully");
    }).catch((error) => {
        res.status(500).json({msg: "Error adding product"});
    });
})





router.delete("/product/:id", async (req, res) => {
    try {
        var id = +req.params.id;
        await deleteProduct(id).then(() => {
            res.json({msg: `Product with id ${req.params.id} deleted successfully`});
        }).catch((error) => {
            res.status(500).json({msg: "Error deleting product"});
        });
    } catch (e) {
        res.status(500).json({msg: "Something went wrong!"});
    }
});

router.put("/product/:id", async (req, res) => {
    try {
        var data = req.body;
        var id = +req.params.id;
        await updateProduct(id, data).then(() => {
            res.json("Product updated successfully");
        }).catch((error) => {
            res.status(500).json({msg: "Error updating product"});
        });
    } catch (e) {
        res.status(500).json({msg: "Something went wrong!"});
    }
});


module.exports = router;