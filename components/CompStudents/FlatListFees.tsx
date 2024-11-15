import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetTransactionsInter } from '@/utils/inter';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '@/context/authContext'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const FlatListFees = (
    { data, pageType, handlePress }
    : 
    { data: GetTransactionsInter[], pageType: "FEES", handlePress: any }
) => {
    const { domain, theme } = useAuth();
    const [loading, setLoading] = useState<boolean>(true)
    const [schoolType, setSchoolType] = useState<string>("")
    useEffect(() => {
        if (schoolType == "") {
            const call = async () => {
                const t = await AsyncStorage.getItem("school")
                if (t) { setSchoolType(t); setLoading(false); }
            }
            call();
        }
    }, [schoolType])

    return (
        <>
            {!loading ?
                <>
                    <Header
                        pageType={pageType}
                        theme={theme}
                    />

                    <FlatList
                        data={data.sort((a: GetTransactionsInter, b: GetTransactionsInter) => a.created_at > b.created_at ? 1 : a.created_at < b.created_at ? -1 : 0)}
                        renderItem={({ item }) => <Item
                            data={item}
                            onPress={handlePress}
                            domain={domain}
                            schoolType={schoolType}
                            pageType={pageType}
                            theme={theme}
                        />
                        }
                        keyExtractor={item => item.id.toString()}
                        className="flex p-1 w-full"
                        nestedScrollEnabled={true}
                        scrollEnabled={false}  // Disable scrolling
                    />
                    <View style={{ borderColor: theme.card.borderColor }} className={`flex flex-row items-end justify-between my-1`}>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.3) }} className='italic w-[50%]'></Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.5) }} className='flex italic text-end w-[25%]'>{data.reduce((sum: number, {amount}) => sum + amount, 0).toLocaleString()}F</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2) }} className='flex italic text-end w-[25%]'></Text>
    </View>
                </>
                :
                <ActivityIndicator />
            }
        </>
    )
}

export default FlatListFees


const Header = ({ pageType, theme }: any) => {

    if (pageType == "FEES") return <View style={{ backgroundColor: theme.card.headerColor }} className='flex flex-row items-center justify-between mt-2 p-1 rounded-lg'>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.4) }} className='font-semibold text-center w-1/2'>Reason</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.4) }} className='font-semibold text-end w-1/4'>Amount</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.4) }} className='font-semibold text-end w-1/4'>Date</Text>
    </View>

    if (pageType == "EXAM") return <View style={{ backgroundColor: theme.card.headerColor }} className='flex flex-row items-center justify-between mt-2 p-1 rounded'>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.4) }} className='font-medium w-[70%]'>Course Name</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.4) }} className='font-medium w-[15%]'>Exam</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.4) }} className='font-medium w-[15%]'>Status</Text>
    </View>
}

const Item = ({ data, pageType, theme }: { data: GetTransactionsInter, domain: string, schoolType: string, onPress: any, pageType: "FEES", theme: any }) => {

    if (pageType == "FEES") return <View style={{ borderColor: theme.card.borderColor }} className={`border-b flex flex-row items-end justify-between my-1`}>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.3) }} className='italic w-[50%]'>{data.reason}</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2.2) }} className='flex italic text-end w-[25%]'>{data.amount.toLocaleString()}F</Text>
        <Text style={{ color: theme.card.textColor, fontSize: hp(2) }} className='flex italic text-end w-[25%]'>{data.created_at}</Text>
    </View>
}
