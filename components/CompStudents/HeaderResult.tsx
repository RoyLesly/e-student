import { Text, View } from 'react-native'
import React from 'react'
import { GetUserProfileInter } from '@/inter'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const HeaderResult = ({ apiUserprofile }: { apiUserprofile: GetUserProfileInter }) => {

  return (
    <View style={{ padding: hp(1), marginBottom: hp(1) }} className='bg-blue-100 flex flex-col items-center justify-center px-4 rounded w-full'>
        <View className='flex flex-row items-center justify-center w-full'>
          <Text style={{ fontSize: hp(3), }} className='font-bold mx-2 text-[18px] tracking-wider'>{apiUserprofile?.user__matricle}</Text>
          <Text style={{ fontSize: hp(3), }} className='font-bold mx-2 text-[18px] tracking-wider'>{apiUserprofile?.specialty__academic_year}</Text>
          <Text style={{ fontSize: hp(3), }} className='font-bold mx-2 text-[18px] tracking-wider'>{apiUserprofile?.specialty__level__level}</Text>
        </View>
        <Text className='font-psemibold mx-2 text-lg'>{apiUserprofile?.specialty__main_specialty__specialty_name}</Text>
    </View>
  )
}

export default HeaderResult

