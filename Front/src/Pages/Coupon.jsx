import { useState } from "react";
import instance from "../axiosConfig";

function CouponForm() {
  const [formData, setFormData] = useState({
    code: "",
    category: "",
    expiresAt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(formData);    
      const res = await instance.post("/admin/coupons", formData);
      console.log("Coupon created:", res.data);
      alert("Coupon saved!");
      setFormData({ code: "", category: "", expiresAt: "" });
    } catch (err) {
      console.error("Error creating coupon:", err);
      alert("Failed to create coupon");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-24 p-4 border rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-center">Create Coupon</h2>

      <div>
        <label className="block mb-1 font-medium">Code</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Expires At</label>
        <input
          type="datetime-local"
          name="expiresAt"
          value={formData.expiresAt}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Save Coupon
      </button>
    </form>
  );
}

export default CouponForm;
