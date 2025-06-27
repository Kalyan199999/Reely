import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user , setUser] = useState(null);

    useEffect(()=>{

        const checkUser = localStorage.getItem('user');
        

        if(checkUser)
        {
            setUser( JSON.parse(checkUser).data )
        }

    } , [] )

    const login = (userDate)=>{
        setUser(userDate);
        localStorage.setItem( 'user' , JSON.stringify(userDate) )
    }

    const logout = ()=>{
        setUser(null);
        localStorage.removeItem('user');
    }

    return (
        
        <AuthContext.Provider value={{
             user , login , logout , isLogedIn:!!user
            }}
        >
            {children}

        </AuthContext.Provider>
    )


}

export const useAuth = () => useContext(AuthContext);