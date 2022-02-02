const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
    {
        userId: { type: String, require: true },
        products: [{
            productId: {
                type: String

            },
            quantity: {
                type: String,
                default: 1
            },
        },

        ],


    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("Cart", cartSchema);