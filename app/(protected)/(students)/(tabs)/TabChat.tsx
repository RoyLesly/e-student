import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, View, Image, Text,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import HeaderPage from '@/components/CompStudents/HeaderPage';
import ActivationCheck from '@/components/CompStudents/ActivationCheck';
import CompPayment from '@/components/CompStudents/CompPayment';
import { getData } from '@/utils/functions';
import { ConfigData, protocol } from '@/utils/config';
import { GetResultUrl, GetSchoolFeesUrl, GetUserProfileUrl } from '@/utils/apiLinks';
import { useAuth } from '@/context/authContext';
import { GetResultInter, GetSchoolFeesInter, GetUserProfileInter } from '@/utils/inter';
import Loader from '@/components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FeesCheck from '@/components/CompStudents/FeesCheck';


const TabsChat = () => {
  const { user, domain, theme, profile } = useAuth();

  const [count, setCount] = useState<number>(0)
  const [fetching, setFetching] = useState<boolean>(true)
  const [amountPaid, setAmountPaid] = useState<number>(0)
  const [apiSchoolFees, setApiSchoolFees] = useState<GetSchoolFeesInter>()
  const [school, setSchool] = useState<string>("")

  useEffect(() => {
    if (fetching && count == 0) {

      const call = async () => {
        const school = await AsyncStorage.getItem("school")
        if (profile && school) {
          // const apiSchFees: GetSchoolFeesInter[] | any = await getData(protocol + "api" + domain + GetSchoolFeesUrl, {
          //   userprofile__id: parseInt(JSON.parse(profile)), nopage: true, fieldList: [
          //     'id', "userprofile__id", "platform_paid", "balance", "userprofile__specialty__id", "userprofile__specialty__tuition", "platform_charges",
          //     "userprofile__specialty__payment_one", "userprofile__specialty__payment_two", "userprofile__specialty__payment_three", "userprofile__specialty__school__school_type"
          //   ]
          // });
          // if (apiSchFees && apiSchFees.length) {
          //   setSchool(school)
          //   setApiSchoolFees(apiSchFees[0])
          //   setAmountPaid(apiSchFees[0].userprofile__specialty__tuition - apiSchFees[0].balance)
          // }
        }
        setCount(1)
        setFetching(false)
      }
      call();
    }
    if (count == 1) {
      console.log(amountPaid)
    }
  }, [count])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <HeaderPage
        title='Chat'
        // subTabs={[
        //   { id: 1, title: "Testing1 Tab", link: "test" },
        //   { id: 2, title: "Testing2 Tab ", link: "test" },
        // ]}
      />

      <ScrollView contentContainerStyle={styles.content}>
      <View></View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TabsChat

const PaidComponent = ({ amountPaid, domain, school, apiSchoolFees }: { amountPaid: number, domain: string, school: string, apiSchoolFees: GetSchoolFeesInter }) => {

  const { theme } = useAuth()
  const [apiUserprofile, setApiUserProfile] = useState<GetUserProfileInter>()
  const [apiDataSemester1, setApiDataSemester1] = useState<GetResultInter[]>()
  const [apiDataSemester2, setApiDataSemester2] = useState<GetResultInter[]>()

  useEffect(() => {
    const call = async () => {
      const apiProf: any = await getData(protocol + "api" + domain + GetUserProfileUrl, { nopage: true, id: apiSchoolFees.userprofile__id, fieldList: ["user__matricle", "user__username", "id", "specialty__academic_year", "specialty__main_specialty__specialty_name", "specialty__level__level"] });
      const apiSem1: any = await getData(protocol + "api" + domain + GetResultUrl, { student__id: apiSchoolFees.userprofile__id, course__semester: "I", publish_ca: true, course__specialty__id: apiSchoolFees.userprofile__specialty__id, fieldList: ["id", "course__main_course__course_name", "ca"] });
      const apiSem2: any = await getData(protocol + "api" + domain + GetResultUrl, { student__id: apiSchoolFees.userprofile__id, course__semester: "II", publish_ca: true, course__specialty__id: apiSchoolFees.userprofile__specialty__id, fieldList: ["id", "course__main_course__course_name", "ca"] });
      if (apiProf) {
        setApiUserProfile(apiProf[0])
      }
      if (apiSem1 && apiSem2 && apiSem1.count && apiSem2.count) {
        setApiDataSemester1(apiSem1.results)
        setApiDataSemester2(apiSem2.results)
      }
    }
    call()
  }, [])

  return (
    <ScrollView>
      <View  className='flex flex-col items-center justify-center'>

        {apiDataSemester1 && apiDataSemester2 ?
          <View style={{ flex: 1 }}>

            {/* 1st SEMESTER */}
            <FeesCheck
              title="CA Semester I"
              data={apiDataSemester1}
              amountPaid={amountPaid}
              requiredAmount={(ConfigData[domain][school].schoolfees_control[0]) * apiSchoolFees.userprofile__specialty__tuition}
              resType='CA'
              theme={theme}
            />

            {/* 2nd SEMESTER */}
            <FeesCheck
              title="CA Semester II"
              data={apiDataSemester2}
              amountPaid={amountPaid}
              requiredAmount={(ConfigData[domain][school].schoolfees_control[3]) * apiSchoolFees.userprofile__specialty__tuition}
              resType='CA'
              theme={theme}
            />

          </View>

          :

          <Loader />

        }

      </View>
      <View className='flex h-[2%] items-center justify-center my-3 w-full'>
              <Image
                source={require("../../../../assets/icons/upload.png")}
                resizeMode="contain"
                tintColor={"color"}
                className="h-6 w-6"
              />
            </View>
    </ScrollView>
  )
}






const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  /** Header */
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTop: {
    marginHorizontal: -6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  /** Card */
  card: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardLikeWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: 12,
    right: 12,
  },
  cardLike: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardImg: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#232425',
    marginRight: 'auto',
  },
  cardStars: {
    marginLeft: 2,
    marginRight: 4,
    fontSize: 15,
    fontWeight: '500',
    color: '#232425',
  },
  cardDates: {
    marginTop: 4,
    fontSize: 16,
    color: '#595a63',
  },
  cardPrice: {
    marginTop: 6,
    fontSize: 16,
    color: '#232425',
  },
});