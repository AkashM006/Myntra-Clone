import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomText from '../Reusable/CustomText'
import COLORS from '../../constants/Colors'
import CustomTextInput from '../Reusable/CustomTextInput'

const PasswordField = ({ password, setPassword, setIsPasswordValid, err, placeholder, onBlurHandler }) => {

    const [isLong, setIsLong] = useState(false)
    const [hasUpper, setHasUpper] = useState(false)
    const [hasNumber, setHasNumber] = useState(false)
    const [hasSpecial, setHasSpecial] = useState(false)

    useEffect(() => {
        setIsLong(password.length >= 8)
        setHasUpper(/[A-Z]/.test(password))
        setHasNumber(/[0-9]/.test(password))
        setHasSpecial(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password))
    }, [password])

    useEffect(() => {
        setIsPasswordValid(isLong && hasUpper && hasNumber && hasSpecial)
    }, [isLong, hasUpper, hasNumber, hasSpecial])

    const backgroundColor = {
        true: '#92dc8f',
        false: '#efefef'
    }

    const color = {
        true: COLORS.WHITE,
        false: COLORS.SHADEDARK
    }

    return (
        <>
            <CustomTextInput
                value={password}
                // onChangeTextHandler={value => setPassword(value)}
                onChangeTextHandler={setPassword}
                placeholder={placeholder ?? 'Create Password*'}
                secure={true}
                error={err}
                onBlurHandler={onBlurHandler}
            />
            <View style={styles.textContainer}>
                <CustomText color={COLORS.SHADEDARK} style={[styles.text, { backgroundColor: backgroundColor[isLong], color: color[isLong] }]}>
                    8 Characters
                </CustomText>
                <CustomText color={COLORS.SHADEDARK} style={[styles.text, { backgroundColor: backgroundColor[hasUpper], color: color[hasUpper] }]}>
                    1 Uppercase
                </CustomText>
                <CustomText color={COLORS.SHADEDARK} style={[styles.text, { backgroundColor: backgroundColor[hasNumber], color: color[hasNumber] }]}>
                    1 Numeric
                </CustomText>
                <CustomText color={COLORS.SHADEDARK} style={[styles.text, { backgroundColor: backgroundColor[hasSpecial], color: color[hasSpecial] }]}>
                    1 Special
                </CustomText>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        borderColor: 'lightgray',
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        borderRadius: 3,
    },
    textContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    text: {
        marginRight: 20,
        backgroundColor: '#efefef',
        marginBottom: 10,
        padding: 2,
        paddingHorizontal: 5,
        borderRadius: 4,
    }
})

export default PasswordField