import React, { useEffect, useState } from 'react';
import {
  StyleSheet, SafeAreaView, ScrollView, View, Image, Text,
} from 'react-native';
import HeaderPage from '@/components/CompStudents/HeaderPage';
import ActivationCheck from '@/components/CompStudents/ActivationCheck';
import CompPayment from '@/components/CompStudents/CompPayment';
import { getData } from '@/utils/functions';
import { ConfigData, protocol } from '@/utils/config';
import { GetResultUrl} from '@/utils/apiLinks';
import { ProfileProps, useAuth } from '@/context/authContext';
import { GetResultInter } from '@/utils/inter';
import Loader from '@/components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FeesCheck from '@/components/CompStudents/FeesCheck';


const ScreenResult = () => {
  const { user, domain, theme, profile } = useAuth();

  const [count, setCount] = useState<number>(0)
  const [fetching, setFetching] = useState<boolean>(true)
  useEffect(() => {
    if (fetching && count == 0) {

      const call = async () => {
        // setSchool(school)
        setFetching(false)
      }
      call();
    }
    if (count == 1) {
    }
  }, [count])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <HeaderPage
        title='Result Result'
        // subTabs={[
        //   { id: 1, title: "Testing1 Tab", link: "test" },
        //   { id: 2, title: "Testing2 Tab ", link: "test" },
        // ]}
      />

      <ScrollView contentContainerStyle={styles.content}>
      <>
      {fetching ?
        <Loader />
        :
        profile ?
          profile.paid < 1 ?
            <CompPayment
              apiSchoolFees={profile}
            />
            :
              <ActivationCheck
                children={
                  <PaidComponent
                    domain={domain}
                    profile={profile}
                    theme={theme}
                  />
                }
              />
              :
          <Text style={{ color: theme.textColor }}>No Data</Text>
      }
    </>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ScreenResult
const PaidComponent = ({ domain, theme, profile }: { domain: string, theme: any, profile: ProfileProps }) => {
  console.log(profile)

  const [school, setSchool] = useState<string>("")
  const [apiDataSemester1, setApiDataSemester1] = useState<GetResultInter[]>()
  const [apiDataSemester2, setApiDataSemester2] = useState<GetResultInter[]>()

  useEffect(() => {
    const call = async () => {
      const school = await AsyncStorage.getItem("school");
      const apiSem1: any = await getData(protocol + "api" + domain + GetResultUrl, { student__id: profile.profile_id, course__semester: "I", publish_ca: true, course__specialty__id: profile.specialty_id, fieldList: ["id", "course__main_course__course_name", "ca"] });
      const apiSem2: any = await getData(protocol + "api" + domain + GetResultUrl, { student__id: profile.profile_id, course__semester: "II", publish_ca: true, course__specialty__id: profile.specialty_id, fieldList: ["id", "course__main_course__course_name", "ca"] });
      if (apiSem1 && apiSem2 && apiSem1.count && apiSem2.count && school) {
        setSchool(school)
        setApiDataSemester1(apiSem1.results)
        setApiDataSemester2(apiSem2.results)
      }
    }
    call()
  }, [])

  console.log(profile, 98)

  return (
    <ScrollView>
      <View  className='flex flex-col items-center justify-center'>

        {apiDataSemester1 && apiDataSemester2 ?
          <View style={{ flex: 1 }}>

            {/* 1st SEMESTER */}
            <FeesCheck
              title="RESULT Semester I"
              data={apiDataSemester1}
              amountPaid={profile.paid}
              requiredAmount={(ConfigData[domain][school].schoolfees_control[0]) * profile.tuition}
              resType='RESULT'
              theme={theme}
            />

            {/* 2nd SEMESTER */}
            <FeesCheck
              title="RESULT Semester II"
              data={apiDataSemester2}
              amountPaid={profile.paid}
              requiredAmount={(ConfigData[domain][school].schoolfees_control[3]) * profile.tuition}
              resType='RESULT'
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