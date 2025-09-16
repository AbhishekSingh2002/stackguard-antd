// src/lib/auth.js
// Minimal demo auth utilities using localStorage. Replace with real API in production.

const LS_AUTH = "stackguard_auth_v1"
const LS_CONFIG_KEY = "stackguard_config_key_v1"

export async function signIn({ email, password }) {
  // keep async so callers can await - demo stub
  if (!email || !email.includes("@") || !password || password.length < 6) {
    return { ok: false, message: "Invalid credentials" }
  }
  const token = btoa(`${email}:${Date.now()}`)
  try {
    localStorage.setItem(LS_AUTH, JSON.stringify({ token, email }))
  } catch (err) {
    // localStorage may be unavailable in some contexts
    console.error("Failed to persist auth:", err)
  }
  return { ok: true, token }
}

export async function signUp({ name, email, password }) {
  // Demo checks
  if (!name || !email || !email.includes("@") || !password || password.length < 6) {
    return { ok: false, message: "Validation failed" }
  }
  const token = btoa(`${email}:${Date.now()}`)
  try {
    localStorage.setItem(LS_AUTH, JSON.stringify({ token, email, name }))
  } catch (err) {
    console.error("Failed to persist auth:", err)
  }
  return { ok: true, token }
}

export function signOut({ clearConfig = false } = {}) {
  try {
    localStorage.removeItem(LS_AUTH)
    if (clearConfig) localStorage.removeItem(LS_CONFIG_KEY)
  } catch (err) {
    console.error("signOut error:", err)
  }
}

export function isAuthenticated() {
  try {
    return !!localStorage.getItem(LS_AUTH)
  } catch {
    return false
  }
}

export function getAuth() {
  try {
    const raw = localStorage.getItem(LS_AUTH)
    if (!raw) return null
    return JSON.parse(raw)
  } catch (err) {
    console.error("getAuth parse error:", err)
    return null
  }
}

// renamed to saveConfigKey to avoid collisions with state setter names in components
export function saveConfigKey(key) {
  try {
    console.log("Saving config key:", key ? `Length: ${key.length}` : "null")
    localStorage.setItem(LS_CONFIG_KEY, key)
    console.log("Config key saved successfully")
    // Verify it was saved
    const saved = localStorage.getItem(LS_CONFIG_KEY)
    console.log("Verification - saved key length:", saved ? saved.length : "null")
    return true // Return true on successful save
  } catch (err) {
    console.error("Failed to persist config key:", err)
    throw err // Re-throw to allow error handling in components
  }
}

export function getConfigKey() {
  try {
    return localStorage.getItem(LS_CONFIG_KEY)
  } catch {
    return null
  }
}

export function hasValidConfigKey() {
  const k = getConfigKey()
  if (!k) return false
  return k.length >= 100 && k.length <= 1000
}
