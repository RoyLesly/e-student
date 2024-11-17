import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ActionLogin } from '@/utils/actions';
import { LoginUrl } from '@/utils/apiLinks';
import { AuthUserProps, useAuth } from '@/context/authContext';
import { protocol } from '@/utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isTokenExpired from '@/utils/actions';
import { useTranslation } from 'react-i18next';

const Login = () => {

    const { t } = useTranslation();
    const { theme, domain, setIsAuthenticated, setUser } = useAuth()
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)

    const usernameRef = useRef("");
    const passwordRef = useRef("");

    const handleSubmit = async () => {
        setLoading(true)
        if (!usernameRef.current || !passwordRef.current) {
            Alert.alert(t("sign-in"), t("please-fill-all-the-fields"));
            setLoading(false)
            return;
        }
        if (passwordRef.current.length < 4) {
            Alert.alert(t("sign-in"), t("password-short"));
            setLoading(false)
            return;
        }
        const data = { matricle: usernameRef.current, password: passwordRef.current }

        const response = await ActionLogin(data, protocol + "api" + domain + LoginUrl)
        if (response) {
            if (response?.detail && response?.detail.includes("NETWORK")) {
                Alert.alert("Network", "Check Your Network Connection !!!")
            }
            if (response?.detail && response?.detail.includes("No active")) {
                Alert.alert(response?.detail)
            }
            if (response.access && response.refresh) {
                setIsAuthenticated(true);
                setUser({
                    user_id: response.user_id,
                    matricle: response.username,
                    role: response.role,
                    is_superuser: response.is_superuser,
                })
                await AsyncStorage.setItem("access", response.access)
                await AsyncStorage.setItem("refresh", response.refresh)
                await AsyncStorage.setItem("schools", JSON.stringify(response.school))
                if (response.role == "student") { router.push("/(protected)/SelectClass") }
                else { router.push("/(protected)/SelectCampus") }
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        const call = async () => {
            const acc = await AsyncStorage.getItem("access")
            const ref = await AsyncStorage.getItem("refresh")
            if (acc && ref){
                const check = await isTokenExpired(acc, ref, domain)
                const user: AuthUserProps = { user_id: check.user_id, role: check.role, matricle: check.username, is_superuser: check.is_superuser }
                setUser(user)
                if (user.role == "student" && !check.expired){ router.replace("/(protected)/SelectClass") }
                if (user.role != "student" && !check.expired){ router.replace("/(protected)/SelectCampus") }
                if (check.expired){ setLoading(false);}
            }
        }
        call()
    }, [])

    return (
        <View style={{ padding: hp(2.5), backgroundColor: theme.backgroundColor }} className="flex-1">
            <StatusBar style="dark" />
            <View style={{ paddingTop: hp(6), paddingHorizontal: wp(2) }} className='flex-1 gap-12'>
                <View className='items-center'>
                    {/* <Image */}
                    <Image 
                    style={{ height: hp(30) }} 
                    resizeMode='contain' 
                    source={require('../assets/images/login.png')} 
                    />

                    <View className='gap-10 w-full'>

                        <Text style={{ fontSize: hp(5), color: theme.textColor }} className='font-bold text-center text-neutral-800 tracking-wider'>{t("login")}</Text>

                        <View className='gap-4'>

                            <View style={{ height: hp(7) }} className='bg-neutral-100 flex-row gap-4 items-center px-4 rounded-2xl'>
                                <Octicons name='person' color="gray" size={hp(2.7)} />
                                <TextInput
                                    onChangeText={value => usernameRef.current = value}
                                    style={{ fontSize: hp(2) }}
                                    className='flex-1 font-semibold text-neutral-700'
                                    placeholder={t("matricle-or-username")}
                                    placeholderTextColor={'gray'}
                                />
                            </View>

                            <View className='gap-4'>
                                <View style={{ height: hp(7) }} className='bg-neutral-100 flex-row gap-4 items-center px-4 rounded-2xl'>
                                    <Octicons name='lock' color="gray" size={hp(2.7)} />
                                    <TextInput
                                        onChangeText={value => passwordRef.current = value}
                                        style={{ fontSize: hp(2) }}
                                        className='flex-1 font-semibold text-neutral-700'
                                        placeholder={t("password")}
                                        secureTextEntry
                                        placeholderTextColor={'gray'}
                                    />
                                </View>

                                <View className='flex-row items-center justify-between mt-2'>
                                <Pressable onPress={() => router.push("/SchoolCode")}>
                                    <Text style={{ fontSize: hp(1.8), color: theme.textColor }} className='font-semibold text-neutral-500 text-right'>{t("reset-code")}</Text>
                                </Pressable>
                                <Pressable onPress={() => router.push("/ForgotPassword")}>
                                    <Text style={{ fontSize: hp(1.8), color: theme.textColor }} className='font-semibold text-neutral-500 text-right'>{t("forgot-password")}</Text>
                                </Pressable>
                                </View>


                                <>
                                    {loading ? <View style={{ height: hp(10) }} className='items-center justify-center'>
                                        <ActivityIndicator size="large" />
                                    </View>
                                        :
                                        <TouchableOpacity
                                            onPress={() => handleSubmit()}
                                            style={{ height: hp(6.5), marginVertical: hp(3) }} className='bg-indigo-500 items-center justify-center rounded-xl'
                                        >
                                            <Text style={{ fontSize: hp(2.7) }} className='font-bold text-white tracking-wider'>{t("login")}</Text>
                                        </TouchableOpacity>
                                    }
                                </>

                                <View className='flex-row items-center justify-between mt-2'>
                                    <Text style={{ fontSize: hp(1.8), color: theme.textColor }} className='font-semibold text-neutral-500'>{t("help")} ?</Text>
                                    <Pressable onPress={() => router.push("/CheckUser")}>
                                        <Text style={{ fontSize: hp(1.8), color: theme.textColor }} className='font-bold text-indigo-500'>{t("check-user")}</Text>
                                    </Pressable>
                                </View>

                            </View>

                        </View>

                    </View>

                </View>
            </View>
        </View>

    )
}

export default Login

const styles = StyleSheet.create({

})