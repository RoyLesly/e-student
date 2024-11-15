import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetResultInter } from '@/utils/inter'
import { gradeCheck } from '@/utils/functions'
import { ConfigData } from '@/utils/config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '@/context/authContext'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const FlatListResults = (
    { data, pageType, handlePress }
    : 
    { data: GetResultInter[], pageType: "CA" | "EXAM" | "RESIT" | "RESULT" | "FEES", handlePress: any }
) => {
    const { domain, theme } = useAuth();
    const [loading, setLoading] = useState<boolean>(true)
    const [schoolType, setSchoolType] = useState<string>("")
    useEffect(() => {
        if (schoolType == "") {
            const call = async () => {
                const t = await AsyncStorage.getItem("school")
                if (t) { setSchoolType(t); setLoading(false); }
            }
            call();
        }
    }, [schoolType])

    return (
        <>
            {!loading ?
                <>
                    <Header
                        pageType={pageType}
                        theme={theme}
                    />

                    <FlatList
                        data={data.sort((a: GetResultInter, b: GetResultInter) => a.course__main_course__course_name > b.course__main_course__course_name ? 1 : a.course__main_course__course_name < b.course__main_course__course_name ? -1 : 0)}
                        renderItem={({ item }) => <Item
                            data={item}
                            onPress={handlePress}
                            domain={domain}
                            schoolType={schoolType}
                            pageType={pageType}
                            theme={theme}
                        />
                        }
                        keyExtractor={item => item.id.toString()}
                        className="flex p-1 w-full"
                        nestedScrollEnabled={true}
                        scrollEnabled={false}  // Disable scrolling
                    />
                </>
                :
                <ActivityIndicator />
            }
        </>
    )
}

export default FlatListResults


const Header = ({ pageType, theme }: any) => {

    if (pageType == "CA") return <View style={{ backgroundColor: theme.card.headerColor }} className='flex flex-row items-center justify-between mt-2 p-1 rounded-lg'>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='font-semibold w-[73%]'>Course Name</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='font-semibold w-[12%]'>Ca</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='font-semibold w-[15%]'>Status</Text>
    </View>

    if (pageType == "EXAM") return <View style={{ backgroundColor: theme.card.headerColor }} className='flex flex-row items-center justify-between mt-2 p-1 rounded'>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='font-medium w-[70%]'>Course Name</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='font-medium w-[15%]'>Exam</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='font-medium w-[15%]'>Status</Text>
    </View>

    if (pageType == "RESIT") return <View style={{ backgroundColor: theme.card.headerColor }} className='flex flex-row items-center justify-between mt-2 p-1 rounded'>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='font-medium w-[70%]'>Course Name</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='font-medium w-[15%]'>Resit</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='font-medium w-[15%]'>Status</Text>
    </View>

    if (pageType == "RESULT") return <View style={{ backgroundColor: theme.card.headerColor }} className='flex flex-row items-center justify-between mt-2 p-1 rounded'>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='font-medium w-[68%]'>Course Name</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='font-medium w-[8%]'>Ca</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='font-medium w-[8%]'>Ex</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='font-medium w-[8%]'>Re</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='font-medium w-[8%]'>Gr</Text>
    </View>

    if (pageType == "FEES") return <View style={{ backgroundColor: theme.card.headerColor }} className='flex flex-row items-center justify-between mt-2 p-1 rounded'>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='font-medium w-[68%]'>Course Name</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='font-medium w-[8%]'>Ca</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='font-medium w-[8%]'>Ex</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='font-medium w-[8%]'>Re</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='font-medium w-[8%]'>Gr</Text>
    </View>
}

const Item = ({ data, onPress, domain, pageType, schoolType, theme }: { data: GetResultInter, domain: string, schoolType: string, onPress: any, pageType: "CA" | "EXAM" | "RESIT" | "RESULT" | "FEES", theme: any }) => {
    const caCheck = gradeCheck(data.ca, ConfigData[domain][schoolType].ca_mark)
    const examCheck = gradeCheck(data.exam, ConfigData[domain][schoolType].exam_mark)
    const resitCheck = gradeCheck(data.resit, ConfigData[domain][schoolType].resit_mark)
    const resultCheck = gradeCheck(data.ca + data.exam, ConfigData[domain][schoolType].ca_mark + ConfigData[domain][schoolType].exam_mark)


    if (pageType == "CA") return <View style={{ borderColor: theme.card.borderColor }} className={`border-b flex flex-row items-center justify-between my-1`}>
        <Text style={{ color: theme.card.textColor }} className='italic w-[74%]'>{data.course__main_course__course_name}</Text>
        <Text style={{ color: theme.card.textColor }} className='italic w-[13%]'>{data.ca}</Text>
        <Text style={{ color: `${caCheck.status ? "green" : "red"}` }} className={`italic font-bold w-[13%]`}>{!data.ca ? "-" : caCheck.status ? "Pass" : "Fail"}</Text>
    </View>

    if (pageType == "EXAM") return <View style={{ borderColor: theme.card.borderColor }} className={`border-b flex flex-row items-center justify-between my-1`}>
        <Text style={{ color: theme.card.textColor }} className='italic w-[74%]'>{data.course__main_course__course_name}</Text>
        <Text style={{ color: theme.card.textColor }} className='italic w-[13%]'>{data.exam}</Text>
        <Text style={{ color: `${examCheck.status ? "green" : "red"}` }} className={`italic font-bold w-[13%]`}>{!data.exam ? "-" : examCheck.status ? "Pass" : "Fail"}</Text>
    </View>

    if (pageType == "RESIT") return <View style={{ borderColor: theme.card.borderColor }} className={`border-b flex flex-row items-center justify-between my-1`}>
        <Text style={{ color: theme.card.textColor }} className='italic w-[74%]'>{data.course__main_course__course_name}</Text>
        <Text style={{ color: theme.card.textColor }} className='italic w-[13%]'>{data.resit}</Text>
        <Text style={{ color: `${resitCheck.status ? "green" : "red"}` }} className={`italic font-bold w-[13%]`}>{!data.resit ? "-" : resitCheck.status ? "Pass" : "Fail"}</Text>
    </View>

    if (pageType == "RESULT") return <View style={{ borderColor: theme.card.borderColor }} className={`border-b flex flex-row items-center justify-between my-1`}>
        <Text style={{ color: theme.card.textColor }} className='italic w-[68%]'>{data.course__main_course__course_name}</Text>
        <Text style={{ color: theme.card.textColor }} className='italic w-[8%]'>{data.ca}</Text>
        <Text style={{ color: theme.card.textColor }} className='italic w-[8%]'>{data.exam}</Text>
        <Text style={{ color: theme.card.textColor }} className='italic w-[8%]'>{data.resit}</Text>
        <Text style={{ color: `${resultCheck.status ? "green" : "red"}` }} className={`italic font-bold w-[13%]`}>{!data.exam ? "-" : caCheck.status ? "Pass" : "Fail"}</Text>
    </View>

}
