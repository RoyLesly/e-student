import Loader from '@/components/Loader';
import LogoutModal from '@/components/LogoutModal';
import PaymentModal from '@/components/PaymentModal';
import { useAuth } from '@/context/authContext';
import defaultTheme from '@/context/helper';
import darkTheme from '@/context/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, SafeAreaView, ScrollView, View,
  Text, TouchableOpacity, Switch, Image,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FeatherIcon from 'react-native-vector-icons/Feather';


const ScreenSettings = () => {
  const router = useRouter();
  const { user, theme, setTheme, profile } = useAuth();
  const [count, setCount] = useState<number>(0)
  const [modalVisibleLogout, setModalVisibleLogout] = useState<boolean>(false)
  const [modalVisiblePayment, setModalVisiblePayment] = useState<boolean>(false)
  const [form, setForm] = useState({
    account_status: false,
    darkMode: "default",
    pushNotifications: false,
  });

  console.log(profile)


  useEffect(() => {
    if (count == 0) {
      const call = async () => {
        const themeMode = await AsyncStorage.getItem("themeMode")
        if (themeMode && form.darkMode !== themeMode) {
          setForm({ ...form, darkMode: themeMode })
        }
        setCount(count + 1);
      }
      call()
    }
  }, [theme])

  const changeThemeMode = async () => {
    const themeMode = await AsyncStorage.getItem("themeMode")
    if (themeMode && themeMode == "defaultMode") {
      setTheme(darkTheme);
      setForm({ ...form, darkMode: "darkMode" });
      await AsyncStorage.setItem("themeMode", "darkMode");
    }
    if (themeMode && themeMode == "darkMode") {
      setTheme(defaultTheme);
      setForm({ ...form, darkMode: "defaultMode" });
      await AsyncStorage.setItem("themeMode", "defaultMode");
    }
  }

  const activateAccount = () => {
    console.log("clicked")
    setModalVisiblePayment(!modalVisiblePayment)
  }

  console.log(user, profile, 67)

  return (
    <>
      {theme ?
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
          <View style={styles.header} className='mt-16'>
            <View style={styles.headerAction}>
              <TouchableOpacity
                className='bg-white p-[3px] rounded-full'
                onPress={() => {
                  router.back()
                }}>
                <FeatherIcon
                  color="#000"
                  name="arrow-left"
                  size={24} />
              </TouchableOpacity>
            </View>

            <Text numberOfLines={1} style={[styles.headerTitle, theme.dark ? { color: theme.pageHeader.backgroundColor } : { color: theme.pageHeader.backgroundColor }]}>
              Settings
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
            <View style={[styles.section, { paddingTop: 4 }]}>
              <Text style={styles.sectionTitle}>Account</Text>

              <View style={styles.sectionBody}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.profile}>
                  <Image
                    alt=""
                    source={{
                      uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                    }}
                    style={styles.profileAvatar} />

                  <View style={styles.profileBody}>
                    <Text style={styles.profileName}>{profile.full_name}</Text>

                    <Text style={styles.profileHandle}>{user.username} - {profile.year} - {profile.level}</Text>
                  </View>

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={22} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preferences</Text>

              <View style={styles.sectionBody}>

              <View style={styles.rowWrapper}>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>Account Status</Text>

                    <View style={styles.rowSpacer} />

                    <Switch
                      trackColor={{false: '#f7303f', true: '#209493'}}
                      thumbColor={form.account_status ? '#1ebab6' : '#f4f3f4'}
                      onValueChange={() => { activateAccount(); }
                      }
                      style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                      value={form.account_status} />
                  </View>
                </View>

                <View style={[styles.rowWrapper, styles.rowFirst]}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}
                    style={styles.row}>
                    <Text style={styles.rowLabel}>Language</Text>

                    <View style={styles.rowSpacer} />

                    <Text style={styles.rowValue}>English</Text>

                    <FeatherIcon
                      color="#bcbcbc"
                      name="chevron-right"
                      size={19} />
                  </TouchableOpacity>
                </View>

                <View style={styles.rowWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}
                    style={styles.row}>
                    <Text style={styles.rowLabel}>Location</Text>

                    <View style={styles.rowSpacer} />

                    <Text style={styles.rowValue}>Los Angeles, CA</Text>

                    <FeatherIcon
                      color="#bcbcbc"
                      name="chevron-right"
                      size={19} />
                  </TouchableOpacity>
                </View>

                <View style={styles.rowWrapper}>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>Dark Mode</Text>

                    <View style={styles.rowSpacer} />

                    <Switch
                      onValueChange={() => { changeThemeMode(); }
                      }
                      style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                      value={form.darkMode == "darkMode"} />
                  </View>
                </View>

                <View style={[styles.rowWrapper, styles.rowLast]}>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>Push Notifications</Text>

                    <View style={styles.rowSpacer} />

                    <Switch
                      onValueChange={pushNotifications =>
                        setForm({ ...form, pushNotifications })
                      }
                      style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                      value={form.pushNotifications} />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Resources</Text>

              <View style={styles.sectionBody}>
                <View style={[styles.rowWrapper, styles.rowFirst]}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}
                    style={styles.row}>
                    <Text style={styles.rowLabel}>Contact Us</Text>

                    <View style={styles.rowSpacer} />

                    <FeatherIcon
                      color="#bcbcbc"
                      name="chevron-right"
                      size={19} />
                  </TouchableOpacity>
                </View>

               

                <View style={styles.rowWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}
                    style={styles.row}>
                    <Text style={styles.rowLabel}>Rate in App Store</Text>

                    <View style={styles.rowSpacer} />

                    <FeatherIcon
                      color="#bcbcbc"
                      name="chevron-right"
                      size={19} />
                  </TouchableOpacity>
                </View>

                <View style={[styles.rowWrapper, styles.rowLast]}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}
                    style={styles.row}>
                    <Text style={styles.rowLabel}>Terms and Privacy</Text>

                    <View style={styles.rowSpacer} />

                    <FeatherIcon
                      color="#bcbcbc"
                      name="chevron-right"
                      size={19} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <LogoutModal
              modalVisible={modalVisibleLogout}
              setModalVisible={setModalVisibleLogout}
            />
            <PaymentModal
              modalVisible={modalVisiblePayment}
              setModalVisible={setModalVisiblePayment}
              link=""
            />

            <Text style={styles.contentFooter}>e-conneq 1.0.1</Text>
          </ScrollView>
        </SafeAreaView>


        :

        <Loader />

      }
    </>
  );
}

export default ScreenSettings

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
    marginTop: 24,
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
    color: '#ababab',
    marginRight: 4,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },

})