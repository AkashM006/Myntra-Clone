import { View, StyleSheet, Image, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import CustomText from '../Reusable/CustomText'

const CouponCard = ({ item }) => {
    const {colors} = useSelector(state => state.theme)
  return (
      <View style={[styles.container, { backgroundColor: colors['LIGHT'], borderColor: colors['SHADELIGHT'] }]}>
          <View>
              <Image
                  source={{ uri: item.image }}
                  style={styles.image}
              />
          </View>
          <View style={styles.textContainer}>
              <CustomText color={colors['DARK']} size={14} weight='bold'>
                  {item.title}
              </CustomText>
              <CustomText bottom={10} color={colors['SHADEDARK']} size={13} >
                  {item.subtitle}
              </CustomText>
              <CustomText color={colors['DARK']} size={11}>
                  Code: {item.code}
              </CustomText>
              <CustomText bottom={10} color={colors['DARK']} size={11}>
                  Expiry: <CustomText color={colors['DARK']} weight={'bold'} size={11}>
                      {item.expiry}
                  </CustomText>
              </CustomText>
              <CustomText size={14} color={colors['PRIMARY']} weight='light'>
                    View Products
              </CustomText>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: '5%',
        paddingHorizontal: '2.5%',
        marginBottom: '5%',
        flexDirection: 'row',
        borderWidth: 1,
    },
    image: {
        resizeMode: 'cover',
        height: 100,
        width: 100,
        alignSelf: 'flex-start'
    },
    textContainer: {
        marginLeft: '5%'
    }
})

export default CouponCard