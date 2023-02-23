import { View, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomText from '../Reusable/CustomText'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import Animated, { FadeIn, FadeOut, interpolate, Layout, StretchOutY, Transition, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { useEffect } from 'react'
import { setRead, setSelected } from '../../redux/notificationSlice'

const Card = ({ item }) => {

    const { colors } = useSelector(state => state.theme)
    const dispatch = useDispatch()
    const { selected } = useSelector(state => state.notification)

    const rotationValue = useSharedValue(90)
    // const heightValue = useSharedValue(0)
    // const opacity = useSharedValue(0)
    const display = useSharedValue(0)

    useEffect(() => {
        const dest = selected === item.id ? -90 : 90
        rotationValue.value = withSpring(dest, {
            damping: 40
        })
        display.value = withTiming(selected === item.id && item.image ? 1 : 0, {
            duration: 500
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

    const heightRStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(display.value, [0, 1], [0, 200]),
            opacity: interpolate(display.value, [0, 1], [0, 1])
        }
    }, [])

    return (
        <Pressable onPress={pressHandler} style={[styles.container, { backgroundColor: colors['WHITE'], opacity: item.read ? 0.5 : 1, borderColor: colors['SHADELIGHT'] }]}>
            <View style={styles.headerContainer}>
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
                {item.image && <Animated.View style={rStyle}>
                    <FastImage
                        source={{ uri: ICONS.ICON_RIGHT }}
                        style={styles.icon}
                        tintColor={colors['DARK']}
                    />
                </Animated.View>}
            </View>
            <View>
                <CustomText isAnimated={true} entering={FadeIn} top={5} color={colors['SHADEDARK']}>
                    {item.body}
                </CustomText>
            </View>
            <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                layout={Layout}
                style={heightRStyle}
            >
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                />
            </Animated.View>
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
    },
    image: { width: '100%', height: '100%', marginTop: 10 },
    icon: { height: 10, width: 10, }
})

export default Card