import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomText from '../Reusable/CustomText'
import { useDispatch, useSelector } from 'react-redux'
import { TextInput } from 'react-native-gesture-handler'
import PasswordField from './PasswordField'
import Gender from './Gender'
import axios from 'axios'
import Config from 'react-native-config'
import { setToken } from '../../redux/userSlice'
import { StackActions, useNavigation } from '@react-navigation/native'

const Form = ({ setSubmitted }) => {

    const phone = useSelector(state => state.user.phone)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    // console.log("Phone", phone)
    // const phone = '9976607000'

    const [password, setPassword] = useState('')
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [passwordErr, setPasswordErr] = useState(null)

    const [fullName, setFullName] = useState('')
    const [fullNameErr, setFullNameErr] = useState(null)

    const [email, setEmail] = useState('')
    const [emailErr, setEmailErr] = useState(null)

    const [gender, setGender] = useState('Female')

    const [alternatePhone, setAlternatePhone] = useState('')
    const [alternatePhoneErr, setAlternatePhoneErr] = useState(null)

    const [hint, setHint] = useState('')

    const [validated, setValidated] = useState(false)

    const validatePass = () => {
        if (isPasswordValid) {
            setPasswordErr(null)
            return false
        }
        setPasswordErr('Please enter valid password')
        return true
    }

    const validateFullName = () => {
        if (fullName === '' || fullName.length >= 3) {
            setFullNameErr(null)
            return false
        }
        setFullNameErr('Full name length must be more than or equal to 3')
        return true
    }

    const validateEmail = () => {
        if (email === '' || /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
            setEmailErr(null)
            return false
        }
        setEmailErr('Enter valid email address')
        return true
    }

    const validateAlternatePhone = () => {
        if (alternatePhone === '' || (alternatePhone.length === 10 && !isNaN(+alternatePhone))) {
            setAlternatePhoneErr(null)
            return false
        }
        setAlternatePhoneErr('Enter valid phone number')
        return true
    }

    const validate = () => {
        if (validated === false) setValidated(true)
        let a = validatePass()
        let b = validateFullName()
        let c = validateEmail()
        let d = validateAlternatePhone()

        return !a && !b && !c && !d
    }

    useEffect(() => {
        if (validated === true) validate()
    }, [password, fullName, email, alternatePhone, isPasswordValid])

    useEffect(() => {
        return () => {
            setPassword('')
            setPasswordErr(null)
            setIsPasswordValid(false)
            setFullName('')
            setFullNameErr(null)
            setEmail('')
            setEmailErr(null)
            setGender('Female')
            setAlternatePhone('')
            setAlternatePhoneErr(null)
            setHint('')
            setValidated(false)
        }
    }, [])

    const handleSubmit = () => {
        if (!validate()) return
        // here send request to backend
        setSubmitted(true)
        let obj = {
            password,
            mobileNumber: '+91 ' + phone,
            fullName,
            email,
            gender,
            altMobNumber: alternatePhone,
            hintName: hint
        }

        axios.post(`${Config.REGISTER_API_KEY}/authenticate/register`, obj)
            .then(res => {
                console.log("Response: ", res.data)
                const data = res.data
                if (data.status === true) {
                    // then store the token
                    dispatch(setToken(data.data.jwt))
                    setSubmitted(false)
                    navigation.dispatch(StackActions.popToTop())
                } else {
                    Alert.alert('Whoops!', data.message)
                }
                setSubmitted(false)
            })
            .catch(err => {
                console.log("Err: ", err)
            })
    }

    return (
        <View style={styles.container}>
            <View>
                <CustomText style={styles.light}>
                    Mobile Number
                </CustomText>
                <CustomText style={styles.dark}>{phone}</CustomText>
            </View>
            <PasswordField err={passwordErr} password={password} setPassword={setPassword} setIsPasswordValid={setIsPasswordValid} />
            <View>
                <TextInput
                    placeholderTextColor='#aaaaaa'
                    value={fullName}
                    onChangeText={value => setFullName(value)}
                    placeholder='Full Name (Optional)'
                    style={[styles.input, { borderColor: fullNameErr === null ? 'lightgray' : 'red' }]}
                />
                {fullNameErr && <CustomText style={{ color: 'red', fontSize: 10 }}>
                    {fullNameErr}
                </CustomText>}
            </View>
            <View>
                <TextInput
                    placeholderTextColor='#aaaaaa'
                    value={email}
                    onChangeText={value => setEmail(value)}
                    placeholder='Email (Optional)'
                    style={[styles.input, { borderColor: emailErr === null ? 'lightgray' : 'red' }]}
                />
                {emailErr && <CustomText style={{ color: 'red', fontSize: 10 }}>
                    {emailErr}
                </CustomText>}
            </View>
            <Gender gender={gender} setGender={setGender} />
            <View>
                <TextInput
                    placeholderTextColor='#aaaaaa'
                    value={alternatePhone}
                    onChangeText={value => setAlternatePhone(value)}
                    placeholder='Alternate Mobile Number'
                    style={[styles.input, { borderColor: alternatePhoneErr === null ? 'lightgray' : 'red' }]}
                />
                {alternatePhoneErr && <CustomText style={{ color: 'red', fontSize: 10 }}>
                    {alternatePhoneErr}
                </CustomText>}
                <CustomText style={styles.text}>
                    This will help recover your account if needed
                </CustomText>
            </View>
            <View>
                <TextInput
                    placeholderTextColor='#aaaaaa'
                    value={hint}
                    onChangeText={value => setHint(value)}
                    placeholder='Hint name'
                    style={styles.input}
                />
                <CustomText style={styles.text}>
                    This name will be a hint for your alternate number
                </CustomText>
            </View>
            <CustomText style={styles.highlight}>
                I have a referral code
            </CustomText>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <CustomText style={styles.buttonText}>
                    CREATE ACCOUNT
                </CustomText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30
    },
    light: {
        color: '#aaaaaa',
        fontSize: 12,
        marginBottom: 5
    },
    dark: {
        color: 'black',
        fontSize: 14
    },
    input: {
        borderColor: 'lightgray',
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        borderRadius: 3,
        color: 'black'
    },
    text: {
        color: 'lightgray',
        fontSize: 11,
        textAlign: 'center'
    },
    highlight: {
        color: '#ff406c',
        fontSize: 12,
        fontWeight: '700',
        marginVertical: 20
    },
    button: {
        backgroundColor: '#ff406c',
        marginTop: 20,
        padding: 20,
        alignItems: 'center',
        borderRadius: 3,
        paddingVertical: 15
    },
    buttonText: {
        fontWeight: '700',
        color: 'white'
    }
})

export default Form