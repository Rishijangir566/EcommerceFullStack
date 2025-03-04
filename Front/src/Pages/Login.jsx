import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import instance from "../axiosConfig"
import { useAuth } from "../context/AuthProvider"

function Login() {

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const { checkAuth } = useAuth();
    const navigate = useNavigate();

    function handlechange(e) {
        const { name, value } = e.target
        setData((prev) => {
            return { ...prev, [name]: value }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await instance.post("/user/login", data, { withCredentials: true })
            console.log(response.data);
            checkAuth()
            if (response.status === 200 && response.data.message === "Login Successful"){ navigate("/")} 
               
            // window.location.href("/")
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <>
            <div className=" py-4 px-8 bg-red-100 rounded-2xl w-[30%]  mx-auto  my-12 ">


                <h2 className="text-center my-4 text-3xl font-medium"> Login Form</h2>
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
            <p className="my-8">
                New User ? <Link to="/user/register" className="text-blue-700 "> Register</Link>
            </p>
        </>
    )
}

export default Login