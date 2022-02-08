const router = require("express").Router();
const Product = require("../Model/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAdmin } = require("./verifyToken");


//add product on inventory
router.post('/', verifyToken, async(req, res) =>{
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
        
    
    } catch (error) {
        res.status(500).json(error);
        
    }   
});
//update product

module.exports = router      