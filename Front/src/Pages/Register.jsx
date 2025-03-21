import { useState } from "react"
import { Link } from "react-router-dom"
import instance from "../axiosConfig"

function Register() {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [passwordMatch, setPasswordMatch] = useState(true)

    function handleChange(e) {
        const { name, value } = e.target
        setData((prev) => {
            return { ...prev, [name]: value };
        })
    }

   async function handleSubmit(e) {
        e.preventDefault()
        try{
            const response = await instance.post("/user/register",data)
            console.log(response.data);
            
        }catch(error){
            console.log(error);
            
        }
    }

    function handleConfirmPassword(e) {
        if (e.target.value !== data.password) setPasswordMatch(false)
            else{setPasswordMatch(true)}
    }

    return (
        <> 
        <div className=" py-4 px-8 bg-red-100 rounded-2xl w-[40%]  mx-auto  my-20 ">

       
            <h2 className="text-center my-4 text-3xl font-medium"> Registration Form</h2>
            <form action="" onSubmit={handleSubmit} className="flex-col flex">
                <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    className="border mt-4 pl-2"
                />

                <input
                    type="email"
                    placeholder="Enter E-mail"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className="border mt-4 pl-2"
                />

                <input
                    type="password"
                    placeholder="Choose a strong Password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    className="border mt-4 pl-2"
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="cpassword"
                    onChange={handleConfirmPassword}
                    className="border mt-4 pl-2"
                />

                {!passwordMatch ? <span>Password dosnt match </span> : ""}
                <button type="submit" className="bg-green-300 py-1 my-8 rounded text-xl font-bold"> Register</button>
            </form>
            </div>
            <p className="my-8">
        Already Register ? <Link to="/user/login" className="text-blue-700 "> Login</Link>
    </p>
        </>
    )
}

export default Register