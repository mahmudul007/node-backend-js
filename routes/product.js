const router = require("express").Router();
const Product = require("../Model/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAdmin,
} = require("./verifyToken");

//add product on inventory
router.post("/", verifyToken, async (req, res) => {
  // console.log("body", req.body);
  // console.log("files", req.files);
  // res.send({
  //   status: "success",
  //   message: " file uploaded",
  // });
  const pic = req.files.img;
  const picData = pic.data;
  const encodePic = picData.toString("base64");
  const imgBuffer = Buffer.from(encodePic, "base64");
  // Buffer.from(req.files.img.toString("base64"), "base64")

  const saveImage = Product({
    title: req.body.title,
    desc: req.body.desc,
    img: {
      data: imgBuffer,
      contentType: "image/png/jpeg",
    },
    categories: req.body.categories,
    size: req.body.size,
    color: req.body.color,
    price: req.body.price,
  });
  saveImage
    .save()
    .then((res) => {
      console.log("success");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
  res.send({
    status: "success",
    message: " file uploaded",
  });
  // res.send("image is saved");
  // try {
  //   const savedProduct = await saveImage.save();
  //   res.status(200).json(savedProduct);
  // } catch (error) {
  //   res.status(500).json({
  //     status: "failed",
  //   });
  // }
});
//update product
router.put("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//verifyTokenAdmin
//delete
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("counted delete");
  } catch (err) {
    res.status(500).json(err);
  }
});

//find one product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET users REQUEST
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCatagory = req.query.category;
  console.log(qCatagory);

  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCatagory) {
      products = await Product.find({
        categories: {
          $in: [qCatagory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
