import { AppState, StatusBar, View } from 'react-native'
import React, { useEffect } from 'react'
import HomeNavigation from '../navigation/HomeNavigation'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Config from 'react-native-config'
import Toast from 'react-native-root-toast'
import { setFcmToken, setProfile } from '../redux/userSlice'
import { NavigationContainer } from '@react-navigation/native'
import messaging from '@react-native-firebase/messaging'
import { showToast } from '../utils/utils'
import { useCallback } from 'react'
import { useRef } from 'react'
import SplashScreen from 'react-native-splash-screen'
import Overlay from '../components/Reusable/Overlay'

const MainScreen = () => {

    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    const userState = useSelector(state => state.user)
    const appState = useRef(AppState.currentState)
    const { loading, hideLoader, hideShadow } = useSelector(state => state.ui)

    const { colors, theme } = useSelector(state => state.theme)

    useEffect(() => { // for getting user details each time the token changes and on mount
        if (!token || token?.length === 0) return
        axios.get(`${Config.REGISTER_API_KEY}/authenticate/getuserdetails`)
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

    useEffect(_ => { // to handle foreground and background notifications
        const unsubscribe = messaging().onMessage(async msg => {
            showToast(msg.notification.body)
        })

        messaging().onNotificationOpenedApp(msg => {
            showToast(msg.notification.body)
        })

        messaging().getInitialNotification()
            .then(msg => {
                console.log("Quit Message: ", msg)
                if (msg === null) return
                showToast(msg.notification.body)
            })
            .catch(err => {
                console.log("Err: ", err)
            })

        return unsubscribe
    }, [])

    useEffect(() => { // to get fcm token on refresh
        const unsubscribe = messaging().onTokenRefresh(fcmToken => {
            console.log("Token: ", fcmToken)
        })
        return unsubscribe
    }, [])

    const getToken = useCallback(async () => {
        try {
            const data = await messaging().getToken()
            if (userState.fcmToken !== data) {
                console.log("New token was generated:", data)
                dispatch(setFcmToken(data))
            }
        } catch (err) {
            console.log("Err: ", err)
        }
    }, [])

    useEffect(() => { // to get token and store in state each time on mount
        getToken()
    }, [])

    useEffect(() => {
        const unsubscribe = AppState.addEventListener('change', currentAppState => {
            if (appState.current.match(/inactive|background/) && currentAppState === 'active') {
                showToast('Welcome back! We have some new merchandise for you this time!')
            }
            appState.current = currentAppState
        })
        return () => {
            unsubscribe.remove()
        }
    }, [])

    useEffect(() => { SplashScreen.hide() }, [])

    axios.interceptors.request.use(
        config => {
            if (token)
                config.headers['Authorization'] = 'Bearer ' + token
            config.headers['Content-Type'] = 'application/json'
            return config
        },
        error => {
            console.log("Error in request inerceptor: ", error),
                showToast('Something went wrong while sending request')
        }
    )

    return (
        <>
            <StatusBar
                barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
                backgroundColor={colors['LIGHT']}
            />
            <NavigationContainer>
                <View style={{ flex: 1 }}>
                    <HomeNavigation />
                    <Overlay
                        render={loading}
                        hideLoader={hideLoader}
                        hideShadow={hideShadow}
                    />
                </View>
            </NavigationContainer>
        </>
    )
}

export default MainScreen