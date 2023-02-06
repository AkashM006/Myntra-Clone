import { Keyboard, ScrollView, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import Overlay from '../../Reusable/Overlay'
import FooterButton from './FooterButton'
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from '../../../redux/userSlice'
import axios from 'axios'
import Config from 'react-native-config'
import { useNavigation } from '@react-navigation/native'
import Form from './Form'
import { Formik } from 'formik'
import * as yup from 'yup'
import PopUp from './PopUp'
import { showToast } from '../../../utils/utils'

const EditBody = () => {

    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const navigation = useNavigation()

    let userData = { ...user.user }


    useEffect(() => {
        axios.get(`${Config.REGISTER_API_KEY}/authenticate/getuserdetails`)
            .then(res => {
                const data = res.data
                if (data.status === false) {
                    showToast(data.message)
                    navigation.goBack()
                    return
                }
                dispatch(setProfile(data.data))
                setLoaded(true)
            })
            .catch(err => {
                console.log("Err: ", err)
                showToast('Something went wrong while fetching user details! Please try again later.')
                navigation.goBack()
            })
    }, [])

    const render = {
        true: <Body user={userData} />,
        false: <Loading />,
    }

    return render[loaded]
}

const Body = ({ user }) => {
    user.location = user.location ?? ''
    const [type, setType] = useState(null)
    const navigation = useNavigation()
    const validationSchema = yup.object().shape({
        mobileNumber: yup
            .string()
            .test('phone-number', 'Please enter valid phone number', function (value) {
                if (!value) return false
                const phone = value.split(' ')[1]
                if (!isNaN(+phone) && phone.length === 10) return true

                return this.createError({ path: this.path, message: 'Please enter valid phone' })
            })
            .required('mobile number is required'),
        fullName: yup
            .string(),
        email: yup
            .string()
            .email('Please enter valid email'),
        location: yup
            .string('location', 'Enter valid location', function (value) { return true }).nullable(),
        altMobNumber: yup
            .string()
            .max(10, 'Phone number must be 10 digits long')
            .test('phone-number', 'Please enter valid phone number', function (value) {
                if (!value || (/^\d+$/.test(value) && value.length === 10)) return true
                return this.createError({ path: this.path, message: 'Please enter valid phone number' })
            })

    })

    const submitHandler = (values, formikActions) => {
        Keyboard.dismiss()
        setType('save')
        setShowPopUp(true)
    }

    const [submitted, setSubmitted] = useState(false)

    const [showPopUp, setShowPopUp] = useState(false)

    let numbers = []
    numbers.push(user.mobileNumber)
    if (user.altMobNumber) numbers.push(user.altMobNumber)

    const form = useRef(null)

    const sendOTP = selectedPhone => {

        setSubmitted(true)

        axios.post(`${Config.OTP_API_KEY}/authenticate/sendotp`, {
            phoneNumber: selectedPhone
        })
            .then(res => {
                const data = res.data
                if (data.status) {
                    if (type === 'phone') {
                        navigation.navigate('Otp', {
                            phone: selectedPhone,
                            isVerify: true,
                            type: 'mobile'
                        })
                    } else if (type === 'save') {
                        let newUser = form.current.values
                        newUser.location = newUser.location.length === 0 ? null : newUser.location
                        navigation.navigate('Otp', {
                            phone: selectedPhone,
                            isVerify: true,
                            type: 'save',
                            newUser,
                        })
                    }
                } else showToast(data.message)
                setShowPopUp(false)
                setSubmitted(false)
            })
            .catch(err => {
                console.log("Error: ", err)
                setShowPopUp(false)
                setSubmitted(false)
                showToast('Something went wrong. Please try again later!')
            })
    }

    return (<>
        <Formik innerRef={form} validationSchema={validationSchema} initialValues={user} onSubmit={submitHandler}>
            {
                ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => <>
                    <ScrollView style={{ backgroundColor: 'white', paddingTop: 10 }}>
                        <Form
                            setType={setType}
                            touched={touched}
                            handleBlur={handleBlur}
                            errors={errors}
                            values={values}
                            handleChange={handleChange}
                            setPopUp={setShowPopUp}
                        />
                    </ScrollView>
                    <PopUp submitted={submitted} sendOTP={sendOTP} setPopUp={setShowPopUp} numbers={numbers} render={showPopUp} />
                    <Overlay hideLoader onPressHandler={() => setShowPopUp(false)} render={showPopUp} />
                    <Overlay render={submitted} />
                    <FooterButton submitHandler={handleSubmit} />
                </>
            }
        </Formik>
    </>)
}

const Loading = () => <View style={{ flex: 1, backgroundColor: 'white' }}><Overlay hideShadow render={true} /></View>

export default EditBody