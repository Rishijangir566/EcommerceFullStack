import uploadToCloudinary from "../middlewares/cloudinary.js"
import categoryModel from "../models/categoryModel.js"
import ProductModelData from "../models/productModel.js"

export async function addToProduct(req, res) {
    try {
        const file = req.file
        if (!file) return res.status(404).send({ message: "file not found" })
        const secure_url = await uploadToCloudinary(req)
        const newProduct = new ProductModelData({ ...req.body, image: secure_url })
        await newProduct.save()
        res.status(201).send({ message: "product Added" })
    } catch (error) {
        res.status(500).send({ message: "product not found", Error: error.message })
    }

}


export async function fetchProducts(req, res) {
    try {
        let query = {}
        if (req.params.id) {
            query._id = req.params.id;
        }

        if (req.query.category) {
            const categoryId = await categoryModel.find({
                name: { $regex: new RegExp(`^${req.query.category}$`, "i") }
            })
            query.category = categoryId;
        }

        const products = await ProductModelData.find(query)
        res.send(products)
    } catch (error) {
        res.status(500).send({ message: "couldn't fetch products", Error: error.message })
    }

}

export async function fetchCategories(req, res) {
    try {
        const category = await categoryModel.find({})
        res.send(category)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ Error: error.message })
    }
}


export async function addCategory(req, res) {
    try {
        console.log(req.file);
        const file = req.file;
        if (!file) return res.status(404).send({ message: "file not found" })

        const secure_url = await uploadToCloudinary(req)
        const newCategory = new categoryModel({ ...req.body, image: secure_url })
        await newCategory.save()

        res.status(201).send({ message: "category added" })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ Error: error.message })
    }
}

export async function hotDeals(req, res) {
    try {
        const hotDeals = await ProductModelData.find({
            discountPrice: { $gte: 300 }
        })
        console.log(hotDeals);
        res.status(200).json(hotDeals)

    } catch (error) {
        console.error("error fetching hot deals ", error);
        res.status(500).json({ error: "internal server error" })
    }
}
