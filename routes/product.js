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
router.put("/:id", verifyTokenAdmin, async (req, res) => {
   
    try {
        const updateProduct = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true
            }
        );
        res.status(200).json(updateProduct)
    }
    catch (err) {
        res.status(500).json(err);
    }

});
//DELETE one product
router.delete(":/id", verifyTokenAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("product deleted successfully......")

    }
    catch (err) {
        res.status(500).json(err);
    }
});
//find one product
router.get("/find/:id",  async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(others)

    }
    catch (err) {
        res.status(500).json(err);
    }
});

//GET users REQUEST
router.get("/",  async (req, res) => {
    const qNew = req.query.new;
    const qCatagory = req.query.catagory;
    

    try {
        let products;

if(qNew){
    products = await Product.find().sort({createdAt: -1}).limit(2);
    
}
else if(qCatagory){
   
    products= await Product.find({
        categories:{
            $in:[qCatagory],


    },
})


}
else {
    products =await Product.find();
}
        
        res.status(200).json(users)

    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router      