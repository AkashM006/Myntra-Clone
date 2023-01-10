import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useSelector } from 'react-redux'

const Form = () => {

    // const phone = useSelector(state => state.user.phone)
    // console.log("Phone", phone)
    const phone = '9976607000'


    return (
        <View style={styles.container}>
            <View>
                <CustomText style={styles.light}>
                    Mobile Number
                </CustomText>
                <CustomText style={styles.dark}>{phone}</CustomText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30
    },
    light: {
        color: '#aaaaaa',
        fontSize: 12,
        marginBottom: 5
    },
    dark: {
        color: 'black',
        fontSize: 14
    }
})

export default Form