import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, BackHandler } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { setLoading, setLoginPopUpStatus } from '../../redux/uiSlice'
import CustomText from '../Reusable/CustomText'
import axios from 'axios'
import { Config } from 'react-native-config'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import COLORS from '../../constants/Colors'
import Overlay from '../Reusable/Overlay'
import CustomButton from '../Reusable/CustomButton'
import Toast from 'react-native-root-toast'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'

const LoginPop = () => {

    const visible = useSelector(state => state.ui.isLoginPopUpVisible)

    const visibility = useSharedValue(0)
    const submitting = useSharedValue(0)

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [phone, setPhone] = useState('')
    const [err, setErr] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    const backActionHandler = () => {
        if (visibility.value === 1) {
            dispatch(setLoginPopUpStatus(false))
            setPhone('')
            setErr(null)
            setSubmitted(false)
            return true
        }
        setPhone('')
        setErr(null)
        setSubmitted(false)
        return false
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backActionHandler)

        return () => {
            backHandler.remove()
        }
    }, [phone])

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: interpolate(visibility.value, [0, 1], [400, 0])
            }],
            backgroundColor: interpolateColor(submitting.value, [0, 1], ['rgba(255,255,255,1)', 'rgba(255,255,255,0.6)'])
        }
    }, [])

    useEffect(() => {
        let target = (visible === true) ? 1 : 0

        visibility.value = withTiming(target, { duration: 300 })

        if (visible === false) {
            Keyboard.dismiss()
            dispatch(setLoading({
                loading: false,
                hideLoader: false,
                hideShadow: false
            }))
        } else {
            dispatch(setLoading({
                loading: true,
                hideLoader: true,
                hideShadow: true
            }))
            
        }
    }, [visible])

    const closeHandler = () => {
        dispatch(setLoginPopUpStatus(false))
        setErr(null)
        setPhone('')
    }

    useEffect(() => {
        const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
            if (err !== null) {
                validatePhone(phone)
            }
        })
        return () => {
            keyboardListener.remove()
        }
    }, [])

    useFocusEffect(
        useCallback(() => {
            return () => {
                dispatch(setLoginPopUpStatus(false))
            }
        }, [])
    )

    const termsHandler = () => { }
    const policyHandler = () => { }

    const validatePhone = (ph) => {

        if (ph.trim().length !== 10) {
            setErr('Phone number should be 10 digits long')
            return false
        }

        let k = [',', '.', '_', '-']
        let x = [...ph]
        for (let i of k) {
            if (x.includes(i)) {
                setErr('Please enter a valid phone number')
                return false
            }
        }
        if (isNaN(+ph)) {
            setErr('Please enter a valid phone number')
            return false
        }

        setErr(null)
        return true
    }

    const submitHandler = async () => {
        let isValid = validatePhone(phone)

        if (isValid) {
            Keyboard.dismiss()
            setSubmitted(true)

            axios.post(`${Config.API_KEY}/loginorsignup/sendotp`, {
                phoneNumber: '+91 ' + phone
            })
                .then(res => {
                    const data = res.data

                    if (data.status === true) {
                        setErr(null)
                        setSubmitted(false)
                        dispatch(setLoginPopUpStatus(false))
                        setPhone('')
                        navigation.navigate('Otp', {
                            phone,
                        })
                    } else {
                        Toast.show(data.message, {
                            duration: Toast.durations.LONG,
                            position: Toast.positions.BOTTOM,
                        })
                        setSubmitted(false)
                    }
                })
                .catch(err => {
                    setSubmitted(false)
                    console.log("Err: ", err)
                    Toast.show('Something went wrong. Please try again later!', {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                    })
                })

        } else {
            setErr('Please enter valid mobile number')
        }
    }

    const textChangeHandler = newPhone => {
        setPhone(newPhone)
    }

    return (
        <Animated.View style={[styles.container, rStyle]}>
            <View style={styles.iconContainer}>
                <FastImage source={{ uri: ICONS.ICON_LOGO }} resizeMode='contain' style={{ width: 50, height: 50 }} />
                <TouchableOpacity onPress={closeHandler}>
                    <FastImage source={{ uri: ICONS.ICON_CLOSE }} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
            </View>
            <View>
                <View style={styles.titleContainer}>
                    <CustomText weight={'light'} size={18}>
                        Login
                    </CustomText>
                    <CustomText weight={'light'} size={14} color={COLORS.SHADEDARK}>
                        {' '} or {' '}
                    </CustomText>
                    <CustomText weight={'light'} size={18}>
                        Signup
                    </CustomText>
                </View>
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
                        defaultValue={phone}
                        onChangeText={textChangeHandler}
                    />
                </View>
                {err && <CustomText color={COLORS.DANGER}>
                    {err}
                </CustomText>}
                <View style={styles.termsContainer}>
                    <CustomText size={12} color={COLORS.SHADEDARK}>
                        By continuing I agree to the
                        <Text onPress={termsHandler}>
                            <CustomText size={13} weight='light' color={COLORS.PRIMARY}>
                                { } Terms of Use { }
                            </CustomText>
                        </Text>
                        & { }
                        <Text onPress={policyHandler}>
                            <CustomText size={13} weight='light' color={COLORS.PRIMARY}>
                                Privacy Policy
                            </CustomText>
                        </Text>
                    </CustomText>
                </View>
                <CustomButton disabled={submitted} text='CONTINUE' onPressHandler={submitHandler} />
                <View style={styles.helpContainer}>
                    <CustomText size={12} color={COLORS.SHADEDARK}>
                        Having trouble logging in?
                        <Text>
                            <CustomText size={13} weight='light' color={COLORS.PRIMARY}>
                                { } Get help
                            </CustomText>
                        </Text>
                    </CustomText>
                </View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    input: { marginLeft: 10, color: '#717171', flex: 1, paddingHorizontal: 5 },
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
    helpContainer: { marginTop: 20 },
    separator: {
        backgroundColor: '#717171',
        height: '30%',
        width: 1,
        alignSelf: 'center'
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        height: 400,
        transform: [{ translateY: 500 }],
        zIndex: 11,
        paddingTop: 20,
        paddingHorizontal: 30
    },
    icon: {
        height: 40,
        width: 40
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    },
})

export default LoginPop