import { View, StyleSheet, TextInput, TouchableOpacity, Pressable, Keyboard } from 'react-native'
import React, { useState } from 'react'
import CustomText from '../Reusable/CustomText'
import { useNavigation } from '@react-navigation/native'

const PasswordBody = ({ phone, submitted, setSubmitted }) => {

    const [userId, setUserId] = useState(phone)
    const [userIdActive, setUserIdActive] = useState(false)
    const [userIdError, setUserIdError] = useState(null)

    const [password, setPassword] = useState('')
    const [passwordActive, setPasswordActive] = useState(false)
    const [passwordError, setPasswordError] = useState(null)

    const navigation = useNavigation()

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
        // here validate email or phone and then send request
        const isUserIdValid = validateUserId()
        const isPasswordValid = validatePassword()
        if (isUserIdValid && isPasswordValid) {
            setSubmitted(true)

            // todo:
            // send request here to backend and navigate if success else alert the error

            setSubmitted(false)
        }
    }

    const resetHandler = () => { navigation.navigate('Forgot') }

    return (
        <View style={styles.container}>
            <CustomText weight={'light'} style={styles.title}>Login to your account</CustomText>
            <TextInput
                style={[styles.input, { borderColor: userIdActive ? '#818181' : userIdError === null ? '#c4c4c4' : 'red' }]}
                placeholder='Email or Mobile Number*'
                placeholderTextColor={'#aaaaaa'}
                value={userId}
                onChangeText={setUserId}
                onFocus={() => setUserIdActive(true)}
                onBlur={() => setUserIdActive(false)}
            />
            {
                userIdError !== null && <CustomText style={styles.error}>
                    {userIdError}
                </CustomText>
            }
            <TextInput
                style={[styles.input, { borderColor: passwordActive ? '#818181' : passwordError === null ? '#c4c4c4' : 'red' }]}
                placeholder='Password*'
                placeholderTextColor={'#aaaaaa'}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordActive(true)}
                onBlur={() => setPasswordActive(false)}
                secureTextEntry={true}
            />
            {
                passwordError !== null && <CustomText style={styles.error}>
                    {passwordError}
                </CustomText>
            }
            <TouchableOpacity onPress={submitHandler} style={[styles.button, { backgroundColor: submitted ? 'gray' : '#ff406c' }]} disabled={submitted}>
                <CustomText weight={'light'} style={styles.buttonText}>
                    LOGIN
                </CustomText>
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <View style={styles.textInnerContainer}>
                    <CustomText style={styles.text}>
                        Forgot your password?
                    </CustomText>
                    <Pressable onPress={resetHandler}>
                        <CustomText weight={'light'} style={styles.highlight}> Reset Here</CustomText>
                    </Pressable>
                </View>
                <View style={styles.textInnerContainer}>
                    <CustomText style={styles.text}>
                        Having trouble logging in?
                    </CustomText>
                    <Pressable>
                        <CustomText weight={'light'} style={styles.highlight}> Get help</CustomText>
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
    title: {
        color: 'black',
        fontSize: 18,
        marginBottom: 10
    },
    input: {
        borderColor: '#c4c4c4',
        borderWidth: 2,
        padding: 10,
        borderRadius: 3,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        color: 'black'
    },
    button: {
        marginTop: 20,
        padding: 20,
        alignItems: 'center',
        borderRadius: 3,
        paddingVertical: 15
    },
    buttonText: {
        color: 'white'
    },
    text: {
        color: '#717171',
        fontSize: 12
    },
    highlight: {
        color: '#ff406c',
        fontSize: 12,
    },
    textInnerContainer: {
        flexDirection: 'row',
        marginTop: 30
    },
    textContainer: {
        marginTop: 15
    },
    error: {
        color: 'red',
        fontSize: 10
    }
})

export default PasswordBody