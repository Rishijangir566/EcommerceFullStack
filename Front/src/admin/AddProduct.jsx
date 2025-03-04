import { useContext, useState } from "react"
import instance from "../axiosConfig";
import { ecomcontext } from "../context/EcomContext";

function AddProduct() {
    const {categories} =useContext(ecomcontext)
    const [form, setForm] = useState({
        title: "",
        brand: "",
        category: "",
        usualPrice: "",
        discountPrice: "",
        description:"",
        image: ""
    })

    function handleChange(e) {
        if (e.target.name === "image")
            setForm({ ...form, image: e.target.files[0] })
        else {
            const { name, value } = e.target;
            setForm({ ...form, [name]: value })
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const frm = new FormData();
            frm.append("title", form.title)
            frm.append("brand", form.brand)
            frm.append("category", form.category)
            frm.append("usualPrice", form.usualPrice)
            frm.append("discountPrice", form.discountPrice)
            frm.append("description", form.description)
            frm.append("image", form.image)

            const response = await instance.post("/product/add", frm , {withCredentials:true})
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="text" className="border" name="title"
                placeholder="Enter Product Title"
                value={form.title} onChange={handleChange} />

            <input type="text" className="border" name="brand"
                placeholder="Enter Product Brand"
                value={form.brand} onChange={handleChange} />

                <select name="category" id=""
                 value={form.category} onChange={handleChange}>
                    <option value="" selected disabled> Select Category</option>
                    {categories.map((category , index)=>{
                        return (
                            <option value={category._id} key={index}>
                                {category.name}
                            </option>
                        )
                    })}
                </select>

            {/* <input type="text" className="border" name="category"
                placeholder="Enter Product Category"
                value={form.category} onChange={handleChange} /> */}

            <input type="text" className="border" name="usualPrice"
                placeholder="Enter Product Usual Price"
                value={form.usualPrice} onChange={handleChange} />

            <input type="text" className="border" name="discountPrice"
                placeholder="Enter Product Discounted Price"
                value={form.discountPrice} onChange={handleChange} />

            <input type="text" className="border" name="description"
                placeholder="Enter Description"
                value={form.description} onChange={handleChange} />

            <input type="file" name="image" onChange={handleChange} />

            <button type="submit"> Add Product </button>

        </form>
    )
}

export default AddProduct