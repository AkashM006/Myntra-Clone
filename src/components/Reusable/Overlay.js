import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomLoader from './CustomLoader'

const Overlay = ({ render }) => {
    return (
        <>
            {render && <View style={styles.container}>
                <CustomLoader />
            </View>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    }
})

export default Overlay