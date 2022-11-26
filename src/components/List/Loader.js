import { View, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'

const Loader = () => {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size={'small'} color={'#FF69B4'} style={styles.loader} />
            <View style={styles.separator} />
            <CustomText style={styles.text}>
                "Fashion is the armor to survive the reality of everyday life."
            </CustomText>
            <CustomText style={{ color: 'gray', textAlign: 'center' }}>
                - Bill Cunningham
            </CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    loaderContainer: {
        position: 'absolute',
        padding: 10,
        borderRadius: 100,
        top: '35%',
        alignSelf: 'center',
        transform: [{ translateY: -20 }],
        width: '85%'
    },
    loader: {
        backgroundColor: 'white',
        padding: 10,
        alignSelf: 'center',
        borderRadius: 100,
    },
    text: {
        color: 'black',
        textAlign: 'center',
        marginBottom: 5,
    },
    separator: {
        height: 1,
        borderColor: 'black',
        borderWidth: 1,
        width: '40%',
        alignSelf: 'center',
        marginVertical: 20
    }
})

export default Loader