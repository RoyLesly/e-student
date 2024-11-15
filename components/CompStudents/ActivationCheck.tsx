import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/authContext'

const ActivationCheck = ({ children }: { children: any }) => {

    const { profile } = useAuth();
    return (
        <ScrollView>
            {profile?.platform ?
                children
                :
                <View className='flex flex-1 grow items-center justify-center my-40 py-10'>
                    <Text className="my-2 py-2">Not Paid</Text>
                    <Button title='Pay' />
                </View>
            }
        </ScrollView>
    )
}

export default ActivationCheck


