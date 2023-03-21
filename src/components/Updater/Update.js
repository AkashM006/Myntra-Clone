import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native'
import React from 'react'
import Animated, { BounceIn, BounceOut } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header'
import Body from './Body'
import Buttons from './Buttons'
import FastImage from 'react-native-fast-image'
import { setUpdate } from '../../redux/userSlice'

const Update = () => {

    const { height, width } = useWindowDimensions()
    const { colors } = useSelector(state => state.theme)
    const { update, show } = useSelector(state => state.user.update)
    const isMandatory = update?.isMandatory
    const dispatch = useDispatch()

    const pressHandler = _ => {
        if (update && !isMandatory)
            dispatch(setUpdate({
                show: false,
                update
            }))
    }

    return (
        <>
            {show && <Pressable onPress={pressHandler} style={styles.container}>
                <Animated.View entering={BounceIn} exiting={BounceOut} style={styles.innerContainer}>
                    <Pressable>
                        <View style={{
                            backgroundColor: colors['LIGHT'],
                            paddingHorizontal: height / 24,
                            paddingBottom: height / 36,
                            borderRadius: 15,
                        }}>
                            <FastImage
                                source={require('../../icons/download.png')}
                                style={{
                                    height: height / 6,
                                    width: width / 3,
                                    alignSelf: 'center',
                                    marginTop: -height / 8
                                }}
                                resizeMode='contain'
                            />
                            <View>
                                <Header update={update} />
                                <Body update={update} />
                                <Buttons update={update} />
                            </View>
                        </View>
                    </Pressable>
                </Animated.View>
            </Pressable>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100000,
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '10%'
    },
})

export default Update