import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ScreenAnnouncement = ({ navigation }: any) => {
    return (
        <View className='flex h-full items-center justify-center w-full'>
          <Text className='my-2'>Announcements</Text>
          <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
        </View>
      );
}

export default ScreenAnnouncement

