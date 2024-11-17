import { Slot, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react'
import { useAuth, AuthContextProvider } from '../context/authContext'
import "../global.css"
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import isTokenExpired from '@/utils/actions';
import { jwtDecode } from 'jwt-decode';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import 'intl-pluralrules';



const MainLayout = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, profile } = useAuth()
  const segment = useSegments();
  const router = useRouter();

  useEffect(() => {
    const call = async () => {
      const domain = await AsyncStorage.getItem("domain");
      const access = await AsyncStorage.getItem("access");
      const refresh = await AsyncStorage.getItem("refresh");


      if (domain) {
        if (!access) { router.replace("Login") };
        const token = jwtDecode(access)
        const isAuth = await isTokenExpired(access, refresh, domain)
        const inApp = segment[0] == '(protected)';

        if (isAuth.expired) {
          router.replace("Login")
        }
        if (!isAuth.expired && inApp) {
          setUser( { user_id: token.user_id, role: token.role, username: token.username })
          setIsAuthenticated(true)
          if (token.role == "student"){ router.replace("/(protected)/SelectClass") }
          if (token.role != "student"){ router.replace("/(protected)/SelectCampus") }
        } else {
          router.replace("/Login") 
        }
      } else {
        router.push("/SchoolCode")
      }
    }
    call()
  }, [isAuthenticated])

  return <Slot />
}

const Layout = () => {
  return (
    <AuthContextProvider>
    <I18nextProvider i18n={i18n}>
    <MainLayout />
    </I18nextProvider>
    </AuthContextProvider>
)
}

export default Layout