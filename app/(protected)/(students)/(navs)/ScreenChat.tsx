import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native';
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
import HeaderResult from '@/components/CompStudents/HeaderResult';
import HeaderPage from '@/components/CompStudents/HeaderPage';


const ScreenChat = ({ navigation }: any) => {
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
          const apiSchoolFees: GetSchoolFeesInter[] | any = await getData(protocol + "api" + domain + GetSchoolFeesUrl, {
            userprofile__id: parseInt(JSON.parse(profile)), nopage: true, fieldList: [
              'id', "userprofile__id", "platform_paid", "balance", "userprofile__specialty__id", "userprofile__specialty__tuition", "platform_charges",
              "userprofile__specialty__payment_one", "userprofile__specialty__payment_two", "userprofile__specialty__payment_three", "userprofile__specialty__school__school_type"
            ]
          });
          if (apiSchoolFees && apiSchoolFees.length) {
            setSchool(school)
            setApiSchoolFees(apiSchoolFees[0])
            setAmountPaid(apiSchoolFees[0].userprofile__specialty__tuition - apiSchoolFees[0].balance)
          }
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
    <>
      {fetching ?
        <Loader />
        :
        <View className='p-0'>
          {/* {apiUserprofile && <HeaderPage title='CA Results' apiUserprofile={apiUserprofile} />} */}
          <Text>y</Text>
        </View>
        }
    </>
  );
}

export default ScreenChat


const PaidComponent = ({ amountPaid, domain, school, apiSchoolFees, theme }: { amountPaid: number, domain: string, school: string, apiSchoolFees: GetSchoolFeesInter, theme: any }) => {

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

  return <View className='flex flex-col items-center justify-center min-h-[700px] mt-1'>

    {apiUserprofile ?
      <HeaderResult
        apiUserprofile={apiUserprofile}
      />
      :
      null
    }


    {apiDataSemester1 && apiDataSemester2 ?
      <>

        {/* 1st SEMESTER */}
        <FeesCheck
          title="Result Sem I"
          data={apiDataSemester1}
          amountPaid={amountPaid}
          requiredAmount={(ConfigData[domain][school].schoolfees_control[2]) * apiSchoolFees.userprofile__specialty__tuition}
          resType='RESULT'
          theme={theme}
        />

        {/* 2nd SEMESTER */}
        <FeesCheck
          title="Result Sem II"
          data={apiDataSemester2}
          amountPaid={amountPaid}
          requiredAmount={(ConfigData[domain][school].schoolfees_control[5]) * apiSchoolFees.userprofile__specialty__tuition}
          resType='RESULT'
          theme={theme}
        />

        <View className='flex h-[2%] items-center justify-center my-3 w-full'>
          <Image
            source={require("../../../../assets/icons/upload.png")}
            resizeMode="contain"
            tintColor={"color"}
            className="h-6 w-6"
          />
        </View>
      </>

      :

      <Loader />

    }



  </View>
}
