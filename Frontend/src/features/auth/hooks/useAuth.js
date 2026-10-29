import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading, authError, setAuthError } = context


    const handleLogin = async ({ email, password }) => {
        setAuthError("")
        setLoading(true)
        try {
            const data = await login({ email, password })
            if (!data?.user) throw new Error("Login failed. Please check your email and password.")
            setUser(data.user)
            return true
        } catch (err) {
            setAuthError(err.message || "Unable to log in. Please try again.")
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setAuthError("")
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            if (!data?.user) throw new Error("Account creation failed. Please try again.")
            setUser(data.user)
            return true
        } catch (err) {
            setAuthError(err.message || "Unable to create your account. Please try again.")
            return false
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setAuthError("")
        setLoading(true)
        try {
            await logout()
            setUser(null)
        } catch (err) {
            setAuthError(err.message || "Unable to log out. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            try {

                const data = await getMe()
                setUser(data?.user ?? null)
            } catch (err) {
                setUser(null)
                setAuthError(err.message || "Unable to reach the account service.")
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])

    return { user, loading, authError, handleRegister, handleLogin, handleLogout }
}
