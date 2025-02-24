import { useState } from "react"
import { Link } from "react-router-dom"
import instance from "../axiosConfig"

function Login() {

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    function handlechange(e) {
        const { name, value } = e.target
        setData((prev) => {
            return { ...prev, [name]: value }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await instance.post("/user/login", data)
            console.log(response.data);

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <>
            <div className=" py-4 px-8 bg-red-100 rounded-2xl w-[30%]  mx-auto  my-12 ">


                <h2 className="text-center my-4 text-3xl font-medium"> Registration Form</h2>
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