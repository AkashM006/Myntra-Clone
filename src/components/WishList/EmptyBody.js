import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import CustomText from '../Reusable/CustomText'
import CustomButton from '../Reusable/CustomButton'
import { useNavigation } from '@react-navigation/native'

const EmptyBody = () => {

    const { colors } = useSelector(state => state.theme)
    const navigation = useNavigation()

    return (
        <View style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
            <CustomText align='center' weight='bolder' size={24} color={colors['DARK']} bottom={10}>
                Your wishlist is empty
            </CustomText>
            <CustomText align='center' size={16} color={colors['SHADEDARK']}>
                Save ites that you like in your wishlist. Review them anytime and easily move them to the bag.
            </CustomText>
            <View style={{ alignSelf: 'center' }}>
                <CustomButton
                    onPressHandler={() => navigation.navigate('MainHome')}
                    bgColor={colors['LIGHT']}
                    border={{
                        width: 1,
                        color: colors['PRIMARY']
                    }}
                    text='SHOP NOW'
                    color={colors['PRIMARY']}

                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 150,
        paddingHorizontal: '10%'
    }
})

export default EmptyBody