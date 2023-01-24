import { StatusBar, View } from 'react-native'
import React, { useEffect } from 'react'
import HomeNavigation from '../navigation/HomeNavigation'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Config from 'react-native-config'
import Toast from 'react-native-root-toast'
import { setProfile } from '../redux/userSlice'
import { NavigationContainer } from '@react-navigation/native'

const MainScreen = () => {

    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()

    const { colors, theme } = useSelector(state => state.theme)

    useEffect(() => {
        if (!token || token?.length === 0) return
        axios.post(`${Config.REGISTER_API_KEY}/authenticate/getUserDetails`, {
            jwt: token
        })
            .then(res => {
                const data = res.data
                if (!data.status) {
                    Toast.show(data.message, {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                    })
                }

                const user = data.data
                dispatch(setProfile(user))

            })
            .catch(err => {
                console.log("Err: ", err)
                Toast.show('Something went wrong while logging user in. Please try again later', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                })
            })

    }, [token])

    return (
        <>
            <StatusBar
                barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
                backgroundColor={colors['LIGHT']}
            />
            <NavigationContainer>
                <View style={{ flex: 1 }}>
                    <HomeNavigation />
                </View>
            </NavigationContainer>
        </>
    )
}

export default MainScreen