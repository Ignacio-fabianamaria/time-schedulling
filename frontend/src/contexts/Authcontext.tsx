import { createContext, useState } from "react";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState('faby');

    return (
        <AuthContext.Provider value={ {user}}>
            {children}
        </AuthContext.Provider>
    )
}