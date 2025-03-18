import { useContext, useState } from "react"
import instance from "../axiosConfig";
import { ecomcontext } from "../context/EcomContext";

function AddProduct() {
    const { categories } = useContext(ecomcontext)
    const [form, setForm] = useState({
        title: "",
        brand: "",
        category: "",
        usualPrice: "",
        discountType: "",
        discount: "",
        discountPrice: "",
        description: "",
        image: ""
    })
    const [error, setError] = useState("");


    function handleChange(e) {
        if (e.target.name === "image")
            setForm({ ...form, image: e.target.files[0] })

        else {
            const { name, value } = e.target;
            setForm({ ...form, [name]: value })
        }
    }

    function handleDiscountPriceChange(e) {
        const a = form.discountType === "%"
            ? form.usualPrice - (e.target.value * form.usualPrice) / 100
            : form.usualPrice - e.target.value;
        setForm((form) => ({ ...form,discountPrice:a}))
    }


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const frm = new FormData();
            frm.append("title", form.title)
            frm.append("brand", form.brand)
            frm.append("category", form.category)
            frm.append("usualPrice", form.usualPrice)
            frm.append("discount", form.discount)
            frm.append("discountPrice", form.discountPrice)
            frm.append("description", form.description)
            frm.append("image", form.image)

            const response = await instance.post("/product/add", frm, { withCredentials: true })
            console.log(response);
        } catch (error) {
            console.log(error);
            setError(error.message)
        }
    }

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-4">
        <div className="max-w-lg w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <h2 className="text-3xl font-bold text-center">Add Product</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form
            action=""
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col gap-3 items-center justify-between space-y-6"
          >
            <input
              type="text"
              placeholder="Enter Product Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <input
              type="text"
              placeholder="Enter Product Brand"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="category"
              id=""
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="" selected disabled placeholder="Select Category">
                Select Category
              </option>
              {categories?.category?.map((category, index) => {
                return (
                  <option value={category._id} key={index}>
                    {category.name}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              placeholder="Enter Product Usual Price"
              name="OriginalPrice"
              value={form.usualPrice}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
  
            <div className="flex gap-4">
              <select
                name="discountType"
                id="discountType"
                value={form.discountType}
                onChange={handleChange}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="%">In Percentage</option>
                <option value="inr">In Rupees</option>
              </select>
              <input
                type="text"
                name="discount"
                placeholder={
                  form.discountType === "%"
                    ? "Discount in Percentage"
                    : "Discount in Rupees"
                }
                value={form.discount}
                onChange={handleChange}
                onBlur={handleDiscountPriceChange}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            <input
              type="text"
              placeholder="Enter Product Discounted Price"
              name="discountedPrice"
              value={form.discountPrice}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
  
            <input
              type="text"
              placeholder="Enter Product Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
  
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
}

export default AddProduct