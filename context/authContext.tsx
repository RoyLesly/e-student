import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { darkTheme, defaultTheme } from './helper';


export const AuthContext = createContext({});


export interface AuthUserProps {
    user_id: number
    matricle: string
    role: string
    is_superuser: boolean
}

export interface ProfileProps {
    full_name: string
    profile_id: number
    specialty_id: number
    specialty: string
    level: number | string
    year: string
    campus_id: number
    campus_name: string
    platform: boolean
    balance: number
    paid: number
    tuition: number
}
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {

    const [theme, setTheme] = useState<any>(defaultTheme)
    const [user, setUser] = useState<AuthUserProps | null>(null);
    const [domain, setDomain] = useState<string | null>(null);
    const [profile, setProfile] = useState<ProfileProps | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<any>(undefined);

    useEffect(() => {

        const checkDomain = async () => {
            const dom = await AsyncStorage.getItem("domain")
            if (dom) { setDomain(dom) }
        }
        const checkTheme = async () => {
            const themeMode = await AsyncStorage.getItem("themeMode")
            if (themeMode) {
                themeMode !== 'defaultMode' ? setTheme(darkTheme) : setTheme(defaultTheme)
            } else { 
                await AsyncStorage.setItem("themeMode", "darkMode")
                setTheme(darkTheme) 
            }
        }
        checkDomain();
        checkTheme();

        setTimeout(() => {
            setIsAuthenticated(false);
        }, 2000)

    }, [ theme, domain ])

    const login = async (username: string, password: string) => {
        try {

        } catch (e) {

        }

    }

    const logout = async () => {
        try {

        } catch (e) {

        }

    }
    const register = async () => {
        try {

        } catch (e) {

        }

    }


    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            domain,
            setDomain,
            login,
            logout,
            profile,
            setProfile,
            theme,
            setTheme
        }}>
            <View className="flex-1 w-full">
                {children}
            </View>
        </AuthContext.Provider>
    )

}


export const useAuth: any = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error("useAuth must be wrapped inside AuthContextProvider")
    }

    return value
}
