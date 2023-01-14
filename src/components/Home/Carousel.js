import { View, Text, StyleSheet, Image, FlatList, useWindowDimensions, Animated, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import CustomText from '../Reusable/CustomText'
import { useNavigation } from '@react-navigation/native'

const Card = ({ img }) => {

    const width = useWindowDimensions().width
    const navigation = useNavigation()

    const pressHandler = () => navigation.navigate('List', { title: 'Gift Cards' })

    return (
        <TouchableOpacity onPress={pressHandler} style={[styles.imageContainer, { width: width - 20 }]}>
            <Image source={{ uri: img }} style={[styles.image]} />
        </TouchableOpacity>
    )
}

const Carousel = ({ item }) => {

    const renderItem = ({ item }) => <Card img={item} />
    const keyExtractor = (_, index) => index

    const width = useWindowDimensions().width

    const scrollX = useRef(new Animated.Value(0)).current

    return (
        <View style={styles.container}>
            <CustomText weight={'bold'} style={styles.heading}>
                {item.title}
            </CustomText>
            <Animated.FlatList
                data={item.url}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                style={[{ height: +item.height, width: width - 20, marginVertical: 5 }]}
                contentContainerStyle={{ height: +item.height }}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                pagingEnabled={true}
                decelerationRate='fast'
                snapToAlignment='center'
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
            />
            <View style={styles.indicatorContainer}>
                {
                    item.url.map((i, index) => (
                        <View key={index} style={styles.indicator} />
                    ))
                }
                {
                    item.url?.length > 1 &&
                    <Animated.View style={
                        [styles.activeIndicator, {
                            transform: [{
                                translateX: Animated.divide(scrollX, (width - 20)).interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 16]
                                })
                            }]
                        }]
                    } />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white'
    },
    heading: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        marginVertical: 5
    },
    image: {
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 7,
    },
    imageContainer: { paddingHorizontal: 5 },
    indicatorContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    indicator: {
        width: 8,
        height: 8,
        marginRight: 8,
        backgroundColor: 'gray',
        borderRadius: 100,
    },
    activeIndicator: {
        width: 8,
        height: 8,
        backgroundColor: 'green',
        position: 'absolute',
        borderRadius: 100
    }
})

export default Carousel