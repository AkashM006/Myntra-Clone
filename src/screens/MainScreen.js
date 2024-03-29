import { AppState, Platform, StatusBar, View } from 'react-native'
import React, { useEffect, useCallback, useRef, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Config from 'react-native-config'
import Toast from 'react-native-root-toast'
import { setFcmToken, setProfile, setUpdate } from '../redux/userSlice'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import messaging from '@react-native-firebase/messaging'
import { showToast } from '../utils/utils'
import SplashScreen from 'react-native-splash-screen'
import Overlay from '../components/Reusable/Overlay'
import { addData } from '../redux/notificationSlice'
import NetInfo from '@react-native-community/netinfo'
import { setIsConnected, setUnreachable } from '../redux/uiSlice'
import ConnectionProblemScreen from './ConnectionProblemScreen'
import MainStack from '../navigation/MainStack'
import linking from '../linking.js'
import DeferredActionContext from '../context/deferredActionContext'
import deferredActionReducer, { initialState } from '../reducer/deferredActionReducer'
import LoginPop from '../components/Profile/LoginPop'
import codePush from 'react-native-code-push'

const MainScreen = () => {

    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    const userState = useSelector(state => state.user)
    const appState = useRef(AppState.currentState)
    const { loading, hideLoader, hideShadow } = useSelector(state => state.ui)

    const { colors, theme } = useSelector(state => state.theme)
    const connected = useSelector(state => state.ui.isConnected)
    const unreachable = useSelector(state => state.ui.unreachable)

    const [state, contextDispatch] = useReducer(deferredActionReducer, initialState)

    useEffect(() => { // for getting user details each time the token changes and on mount
        if (!token || token?.length === 0) return
        axios.get(`${Config.API_KEY}/profile/getuserdetails`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                if (res) {
                    const data = res.data
                    if (!data.status) {
                        Toast.show(data.message, {
                            duration: Toast.durations.LONG,
                            position: Toast.positions.BOTTOM,
                        })
                    }

                    const user = data.data
                    dispatch(setProfile(user))
                }

            })
            .catch(err => {
                console.log("Err: ", err)
                Toast.show('Something went wrong while logging user in. Please try again later', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                })
            })

    }, [token])

    // useEffect(() => { // for manually checking code push updates
    //     codePush.checkForUpdate()
    //         .then(result => {
    //             if (result === null) {
    //                 dispatch(setUpdate({
    //                     show: false,
    //                     update: null
    //                 }))
    //                 return
    //             }
    //             console.log("Result: ", result)
    //             // setShowUpdate(true)
    //             // setUpdate(result)
    //             dispatch(setUpdate({
    //                 update: result,
    //                 show: true
    //             }))
    //         })
    //         .catch(err => {
    //             console.log("Error: ", err)
    //         })
    // }, [])

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = token === null || token?.length === 0 ? token : 'Bearer ' + token
    }, [token])

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            dispatch(setIsConnected(state.isConnected))
        })
        return unsubscribe
    }, [])

    useEffect(_ => { // to handle foreground and background notifications
        const unsubscribe = messaging().onMessage(async msg => {
            showToast(msg.notification.body)
            const { notification } = msg
            dispatch(addData({
                body: notification.body,
                title: notification.title,
                image: Platform.OS === 'android' ? notification.android?.imageUrl : null,
                read: false,
                id: msg.messageId
            }))
        })

        messaging().onNotificationOpenedApp(msg => {
            showToast(msg.notification.body)
            console.log(msg.notification)
        })

        messaging().getInitialNotification()
            .then(msg => {
                console.log("Quit Message: ", msg)
                if (msg === null) return
                const { notification } = msg
                showToast(msg.notification.body)
                dispatch(addData({
                    body: notification.body,
                    title: notification.title,
                    image: Platform.OS === 'android' ? notification.android?.imageUrl : null,
                    read: false,
                    id: msg.messageId
                }))
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

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(null,
            error => {
                console.log("Error in request interceptor: ", error),
                    showToast('Something went wrong while sending request')
            }
        )
        const responseInterceptor = axios.interceptors.response.use(
            response => {
                return response
            }, err => {
                if (err.response) {
                } else if (err.request) {
                    if (err.request.status === 0 && connected) dispatch(setUnreachable(true))
                } else console.log("Error: ", err.message)
            }
        )
        return () => {
            axios.interceptors.request.eject(requestInterceptor)
            axios.interceptors.response.eject(responseInterceptor)
        }
    }, [])

    return (
        <>
            <StatusBar
                barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
                backgroundColor={colors['LIGHT']}
            />
            {/* {connected && !unreachable ? <NavigationContainer>
                <View style={{ flex: 1 }}>
                    <HomeNavigation />
                    <Overlay
                        render={loading}
                        hideLoader={hideLoader}
                        hideShadow={hideShadow}
                    />
                </View>
            </NavigationContainer> : <ConnectionProblemScreen />} */}
            <DeferredActionContext.Provider value={{ state, contextDispatch }}>
                <NavigationContainer linking={linking} >
                    <View style={{ flex: 1 }}>
                        {/* <HomeNavigation /> */}
                        <MainStack />
                        <Overlay
                            render={loading}
                            hideLoader={hideLoader}
                            hideShadow={hideShadow}
                        />
                        <LoginPop />
                    </View>
                </NavigationContainer>
            </DeferredActionContext.Provider>
        </>
    )
}

export default MainScreen