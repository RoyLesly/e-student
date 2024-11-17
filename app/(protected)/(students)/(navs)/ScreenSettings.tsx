import Loader from '@/components/Loader';
import ModalLogout from '@/components/ModalLogout';
import ModalPayment from '@/components/ModalPayment';
import { useAuth } from '@/context/authContext';
import defaultTheme from '@/context/helper';
import darkTheme from '@/context/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyleSheet, SafeAreaView, ScrollView, View,
  Text, TouchableOpacity, Switch, Image,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FeatherIcon from 'react-native-vector-icons/Feather';


const ScreenSettings = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { user, theme, setTheme, profile } = useAuth();
  const [count, setCount] = useState<number>(0)
  const [modalVisibleLogout, setModalVisibleLogout] = useState<boolean>(false)
  const [modalVisiblePayment, setModalVisiblePayment] = useState<boolean>(false)
  const [form, setForm] = useState({
    account_status: false,
    darkMode: "default",
    language: "en",
  });
  useEffect(() => {
    if (count == 0) {
      const call = async () => {
        const themeMode = await AsyncStorage.getItem("themeMode")
        const lan = await AsyncStorage.getItem("language")
        if (themeMode && form.darkMode !== themeMode) {
          setForm({ ...form, darkMode: themeMode })
        }
        if (lan && lan !== "en") {
          setForm({ ...form, language: "fr" })
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
  const changeLanguage = async () => {
    if (form.language === "en") {
      await AsyncStorage.setItem("language", "fr");
      i18n.changeLanguage("fr");
      setForm({ ...form, language: "fr" });
    }
    if (form.language === "fr") {
      await AsyncStorage.setItem("language", "en");
      i18n.changeLanguage("en");
      setForm({ ...form, language: "en" });
    }
  }

  const activateAccount = () => {
    setModalVisiblePayment(!modalVisiblePayment)
  }

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
                  size={24} />
              </TouchableOpacity>
            </View>

            <Text numberOfLines={1} style={[styles.headerTitle, { color: theme.pageHeader.textColor }]}>
              {t("settings")}
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
              <Text style={styles.sectionTitle}>{t("account")}</Text>

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
              <Text style={styles.sectionTitle}>{t("status")}</Text>

              <View style={styles.rowSpacer} />

              <View style={[styles.rowWrapper, { borderRadius: 12 }]}>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>{t("account-status")}</Text>

                  <View style={styles.rowSpacer} />

                  <Switch
                    trackColor={{ false: '#f7303f', true: '#209493' }}
                    thumbColor={form.account_status ? '#1ebab6' : '#f4f3f4'}
                    onValueChange={() => { activateAccount(); }
                    }
                    style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                    value={form.account_status} />
                </View>
              </View>

            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t("preferences")}</Text>

              <View style={styles.sectionBody}>



                <View style={[styles.rowWrapper, styles.rowFirst]}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}
                    style={styles.row}>
                    <Text style={styles.rowLabel}>{t("language")}</Text>
                    <View style={styles.rowSpacer} />


                    <Text style={styles.rowLabel}>{form.language === "en" ? "English" : "French"}</Text>
                    <Switch onValueChange={() => { changeLanguage(); }}
                      style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                      value={form.language === "en"} 
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.rowWrapper}>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>{t("dark-mode")}</Text>

                    <View style={styles.rowSpacer} />

                    <Switch onValueChange={() => { changeThemeMode(); }}
                      style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                      value={form.darkMode == "darkMode"} 
                    />
                  </View>
                </View>

                {/* <View style={[styles.rowWrapper, styles.rowLast]}>
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
                </View> */}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t("resources")}</Text>

              <View style={styles.sectionBody}>
                <View style={[styles.rowWrapper, styles.rowFirst]}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}
                    style={styles.row}>
                    <Text style={styles.rowLabel}>{t("contact-us")}</Text>

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
                    <Text style={styles.rowLabel}>{t("rate-in-app-store")}</Text>

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
                    <Text style={styles.rowLabel}>{t("terms-and-privacy")}</Text>

                    <View style={styles.rowSpacer} />

                    <FeatherIcon
                      color="#bcbcbc"
                      name="chevron-right"
                      size={19} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <ModalLogout
              modalVisible={modalVisibleLogout}
              setModalVisible={setModalVisibleLogout}
            />
            <ModalPayment
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
    marginTop: hp(1),
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