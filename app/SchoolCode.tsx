import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SchoolsList } from '@/utils/constant';
import { ConfigData } from '@/utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/authContext';
import { useTranslation } from 'react-i18next';

const SchoolCode = () => {

    const { t } = useTranslation();
    const { setDomain, theme } = useAuth();
    const router = useRouter();
    const [ loading, setLoading ] = useState<boolean>(false)

    const codeRef = useRef("");

    const handleSubmit = async () => {
        const cd = codeRef.current
        if (!cd || cd.length < 4) {
            Alert.alert("School Code", " Please Enter code provided by the school")
            return
        }

        if (ConfigData[cd.toLowerCase()]){
            setLoading(true)

            setTimeout(async () => {
                await AsyncStorage.setItem("domain", cd.toLowerCase())
                setDomain(cd.toLowerCase())
                Alert.alert(t("school-code"), `${t("code-validation-successful")}`)
                setLoading(false)
                router.push("/Login")
                return;
            }, 2000)
        } else {
            Alert.alert("School Code", " Enter a Valid Code !!!")
        }


    }

    return (
        <View style={{ padding: hp(2.5), backgroundColor: theme.backgroundPrimary }} className="flex-1">
            <StatusBar style="dark" />
            <View style={{ paddingTop: hp(6), paddingHorizontal: wp(2), backgroundColor: theme.backgroundPrimary }} className='flex-1 gap-12'>
                <View className='items-center'>
                    {/* <Image */}
                    <Image style={{ height: hp(30) }} resizeMode='contain' source={require('../assets/images/login.png')} />

                    <View className='gap-10 w-full'>

                        <Text style={{ fontSize: hp(4), color: theme.primary }} className='font-bold text-center text-neutral-800 tracking-wider'>{t("school-code")}</Text>

                        <View className='gap-6'>

                            <View style={{ height: hp(7) }} className='flex-row gap-4 items-center px-4 rounded-2xl'>
                                <Octicons name='person' color="gray" size={hp(2.7)} />
                                <TextInput
                                    onChangeText={value => codeRef.current = value}
                                    style={{ fontSize: hp(2) }}
                                    className='flex-1 font-semibold text-neutral-700'
                                    placeholder={t("code")}
                                    placeholderTextColor={'gray'}
                                />
                            </View>

                            <View className='gap-4'>

                                {loading ? <View>
                                    <ActivityIndicator />
                                </View>
                                :
                                <TouchableOpacity
                                    onPress={() => handleSubmit()}
                                    style={{ height: hp(6.5), marginVertical: hp(3) }} className='bg-indigo-500 items-center justify-center rounded-xl'
                                >
                                    <Text style={{ fontSize: hp(2.7)  }} className='font-bold text-white tracking-wider'>{t("check")}</Text>
                                </TouchableOpacity>
                                }

                                <View className='flex-row justify-between mt-2'>
                                    <Pressable onPress={() => router.push("/Login")}>
                                        <Text style={{ fontSize: hp(1.8), color: theme.textColor }} className='font-bold text-indigo-500'>{t("back-to-login")}</Text>
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

export default SchoolCode

const styles = StyleSheet.create({

})