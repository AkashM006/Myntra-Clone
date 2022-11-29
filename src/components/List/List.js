import { View, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import Loader from './Loader'
import Card from './Card'
import Footer from './Footer'
import ListFooter from './ListFooter'
import Progressor from './Progressor'
import Animated, { runOnJS, useAnimatedReaction, useAnimatedScrollHandler, useDerivedValue, useSharedValue } from 'react-native-reanimated'

const List = () => {

    const [count, setCount] = useState(null)
    const [clothes, setClothes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const height = useWindowDimensions().height

    const getData = async () => {
        let result;
        if (count !== null && clothes.length >= count) return

        if (count === null) {
            result = await firestore().collection('clothes').count().get()
            setCount(result._data.count * 10)
        }

        result = await firestore().collection('clothes').get()
        result = await result.docs
        let temp = result.map(cloth => cloth.data())
        setClothes(prev => [...prev, ...temp])
        if (isLoading === true) setIsLoading(false)
    }

    useEffect(() => { getData() }, [])

    const renderItem = ({ item, index }) => <Card index={index} cloth={item} />

    const endReachedHandler = () => getData()

    const scrollY = useSharedValue(0)
    const itemsCount = useSharedValue(0)

    const scrollHandler = useAnimatedScrollHandler((e, ctx) => { scrollY.value = e.contentOffset.y })
    const cardHeight = (height - 65) / 2

    useAnimatedReaction(
        () => scrollY.value,
        (result, prev) => {
            itemsCount.value = (Math.trunc((result + cardHeight) / cardHeight) + 1) * 2
        }, [scrollY]
    )

    return (
        <View style={styles.container}>
            {isLoading === false && <Animated.FlatList
                data={clothes}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                numColumns={2}
                style={styles.list}
                ListFooterComponent={() => <ListFooter maxCount={count} count={clothes.length} />}
                onEndReached={endReachedHandler}
                onEndReachedThreshold={1}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
            />}
            {isLoading && <Loader />}
            {isLoading === false && <Progressor count={count} items={itemsCount} />}
            {isLoading === false && <Footer />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, },
    list: { marginTop: 5 }
})

export default List