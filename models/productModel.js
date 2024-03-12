import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
        id:{
            type: String,
            require: true,
            unique: true
        },
        image:{
            type: String,
            require: true,
        },
        name:{
            type: String,
            require: true
        },
        description:{
            type: String,
            require: true,
        },
        price:{
            type: Number,
            require: true,
        },
        color:{
            type: String,
            require: true,
        },
    }, 
    {timestamps: true}
);

export default mongoose.model('products', productSchema)