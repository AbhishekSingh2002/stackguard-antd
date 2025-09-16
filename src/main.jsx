import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./styles.css"

const rootEl = document.getElementById("root")
if (!rootEl) {
  throw new Error('Root element not found. Please add <div id="root"></div> to index.html')
}

createRoot(rootEl).render(
  <React.StrictMode>
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
