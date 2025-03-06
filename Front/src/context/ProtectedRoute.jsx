/* eslint-disable react/prop-types */
import {useEffect, useState } from "react"
import instance from "../axiosConfig"
import { Navigate } from "react-router-dom"

function ProtectedRoute({children}) {
  const [allowed, setAllowed] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllowedStatus()
  }, [])

  async function fetchAllowedStatus() {
    try {
      setLoading(true)
      await instance.get("/admin/check", { withCredentials: true });
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

  return allowed ? (children) :(<Navigate to={"/"+children.props.destination} replace />)  

}

export default ProtectedRoute

