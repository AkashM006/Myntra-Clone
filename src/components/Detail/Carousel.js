import { View, Text, FlatList, StyleSheet, useWindowDimensions, Image, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import Rating from '../List/Rating'

const INDICATOR_SIZE = 8
const INDICATOR_SPACING = 10

const Carousel = ({ images, ratedCount, totalRating }) => {

    const { height, width } = useWindowDimensions()
    const navigation = useNavigation()

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
                {/* <View style={styles.header}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                            <Image source={require('../../icons/back.png')} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.leftContainer}>
                        <TouchableOpacity style={styles.iconContainer}>
                            <Image source={require('../../icons/share.png')} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconContainer}>
                            <Image source={require('../../icons/heart.png')} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconContainer}>
                            <Image source={require('../../icons/bag.png')} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View> */}
                {
                    ratedCount && ratedCount > 0 && <Rating count={ratedCount} total={totalRating} align='right' />
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
    list: {
        overflow: 'hidden'
    },
    // header: {
    //     position: 'absolute',
    //     top: 10,
    //     left: 10,
    //     right: 10,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between'
    // },
    // iconContainer: {
    //     padding: 10,
    //     backgroundColor: 'white',
    //     alignSelf: 'flex-start',
    //     borderRadius: 100
    // },
    // icon: {
    //     height: 20,
    //     width: 20
    // },
    // leftContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-around',
    //     width: '45%'
    // },
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