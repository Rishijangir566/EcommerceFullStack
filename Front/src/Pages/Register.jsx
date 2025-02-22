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
            <form action="" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    className="border"
                />

                <input
                    type="email"
                    placeholder="Enter E-mail"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className="border"
                />

                <input
                    type="password"
                    placeholder="Choose a strong Password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    className="border"
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="cpassword"
                    onChange={handleConfirmPassword}
                    className="border"
                />

                {!passwordMatch ? <span>Password dosnt match </span> : ""}
                <button type="submit"> Register</button>
            </form>
            <p>
        Already Register ? <Link to="/user/login"> Login</Link>
    </p>
        </>
    )
}

export default Register