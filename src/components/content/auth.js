import React, {createContext, useState} from "react";

export const AuthContext = createContext();

function AuthProvider({children}){
    const [card1, setCard] = useState();
    return(
        <AuthContext.Provider value={{test: 'test'}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider