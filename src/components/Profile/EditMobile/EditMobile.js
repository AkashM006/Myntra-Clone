import { View, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import CustomText from '../../Reusable/CustomText'
import COLORS from '../../../constants/Colors'
import CustomButton from '../../Reusable/CustomButton'

const EditMobile = () => {

    const [mobile, setMobile] = useState('')
    const [err, setErr] = useState(null)

    const textChangeHandler = newPhone => setMobile(newPhone)


    return (
        <View style={styles.container}>
            <CustomText top={20} bottom={10} weight='bold' size={18}>
                Update your mobile number
            </CustomText>
            <CustomText color={COLORS.SHADELIGHT}>
                Will be verified in the next step
            </CustomText>
            <View style={[styles.inputContainer, { borderColor: (err !== null) ? COLORS.DANGER : COLORS.SHADEDARK, }]}>
                <View style={styles.countryCode}>
                    <CustomText color={COLORS.SHADEDARK}>
                        +91
                    </CustomText>
                </View>
                <View style={styles.separator} />
                <TextInput
                    keyboardType='number-pad'
                    placeholder='Mobile Number'
                    placeholderTextColor={'#c5c5c5'}
                    style={styles.input}
                    maxLength={10}
                    value={mobile}
                    onChangeText={textChangeHandler}
                />
            </View>
            {err && <CustomText color={COLORS.DANGER}>
                {err}
            </CustomText>}
            <CustomButton text='UPDATE MOBILE NUMBER' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: '12%'
    },
    inputContainer: {
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 2,
        flexDirection: 'row',
    },
    countryCode: {
        justifyContent: 'center',
        padding: 10,
    },
})

export default EditMobile