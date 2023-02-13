import { View, StyleSheet, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import CustomText from '../Reusable/CustomText'

const Card = ({ item, index, value }) => {

    const width = useWindowDimensions().width
    const ITEM_WIDTH = width * 0.45
    const PLACEHOLDER_WIDTH = item === 'last' ? (width - ITEM_WIDTH) / 2 : (width - ITEM_WIDTH) / 2.5

    const inputRange = [
        (index - 2) * ITEM_WIDTH,
        (index - 1) * ITEM_WIDTH,
        index * ITEM_WIDTH,
    ]

    const scaleStyle = useAnimatedStyle(() => {
        return {
            height: interpolate(value.value, inputRange, [150, 200, 150], {
                extrapolateLeft: Extrapolation.CLAMP,
                extrapolateRight: Extrapolation.CLAMP
            }),
            opacity: interpolate(value.value, inputRange, [0.5, 1, 0.5], {
                extrapolateLeft: Extrapolation.CLAMP,
                extrapolateRight: Extrapolation.CLAMP
            })
        }
    }, [value])

    if (item === 'empty' || item === 'last') return <View style={{ width: PLACEHOLDER_WIDTH, }} />

    return (<Animated.View style={[{ width: ITEM_WIDTH, alignSelf: 'center' }, scaleStyle]}>
        <View style={styles.imageContainer}>
            <Animated.Image style={[styles.image, scaleStyle]} source={{ uri: item }} />
        </View>
    </Animated.View>)
}

const HighlightCarousel = ({ item }) => {

    const { colors } = useSelector(state => state.theme)
    const scrollX = useSharedValue(0)

    const { width } = useWindowDimensions()

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: event => { scrollX.value = event.contentOffset.x }
    }, [])

    const items = ['empty', ...item.url, 'last']

    const renderItem = ({ item, index }) => <Card item={item} index={index} value={scrollX} />

    return (
        <View style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
            <CustomText align='left' weight='bold' size={18} color={colors['BLACK']}>
                {item.title}
            </CustomText>
            <Animated.FlatList
                data={items}
                keyExtractor={(_, index) => index}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                bounces={false}
                decelerationRate={0}
                snapToInterval={width * 0.45}
                contentContainerStyle={{ alignItems: 'center', }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 10,
        height: 250
    },
    imageContainer: { paddingHorizontal: 10, },
    image: {
        width: '100%',
        resizeMode: 'cover',
    }
})

export default HighlightCarousel