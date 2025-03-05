/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react"
import instance from "../axiosConfig"

const AuthContext = createContext(null)

function AuthProvider({ children }) {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [isAdminLoggedIn, setAdminLoggedIn] = useState(false)
    useEffect(() => {
        checkAuth()
        checkAuthAdmin()
    }, [])
    console.log(isUserLoggedIn);

    async function checkAuth() {
        try {
            await instance.get("/auth/check", { withCredentials: true })
            setIsUserLoggedIn(true)
        } catch (error) {
            console.log(error);
            setIsUserLoggedIn(false)
        }
    }

    async function checkAuthAdmin() {
        try {
            await instance.get("/admin/check", {withCredentials: true,})
            setAdminLoggedIn(true)
        } catch (error) {
            console.log(error);
            setAdminLoggedIn(false)
        }
    }

    async function logout() {
        try {
            if (isUserLoggedIn) {
                await instance.post("/auth/logout", {}, { withCredentials: true });
                setIsUserLoggedIn(false)
                checkAuth()
            } else {
                await instance.post("/admin/logout", {}, { withCredentials: true })
                setAdminLoggedIn(false)
                checkAuthAdmin()
                window.location.href = "/admin/login"
            }

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <AuthContext.Provider value={{ isUserLoggedIn, logout, checkAuth, isAdminLoggedIn, checkAuthAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}

export default AuthProvider