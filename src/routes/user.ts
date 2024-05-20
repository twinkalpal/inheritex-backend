import express from "express"
import { Login, createUser, getUserList } from "../controller/user.controller"
import { validation } from "../middleware/validation"
import { Loginschema, userSignupSchema } from "../Validation/user.schema"
const router = express.Router()
router.post('/signup',validation(userSignupSchema),createUser )
router.post('/login',validation(Loginschema),Login )
module.exports=router