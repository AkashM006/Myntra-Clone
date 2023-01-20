import { Image, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import COLORS from '../../../constants/Colors'
import CustomText from '../../Reusable/CustomText'
import { useNavigation } from '@react-navigation/native'

const Phone = ({ phone }) => {

    const navigation = useNavigation()

    const pressHandler = () => { }

    return (
        <View style={[styles.container, { borderColor: COLORS.SHADELIGHT }]}>
            <View>
                <CustomText bottom={5} color={COLORS.SHADEDARK} size={10}>
                    Mobile Number <CustomText size={10} color={COLORS.DANGER}>*</CustomText>
                </CustomText>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <CustomText size={14} right={5}>
                        {phone}
                    </CustomText>
                    <Image source={require('../../../icons/tick.png')} style={{ height: 20, width: 20 }} />
                </View>
            </View>
            <Pressable onPress={pressHandler}>
                <CustomText weight='bold' color={COLORS.PRIMARY}>CHANGE</CustomText>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default Phone