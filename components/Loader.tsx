import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/authContext'

const Loader = () => {

  const { theme } = useAuth();

  return (
    <View style={{ flex: 1 }} className='flex-1 items-center justify-center'>
      <ActivityIndicator size={"large"} color={theme?.loader.color}/>
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({})