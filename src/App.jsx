import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Auth from "./pages/Auth"
import Configuration from "./pages/Configuration"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/auth" replace />} />

      {/* Public route */}
      <Route path="/auth" element={<Auth />} />

      {/* Protected: requires auth */}
      <Route element={<ProtectedRoute />}>
        <Route path="/config" element={<Configuration />} />
      </Route>

      {/* Protected: requires auth + config */}
      <Route element={<ProtectedRoute requireConfig />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={
          <div style={{ padding: "50px", textAlign: "center" }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
          </div>
        }
      />
    </Routes>
  )
}
