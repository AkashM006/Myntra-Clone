import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useDispatch, useSelector } from 'react-redux'
import { setLoginPopUpStatus } from '../../redux/uiSlice'
import COLORS from '../../constants/Colors'
import Avatar from '../Reusable/Avatar'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'

const HeaderSection = () => {

    const dispatch = useDispatch()

    const openLoginPopUp = () => { dispatch(setLoginPopUpStatus(true)) }

    const user = useSelector(state => state.user)
    const isLoggedIn = user.token?.length !== 0

    return (
        <View style={styles.container}>
            {isLoggedIn === false ? <>
                <View style={styles.colorContainer} />
                <View style={styles.displayContainer}>
                    <View style={styles.imageContainer}>
                        <FastImage source={{ uri: ICONS.ICON_PROFILE_PIC }} style={{ height: '40%', width: '40%' }} />
                    </View>
                    <TouchableOpacity onPress={openLoginPopUp} style={styles.login}>
                        <CustomText weight={'bolder'} color={COLORS.WHITE}>
                            LOG IN/SIGN UP
                        </CustomText>
                    </TouchableOpacity>
                </View></> : <UserLoggedInHeader user={user.user} />}
        </View>
    )
}

const UserLoggedInHeader = ({ user }) => {

    return (
        <View style={styles.loggedInContainer}>
            <CustomText weight='light' size={14}>
                Shopping for {user.fullName && user.fullName.length !== 0 ? user.fullName : 'You'}
            </CustomText>
            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', }}>
                <FastImage source={{ uri: ICONS.ICON_CROWN }} style={{ height: 25, width: 25 }} />
                <CustomText color={COLORS.SHADEDARK} left={5}>
                    Become and Insider!
                </CustomText>
            </View>
            <View style={{ marginTop: 10, alignSelf: 'flex-start' }}>
                <Avatar active={true} user={user} dimension={60} fontSize={24} />
                <CustomText top={5} align='center'>
                    {
                        user.fullName ? user.fullName.slice(0, 10) + (user.fullName.length > 10 ? '...' : '') : 'you'
                    }
                </CustomText>
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
    container: {
        marginBottom: 10
    },
    loggedInContainer: {
        backgroundColor: 'white',
        paddingHorizontal: '3.5%',
        paddingVertical: 20
    },
    profile: {
        backgroundColor: 'black',
        alignSelf: 'flex-start',
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1
    },
    profileContainer: {
        borderColor: 'red',
        borderWidth: 2,
        alignSelf: 'flex-start',
        borderRadius: 300,
        padding: 1,
    }
})

export default HeaderSection