import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'

const Quote = () => {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <CustomText fontFamily={'Roboto-Thin'} style={styles.text}>
                "Dressing well Is A Form Of Good Manners."
            </CustomText>
            <CustomText style={{ color: 'gray', alignSelf: 'center', }}>
                Muiccia Prada
            </CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        alignSelf: 'center',
    },
    text: {
        color: 'black'
    },
    line: {
        width: 90,
        height: 1,
        backgroundColor: 'black',
        marginBottom: 15,
        alignSelf: 'center',
    }
})

export default Quote