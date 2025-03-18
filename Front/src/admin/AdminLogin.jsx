import { useState } from "react"
// import { useNavigate } from "react-router-dom"
import instance from "../axiosConfig"
import { useAuth } from "../context/AuthProvider"

function AdminLogin() {

    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("");

    const { checkAuthAdmin } = useAuth();
    // const navigate = useNavigate();

    function handlechange(e) {
        const { name, value } = e.target
        setData((prev) => {
            return { ...prev, [name]: value }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await instance.post("/admin/login", data, { withCredentials: true })
            console.log(response.data);
            checkAuthAdmin();
            if (response.status === 200 && response.data.message === "Admin Login Successful") 
                {window.location.href="/admin/home"}
                // { navigate("/admin/addProduct") }

        } catch (error) {
            console.log(error);
            setError(error.message)
        }
    }

    return (
        <>
            <div className=" py-4 px-8 bg-red-100 rounded-2xl w-[30%]  mx-auto  my-12 ">


                <h2 className="text-center my-4 text-3xl font-medium"> Registration Form</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form action="" onSubmit={handleSubmit} className="flex-col flex">
                    <input
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        value={data.email}
                        onChange={handlechange}
                        className="border mt-4 pl-2"
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={data.password}
                        onChange={handlechange}
                        className="border mt-4 pl-2"
                    />
                    <button type="submit" className="bg-green-300 py-1 my-8 rounded text-xl font-bold"> Login</button>
                </form>
            </div>

        </>
    )
}

export default AdminLogin