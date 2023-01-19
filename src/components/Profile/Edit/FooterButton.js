import { View, StyleSheet } from 'react-native'
import React from 'react'
import CustomButton from '../../Reusable/CustomButton'

const FooterButton = ({ submitHandler }) => {
    return (
        <View style={styles.container}>
            <CustomButton onPressHandler={submitHandler} top={0} text='SAVE DETAILS' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        elevation: 10,
        backgroundColor: 'white',
        paddingHorizontal: '3.5%',
        paddingVertical: 10
    }
})

export default FooterButton