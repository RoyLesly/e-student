import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { GetSchoolFeesInter } from '@/utils/inter'
import CustomButton from '../../components/CustomButton'
import { ProfileProps } from '@/context/authContext'

const CompPayment = ({ apiSchoolFees }: { apiSchoolFees: ProfileProps }) => {

    const [ isSubmitting, setIsubmitting ] = useState(false)
    
  return (
    <View style={styles.container}>
      <Text className='font-psemibold my-4 text-primary text-xl'>Account Not Active</Text>
      <CustomButton
            title="Activate"
            handlePress={() => {}}
            containerStyles="mt-10 px-10"
            textStyles={""}
            isLoading={isSubmitting}
          />
    </View>
  )
}

export default CompPayment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // semi-transparent background
    },
    message: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
});