import { View, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomText from '../Reusable/CustomText'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import Animated, { FadeIn, FadeOut, Transition, useAnimatedStyle, useSharedValue, withSpring, ZoomOut } from 'react-native-reanimated'
import { useEffect } from 'react'
import { setRead, setSelected } from '../../redux/notificationSlice'

const Card = ({ item }) => {

    const { colors } = useSelector(state => state.theme)
    const dispatch = useDispatch()
    const { selected } = useSelector(state => state.notification)

    const rotationValue = useSharedValue(90)

    useEffect(() => {
        const dest = selected === item.id ? -90 : 90
        rotationValue.value = withSpring(dest, {
            damping: 40
        })
    }, [selected])

    const pressHandler = _ => {
        const target = item.id === selected ? null : item.id
        dispatch(setSelected(target))
        dispatch(setRead(item.id))
    }

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: rotationValue.value + 'deg' }]
        }
    }, [])

    return (
        <Pressable onPress={pressHandler} style={[styles.container, { backgroundColor: colors['WHITE'], opacity: item.read ? 0.5 : 1, borderColor: colors['SHADELIGHT'] }]}>
            <Animated.View layout={Transition} style={styles.headerContainer}>
                <View style={styles.titleContainer}>
                    <CustomText size={14} weight='bold' color={colors['DARK']}>
                        {item.title}
                    </CustomText>
                    {!item.read && <Animated.View entering={FadeIn} exiting={FadeOut} style={[{ backgroundColor: colors['PRIMARY'] }, styles.newContainer]}>
                        <CustomText weight='bold' color={'white'}>
                            New
                        </CustomText>
                    </Animated.View>}
                </View>
                <Animated.View style={rStyle}>
                    <FastImage
                        source={{ uri: ICONS.ICON_RIGHT }}
                        style={{ height: 10, width: 10, }}
                        tintColor={colors['DARK']}
                    />
                </Animated.View>
            </Animated.View>
            <View>
                {
                    selected !== item.id &&
                    <CustomText isAnimated={true} exiting={FadeOut} top={5} color={colors['SHADEDARK']}>
                        {item.body.slice(0, 40) + '...'}
                    </CustomText>}
                {
                    selected === item.id &&
                    <CustomText isAnimated={true} entering={FadeIn} top={5} color={colors['SHADEDARK']}>
                        {item.body}
                    </CustomText>
                }
            </View>
            {selected === item.id && item.image &&
                <Animated.Image
                    exiting={ZoomOut}
                    source={{ uri: item.image }}
                    style={{ width: '100%', height: 200, marginTop: 10 }}
                />
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: '5%',
        borderBottomWidth: 1,
    },
    headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    titleContainer: {
        flexDirection: 'row'
    },
    newContainer: {
        paddingHorizontal: 5,
        paddingVertical: 1,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5
    }
})

export default Card