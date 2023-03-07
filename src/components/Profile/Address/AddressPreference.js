import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomText from '../../Reusable/CustomText'
import { useSelector } from 'react-redux'
import CheckBox from '../../Reusable/CheckBox'
import Animated, { FadeIn, FadeOut, } from 'react-native-reanimated'

const AddressPreference = ({ setFieldValue, open }) => {

    // const {sat, sun} = open

    const { colors } = useSelector(state => state.theme)

    const changeHandler = day => {
        // let temp = day === 'sat' ? sat : sun
        // setFieldValue(day+'Open',!temp)
        if (day === 'sat') {
            let temp = []
            if (open.includes('Saturday'))
                temp = open.filter(value => value !== 'Saturday')
            else
                temp = [...open, 'Saturday']
        } else {
            let temp = []
            if (open.includes('Sunday'))
                temp = open.filter(value => value !== 'Sunday')
            else
                temp = [...open, 'Sunday']
        }
    }

    return (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
            <CustomText color={colors['SHADEDARK']}>
                Is your office open on weekends?
            </CustomText>
            <View style={styles.checkBoxContainer}>
                <CheckBox
                    value={open.includes('Saturday')}
                    dimension={15}
                    changeHandler={() => changeHandler('sat')}
                />
                <CustomText left={10} color={colors['DARK']}>
                    Open on Saturday
                </CustomText>
            </View>
            <View style={styles.checkBoxContainer}>
                <CheckBox
                    value={open.include('Sunday')}
                    dimension={15}
                    changeHandler={() => changeHandler('sun')}
                />
                <CustomText left={10} color={colors['DARK']}>
                    Open on Sunday
                </CustomText>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: { paddingVertical: 10 },
    checkBoxContainer: {
        flexDirection: 'row',
        marginTop: 15
    }
})

export default AddressPreference