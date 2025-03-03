import { Children, useEffect, useState } from "react"
import instance from "../axiosConfig"

function ProtectedRoute() {
  const [allowed, setAllowed] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllowedStatus()
  }, [])

  async function fetchAllowedStatus() {
    try {
      setLoading(true)
      await instance.get("/get/check", { withCredentials: true });
      setAllowed(true)
    } catch (error) {
      console.log(error);
      setLoading(false)
      setAllowed(false)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading ... </div>

  return allowed ? Children : (window.location.href = "/admin/login")

}

export default ProtectedRoute

