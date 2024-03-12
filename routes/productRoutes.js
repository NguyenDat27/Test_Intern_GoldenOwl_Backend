import express from "express"
import { 
    createProductController,
    getAllProductsController,
    getProductController,
    updateProductController,
    deleteProductController,
    searchProductByNameController
} from "../controllers/productController.js"

// router object
const router = express.Router()

// routing

// Create new product || Method: POST
router.post("/product", createProductController)

// Get all product || Method: GET
router.get("/product", getAllProductsController)

// Get product || Methos: GET
router.get("/product/:id", getProductController)

// Update product || Method: PUT
router.put("/product/:id", updateProductController)

// Delete product || Method: DELETE
router.delete("/product/:id", deleteProductController)

// Search product by name || Method: GET
router.get("/search/:keyword", searchProductByNameController)

export default router