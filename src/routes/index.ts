import express from "express"
const userRoutes= require("../routes/user")
const router = express.Router()
router.use('/user',userRoutes )

// router.use('/order',orderRoutes )
module.exports=router