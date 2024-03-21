import { createContext, useContext, useState } from "react"
const AuthContext = createContext()

function AuthProvider({children}){
    const [login, setLogin] = useState(true)

    return (
        <AuthContext.Provider value={{login, setLogin}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider