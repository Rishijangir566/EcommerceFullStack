import mongoose from "mongoose";
import uploadToCloudinary from "../middlewares/cloudinary.js";
import categoryModel from "../models/categoryModel.js";
import ProductModelData from "../models/productModel.js";

export async function addToProduct(req, res) {
  try {
    const file = req.file;
    if (!file) return res.status(404).send({ message: "file not found" });
    const secure_url = await uploadToCloudinary(req);

    const categoryObjectId = new mongoose.Types.ObjectId(req.body.category);
    const newProduct = new ProductModelData({
      ...req.body,
      image: secure_url,
      category: categoryObjectId,
    });
    await newProduct.save();
    res.status(201).send({ message: "product Added" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "product not found", Error: error.message });
  }
}

export async function fetchProducts(req, res) {
  try {
    let query = {};
    if (req.params.id) {
      // query._id = req.params.id;
      query.slug = req.params.id;
    }

    if (req.query.category) {
     query.category= new mongoose.Types.ObjectId(req.query.category)
    }
    // console.log(req.query);
    if (req.query.categoryName) {
      const category = await categoryModel.find({
        name: { $regex: new RegExp(`^${req.query.categoryName}$`, "i") },
      });
      query.category = category[0]._id;
    }
    // pagination use in backend 10 product and next 10 product show
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = Number(req.query.limit) === -1 ? 0 : 9;
    const skip = (page - 1) * limit;

    // console.log("query", query);

    const products = await ProductModelData.find(query)
      .skip(skip)
      .limit(limit)
      .populate("category");
    const TotalCount = await ProductModelData.countDocuments(query);

    if (!products) {
      return res.status(500).send({ message: "No products Data found" });
    }

    return res.send({
      products,
      currentPage: page,
      totalPages: Math.ceil(TotalCount / limit),
    });

    // const products = await ProductModelData.find(query).populate("category")
    // res.send(products)
  } catch (error) {
    res
      .status(500)
      .send({ message: "couldn't fetch products", Error: error.message });
  }
}

export async function fetchCategories(req, res) {
  try {
    const category = await categoryModel.find({});
    res.send(category);
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: error.message });
  }
}

export async function addCategory(req, res) {
  try {
    // console.log(req.file);
    const file = req.file;
    if (!file) return res.status(404).send({ message: "file not found" });

    // chaching if category already exixts
    const exist = await categoryModel.find({ name: req.body.name });
    if (exist.length > 0)
      return res.status(400).send({ message: "Category Already Exists" });

    //upload category icon
    const secure_url = await uploadToCloudinary(req);
    const newCategory = new categoryModel({ ...req.body, image: secure_url });
    await newCategory.save();

    res.status(201).send({ message: "category added" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Error: error.message });
  }
}

export async function hotDeals(req, res) {
  try {
    const hotDeals = await ProductModelData.find({
      discountPrice: { $gte: 1000 }, // gt = greaterthan & gte greaterthan equal to
    });
    // console.log(hotDeals);
    res.status(200).json(hotDeals);
  } catch (error) {
    console.error("error fetching hot deals ", error);
    res.status(500).json({ error: "internal server error" });
  }
}

export async function DeleteProductOrCategory(req, res) {
  try {
    const { id } = req.params;
    // console.log(req.params);

    if (!id) return res.status(400).send({ message: "No id Found" });

    let WhatToDelete;
    WhatToDelete = await ProductModelData.findByIdAndDelete(id);
    if (!WhatToDelete) {
      WhatToDelete = await categoryModel.findByIdAndDelete(id);

      const productsToModify = await ProductModelData.find({
        category: WhatToDelete._id,
      });
      const modifyedProduct = productsToModify.forEach(async (product) => {
        await product.updateOne({ category: "" });
      });
      await WhatToDelete.deleteOne();
    }

    if (!WhatToDelete)
      return res
        .status(400)
        .send({ message: "could not delete the selected resource" });

    return res.status(200).send({ message: "Resource Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
}
