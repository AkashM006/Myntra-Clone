import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import CustomText from '../Reusable/CustomText'
import ICONS from '../../icons/icons'
import { useNavigation } from '@react-navigation/native'
import { setLoginPopUpStatus } from '../../redux/uiSlice'
import DrawerBody from './DrawerBody'

const DrawerHeader = () => {
    const { colors } = useSelector(state => state.theme)
    const user = useSelector(state => state.user)

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const navigationHandler = () => {
        navigation.navigate('Profile')
        dispatch(setLoginPopUpStatus(true))
    }

    return (
        <View style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
            <View style={{ width: '100%', height: 125 }}>
                <FastImage
                    source={require('../../icons/bg.jpeg')}
                    style={styles.container}
                />
                <View style={styles.overlay}>
                    <View style={[styles.profileContainer, { backgroundColor: colors['LIGHT'] }]}>
                        <FastImage
                            source={{ uri: ICONS.ICON_PROFILE_PIC }}
                            style={{ height: 40, width: 40 }}
                            tintColor={colors['DARK']}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Pressable onPress={navigationHandler}>
                            <CustomText weight='light' size={13} color={colors['WHITE']}>
                                {user.token ? user.fullName : 'Log In . Sign Up'}
                            </CustomText>
                        </Pressable>
                        <Pressable onPress={navigationHandler}>
                            <FastImage
                                source={{ uri: ICONS.ICON_RIGHT }}
                                style={{ height: 10, width: 10 }}
                                tintColor={colors['WHITE']}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
            <DrawerBody />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
    },
    profileContainer: {
        alignSelf: 'flex-start',
        padding: 10,
        marginLeft: 20,
        borderRadius: 5
    },
    textContainer: {
        marginHorizontal: 25,
        marginTop: 7,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    }
})

export default DrawerHeader