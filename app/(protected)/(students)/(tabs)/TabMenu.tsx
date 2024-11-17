import React from 'react';
import {
  StyleSheet, SafeAreaView,
  View, Image, Text, TouchableOpacity,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { icons } from '../../../../constants'
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/authContext';

interface TablistProps { id: number, name: string, title: string, link: string, icon: any }

const TabsListMenu: TablistProps[] = [
  { id: 1, name: "ca", title: "CA", link: "ScreenCa", icon: icons.ca },
  { id: 2, name: "ca", title: "Exam", link: "ScreenExam", icon: icons.exam },
  { id: 3, name: "ca", title: "Resit", link: "ScreenResit", icon: icons.picture },
  { id: 4, name: "ca", title: "Result", link: "ScreenResult", icon: icons.result },
  { id: 5, name: "ca", title: "Fees", link: "ScreenFees", icon: icons.calendar2 },
  { id: 6, name: "ca", title: "Transcript", link: "ScreenTranscript", icon: icons.calendar },
  { id: 7, name: "ca", title: "Notice", link: "ScreenAnnouncement", icon: icons.calendar2 },
  { id: 8, name: "ca", title: "Time", link: "ScreenTimeTable", icon: icons.calendar },
  { id: 9, name: "ca", title: "Settings", link: "ScreenSettings", icon: icons.settings },
]


const TabsMenu = () => {
  const router = useRouter();
  const { user, profile, theme } = useAuth();

  const handlePress = (link: string | any) => {
    router.push(link)
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme?.backgroundColor }}>

      <View style={{ elevation: 10, shadowColor: '#52006A', paddingTop: hp(2), paddingBottom: hp(2), paddingHorizontal: hp(3), borderBottomLeftRadius: hp(8), borderBottomRightRadius: hp(8), }} className='bg-[#8de2c2] flex flex-row gap-4 items-center justify-between rounded-xl text-center'>
        <TouchableOpacity onPress={() => { handlePress("/SelectClass") }} className='w-[20%]'>

          <View   >
            <Image
              alt=""
              style={styles.alertAvatar}
              source={icons.icon}
            />
          </View>
        </TouchableOpacity>

        <View className='flex items-center justify-center w-[80%]'>
          <Text style={{ fontSize: hp(2.8), }} className='flex font-semibold items-center justify-center text-center'>
            {user.username}
          </Text>
          <Text style={{ fontSize: hp(2.5), }} className='flex font-medium italic items-center justify-center text-center tracking-widest'>
            {profile.specialty}
            {'\n'}
            {profile.year} {' - '} {profile.level}
          </Text>
        </View>

      </View>



      <View style={styles.container}>
        <View style={styles.alert}>

          <View style={{ flexGrow: 1 }} className='flex-row flex-w flex-wrap gap-6 items-center justify-between mx-[10px] my-2'>

            {
              TabsListMenu.map((item: TablistProps) => (
                <TouchableOpacity onPress={() => { handlePress(item.link) }} key={item.id}>
                  <View>
                    <Image
                      alt=""
                      style={{
                        width: hp(9),
                        height: hp(9),
                        alignSelf: 'center',
                        margin: hp(1),
                      }}
                      source={item.icon}
                    />
                    <Text style={{ fontSize: hp(2.2), color: theme?.textColor }} className='font-medium italic text-center tracking-wider'>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              ))
            }



          </View>



          {/* 

          <View style={{ marginTop: 8 }}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.btnSecondary}>
                <Text style={styles.btnSecondaryText}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View> */}

        </View>
      </View>
    </SafeAreaView>
  );
}


export default TabsMenu



const styles = StyleSheet.create({
  container: {
    paddingHorizontal: hp(3),
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Alert */
  alert: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'stretch',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingTop: hp(2),
  },
  alertContent: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  alertAvatar: {
    width: hp(8),
    height: hp(8),
    borderRadius: 9999,
    alignSelf: 'center',
    margin: hp(1),
  },
  alertTitle: {
    marginBottom: hp(2),
    fontSize: hp(3),
    lineHeight: hp(4.5),
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  alertMessage: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    color: '#9a9a9a',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#f75249',
    borderColor: '#f75249',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  btnSecondaryText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#f75249',
  },
});