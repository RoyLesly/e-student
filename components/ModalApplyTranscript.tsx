import { useAuth } from '@/context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ModalApplyTranscript = ({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: any }) => {
  const { setUser } = useAuth();
  const router = useRouter();

  const LogoutAction = () => {
    setUser({});
    // AsyncStorage.setItem("access", "");
    // AsyncStorage.setItem("refresh", "");
    // setModalVisible(!modalVisible)
    // router.replace("/Login")

  }

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Transcript Application Confirmation</Text>
            <View className='flex flex-row gap-[44px] items-center justify-between mt-[20px]'>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => LogoutAction()}>
                <Text style={styles.textStyle}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
          <View
            style={[
              styles.rowWrapper,
              styles.rowFirst,
              styles.rowLast,
              { alignItems: 'center' },
            ]}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.row}>
              <Text style={[styles.rowLabel, styles.rowLabelLogout]}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>


    </>
  );
};

export default ModalApplyTranscript;


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#000",
    opacity: 0.8
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    paddingVertical: hp(2),
    paddingHorizontal: wp(9),
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#f63343',
  },
  buttonCancel: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: hp(3.5),
    fontWeight: 600,
    marginBottom: 15,
    textAlign: 'center',
  },
  row: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: '#000',
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
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabelLogout: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '600',
    color: '#dc2626',
  },
});
