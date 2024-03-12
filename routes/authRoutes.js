import express from "express"
import {
    registerController,
    loginController,
} from '../controllers/authController.js'
import { 
    createProductController,
         
} from "../controllers/productController.js"

// router object
const router = express.Router()

// routing
// Register || Method: POST
router.post("/register", registerController)

// Login || Method: POST
router.post("/login", loginController)

// Create new product || Method: POST
router.post("/product", createProductController)

export default router