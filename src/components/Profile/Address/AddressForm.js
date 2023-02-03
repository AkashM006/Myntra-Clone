import { View, BackHandler, ScrollView, StyleSheet, Keyboard, Pressable } from 'react-native'
import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Formik } from 'formik'
import CustomText from '../../Reusable/CustomText'
import CustomTextInput from '../../Reusable/CustomTextInput'
import CheckBox from '../../Reusable/CheckBox'
import AddressType from './AddressType'
import AddressPreference from './AddressPreference'
import StickyFooter from './StickyFooter'
import Overlay from '../../Reusable/Overlay'
import { addressValidationSchema } from '../../../validators'
import axios from 'axios'
import { showToast } from '../../../utils/utils'
import LocalityList from './LocalityList'

const AddressForm = ({ hideForm, visible }) => {

    const { colors } = useSelector(state => state.theme)
    const ref = useRef(null)
    const [loading, setLoading] = useState(false)
    const [localities, setLocalities] = useState([])
    const [showSelection, setShowSelection] = useState(false)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', _ => {
            if (showSelection) {
                setShowSelection(false)
                return true
            } else if (visible) {
                hideForm()
                return true
            }
            return false
        })
        return () => backHandler.remove()
    }, [visible])

    useEffect(() => {
        if (!visible) {
            ref.current.resetForm()
            Keyboard.dismiss()
            ref.current.setTouched({}, false)
            ref.current.setErrors({}, false)
        } else {
            ref.current.setTouched({}, false)
            ref.current.setErrors({}, false)
        }
    }, [visible])

    const initialValues = {
        name: '',
        mobileNumber: '',
        pincode: '',
        address: '',
        state: '',
        locality: '',
        typeOfAddress: null,
        open: [],
        defaultAddr: false,
        city: ''
    }

    const submitHandler = (values, formikActions) => {
        console.log("Values: ", values)

        setTimeout(() => {
            formikActions.setSubmitting(false)
        }, 2000)
    }

    const checkPincode = _ => {
        // here using pincode get different values
        const errors = ref.current.errors
        if ('pincode' in errors) return
        let pincode = ref.current.values.pincode
        if (pincode.length === 6) {
            setLoading(true)
            Keyboard.dismiss()
            axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
                .then(res => {
                    const data = res.data
                    let result = data[0].PostOffice
                    if (result === null) {
                        showToast('Please enter valid pincode')
                    } else {
                        ref.current.setFieldValue('state', result[0].State)
                        ref.current.setFieldValue('city', result[0].District)
                        setLocalities(result)
                    }
                    setLoading(false)
                })
                .catch(err => {
                    console.log("Error: ", err)
                    showToast('Something went wrong. Please try again later')
                    setLoading(false)
                })
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors['LIGHT'], }}>
            <Overlay render={ref.current?.isSubmitting || loading} />
            {false && <LocalityList // todo: can be implement in the next stage
                data={localities}
                setRender={setShowSelection}
                render={showSelection}
            />}
            <View style={{ width: '100%', paddingHorizontal: '3.5%', paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors['SHADELIGHT'] }}>
                <CustomText weight='light' color={colors['DARK']}>
                    ADD NEW ADDRESS
                </CustomText>
            </View>
            <ScrollView contentContainerStyle={{ paddingHorizontal: '5%', paddingTop: 30, paddingBottom: 100 }}>
                <Formik validateOnChange={false} validationSchema={addressValidationSchema} innerRef={ref} onSubmit={submitHandler} initialValues={initialValues}>
                    {
                        ({ values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue }) => {
                            return <View style={{ flex: 1 }}>
                                <CustomTextInput
                                    value={values.name}
                                    error={touched.name ? errors.name : null}
                                    onBlurHandler={handleBlur('name')}
                                    onChangeTextHandler={handleChange('name')}
                                    placeholder='Name *'
                                />
                                <CustomTextInput
                                    value={values.mobileNumber}
                                    error={touched.mobileNumber ? errors.mobileNumber : null}
                                    onBlurHandler={handleBlur('mobileNumber')}
                                    onChangeTextHandler={handleChange('mobileNumber')}
                                    placeholder='Mobile *'
                                    type='number-pad'
                                    maxLength={10}
                                />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ width: '30%' }}>
                                        <CustomTextInput
                                            value={values.pincode}
                                            error={touched.pincode ? errors.pincode : null}
                                            onBlurHandler={handleBlur('pincode')}
                                            onChangeTextHandler={handleChange('pincode')}
                                            placeholder='Pincode *'
                                            type='number-pad'
                                            maxLength={6}
                                            onEndEditingHandler={checkPincode}
                                        />
                                    </View>
                                    <View style={{ width: '60%' }}>
                                        <CustomTextInput
                                            value={values.state}
                                            error={touched.state ? errors.state : null}
                                            onBlurHandler={handleBlur('state')}
                                            onChangeTextHandler={handleChange('state')}
                                            placeholder='State *'
                                            editable={false}
                                        />
                                    </View>
                                </View>
                                <CustomTextInput
                                    value={values.address}
                                    error={touched.address ? errors.address : null}
                                    onBlurHandler={handleBlur('address')}
                                    onChangeTextHandler={handleChange('address')}
                                    placeholder='Address (House No, Building Street, Area) *'
                                />
                                <Pressable onPress={() => setShowSelection(true)}>
                                    <CustomTextInput
                                        value={values.locality}
                                        error={touched.locality ? errors.locality : null}
                                        onBlurHandler={handleBlur('locality')}
                                        onChangeTextHandler={handleChange('locality')}
                                        placeholder='Locality/ Town *'
                                    />
                                </Pressable>
                                <CustomTextInput
                                    value={values.city}
                                    error={touched.city ? errors.city : null}
                                    onBlurHandler={handleBlur('city')}
                                    onChangeTextHandler={handleChange('city')}
                                    placeholder='City/ District *'
                                    editable={false}
                                />
                                <AddressType error={errors.typeOfAddress} touched={touched.typeOfAddress} values={values} setFieldValue={setFieldValue} />
                                {!values.homeWork && <AddressPreference open={values.open} setFieldValue={setFieldValue} />}
                                <View style={[styles.default, { borderColor: colors['SHADELIGHT'] }]}>
                                    <CheckBox
                                        value={values.defaultAddr}
                                        changeHandler={() => setFieldValue('defaultAddr', !values.defaultAddr)}
                                        dimension={15}
                                    />
                                    <CustomText left={10} color={colors['DARK']}>
                                        Make this as my default address
                                    </CustomText>
                                </View>
                            </View>
                        }
                    }
                </Formik>
            </ScrollView>
            <StickyFooter onSubmit={() => {
                Keyboard.dismiss()
                ref.current.handleSubmit()
            }} hideForm={hideForm} />
        </View>
    )
}

const styles = StyleSheet.create({
    checkBoxContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        marginRight: 45
    },
    default: {
        flexDirection: 'row',
        borderTopWidth: 1,
        paddingVertical: 10
    }
})

export default AddressForm