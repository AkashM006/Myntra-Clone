import { ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Overlay from '../../Reusable/Overlay'
import FooterButton from './FooterButton'
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from '../../../redux/userSlice'
import axios from 'axios'
import Config from 'react-native-config'
import Toast from 'react-native-root-toast'
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

    let userData = { ...user }

    useEffect(() => {
        axios.post(`${Config.REGISTER_API_KEY}/authenticate/getUserDetails`, { jwt: user.token })
            .then(res => {
                const data = res.data.data
                if (data.status === false) {
                    Toast.show(data.message, { duration: Toast.durations.LONG, position: Toast.positions.BOTTOM, })
                    navigation.goBack()
                }
                dispatch(setProfile(data))
                setLoaded(true)
            })
            .catch(err => {
                console.log("Err: ", err)
                Toast.show('Something went wrong while fetching user details! Please try again later.', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                })
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
    const navigation = useNavigation()
    const validationSchema = yup.object().shape({
        mobileNumber: yup
            .string()
            .min(10, 'Phone number must be 10 digits long')
            .max(10, 'Phone number must be 10 digits long')
            .test('phone-number', 'Please enter valid phone number', function (value) {
                if (!isNaN(+value)) return true

                return this.createError({ path: this.path, message: 'Please enter valid phone' })
            })
            .required('mobile number is required'),
        fullName: yup
            .string(),
        email: yup
            .string()
            .email('Please enter valid email'),
        location: yup
            .string(),
        altMobNumber: yup
            .string()
            .max(10, 'Phone number must be 10 digits long')
            .test('phone-number', 'Please enter valid phone number', function (value) {
                if (!value || (/^\d+$/.test(value) && value.length === 10)) return true
                return this.createError({ path: this.path, message: 'Please enter valid phone number' })
            })

    })

    const submitHandler = (values, formikActions) => {

    }

    const [submitted, setSubmitted] = useState(false)

    const [showPopUp, setShowPopUp] = useState(false)

    let numbers = []
    numbers.push(user.mobileNumber)
    if (user.altMobNumber) numbers.push(user.altMobNumber)

    const sendOTP = selectedPhone => {

        setSubmitted(true)

        axios.post(`${Config.OTP_API_KEY}/authenticate/sendotp`, {
            phoneNumber: selectedPhone
        })
            .then(res => {
                const data = res.data
                if (data.status) {
                    navigation.navigate('Otp', {
                        phone: selectedPhone,
                        isVerify: true,
                        type: 'mobile'
                    })
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
        <Formik validationSchema={validationSchema} initialValues={user} onSubmit={submitHandler}>
            {
                ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => <>
                    <ScrollView style={{ backgroundColor: 'white', paddingTop: 10 }}>
                        <Form
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
                    <FooterButton submitHandler={handleSubmit} />
                </>
            }
        </Formik>
    </>)
}

const Loading = () => <View style={{ flex: 1, backgroundColor: 'white' }}><Overlay hideShadow render={true} /></View>

export default EditBody