import Loader from '@/components/Loader';
import ModalApplyTranscript from '@/components/ModalApplyTranscript';
import ModalCheckCourses from '@/components/ModalCheckCourses';
import ModalFeesStatus from '@/components/ModalFeesStatus';
import ModalLogout from '@/components/ModalLogout';
import ModalPayment from '@/components/ModalPayment';
import { useAuth } from '@/context/authContext';
import defaultTheme from '@/context/helper';
import darkTheme from '@/context/helper';
import { GetCourseUrl, GetResultUrl, GetTranscriptApplicationUrl, TranscriptApplicationUrl } from '@/utils/apiLinks';
import { protocol } from '@/utils/config';
import { getData } from '@/utils/functions';
import { GetCourseInter, GetResultInter, GetTransactionsInter, GetTranscriptApplicationInter } from '@/utils/inter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet, SafeAreaView, ScrollView, View,
    Text, TouchableOpacity, Switch, Image,
    ActivityIndicator,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FeatherIcon from 'react-native-vector-icons/Feather';


const ScreenTranscript = () => {
    const router = useRouter();
    const { user, theme, profile, domain } = useAuth();
    const [count, setCount] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [modalVisiblePayment, setModalVisiblePayment] = useState<boolean>(false)
    const [modalVisibleFees, setModalVisibleFees] = useState<boolean>(false)
    const [modalVisibleCourses, setModalVisibleCourses] = useState<boolean>(false)
    const [modalVisibleApply, setModalVisibleApply] = useState<boolean>(false)
    const [results, setResults] = useState<GetResultInter[]>()
    const [coursesWritten, setCoursesWritten] = useState<boolean>(false)
    const [transcriptApplication, setTranscriptApplication] = useState<GetTranscriptApplicationInter>()

    useEffect(() => {
        if (count == 0) {
            const call = async () => {
                const apiRes: GetResultInter[] | any = await getData(protocol + "api" + domain + GetResultUrl, {
                    student__id: profile.profile_id, nopage: true, fieldList: [
                        'id', 'ca', "exam", "resit", "course__main_course__course_name", "course__semester"
                    ]
                });
                const apiTransApp: GetTransactionsInter[] | any = await getData(protocol + "api" + domain + GetTranscriptApplicationUrl, {
                    userprofile__id: profile.profile_id, nopage: true, fieldList: [
                        'id', 'print_count', "status", "approved_at", "userprofile__id", "userprofile__user__matricle"
                    ]
                });
                console.log(apiTransApp, 52)
                if (apiTransApp && apiTransApp.length) {
                    setTranscriptApplication(apiTransApp[0])
                }
                if (apiRes && apiRes.length) {
                    setResults(apiRes);
                    const fil = await apiRes.filter((item: GetResultInter) => (!item.ca || !item.exam || item.ca === null || item.exam === null))
                    if (fil && fil.length > 0) {
                    } else {
                        setCoursesWritten(true)
                    }
                    setLoading(false)
                }
                setCount(count + 1);
            }
            call()
        }
    }, [theme])

    return (
        <>
            {theme ?
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
                            Transcript
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



                    <View style={{ alignContent: "center" }} className='flex items-center justify-center mb-4 mt-10 w-full'>
                        <Text style={styles.sectionTitle2}>To Apply for Transcript,</Text>
                        <Text style={styles.sectionTitle2}>The conditions below must be satisfied</Text>

                    </View>




                    <ScrollView contentContainerStyle={styles.content}>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Verification</Text>

                            <View style={styles.sectionBody}>

                                <View style={[styles.rowWrapper, styles.rowFirst]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // handle onPress
                                        }}
                                        style={styles.row}>
                                        <Text style={styles.rowLabel}>Account Status</Text>

                                        <View style={styles.rowSpacer} />

                                        {profile.platform ?
                                            <Text style={[styles.rowValue, { marginRight: hp(2) }]}>OK</Text>
                                            :
                                            <Switch onValueChange={() => { setModalVisiblePayment(true); }}
                                                style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                                                value={profile.platform}
                                            />
                                        }

                                    </TouchableOpacity>
                                </View>

                                <View style={[styles.rowWrapper]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // handle onPress
                                        }}
                                        style={styles.row}>
                                        <Text style={styles.rowLabel}>Tuition Status</Text>

                                        <View style={styles.rowSpacer} />

                                        {profile.balance < 1000 ?
                                            <Text style={[styles.rowValue, { marginRight: hp(2) }]}>OK</Text>
                                            :
                                            <Switch onValueChange={() => { setModalVisibleFees(true); }}
                                                style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                                                value={profile.balance < 1}
                                            />
                                        }

                                    </TouchableOpacity>
                                </View>

                                <View style={[styles.rowWrapper]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // handle onPress
                                        }}
                                        style={styles.row}>
                                        <Text style={styles.rowLabel}>Registration Status</Text>

                                        <View style={styles.rowSpacer} />

                                        {profile.paid < 1000 ?
                                            <Text style={[styles.rowValue, { marginRight: hp(2) }]}>OK</Text>
                                            :
                                            <Switch onValueChange={() => { setModalVisibleFees(true); }}
                                                style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                                                value={profile.balance < 1}
                                            />
                                        }

                                    </TouchableOpacity>
                                </View>


                                <View style={[styles.rowWrapper, styles.rowLast]}>
                                    <View style={styles.row}>
                                        <Text style={styles.rowLabel}>All Courses Results</Text>

                                        <View style={styles.rowSpacer} />

                                        {loading ?
                                            <ActivityIndicator style={{ marginRight: hp(2) }} />
                                            :
                                            profile.paid < 1000 ?
                                                <Text style={[styles.rowValue, { marginRight: hp(2) }]}>OK</Text>
                                                :
                                                <Switch onValueChange={() => { setModalVisibleFees(true); }}
                                                    style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                                                    value={profile.balance < 1}
                                                />
                                        }
                                    </View>
                                </View>

                            </View>
                        </View>



                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Application Status</Text>

                            <View style={styles.sectionBody}>

                                <View style={[styles.rowWrapper, styles.rowFirst]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // handle onPress
                                        }}
                                        style={styles.row}>
                                        <Text style={styles.rowLabel}>Status</Text>

                                        <View style={styles.rowSpacer} />

                                        {transcriptApplication ? <Text style={styles.rowValue}>{transcriptApplication.status}</Text>
                                        :
                                        <Text style={styles.rowValue}>Not Applied</Text>}

                                        <FeatherIcon
                                            color="#bcbcbc"
                                            name="chevron-right"
                                            size={19}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={[styles.rowWrapper, styles.rowLast]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // handle onPress
                                        }}
                                        style={styles.row}>
                                        <Text style={styles.rowLabel}>Ready</Text>

                                        <View style={styles.rowSpacer} />

                                        {transcriptApplication ? <Text style={styles.rowValue}>{transcriptApplication.status == "PRINTED" ? "READY" : "In-Progress"}</Text>
                                        :
                                        <Text style={styles.rowValue}>Not Applied</Text>}

                                        <FeatherIcon
                                            color="#bcbcbc"
                                            name="chevron-right"
                                            size={19}
                                        />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>

                        <ModalPayment
                            modalVisible={modalVisiblePayment}
                            setModalVisible={setModalVisiblePayment}
                            link=''
                        />

                        <ModalFeesStatus
                            modalVisible={modalVisibleFees}
                            setModalVisible={setModalVisibleFees}
                        />

                        {results ?
                            <ModalCheckCourses
                                modalVisible={modalVisibleCourses}
                                setModalVisible={setModalVisibleCourses}
                                data={results}
                            /> 
                            : 
                            null
                        }

                        {/* {!coursesWritten && profile.platform && profile.balance > 1000 ? */}
                        {!loading ? coursesWritten && profile.platform && profile.balance < 1000 ?
                            <ModalApplyTranscript
                                modalVisible={modalVisibleApply}
                                setModalVisible={setModalVisibleApply}
                            />
                            :
                            null
                            :
                            <ActivityIndicator />
                        }

                        <Text style={styles.contentFooter}>e-conneq 1.0.1</Text>
                    </ScrollView>
                </SafeAreaView>


                :

                <Loader />

            }
        </>
    );
}

export default ScreenTranscript



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
    sectionTitle: {
        margin: 8,
        marginLeft: 12,
        fontSize: 13,
        letterSpacing: 0.33,
        fontWeight: '500',
        color: '#a69f9f',
        textTransform: 'uppercase',
    },
    sectionTitle2: {
        margin: hp(0.1),
        fontSize: hp(1.8),
        letterSpacing: 0.53,
        fontWeight: '400',
        color: '#a69f9f',
        textTransform: 'uppercase',
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
    /** Profile */
    profile: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: 9999,
        marginRight: 12,
    },
    profileBody: {
        marginRight: 'auto',
    },
    profileName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#292929',
    },
    profileHandle: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: '400',
        color: '#858585',
    },
    /** Row */
    row: {
        height: 44,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 12,
    },
    rowWrapper: {
        paddingLeft: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#e0e0f0',
        paddingVertical: hp(0.3)
    },
    rowFirst: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    rowLabel: {
        fontSize: 16,
        letterSpacing: 0.24,
        color: '#000',
    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    rowValue: {
        fontSize: 16,
        fontWeight: '500',
        color: 'green',
        marginRight: 4,
    },
    rowLast: {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },

})