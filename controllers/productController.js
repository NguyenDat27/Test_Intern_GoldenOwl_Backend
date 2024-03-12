import productModel from "../models/productModel.js";

// Create new product
export const createProductController = async(req, res) => {
    try {
        const {id, image, name, description, price, color} = req.body
        // validation
        if (!id) {  
            return res.send({ message: 'Id product is required' })
        }
        if (!image) {
            return res.send({ message: 'URL image product is required' })
        }
        if (!name) {
            return res.send({ message: 'Name product is required' })
        }
        if (!description) {
            return res.send({ message: 'Description product is required' })
        }
        if (!price) {
            return res.send({ message: 'Price product is required' })
        }
        if (!color) {
            return res.send({ message: 'Color is required' })
        }
        //check id product
        const exisitingProduct = await productModel.findOne({ id });
        //exisiting product
        if (exisitingProduct) {
            return res.status(200).send({
                success: false,
                message: "Id product already exist",
            });
        }
        const product = await new productModel({
            id,
            image,
            name,
            description,
            price,
            color,
        }).save();
      
        res.status(201).send({
            success: true,
            message: "Create new product success",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error created",
            error,
        });
    }
}

// Get all product
export const getAllProductsController = async(req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).send({
            success: true,
            message: "Get a list of all successful products",
        products
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error getting list of all products",
        });
    }
}

// Get product
export const getProductController = async(req, res) => {
    try {
        const productID = req.params.id;
        const product = await productModel.findOne({id : productID});
        if (product) {
            return res.status(200).send({
                success: true,
                message: "This product exists",
                product,
            });
        } else {
            return res.status(404).send({
                success: false,
                message: "This product does not exist",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error Server",
        });
    }
}

// Update product
export const updateProductController = async(req, res) => {
    try {
        const productID = req.params.id;
        const {image, name, description, price, color} = req.body

        const updatedFields = {};
        if (image) updatedFields.image = image;
        if (name) updatedFields.name = name;
        if (description) updatedFields.description = description;
        if (price) updatedFields.price = price;
        if (color) updatedFields.color = color;

        const product = await productModel.findOneAndUpdate(
            { id: productID },
            updatedFields,
            { new: true },
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).send({
            success: true,
            messsage: "Update product success",
            product,
        });
    } catch(error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error while updating product",
        });
    }
}

// Delete product
export const deleteProductController = async(req, res) => {
    try {
        const productID = req.params.id;
        await productModel.findOneAndDelete({id: productID})
        res.status(200).send({
            success: true,
            message: "Delete product success",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error,
        });
    }
}

// Search product by name
export const searchProductByNameController = async (req, res) => {
    try {
        const { keyword } = req.params;

        const products = await productModel
            .find({
                $or: [ 
                    { name: { $regex: keyword, $options: "i" } },
                ],
            });

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found matching the search criteria"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product found",
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
            message: "Error when searching product by name"
        });
    }
};