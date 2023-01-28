import { View } from 'react-native'
import React from 'react'
import Phone from './Phone'
import CustomTextInput from '../../Reusable/CustomTextInput'
import CustomText from '../../Reusable/CustomText'
import COLORS from '../../../constants/Colors'
import CustomButton from '../../Reusable/CustomButton'
import { useNavigation } from '@react-navigation/native'

const Form = ({ values, touched, handleChange, handleBlur, errors, setPopUp, setType }) => {

    const { mobileNumber, fullName, email, location, hint, altMobNumber } = values

    const navigation = useNavigation()

    return (
        <View style={{ backgroundColor: 'white', paddingHorizontal: 30, marginBottom: '10%' }}>
            <Phone setType={setType} showPopUp={setPopUp} phone={mobileNumber} />
            <CustomTextInput
                onChangeTextHandler={handleChange('fullName')}
                onBlurHandler={handleBlur('fullName')}
                value={fullName}
                placeholder='Full Name'
                error={touched.fullName ? errors.fullName : null}
            />
            <CustomTextInput
                onChangeTextHandler={handleChange('email')}
                onBlurHandler={handleBlur('email')}
                value={email}
                placeholder='Email'
                error={touched.email ? errors.email : null}
            />
            <CustomTextInput
                onChangeTextHandler={handleChange('location')}
                onBlurHandler={handleBlur('location')}
                value={location}
                placeholder='Location'
                error={touched.location ? errors.location : null}
            />
            <CustomText vertical={15} color={COLORS.SHADEDARK}>
                Alternate mobile number details
            </CustomText>
            <CustomTextInput
                onChangeTextHandler={handleChange('altMobNumber')}
                onBlurHandler={handleBlur('altMobNumber')}
                value={altMobNumber}
                placeholder='Mobile Number'
                error={touched.altMobNumber ? errors.altMobNumber : null}
            />
            <CustomText top={5} bottom={20} color={COLORS.SHADELIGHT}>
                This will help recover your account if needed
            </CustomText>
            <CustomTextInput
                onChangeTextHandler={handleChange('hint')}
                onBlurHandler={handleBlur('hint')}
                value={hint}
                placeholder='Hint'
                error={touched.hint ? errors.hint : null}
            />
            <CustomButton
                text={'CHANGE PASSWORD'}
                border={{ color: COLORS.SHADEDARK, width: 2 }}
                color={COLORS.SHADEDARK}
                bgColor={COLORS.WHITE}
                onPressHandler={() => navigation.navigate('EditPassword')}
            />
        </View>
    )
}

export default Form