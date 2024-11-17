import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, View, Image, Text,
  Button,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import HeaderPage from '@/components/CompStudents/HeaderPage';
import ActivationCheck from '@/components/CompStudents/ActivationCheck';
import CompPayment from '@/components/CompStudents/CompPayment';
import { getData } from '@/utils/functions';
import { ConfigData, protocol } from '@/utils/config';
import { GetCourseUrl, GetResultUrl, GetSchoolFeesUrl, GetUserProfileUrl } from '@/utils/apiLinks';
import { useAuth } from '@/context/authContext';
import { GetResultInter, GetSchoolFeesInter, GetUserProfileInter } from '@/utils/inter';
import Loader from '@/components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FeesCheck from '@/components/CompStudents/FeesCheck';
import { GetCourseInter } from '@/utils/inter';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PageTitle from '@/components/CompStudents/PageTitle';


const TabsCourses = () => {
  const { user, domain, theme, profile } = useAuth();

  const [count, setCount] = useState<number>(0)
  const [fetching, setFetching] = useState<boolean>(true)
  const [amountPaid, setAmountPaid] = useState<number>(0)
  const [apiCourses, setApiCourses] = useState<GetCourseInter[]>()
  // const [school, setSchool] = useState<string>("")

  useEffect(() => {
    if (fetching && count == 0) {
      const call = async () => {
        const school = await AsyncStorage.getItem("school")
        if (profile && school) {
          const apiCou: GetCourseInter[] | any = await getData(protocol + "api" + domain + GetCourseUrl, {
            specialty__id: profile.specialty_id, nopage: true, fieldList: [
              'id', 'course_code', "course_type", "semester", 'course_credit', 'completed', "assigned",
              "assigned_to__full_name", "main_course__course_name"
            ]
          });
          console.log(apiCourses, 49)
          if (apiCou && apiCou.length) {
            setApiCourses(apiCou)
          }
          setCount(1)
          setFetching(false)
        }
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
        title='My Courses'
        subTabs={[
          { id: 1, title: "Semester I", link: "/(protected)/(students)/TabCourses" },
          { id: 2, title: "Semester II", link: "/(protected)/(students)/TabCourses" },
        ]}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View className='flex flex-1 flex-col gap-6'>
          {apiCourses && apiCourses.length ?
            <>
              <CoursesComponent data={apiCourses.filter((item: GetCourseInter) => item.semester === "I")} title="Course Semester I " />
              <CoursesComponent data={apiCourses.filter((item: GetCourseInter) => item.semester === "II")} title="Course Semester I " />
            </>
            :
            <Loader />
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TabsCourses

const CoursesComponent = ({ data, title }: { data: GetCourseInter[], title: string }) => {

  return (
    <View style={{ elevation: 2, shadowColor: "#000", paddingHorizontal: hp(1.5), paddingVertical: hp(1) }} className='rounded-lg'>
      <PageTitle title={title} />
      {data.map((item: GetCourseInter) => (
        <View style={{ paddingBottom: hp(1.2) }} key={item.id} className='flex flex-row'>
          <Text style={{ fontSize: hp(2), width: wp("17%") }} className=''>{item.course_code}</Text>
          <Text style={{ fontSize: hp(2.2), width: wp("63%") }} className='flex-wrap italic'>{item.main_course__course_name}</Text>
          <TouchableOpacity
            onPress={() => { console.log(item, 95) }}
            style={{ width: wp("20%") }}
            className=''
          >
            <Text style={{ fontSize: hp(2) }}>V</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}






const styles = StyleSheet.create({
  content: {
    paddingTop: hp(2),
    paddingBottom: hp(0.5),
    paddingHorizontal: hp(0.8),
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