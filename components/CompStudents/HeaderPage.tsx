import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/authContext'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GetUserProfileInter } from '@/utils/inter';


const HeaderPage = ({ title, apiUserprofile, subTabs }: { title: string, apiUserprofile?: GetUserProfileInter, subTabs?: { id: number, title: string, link: string }[] }) => {

  const { theme } = useAuth();
  const router = useRouter()

  return (
    <View style={{
      backgroundColor: theme.pageHeader.backgroundColor,
      paddingTop: hp(3), paddingBottom: hp(3),
      paddingHorizontal: hp(2), borderBottomLeftRadius: hp(5),
      borderBottomRightRadius: hp(4.5),
      elevation: 10,
      shadowColor: '#52006A',
    }}>


      <View className='flex flex-row items-center justify-between mb-4'>

        {apiUserprofile ?
          <View></View>
          :
          null
        }

        <View className='flex items-center justify-center w-[20%]'>
          <TouchableOpacity onPress={() => router.back()} className='flex items-center justify-center'>
            <AntDesign name="leftcircleo" size={hp(3.7)} color="white" />
          </TouchableOpacity>
        </View>

        <View className='flex items-center justify-center w-[60%]'>
          <Text
            style={{ color: "#fff", fontSize: hp(2.7) }}
            className={`font-medium tracking-wide text-white `}
          >
            {title}
          </Text>
        </View>

        <View className='w-[20%]'>
          <TouchableOpacity onPress={() => router.back()}>
            {/* <Text className='border flex h-10 items-center justify-center w-10' style={{ padding: hp(0), backgroundColor: "white", borderRadius: 100 }}>Back</Text> */}
          </TouchableOpacity>
        </View>

      </View>

      {
        subTabs ?
          <View className='flex flex-row gap-10 items-center justify-center mt-2'>
            {subTabs.map((item: any) => <TouchableOpacity onPress={() => { router.push(item.link)}} key={item.id} className='border border-white flex p-[4px] rounded-full'>
              <View className='bg-white px-[12px] py-[3px] rounded-full'>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>)}
          </View>
          :
          null
      }


      <View className='flex-row justify-center w-full'>

      </View>


    </View>)
}

export default HeaderPage

