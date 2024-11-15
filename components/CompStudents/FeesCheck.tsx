import { ScrollView, Text, View } from 'react-native'
import React from 'react'
import { GetResultInter } from '@/utils/inter'
import PageTitle from './PageTitle'
import FlatListResults from './FlatListResults'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const FeesCheck = (
    { amountPaid, requiredAmount, data, title, resType, theme }
    :
    { amountPaid: number, requiredAmount: number, title: string, data: GetResultInter[], resType: "CA" | "EXAM" | "RESIT" | "RESULT", theme: any }
) => {

    return (

        <ScrollView style={{ 
            borderRadius: hp(2), marginVertical: hp(2), 
            backgroundColor: theme.card.backgroundColor,
            elevation: theme.card.elevation,
            shadowColor: theme.card.shadowColor,
        }} className=''>
            <View className='p-2 w-full'>
                <PageTitle title={`${title}`} subTitle={`(${data?.length} courses)`} />
                {amountPaid > (requiredAmount - 0.01) ?
                    <FlatListResults
                        data={data}
                        handlePress={() => console.log("press")}
                        pageType={resType}
                    />
                    :
                    null
                }
            </View>

            {amountPaid < (requiredAmount - 0.01) ?
                <View  className='flex items-center justify-center my-2 px-8 py-2'>
                    <Text style={{ fontSize: hp(2.1), color: theme.card.textColor }} className="italic py-2">Not Meeting Minimum Fees</Text>
                    <Text style={{ fontSize: hp(2.2), color: theme.card.textColor }} className="font-medium italic"> {requiredAmount.toLocaleString()} F</Text>
                </View>
                :
                null
            }
        </ScrollView>

    )
}

export default FeesCheck