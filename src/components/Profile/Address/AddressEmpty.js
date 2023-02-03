import { View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import ICONS from '../../../icons/icons'
import CustomText from '../../Reusable/CustomText'
import { useSelector } from 'react-redux'
import CustomButton from '.././../Reusable/CustomButton'

const AddressEmpty = ({ showForm }) => {

    const { colors } = useSelector(state => state.theme)
    return (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 20, paddingHorizontal: '3.5%', backgroundColor: colors['LIGHT'] }}>
            <FastImage
                source={{ uri: ICONS.ICON_MAP_LARGE }}
                style={{ height: 200, width: 200 }}
            />
            <CustomText align='center' size={18} weight='bolder' color={colors['DARK']} top={20} bottom={20} >
                SAVE YOUR ADDRESSES NOW
            </CustomText>
            <CustomText align='center' size={14} color={colors['SHADEDARK']} bottom={30} >
                Add your home and office addresses and enjoy faster checkout
            </CustomText>
            <CustomButton
                text='+ ADD NEW ADDRESS'
                bgColor={colors['LIGHT']}
                border={{
                    color: colors['SHADEDARK'],
                    width: 1
                }}
                color={colors['PRIMARY']}
                onPressHandler={showForm}
            />
        </View>
    )
}

export default AddressEmpty