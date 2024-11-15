import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { getData } from '@/utils/functions'
import { protocol } from '@/utils/config'
import { GetSchoolFeesUrl, GetUserProfileUrl } from '@/utils/apiLinks'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import { StyleSheet } from 'react-native'
import { GetSchoolFeesInter } from '@/utils/inter'
import FeatherIcon from 'react-native-vector-icons/Feather';


const SelectClass = () => {
  const router = useRouter();
  const { user, domain, setProfile, theme, isAuthenticated } = useAuth()
  const [loading, setLoading] = useState<boolean>(true)
  const [apiFees, setApiFees] = useState<GetSchoolFeesInter[]>()

  useEffect(() => {
    if (isAuthenticated) {
      const call = async () => {
        const access = await AsyncStorage.getItem("access");
        if (access) {
          const token = await jwtDecode(access)
          const fees = await getData(protocol + "api" + domain + GetSchoolFeesUrl, {
            nopage: true, userprofile__user__id: token.user_id, fieldList: [
              "id", 
              "userprofile__user__matricle", "userprofile__user__full_name", "userprofile__specialty__school__school_type", 
              "userprofile__specialty__school__campus__id", "userprofile__specialty__main_specialty__specialty_name", 
              "userprofile__specialty__level__level", "userprofile__specialty__academic_year", "userprofile__specialty__id",
              "balance", "userprofile__specialty__tuition", "platform_paid", "userprofile__specialty__school__campus__id", 
              "userprofile__specialty__school__campus__name"
            ]
          })
          if (fees && fees.length > 0) {
            setApiFees(fees);
          }
          setLoading(false);
        }
      }
      call()
    }
  }, [isAuthenticated, theme])

  const handlePress = async (data: GetSchoolFeesInter) => {
    const List: string[] = ["higher", "secondary"]
    const sch_type = List.filter((item: string) => item.startsWith(data.userprofile__specialty__school__school_type.slice(-1).toLowerCase()))[0]
    if (sch_type) {
      await AsyncStorage.setItem("school", sch_type)
      setProfile({
        full_name: data.userprofile__user__full_name,
        profile_id: data.id,
        specialty_id: data.userprofile__specialty__id,
        specialty: data.userprofile__specialty__main_specialty__specialty_name,
        level: data.userprofile__specialty__level__level,
        year: data.userprofile__specialty__academic_year,
        campus_id: data.userprofile__specialty__school__campus__id,
        campus_name: data.userprofile__specialty__school__campus__name,
        platform: data.platform_paid,
        paid: data.userprofile__specialty__tuition - data.balance,
        balance: data.balance,
        tuition: data.userprofile__specialty__tuition,
      })
      router.push(`/(protected)/(students)/TabMenu`)
    }
  }

  return (
    <View style={{ backgroundColor: theme?.card.backgroundColor }} className='flex-1'>

        <View
          style={{ paddingTop: hp(4), marginTop: hp(8), marginBottom: hp(4) }}
          className='flex-row font-bold gap-4 items-center justify-center tracking-widest'
        >
          <View style={[styles.elevation, { backgroundColor: theme?.card.backgroundColor }]} className='border px-10 py-2 rounded-lg'>
            <Text style={{ fontSize: hp(3.3), color: theme?.card.textColor }} className='font-bold'>Select Class</Text>
          </View>
        </View>

        {loading || !apiFees ? <View className='items-center justify-center'>
          <ActivityIndicator size={"large"} color={"blue"} />
        </View>
          :

          <>
            {
              apiFees.sort((a: GetSchoolFeesInter, b: GetSchoolFeesInter) => a.userprofile__specialty__academic_year > b.userprofile__specialty__academic_year ? 1 : a.userprofile__specialty__academic_year < b.userprofile__specialty__academic_year ? -1 : 0).map((data: GetSchoolFeesInter) =>

              (<View style={[styles.card, styles.elevation, {backgroundColor: theme?.backgroundColor }]} className='' key={data.id}>
                <TouchableOpacity onPress={() => handlePress(data)} className="">
                  <View className='flex flex-row justify-between'>
                    <Text style={[styles.heading, {color: theme?.card.textColor }]}>
                      {data.userprofile__specialty__main_specialty__specialty_name}
                    </Text>
                    <FeatherIcon
                      color="#555"
                      name="chevron-right"
                      size={21} />
                  </View>
                  <View style={{ justifyContent: "space-between" }} className='flex flex-row gap-10 justify-between'>
                    <Text style={{ fontSize: hp(2.3), color: theme?.card.textColor }} className='font-semibold italic tracking-wider'>
                      Year: {data.userprofile__specialty__academic_year}
                    </Text>
                    <Text style={{ fontSize: hp(2.3), color: theme?.card.textColor }} className='font-semibold italic tracking-wider'>
                      Level: {data.userprofile__specialty__level__level}
                    </Text>
                  </View>
                 
                </TouchableOpacity>
              </View>))
            }
          </>
        }

      </View>

  )
}

export default SelectClass


const styles = StyleSheet.create({
  heading: {
    fontSize: hp(2.9),
    fontWeight: '600',
    marginBottom: hp(1),
    textAlign: "center"
  },
  card: {
    borderRadius: hp(1.8),
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
    marginHorizontal: wp(4),
    marginBottom: hp(5),
    marginTop: hp(0.2),
    textAlign: "center",
    alignItems: "center",
  },
  elevation: {
    elevation: 40,
    shadowColor: '#52006A',
  },
});