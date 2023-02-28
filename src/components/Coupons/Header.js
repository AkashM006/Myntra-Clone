import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import { useSelector } from 'react-redux'
import CustomText from '../Reusable/CustomText'
import { useNavigation } from '@react-navigation/native'

const Header = () => {

    const { colors } = useSelector(state => state.theme)
    const navigation = useNavigation()

  return (
    <View style={styles.container}>
          <Pressable onPress={() => navigation.goBack()}>
              <FastImage
                  source={{ uri: ICONS.ICON_BACK }}
                  style={{
                      height: 25,
                      width: 25
                  }}
                  tintColor={colors['DARK']}
              />
          </Pressable>
          <CustomText weight='bolder' color={colors['DARK']} left={15} size={16}>
              MY COUPONS
          </CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        paddingHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default Header