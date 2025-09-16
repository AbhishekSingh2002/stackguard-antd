import React from "react"
import { Navigate, useLocation, Outlet } from "react-router-dom"
import { isAuthenticated, hasValidConfigKey } from "../lib/auth"

export default function ProtectedRoute({ requireConfig = false }) {
  const location = useLocation()
  
  // Debug logging
  console.log(`ProtectedRoute - Path: ${location.pathname}`)
  console.log(`ProtectedRoute - isAuthenticated: ${isAuthenticated()}`)
  console.log(`ProtectedRoute - requireConfig: ${requireConfig}`)
  console.log(`ProtectedRoute - hasValidConfigKey: ${hasValidConfigKey()}`)

  if (!isAuthenticated()) {
    console.log(`ProtectedRoute - Redirecting to /auth from ${location.pathname}`)
    // Redirect to /auth but preserve attempted location
    return <Navigate to="/auth" replace state={{ from: location }} />
  }

  if (requireConfig && !hasValidConfigKey()) {
    console.log(`ProtectedRoute - Redirecting to /config from ${location.pathname} (no valid config key)`)
    // Redirect to /config but preserve intended target
    return <Navigate to="/config" replace state={{ from: location }} />
  }

  console.log(`ProtectedRoute - Allowing access to ${location.pathname}`)
  return <Outlet />
}
