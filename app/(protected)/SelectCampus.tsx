import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { GetSchoolInfoInter } from '@/utils/inter'
import { getData } from '@/utils/functions'
import { protocol } from '@/utils/config'
import { GetSchoolInfoUrl } from '@/utils/apiLinks'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { FlatList } from 'react-native'

const SelectCampus = () => {
  const router = useRouter();
  const { user, domain } = useAuth()
  const [loading, setLoading] = useState<boolean>(true)
  const [apiSchools, setApiSchools] = useState<GetSchoolInfoInter[]>()

  useEffect(() => {
    if (user) {
      const call = async () => {
        const asyncSchool = await AsyncStorage.getItem("schools")

        const sch = await getData(protocol + "api" + domain + GetSchoolInfoUrl, { nopage: true, fieldList: ["id", "school_name", "school_type", "campus__name", "campus__region"] })
        if (sch && sch.length > 0) {
          var s = JSON.parse(asyncSchool ? asyncSchool : "")?.map((item: string) => item.toString())
          var fil = sch.filter((item: GetSchoolInfoInter) => s?.includes(item.id.toString()))
          if (fil) {
            setApiSchools(fil);
            setLoading(false);
          }
        }
      }
      call()
    }
  }, [user])

  const handlePress = (data: GetSchoolInfoInter) => {
    AsyncStorage.setItem("school", JSON.stringify(data.id))
    router.push(`/(protected)/MyProfileLecturer`)
  }

  return (
    <View className=''>

      <View
        style={{ paddingVertical: hp(2) }}
        className='flex-row font-bold gap-4 items-center justify-center tracking-widest'
      >
        <Text style={{ fontSize: hp(3) }}>Username:</Text>
        <Text style={{ fontSize: hp(4) }} className='font-bold'>{user.matricle}</Text>
      </View>

      {loading || !apiSchools ? <View className='items-center justify-center'>
        <ActivityIndicator size={"large"} color={"blue"} />
      </View>
        :
        <FlatList
          data={apiSchools.sort((a: GetSchoolInfoInter, b: GetSchoolInfoInter) => a.campus__name > b.campus__name ? 1 : a.campus__name < b.campus__name ? -1 : 0)}
          renderItem={({ item }) => <Item data={item} onPress={handlePress} />}
          keyExtractor={item => item.id.toString()}
          className="border flex w-full"
        />
      }

    </View>
  )
}

export default SelectCampus


const Item = ({ data, onPress }: { data: GetSchoolInfoInter, onPress: any }) => (
  <View style={{ marginVertical: hp(2) }} className="rounded">
    <TouchableOpacity onPress={() => onPress(data)} className="flex flex-col items-center justify-center">
      <Text style={{ fontSize: hp(3.5) }} className="font-bold italic text-4xl">{data.campus__name}</Text>
      <View className="flex flex-row gap-10 justify-center w-full">
        <Text style={{ fontSize: hp(2.5) }} className="font-semibold italic text-secondary text-xl">{data.campus__region}</Text>
        <Text style={{ fontSize: hp(2.5) }} className="font-semibold italic text-secondary text-xl">{data.school_type}</Text>
      </View>
    </TouchableOpacity>

  </View>
);