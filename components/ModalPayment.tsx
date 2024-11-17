import { useAuth } from '@/context/authContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, TextInput } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FeatherIcon from '@expo/vector-icons/Feather';
import PickerSelect from 'react-native-picker-select';
// import { makePayment } from '@/utils/functions';


const ModalPayment = ({ modalVisible, setModalVisible, link }: { modalVisible: boolean, setModalVisible: any, link: string }) => {
  const { setUser, profile } = useAuth();
  const [ loading, setLoading ] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    service: '',
    telephone: '',
    amount: profile.platform_charges,
  });

  const ActionPay = () => {
    setLoading(true);
    console.log(form, 24)


    if (form.service != "" && form.telephone != "" && form.amount > 0){
      const call = async () => {
        // const response = await makePayment({ ...form, telephone: form.telephone});
        // console.log(response, 29)

      }
    }

    // router.replace("/Login")
  }
  
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>


        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
          <KeyboardAwareScrollView style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerBack}>
                <FeatherIcon
                  onPress={() => setModalVisible(false)}
                  color="#1D2A32"
                  name="chevron-left"
                  size={30}
                />
              </View>
              <Text style={[styles.title, { marginVertical: hp(2) }]} className='w-full'>Account Activation</Text>
              <Text style={[styles.subtitle, { marginVertical: hp(2) }]} className='w-full'>
                Fill in the fields below to make payment.
              </Text>
            </View>


            <View style={styles.form}>


              <Text style={styles.inputLabel}>Select Operator</Text>
              <View style={[styles.input, { borderRadius: hp(2), backgroundColor: "white" }]} className=''>
                <PickerSelect
                  onValueChange={(value) => setForm({ ...form, service: value })}
                  items={[
                    { label: 'MTN', value: 'MTN' },
                    { label: 'ORANGE', value: 'ORANGE' },
                  ]}
                />
              </View>

              <View style={styles.input}>
                {/* <Text style={styles.inputLabel}>Telephone Number</Text> */}
                <TextInput
                  clearButtonMode="while-editing"
                  onChangeText={telephone => setForm({ ...form, telephone })}
                  placeholder="Enter Telephone Number"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.telephone}
                />
              </View>

              <View style={styles.input}>
                {/* <Text style={styles.inputLabel}>Telephone Number</Text> */}
                <TextInput
                  clearButtonMode="while-editing"
                  onChangeText={amount => setForm({ ...form, amount })}
                  placeholder={profile.platform_charges.toString()}
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={profile.platform_charges}
                  readOnly
                />
              </View>



              <View style={styles.formAction}>
                <TouchableOpacity
                  onPress={() => ActionPay()}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Activate</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>



      </Modal>


      <View style={{ paddingVertical: 12 }}>
        <View style={{
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 5,
        }}>

        </View>
      </View>


    </>
  );
};

export default ModalPayment;


const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    textAlign: "center",
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  /** Header */
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  headerBack: {
    padding: 8,
    paddingTop: 0,
    position: 'relative',
    marginLeft: -16,
    marginBottom: 6,
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: hp(4),
    marginBottom: 16,
  },
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: hp(4),
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: hp(2.2),
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(3),
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
