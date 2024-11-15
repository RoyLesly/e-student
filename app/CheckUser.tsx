import { Alert, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CheckUser = () => {

    const router = useRouter();

    const usernameRef = useRef("");
    const passwordRef = useRef("");

    const handleSubmit = async () => {
        if (!usernameRef.current || !passwordRef.current) {
            Alert.alert("Sign In", " Please fill all the fields")
            return
        }
        if (passwordRef.current.length < 4) {
            Alert.alert("Sign In", "Password Short (minimum 4)")
            return
        }

    }

    return (
        // <View className="flex-1 items-center justify-center">
        <View style={{ padding: hp(2.5) }} className="flex-1">
            <StatusBar style="dark" />
            <View style={{ paddingTop: hp(6), paddingHorizontal: wp(2) }} className='flex-1 gap-12'>
                <View className='items-center'>
                    {/* <Image */}
                    <Image style={{ height: hp(30) }} resizeMode='contain' source={require('../assets/images/login.png')} />

                    <View className='gap-10 w-full'>

                        <Text style={{ fontSize: hp(5) }} className='font-bold text-center text-neutral-800 tracking-wider'>Check User</Text>

                        <View className='gap-6'>

                            <View style={{ height: hp(7) }} className='bg-neutral-100 flex-row gap-4 items-center px-4 rounded-2xl'>
                                <Octicons name='person' color="gray" size={hp(2.7)} />
                                <TextInput
                                    onChangeText={value => usernameRef.current = value}
                                    style={{ fontSize: hp(2) }}
                                    className='flex-1 font-semibold text-neutral-700'
                                    placeholder='Username'
                                    placeholderTextColor={'gray'}
                                />
                            </View>

                            <View className='gap-4'>

                                <TouchableOpacity
                                    onPress={() => handleSubmit()}
                                    style={{ height: hp(6.5), marginVertical: hp(3) }} className='bg-indigo-500 items-center justify-center rounded-xl'
                                >
                                    <Text style={{ fontSize: hp(2.7) }} className='font-bold text-white tracking-wider'>Check</Text>
                                </TouchableOpacity>

                                <View className='flex-row justify-between mt-2'>
                                    <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-neutral-500'>Help ?</Text>
                                    <Pressable onPress={() => router.push("/Login")}>
                                        <Text style={{ fontSize: hp(1.8) }} className='font-bold text-indigo-500'>Login</Text>
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

export default CheckUser

const styles = StyleSheet.create({

})