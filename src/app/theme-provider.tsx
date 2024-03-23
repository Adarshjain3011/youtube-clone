'use client'

import { createContext, useState } from 'react'

export const AppContext = createContext({})



export default function ThemeProvider({children,}: {children: React.ReactNode}) {


    const [userData,setUserData] = useState([]);

    let value ={

        userData,
        setUserData

    }


    return <AppContext.Provider value={value}>{children}</AppContext.Provider>

}




