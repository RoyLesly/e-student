import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/authContext'
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';

const PageTitle = ({ title, styles, subTitle }: { title: string, styles?: string, subTitle?: string }) => {

  const { theme } = useAuth();

  return (
<View>
<Text style={{ backgroundColor: theme?.pageTitle.backgroundColor, color: theme?.card.textColor2, fontSize: hp(2.9) }} className={`font-bold tracking-wider px-4 text-center rounded-t-xl `}>{title}</Text>
<Text style={{ backgroundColor: theme?.pageTitle.backgroundColor, color: theme?.card.textColor2, fontSize: hp(2.2) }} className={`font-semibold tracking-wider px-4 text-center rounded-b-xl `}>{subTitle}</Text>

</View>  )
}

export default PageTitle

