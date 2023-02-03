import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomText from '../../Reusable/CustomText'
import { useSelector } from 'react-redux'
import CheckBox from '../../Reusable/CheckBox'

const AddressPreference = ({ open, setFieldValue }) => {

    const { colors } = useSelector(state => state.theme)

    const changeHandler = day => {
        if (open.includes(day)) {
            let temp = [...open].filter(value => value !== day)
            setFieldValue('open', temp)
        } else {
            setFieldValue('open', [...open, day])
        }
    }

    return (
        <View style={styles.container}>
            <CustomText color={colors['SHADEDARK']}>
                Is your office open on weekends?
            </CustomText>
            <View style={styles.checkBoxContainer}>
                <CheckBox
                    value={open.includes('Saturday')}
                    dimension={15}
                    changeHandler={() => changeHandler('Saturday')}
                />
                <CustomText left={10} color={colors['DARK']}>
                    Open on Saturday
                </CustomText>
            </View>
            <View style={styles.checkBoxContainer}>
                <CheckBox
                    value={open.includes('Sunday')}
                    dimension={15}
                    changeHandler={() => changeHandler('Sunday')}
                />
                <CustomText left={10} color={colors['DARK']}>
                    Open on Sunday
                </CustomText>
            </View>
        </View>
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