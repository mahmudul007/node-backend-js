const router = require("express").Router();
const req = require("express/lib/request");
const { verifyToken } = require('./verifyToken');

router.put('/:id', (req, res) => {
    // if(req.user.id===req.params.id || req.user.isAdmin)
    res.send(req)

})


module.exports = router               