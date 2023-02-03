import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomText from '../../Reusable/CustomText'
import CheckBox from '../../Reusable/CheckBox'
import { useSelector } from 'react-redux'

const AddressType = ({ values, setFieldValue, error, touched }) => {

    const { colors } = useSelector(state => state.theme)

    return (
        <View style={{ marginVertical: 10 }}>
            <CustomText color={colors['SHADEDARK']}>
                Type of Address <CustomText color={colors['PRIMARY']}>*</CustomText>
            </CustomText>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        value={values.typeOfAddress !== null && values.typeOfAddress === 'Home'}
                        tickHidden
                        dimension={20}
                        radius={20}
                        changeHandler={() => {
                            setFieldValue('typeOfAddress', "Home")
                            setFieldValue('sunOpen', false)
                            setFieldValue('satOpen', false)
                        }}
                        radio
                    />
                    <CustomText left={7} color={colors['DARK']}>
                        Home
                    </CustomText>
                </View>
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        tickHidden
                        radio
                        value={values.typeOfAddress !== null && values.typeOfAddress === 'Office'}
                        dimension={20}
                        radius={20}
                        changeHandler={() => setFieldValue('typeOfAddress', "Office")}
                    />
                    <CustomText left={7} color={colors['DARK']}>
                        Office
                    </CustomText>
                </View>
            </View>
            {
                touched && error && <CustomText color={colors['DANGER']}>
                    {error}
                </CustomText>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    checkBoxContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        marginRight: 45
    }
})

export default AddressType