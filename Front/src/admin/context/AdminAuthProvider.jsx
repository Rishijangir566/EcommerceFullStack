/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import instance from "../../axiosConfig";


const AdminAuth = createContext(null)


function AdminAuthProvider({ children }) {

    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [loggedInAdmin, setLoggedInAdmin] = useState({});

    useEffect(() => {
        checkAuthAdmin();
    }, []);

    async function checkAuthAdmin() {
        try {
            const response = await instance.get("/admin/check", {
                withCredentials: true,
            });
            if (response.status === 200) {
                // console.log(response.data.admin);
                setIsAdminLoggedIn(true);
                setLoggedInAdmin(response.data.admin);
            }
        } catch (error) {
            console.log(error);
            setIsAdminLoggedIn(false);
            setLoggedInAdmin({});
        }
    }

    async function adminLogout() {
        try {
            await instance.post(
                "/admin/logout",
                {},
                {
                    withCredentials: true,
                }
            );
            setIsAdminLoggedIn(false);
            checkAuthAdmin();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AdminAuth.Provider
            value={{
                isAdminLoggedIn,
                loggedInAdmin,
                adminLogout,
                checkAuthAdmin,
            }}
        >
            {children}
        </AdminAuth.Provider>
    );
}

export function useAdminAuth() {
    return useContext(AdminAuth);
}

export default AdminAuthProvider