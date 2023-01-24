import { Keyboard, View } from 'react-native'
import React, { useState } from 'react'
import CustomTextInput from '../../Reusable/CustomTextInput'
import PasswordField from '../PasswordField'
import CustomButton from '../../Reusable/CustomButton'
import Overlay from '../../Reusable/Overlay'
import { Formik } from 'formik'
import * as yup from 'yup'
import { passwordValidator } from '../../../validators'
import axios from 'axios'
import Config from 'react-native-config'
import { useSelector } from 'react-redux'
import { showToast } from '../../../utils/utils'
import { useNavigation } from '@react-navigation/native'

const EditPasswordBody = () => {

    const [isCurrentValid, setIsCurrentValid] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const mobileNumber = useSelector(state => state.user.user.mobileNumber)
    const navigation = useNavigation()

    const submitHandler = (values, formikActions) => {
        Keyboard.dismiss()

        axios.post(`${Config.REGISTER_API_KEY}/authenticate/changePassword`, {
            mobileNumber,
            oldPassword: values.old,
            newPassword: values.current
        })
            .then(res => {
                const data = res.data
                if (data.status) {
                    showToast('Updated password')
                    formikActions.resetForm()
                    navigation.goBack()
                } else {
                    showToast(data.message)
                }
                formikActions.setSubmitting(false)
            })
            .catch(err => {
                console.log("Error: ", err)
                showToast('Something went wrong. Please try again later!')
                formikActions.setSubmitting(false)
            })

    }

    const initialValues = {
        old: '',
        current: '',
        confirm: ''
    }

    const validationSchema = yup.object().shape({
        old: yup
            .string()
            .min(8, 'Please enter valid password')
            .required('Password is required'),
        current: yup
            .string()
            .min(8, 'Please enter valid password')
            .test('custom-password', 'Please enter valid password', function (value) {
                if (value && passwordValidator(value)) return true
                return this.createError({ path: this.path, message: 'Please enter valid password' })
            })
            .required('Password is required'),
        confirm: yup
            .string()
            .equals([yup.ref('current')], 'Passwords do not match')
            .required('Confirm password is required')
    })

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitHandler} >
            {
                ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) =>
                    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20, paddingHorizontal: '3.5%' }}>
                        <Overlay render={isSubmitting} />
                        <CustomTextInput
                            placeholder={'Old Password *'}
                            secure
                            value={values.old}
                            onChangeTextHandler={handleChange('old')}
                            onBlurHandler={handleBlur('old')}
                            error={touched.old && errors.old}
                        />
                        <PasswordField
                            placeholder='New Password *'
                            err={touched.current && errors.current}
                            password={values.current}
                            setPassword={handleChange('current')}
                            onBlurHandler={handleBlur('current')}
                            setIsPasswordValid={setIsCurrentValid}
                        />
                        <CustomTextInput
                            placeholder='Confirm New Password *'
                            value={values.confirm}
                            onChangeTextHandler={handleChange('confirm')}
                            secure
                            onBlurHandler={handleBlur('confirm')}
                            error={touched.confirm && errors.confirm}
                        />
                        <CustomButton
                            text='CHANGE PASSWORD'
                            disabled={submitted}
                            onPressHandler={handleSubmit}
                            top={20}
                        />
                    </View>
            }
        </Formik>
    )
}

export default EditPasswordBody