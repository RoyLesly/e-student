import { ActivityIndicator, Text, View } from 'react-native'
import React from 'react'

const StartPage = () => {
  return (
    <View className='bg-red-50 flex-1 items-center justify-center'>
      <ActivityIndicator size="large" color="gray" />
    </View>
  )
}

export default StartPage
