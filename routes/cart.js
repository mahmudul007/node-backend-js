const router = require("express").Router();
const Cart = require("../Model/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAdmin } = require("./verifyToken");
// add product on cart
router.post('/', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);


    } catch (error) {
        res.status(500).json(error);

    }
});
// //update cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true
            }
        );
        res.status(200).json(updatedCart)
    }
    catch (err) {
        res.status(500).json(err);
    }

});
// //DELETE one product
router.delete(":/id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("cart  deleted successfully......")

    }
    catch (err) {
        res.status(500).json(err);
    }
});
// //find user cart
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart)

    }
    catch (err) {
        res.status(500).json(err);
    }
});

// //GET all 
router.get("/", verifyTokenAdmin, async (req, res) => {
    try {
        const allCart = await Cart.find();
        res.status(200).json(allCart);
    }
    catch (err) {
        res.status(500).json(err);
    }

})


module.exports = router      