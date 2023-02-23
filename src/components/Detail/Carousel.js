import { View, StyleSheet, useWindowDimensions, Image, Animated } from 'react-native'
import React, { useRef } from 'react'
import Rating from '../List/Rating'

const INDICATOR_SIZE = 8
const INDICATOR_SPACING = 10

const Carousel = ({ images, ratedCount, rating }) => {

    const { height, width } = useWindowDimensions()

    const renderItem = ({ item, index }) => <Image source={{ uri: item }} style={[styles.image, { width }]} />

    const scrollX = useRef(new Animated.Value(0)).current

    return (
        <View style={{ backgroundColor: 'white' }}>
            <View>
                <Animated.FlatList
                    data={images}
                    keyExtractor={(_, index) => index}
                    style={[styles.list, { height: height / 1.35, width }]}
                    contentContainerStyle={{ height: height / 1.35, }}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={0}
                    decelerationRate={'fast'}
                    pagingEnabled={true}
                    snapToAlignment='center'
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                    bounces={false}
                />
                {
                    ratedCount && ratedCount > 0 && <Rating count={ratedCount} rating={rating} align='right' />
                }
            </View>
            <View style={styles.indicatorContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    {images.map((_, index) => <View style={styles.indicator} key={index} />)}
                    <Animated.View style={[styles.mainIndicator, {
                        transform: [{
                            translateX: Animated.divide(scrollX, width).interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, INDICATOR_SIZE + INDICATOR_SPACING]
                            })
                        }]
                    }]} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    list: { overflow: 'hidden' },
    indicatorContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    indicator: {
        height: INDICATOR_SIZE,
        width: INDICATOR_SIZE,
        borderRadius: INDICATOR_SIZE,
        backgroundColor: 'gray',
        marginRight: INDICATOR_SPACING
    },
    mainIndicator: {
        height: INDICATOR_SIZE,
        width: INDICATOR_SIZE,
        borderRadius: INDICATOR_SIZE,
        backgroundColor: '#259f23',
        position: 'absolute',
        left: 0,
        zIndex: 10
    }
})

export default Carousel