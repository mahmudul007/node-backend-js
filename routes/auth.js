const router = require("express").Router();
const User = require("../Model/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user &&
      res.status(401).json({
        message: "wrong username",
      });

    const hashpass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalPassword = hashpass.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      res.status(401).json({
        status: "failed",
        message: "wrong credential",
      });
    } else {
      const accesToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );

      const { password, ...others } = user._doc;

      res.status(200).json({
        ...others,
        accesToken,
        message: "successfully",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
