import { createContext, useContext, useState, FC, ReactNode, SetStateAction, Dispatch } from 'react'

export type AuthProviderProps = {
    auth?: boolean;
    setAuth?: Dispatch<SetStateAction<boolean>>;
    children?: ReactNode
}

const AuthContext = createContext<AuthProviderProps | null>(null)

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({children}: AuthProviderProps) => {
    const [auth, setAuth] = useState(false)
    
    return (
        <>
            <AuthContext.Provider value={{ auth, setAuth }}>
                {children}
            </AuthContext.Provider>
        </>
    );
}

export default AuthProvider;