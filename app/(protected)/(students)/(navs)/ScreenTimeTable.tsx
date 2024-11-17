import Loader from '@/components/Loader';
import { useAuth } from '@/context/authContext';
import { GetNotificationUrl, GetTimeSlotUrl, GetTimeTableWeekUrl } from '@/utils/apiLinks';
import { protocol } from '@/utils/config';
import { DayList } from '@/utils/constant';
import { getData, getStartEndOfWeek } from '@/utils/functions';
import { GetNotificationInter, GetResultInter, GetTimeSlotInter, GetTimeTableWeekInter, GetTransactionsInter } from '@/utils/inter';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet, SafeAreaView, ScrollView, View,
    Text, TouchableOpacity,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FeatherIcon from 'react-native-vector-icons/Feather';


const ScreenTimeTable = () => {
    const router = useRouter();
    const { user, theme, profile, domain } = useAuth();
    const [count, setCount] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [week, setWeek] = useState<GetTimeTableWeekInter[]>()
    const [slots, setSlots] = useState<GetTimeSlotInter[]>()

    useEffect(() => {
        if (count == 0) {
            const call = async () => {
                const apiWeek: GetTimeTableWeekInter[] | any = await getData(protocol + "api" + domain + GetTimeTableWeekUrl, {
                    specialty__id: profile.specialty_id, publish: true, nopage: true, fieldList: [
                        'id', 'year_week', "publish", "created_at", "specialty__id", "specialty__main_specialty__specialty_name", "specialty__level__level",
                        "specialty__academic_year", "specialty__school__id"
                    ]
                });
                const apiSlot: GetTimeSlotInter[] | any = await getData(protocol + "api" + domain + GetTimeSlotUrl, {
                    timetableday__timetableweek__specialty__id: profile.specialty_id, nopage: true, fieldList: [
                        'id', "title", 'start', "end", "start_time", "end_time", "hours", "status", "session",
                        "course_id", "course__main_course__course_name", "course__assigned_to__full_name", "timetableday__timetableweek__id",
                        "timetableday__day"
                    ]
                });
                if (apiWeek && apiWeek.length) {
                    setWeek(apiWeek);
                }
                if (apiSlot && apiSlot.length) {
                    setSlots(apiSlot);
                }
                setLoading(false)
                setCount(count + 1);
            }
            call()
        }
    }, [theme])

    console.log(slots, 59)
    console.log(week?.length, 60)

    return (
        <>
            {theme && !loading ?

                <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
                    <View style={styles.header} className='mt-6'>
                        <View style={styles.headerAction}>
                            <TouchableOpacity
                                className='bg-white p-[3px] rounded-full'
                                onPress={() => {
                                    router.back()
                                }}>
                                <FeatherIcon
                                    color="#000"
                                    name="arrow-left"
                                    size={24}
                                />
                            </TouchableOpacity>
                        </View>

                        <Text numberOfLines={1} style={[styles.headerTitle, { color: theme.pageHeader.textColor }]}>
                            Time Table
                        </Text>

                        <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
                            <TouchableOpacity
                                className='bg-white p-[3px] rounded-full'
                                onPress={() => {
                                    // handle onPress
                                }}>
                                <FeatherIcon
                                    color="#000"
                                    name="more-vertical"
                                    size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {slots ? <ScrollView contentContainerStyle={styles.content}>

                        <View style={[styles.section]} className=''>

                            {week && week.sort((a: GetTimeTableWeekInter, b: GetTimeTableWeekInter) => a.year_week < b.year_week ? 1 : a.year_week > b.year_week ? -1 : 0).map((week: GetTimeTableWeekInter) => (
                                <View style={{ marginVertical: hp(1), padding: hp(0.7), elevation: hp(0.7), backgroundColor: "white" }} key={week.id} className='rounded'>
                                    <Text style={{ textAlign: "center", fontSize: hp(2.7), fontWeight: 700, paddingVertical: hp(1) }}>{getStartEndOfWeek(week.year_week, new Date().getFullYear())[0].slice(0, 11)} - {getStartEndOfWeek(week.year_week, new Date().getFullYear())[1].slice(0, 11)}</Text>
                                    {DayList.map((day: string) => (
                                        <>
                                            {slots.filter((s: GetTimeSlotInter) => (s.timetableday__timetableweek__id == week.id && s.timetableday__day == day)).length ? <Text style={{ textAlign: "left", fontSize: hp(2.3), fontWeight: 500, paddingVertical: hp(0.7), paddingHorizontal: hp(2) }} className='italic'>{day}</Text> : null}
                                            {slots && slots.filter((s: GetTimeSlotInter) => (s.timetableday__timetableweek__id == week.id && s.timetableday__day == day)).map((slot: GetTimeSlotInter) => (
                                                <View style={{ marginBottom: hp(0.5), paddingHorizontal: hp(1), paddingVertical: hp(0.2), elevation: hp(3) }} key={slot.id} className='flex flex-row'>
                                                    <Text style={{ fontSize: hp(2) }}>{slot.start.slice(11, 16)}</Text>
                                                    <Text style={{ fontSize: hp(2) }}>{" - "}</Text>
                                                    <Text style={{ fontSize: hp(2) }}>{slot.end.slice(11, 16)}</Text>
                                                    <Text style={{ fontSize: hp(2.1), marginLeft: hp(1.5) }}>{slot.course__main_course__course_name}</Text>
                                                </View>
                                            ))}
                                        </>
                                    ))}
                                </View>
                            ))
                            }

                        </View>

                        <Text style={styles.contentFooter}>e-conneq 1.0.1</Text>
                    </ScrollView>
                        :
                        <View style={{ flex: 1, flexGrow: 1 }} className='items-center justify-center'>
                            <Text style={{ textAlign: "center", fontSize: hp(2.5), fontWeight: 600 }} className='italic tracking-widest'>No Time Table Available</Text>
                        </View>
                    }

                </SafeAreaView>

                :

                <Loader />

            }
        </>
    );
}

export default ScreenTimeTable



const styles = StyleSheet.create({
    /** Header */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
    },
    headerAction: {
        width: 40,
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 19,
        fontWeight: '600',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        textAlign: 'center',
    },
    /** Content */
    content: {
        paddingHorizontal: 16,
    },
    contentFooter: {
        marginTop: hp(4),
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'center',
        color: '#a69f9f',
    },
    /** Section */
    section: {
        paddingVertical: 12,
    },
    sectionBody: {
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 5,
    },
    rowWrapper: {
        padding: hp(1.2),
        backgroundColor: '#fff',
        borderTopWidth: hp(0.2),
        borderColor: '#e0e0f0',
    },
    rowLabel: {
        fontSize: 16,
        letterSpacing: 0.24,
        color: '#000',
    },
    rowValue: {
        fontSize: 16,
        fontWeight: '500',
        color: 'green',
        marginRight: 4,
    },

})