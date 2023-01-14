import { View, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import CustomTextInput from '../Reusable/CustomTextInput'
import CustomButton from '../Reusable/CustomButton'
import CustomTitle from '../Reusable/CustomTitle'
import CustomSubtitle from '../Reusable/CustomSubtitle'
import CustomHighlightedText from '../Reusable/CustomHighlightedText'
import CustomMediumText from '../Reusable/CustomMediumText'
import { phoneValidator, emailValidator } from '../../validators'


const ForgotPasswordBody = ({ submitted, setSubmitted }) => {

    const [userId, setUserId] = useState('')
    const [error, setError] = useState(null)

    const validateUserId = () => {
        if (phoneValidator(userId)) {
            setError(null)
            return true
        } else if (emailValidator(userId)) {
            setError(null)
            return true
        }
        setError('Invalid email or mobile number')
        return false
    }

    const handleSubmit = () => {

        if (validateUserId()) {
            setSubmitted(true)
            // send request for reset

            // todo: send request for password reset

            setSubmitted(false)
        }

    }

    return (
        <View style={styles.container}>
            <CustomTitle text='Reset password' />
            <CustomSubtitle text={`Enter your email or mobile number and we'll send a link on your email to reset your password.`} />
            <CustomTextInput
                placeholder='Email or Mobile Number*'
                value={userId}
                onChangeTextHandler={(value) => setUserId(value)}
                error={error}
            />
            <CustomButton disabled={submitted} onPressHandler={handleSubmit} text='SEND LINK' />
            <View style={styles.textContainer}>
                <CustomMediumText text='Unable to reset password? ' />
                <Pressable>
                    <CustomHighlightedText text='Get help' />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 50,
        paddingHorizontal: 20
    },
    textContainer: { marginTop: 20, flexDirection: 'row' }
})

export default ForgotPasswordBody