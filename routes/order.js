const router = require("express").Router();
const Order = require('../Model/Order');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAdmin } = require("./verifyToken");

//my order give
router.post('/', verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);


    } catch (error) {
        res.status(500).json(error);

    }
});
//update order
router.put("/:id", verifyTokenAdmin, async (req, res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true
            }
        );
        res.status(200).json(updatedOrder)
    }
    catch (err) {
        res.status(500).json(err);
    }

});
//DELETE one order
router.delete(":/id", verifyTokenAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("order deleted successfully......")

    }
    catch (err) {
        res.status(500).json(err);
    }
});
//find one product
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order)

    }
    catch (err) {
        res.status(500).json(err);
    }
});

// //GET all 
router.get("/", verifyTokenAdmin, async (req, res) => {
    try {
        const allOrder = await Order.find();
        res.status(200).json(allOrder);
    }
    catch (err) {
        res.status(500).json(err);
    }

})



module.exports = router      