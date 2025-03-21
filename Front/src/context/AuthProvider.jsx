/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react"
import instance from "../axiosConfig"

const AuthContext = createContext(null)

function AuthProvider({ children }) {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [loggegInUser, setLoggedInUser] = useState({})
    useEffect(() => {
        checkAuth()
        // checkAuthAdmin()
    }, [])
    // console.log(isUserLoggedIn);

    
    // user login check
    async function checkAuth() {
        try {
          const response=  await instance.get("/auth/check", { withCredentials: true })
           if(response.status===200){
               setIsUserLoggedIn(true)
              setLoggedInUser(response.user)
           }
        } catch (error) {
            console.log(error);
            setIsUserLoggedIn(false)
            setLoggedInUser({})
        }
    }

    // admin login check
    // async function checkAuthAdmin() {
    //     try {
    //         await instance.get("/admin/check", {withCredentials: true,})
    //         setAdminLoggedIn(true)
    //     } catch (error) {
    //         console.log(error);
    //         setAdminLoggedIn(false)
    //     }
    // }

    async function logout() {
        try {
           
                await instance.post("/auth/logout", {}, { withCredentials: true });
                setIsUserLoggedIn(false)
                checkAuth()
            }catch (error) {
            console.log(error);

        }
    }

    return (
        <AuthContext.Provider value={{ isUserLoggedIn, logout, checkAuth, loggegInUser, }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}

export default AuthProvider