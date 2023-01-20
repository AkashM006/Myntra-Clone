import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import CustomLoader from './CustomLoader'

const Overlay = ({ render, hideShadow, onPressHandler, hideLoader }) => {

    let style = {
        backgroundColor: hideShadow ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.6)'
    }

    return (
        <>
            {render && <Pressable onPress={onPressHandler} style={[styles.container, style]}>
                {!hideLoader && <CustomLoader />}
            </Pressable>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'rgba(0,0,0,0.6)',
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