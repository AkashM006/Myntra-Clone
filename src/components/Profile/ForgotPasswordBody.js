import { View, StyleSheet, Pressable, Keyboard } from 'react-native'
import React, { useState } from 'react'
import CustomTextInput from '../Reusable/CustomTextInput'
import CustomButton from '../Reusable/CustomButton'
import { phoneValidator, emailValidator } from '../../validators'
import CustomText from '../Reusable/CustomText'
import COLORS from '../../constants/Colors'
import axios from 'axios'
import Config from 'react-native-config'
import Toast from 'react-native-root-toast'
import { StackActions, useNavigation } from '@react-navigation/native'


const ForgotPasswordBody = ({ submitted, setSubmitted }) => {

    const [userId, setUserId] = useState('')
    const [error, setError] = useState(null)
    const navigation = useNavigation()

    const validateUserId = () => {
        // if (phoneValidator(userId)) {
        //     setError(null)
        //     return true
        // } else if (emailValidator(userId)) {
        //     setError(null)
        //     return true
        // }
        if (emailValidator(userId)) {
            setError(null)
            return true
        }
        // setError('Invalid email or mobile number')
        setError('Please enter valid email')
        return false
    }

    const handleSubmit = () => {

        if (validateUserId()) {
            Keyboard.dismiss()
            setSubmitted(true)
            // send request for reset

            // todo: send request for password reset
            axios.post(`${Config.MAIL_API_KEY}/email/sendMail`, {
                recipient: userId
            })
                .then(res => {
                    let data = res.data
                    if (data.status === true) {
                        navigation.dispatch(StackActions.popToTop())
                        Toast.show('A mail has been sent to your email id containing the reset link', {
                            duration: Toast.durations.LONG,
                            position: Toast.positions.BOTTOM
                        })
                    } else {
                        Toast.show(data.message, {
                            duration: Toast.durations.LONG,
                            position: Toast.positions.BOTTOM
                        })
                    }
                    setSubmitted(false)
                })
                .catch(err => {
                    console.log("Err: ", err)
                    Toast.show('Something went wrong. Please try again later!', {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM
                    })
                    setSubmitted(false)
                })
        }

    }

    return (
        <View style={styles.container}>
            <CustomText size={24} weight={'light'} bottom={10} >Reset Password</CustomText>
            <CustomText color={COLORS.SHADELIGHT} bottom={20}>
                {/* Enter your email or mobile number and we'll send a link on your email to reset your password. */}
                Enter your email and we'll send a link on your email to reset your password.
            </CustomText>
            <CustomTextInput
                // placeholder='Email or Mobile Number*'
                placeholder='Email*'
                value={userId}
                onChangeTextHandler={(value) => setUserId(value)}
                error={error}
            />
            <CustomButton disabled={submitted} onPressHandler={handleSubmit} text='SEND LINK' />
            <View style={styles.textContainer}>
                <CustomText color={COLORS.SHADEDARK}>
                    Unable to reset password? {' '}
                </CustomText>
                <Pressable>
                    <CustomText color={COLORS.PRIMARY} weight='light'>
                        Get help
                    </CustomText>
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