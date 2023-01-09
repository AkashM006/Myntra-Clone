import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useDispatch } from 'react-redux'
import { setLoginPopUpStatus } from '../../redux/uiSlice'

const HeaderSection = () => {

    const dispatch = useDispatch()

    const openLoginPopUp = () => { dispatch(setLoginPopUpStatus(true)) }

    return (
        <View style={styles.container}>
            <View style={styles.colorContainer} />
            <View style={styles.displayContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require('../../icons/profile-pic.png')} style={styles.image} />
                </View>
                <TouchableOpacity onPress={openLoginPopUp} style={styles.login}>
                    <CustomText style={styles.text}>
                        LOG IN/SIGN UP
                    </CustomText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    colorContainer: {
        backgroundColor: '#545766',
        height: 100
    },
    imageContainer: {
        elevation: 3,
        position: 'absolute',
        backgroundColor: '#fdfffe',
        bottom: 20,
        left: '3.5%',
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    displayContainer: {
        height: 80,
        backgroundColor: 'white'
    },
    login: {
        backgroundColor: '#ff4062',
        padding: 10,
        borderRadius: 2,
        paddingHorizontal: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: '3.5%',
        left: '35%'
    },
    text: {
        fontWeight: '900',
        color: 'white'
    },
    container: {
        marginBottom: 10
    }
})

export default HeaderSection