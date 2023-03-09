import { View, StyleSheet, Image, Keyboard } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CustomText from '../Reusable/CustomText'
import { useDispatch, useSelector } from 'react-redux'
import PasswordField from './PasswordField'
import Gender from './Gender'
import axios from 'axios'
import Config from 'react-native-config'
import { setToken } from '../../redux/userSlice'
import { StackActions, useNavigation } from '@react-navigation/native'
import COLORS from '../../constants/Colors'
import CustomTextInput from '../Reusable/CustomTextInput'
import CustomButton from '../Reusable/CustomButton'
import Toast from 'react-native-root-toast'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import DeferredActionContext from '../../context/deferredActionContext'

const Form = ({ setSubmitted, submitted }) => {

    const phone = useSelector(state => state.user.user.phone)
    const dispatch = useDispatch()
    const navigation = useNavigation()

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

    const {state, contextDispatch} = useContext(DeferredActionContext)

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
        setFullNameErr('Full name must have more than 2 characters')
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

    useEffect(() => { if (validated === true) validate() }, [password, fullName, email, alternatePhone, isPasswordValid])

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
        Keyboard.dismiss()
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

        axios.post(`${Config.API_KEY}/profile/register`, obj)
            .then(res => {
                const data = res.data
                if (data.status === true) {
                    // then store the token
                    dispatch(setToken(data.data.jwt))
                    setSubmitted(false)
                    navigation.dispatch(StackActions.popToTop())
                    state.callback()
                    contextDispatch({
                        action: 'done'
                    })
                } else {
                    Toast.show(data.message, {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                    })
                }
                setSubmitted(false)
            })
            .catch(err => {
                console.log("Err: ", err)
                setSubmitted(false)
                Toast.show('Something went wrong. Please try again later!', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                })
            })
    }

    return (
        <View style={styles.container}>
            <View>
                <CustomText color={COLORS.SHADELIGHT} bottom={5}>
                    Mobile Number
                </CustomText>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <CustomText size={14}>{phone}</CustomText>
                    <FastImage source={{ uri: ICONS.ICON_TICK }} style={{ height: 20, width: 20 }} />
                </View>
            </View>
            <PasswordField err={passwordErr} password={password} setPassword={setPassword} setIsPasswordValid={setIsPasswordValid} />
            <CustomTextInput
                placeholder='Full Name (Optional)'
                value={fullName}
                onChangeTextHandler={value => setFullName(value)}
                error={fullNameErr}
            />
            <CustomTextInput
                placeholder='Email (Optional)'
                value={email}
                onChangeTextHandler={value => setEmail(value)}
                error={emailErr}
            />
            <Gender gender={gender} setGender={setGender} />
            <CustomTextInput
                placeholder='Alternate Mobile Number'
                value={alternatePhone}
                onChangeTextHandler={value => setAlternatePhone(value)}
                error={alternatePhoneErr}
            />
            <CustomText size={11} color={COLORS.SHADEDARK}>This will help recover your account if needed</CustomText>
            <CustomTextInput
                value={hint}
                onChangeTextHandler={value => setHint(value)}
                placeholder='Hint name'
            />
            <CustomText size={11} color={COLORS.SHADEDARK}>This name will be a hint for your alternate number</CustomText>
            <CustomText weight={'light'} color={COLORS.PRIMARY} vertical={20}>I have a referral code</CustomText>
            {/* <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <CustomText weight={'light'} color={COLORS.WHITE}>CREATE ACCOUNT</CustomText>
            </TouchableOpacity> */}
            <CustomButton disabled={submitted} onPressHandler={handleSubmit} text='CREATE ACCOUNT' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30
    },
    text: {
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#ff406c',
        marginTop: 20,
        padding: 20,
        alignItems: 'center',
        borderRadius: 3,
        paddingVertical: 15
    },
})

export default Form