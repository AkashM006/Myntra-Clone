import { View, StyleSheet, Pressable, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomText from '../Reusable/CustomText'
import { StackActions, useNavigation } from '@react-navigation/native'
import COLORS from '../../constants/Colors'
import CustomTextInput from '../Reusable/CustomTextInput'
import CustomButton from '../Reusable/CustomButton'
import axios from 'axios'
import Config from 'react-native-config'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/userSlice'
import Toast from 'react-native-root-toast'

const PasswordBody = ({ phone, submitted, setSubmitted }) => {

    const [userId, setUserId] = useState(phone)
    const [userIdError, setUserIdError] = useState(null)

    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(null)

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const validateUserId = () => {
        if (!isNaN(+userId)) {
            if (userId.length === 10) {
                setUserIdError(null)
                return true
            }
        } else {
            if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(userId)) {
                setUserIdError(null)
                return true
            }
        }
        setUserIdError('Invalid mobile number or email')
        return false
    }

    const validatePassword = () => {
        if (password.length >= 8) {
            setPasswordError(null)
            return true
        }
        setPasswordError('Please enter valid password')
        return false
    }

    const submitHandler = () => {
        Keyboard.dismiss()
        const isUserIdValid = validateUserId()
        const isPasswordValid = validatePassword()
        let id = userId
        if (isUserIdValid && isPasswordValid) {
            setSubmitted(true)
            if (!isNaN(+id)) {
                id = '+91 ' + id
            }
            axios.post(`${Config.API_KEY}/loginorsignup/password`, {
                userId: id,
                password
            })
                .then(res => {
                    const data = res.data
                    if (data.status === true) {

                        let obj = {
                            phone: userId,
                            token: data.data.jwt
                        }
                        dispatch(login(obj))
                        setSubmitted(false)
                        navigation.dispatch(StackActions.popToTop())

                    } else {
                        setSubmitted(false)
                        // Alert.alert('Whoops!', data.message)
                        Toast.show(data.message, {
                            duration: Toast.durations.LONG,
                            position: Toast.positions.BOTTOM
                        })
                    }
                })
                .catch(err => {
                    console.log("Error: ", err)
                    Toast.show('Something went wrong. Please try again later!', {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM
                    })
                    setSubmitted(false)
                })

        }
    }

    const resetHandler = () => { navigation.navigate('Forgot') }

    return (
        <View style={styles.container}>
            <CustomText weight={'light'} size={18} bottom={10}>Login to your account</CustomText>
            <CustomTextInput
                placeholder='Email or Mobile Number*'
                value={userId}
                onChangeTextHandler={setUserId}
                error={userIdError}
            />
            <CustomTextInput
                placeholder='Password*'
                value={password}
                onChangeTextHandler={setPassword}
                error={passwordError}
                secure={true}
            />
            <CustomButton disabled={submitted} text='LOGIN' onPressHandler={submitHandler} />
            <View style={styles.textContainer}>
                <View style={styles.textInnerContainer}>
                    <CustomText color={COLORS.SHADEDARK}>
                        Forgot your password?
                    </CustomText>
                    <Pressable onPress={resetHandler}>
                        <CustomText weight={'light'} color={COLORS.PRIMARY}> Reset Here</CustomText>
                    </Pressable>
                </View>
                <View style={styles.textInnerContainer}>
                    <CustomText color={COLORS.SHADEDARK}>Having trouble logging in?</CustomText>
                    <Pressable>
                        <CustomText weight={'light'} color={COLORS.PRIMARY}> Get help</CustomText>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 50,
        paddingHorizontal: 20,
        flex: 1
    },
    textInnerContainer: {
        flexDirection: 'row',
        marginTop: 30
    },
    textContainer: { marginTop: 15 },
})

export default PasswordBody