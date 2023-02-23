import { View, StyleSheet, TextInput, Keyboard } from 'react-native'
import React, { useState } from 'react'
import CustomText from '../../Reusable/CustomText'
import COLORS from '../../../constants/Colors'
import CustomButton from '../../Reusable/CustomButton'
import { useEffect } from 'react'
import Overlay from '../../Reusable/Overlay'
import { phoneValidator } from '../../../validators'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Config from 'react-native-config'
import { showToast } from '../../../utils/utils'
import { useNavigation } from '@react-navigation/native'

const EditMobile = () => {

    const [phone, setPhone] = useState('')
    const [err, setErr] = useState(null)
    const [touched, setTouched] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const { colors } = useSelector(state => state.theme)

    const textChangeHandler = newPhone => setPhone(newPhone)

    const navigation = useNavigation()

    useEffect(() => {
        if (!phoneValidator(phone)) setErr('Invalid mobile number')
        else setErr(null)
    }, [phone])

    const submitHandler = async () => {
        // here send post request to server to check if number already exists!
        Keyboard.dismiss()
        if (!touched) setTouched(true)
        if (!phoneValidator(phone)) {
            setErr('Invalid mobile number')
            return
        }
        setSubmitted(true)
        try {
            const result = await axios.post(`${Config.API_KEY}/profile/checknumber`, { phoneNumber: "+91 " + phone })
            const { data } = result
            if (!data.status) {
                setErr('This mobile number is already linked to another account')
                setSubmitted(false)
                return
            }
        } catch (err) {
            console.log("Error: ", err)
            setSubmitted(false)
            showToast('Something went wrong. Please try again later.')
        }

        try {
            const result = await axios.post(`${Config.API_KEY}/update/sendotp`, {
                phoneNumber: "+91 " + phone
            })
            const data = result.data
            if (data.status) {
                setSubmitted(false)
                navigation.navigate('Otp', {
                    phone: '+91 ' + phone,
                    isVerify: true,
                    type: 'newMobile'
                })
            } else {
                setSubmitted(false)
                showToast(data.message)
            }
        } catch (err) {
            console.log("Error: ", err)
            setSubmitted(false)
            showToast('Something went wrong. Please try again later.')

        }

    }

    return (
        <View style={styles.container}>
            <Overlay render={submitted} />
            <CustomText top={20} bottom={10} weight='bold' size={18}>
                Update your mobile number
            </CustomText>
            <CustomText color={COLORS.SHADELIGHT}>
                Will be verified in the next step
            </CustomText>
            <View style={[styles.inputContainer, { borderColor: (touched && err !== null) ? COLORS.DANGER : COLORS.SHADEDARK, }]}>
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
                    style={[styles.input, { color: colors['DARK'] }]}
                    maxLength={10}
                    value={phone}
                    onChangeText={textChangeHandler}
                    onBlur={() => setTouched(true)}
                />
            </View>
            {touched && err && <CustomText top={5} color={COLORS.DANGER}>
                {err}
            </CustomText>}
            <CustomButton onPressHandler={submitHandler} text='UPDATE MOBILE NUMBER' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: '12%'
    },
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
    input: {
        flex: 1
    }
})

export default EditMobile