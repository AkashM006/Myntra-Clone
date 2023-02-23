import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Config from 'react-native-config'
import FastImage from 'react-native-fast-image'
import Animated from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import CustomText from '../components/Reusable/CustomText'
import ICONS from '../icons/icons'
import { setUnreachable } from '../redux/uiSlice'
import { showToast } from '../utils/utils'

const ConnectionProblemScreen = () => {

    const { isConnected, unreachable } = useSelector(state => state.ui)
    const { colors } = useSelector(state => state.theme)
    const dispatch = useDispatch()

    const [disabled, setDisabled] = useState(false)
    const [time, setTime] = useState(0)

    const pressHandler = async _ => {
        setTime(30)
        setDisabled(true)

        try {
            const result = await axios.get(`${Config.API_KEY}/loginorsignup/test`, { timeout: 30 * 1000 })
            if (result) dispatch(setUnreachable(false))
        } catch (err) {
            console.log('Error in Connection problem screen.js: ', err)
            showToast('Something went wrong while checking server reachability. Please try again later')
        }
    }

    useEffect(() => {
        if (time === 0) setDisabled(false)
        else setTimeout(() => setTime(prev => prev - 1), 1000)
    }, [time])

    return (
        <Animated.View style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
            <FastImage
                style={styles.image}
                source={{ uri: !isConnected ? ICONS.ICON_NO_INTERNET : ICONS.ICON_UNREACHABLE }}
                resizeMode='contain'
            />
            <CustomText weight='bold' size={24} color={colors['DARK']} align='center' top={15}>
                Whoops
            </CustomText>

            <CustomText top={10} size={14} align='center' color={colors['SHADEDARK']}>
                {!isConnected ? 'You are offline. Please connect and try again!' : 'Unable to reach the server. Please try again later!'}
            </CustomText>

            {
                isConnected && unreachable && <TouchableOpacity disabled={disabled} onPress={pressHandler} style={[styles.button, { opacity: disabled ? 0.6 : 1 }]}>
                    <CustomText size={16} weight='bold' color={colors['PRIMARY']}>
                        TRY AGAIN
                    </CustomText>
                </TouchableOpacity>
            }
            {
                time > 0 && isConnected && <CustomText color={colors['SHADEDARK']}>Trying to reach server : 00:{(time + '').padStart(2, '0')}</CustomText>
            }
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 200,
    },
    container: {
        height: '100%',
        width: '70%',
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: '25%'
    },
    button: {
        marginTop: 25,
        padding: 15
    }
})

export default ConnectionProblemScreen