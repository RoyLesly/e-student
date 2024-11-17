import Loader from '@/components/Loader';
import { useAuth } from '@/context/authContext';
import { GetNotificationUrl } from '@/utils/apiLinks';
import { protocol } from '@/utils/config';
import { getData } from '@/utils/functions';
import { GetNotificationInter } from '@/utils/inter';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, SafeAreaView, ScrollView, View,
  Text, TouchableOpacity,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FeatherIcon from 'react-native-vector-icons/Feather';


const ScreenAnnouncements = () => {
  const router = useRouter();
  const { user, theme, profile, domain } = useAuth();
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [anouncements, setAnouncements] = useState<GetNotificationInter[]>()


  useEffect(() => {
    if (count == 0) {
      const call = async () => {
        const apiNoti: GetNotificationInter[] | any = await getData(protocol + "api" + domain + GetNotificationUrl, {
          status: true, nopage: true, role: "student", fieldList: [
            'id', 'message', "status", "role", "target", "created_at", "noti_type"
          ]
        });
        console.log(apiNoti, 30)
        if (apiNoti && apiNoti.length) {
          setAnouncements(apiNoti);
          setLoading(false)
        }
        setCount(count + 1);
      }
      call()
    }
  }, [theme])

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
              Notification
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

          <ScrollView contentContainerStyle={styles.content}>

            <View style={[styles.section]} className=''>


              {anouncements && anouncements.sort((a: GetNotificationInter, b: GetNotificationInter) => a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0).map((item: GetNotificationInter) => (

                <View style={styles.sectionBody} key={item.id}>

                  <View style={[styles.rowWrapper, { borderRadius: hp(3), borderWidth: hp(0.1), marginVertical: hp(0.8) }]} key={item.id}>

                   <View className='flex flex-row items-center justify-between'>
                   <View className='flex flex-row justify-between'>
                      <Text style={{ fontWeight: 600, fontSize: hp(2.5) }} className='italic'>Title: {item.noti_type}</Text>
                    </View>
                    <View className='flex flex-row justify-between'>
                      <Text style={styles.rowLabel}>Date: {item.created_at}</Text>
                    </View>
                   </View>

                    <Text style={[styles.rowValue, { textAlign: "center", marginTop: hp(0.9) }]} className='flex text-wrap w-full'>
                      {item.message}
                    </Text>
                  </View>

                </View>
              ))}

            </View>

            <Text style={styles.contentFooter}>e-conneq 1.0.1</Text>
          </ScrollView>
        </SafeAreaView>

        :

        <Loader />

      }
    </>
  );
}

export default ScreenAnnouncements



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