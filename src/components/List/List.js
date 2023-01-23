import { View, StyleSheet, useWindowDimensions, FlatList } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Loader from './Loader'
import Card from './Card'
import Footer from './Footer'
import ListFooter from './ListFooter'
import Progressor from './Progressor'
import axios from 'axios'
import Config from 'react-native-config'
import { showToast } from '../../utils/utils'
import ListHeader from './ListHeader'

const List = () => {

    const [count, setCount] = useState(null)
    const [clothes, setClothes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const height = useWindowDimensions().height

    const getData = async () => {
        if (count !== null && clothes.length >= count) return

        // if (count === null) {
        //     result = await firestore().collection('clothes').count().get()
        //     setCount(result._data.count * 10)
        // }

        // result = await firestore().collection('clothes').get()
        // result = await result.docs
        // let temp = result.map(cloth => cloth.data())
        // setClothes(prev => [...prev, ...temp])
        axios.get(`${Config.PRODUCTS_API_KEY}/data/getproductsm/1`)
            .then(res => {
                let data = res.data
                if (data.status === false) {
                    showToast(data.message)
                    return
                }
                data = data.data
                if (count === null) setCount(data.length * 10)

                let temp = data.map(cloth => ({
                    ...cloth.product,
                    photo: cloth.imageUrl
                }))
                setClothes(prev => [...prev, ...temp])
                if (isLoading === true) setIsLoading(false)
            })
            .catch(err => {
                console.log("Err: ", err)
                showToast('Something went wrong. Please try again later!')
                if (isLoading === true) setIsLoading(false)
            })
    }

    useEffect(() => { getData() }, [])

    const renderItem = ({ item, index }) => <Card index={index} cloth={item} />

    const endReachedHandler = () => getData()

    const cardHeight = (height - 65) / 2

    const scrollRef = useRef()

    const scrollToTop = () => { scrollRef?.current.scrollToOffset({ offset: 0, animated: true }) }

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
        waitForInteraction: false
    })

    const [currentItem, setCurrentItem] = useState(0)

    const viewableItemsChangedHandler = useCallback(({ viewableItems }) => {
        let len = viewableItems.length
        if (len > 0) setCurrentItem((viewableItems[len - 1].index + 1))
    }, [])

    return (
        <>
            <ListHeader itemCount={count} />
            <View style={styles.container}>
                {isLoading === false && <FlatList
                    data={clothes}
                    renderItem={renderItem}
                    ref={scrollRef}
                    keyExtractor={(item, index) => index}
                    numColumns={2}
                    style={styles.list}
                    ListFooterComponent={() => <ListFooter maxCount={count} count={clothes.length} />}
                    onEndReached={endReachedHandler}
                    onEndReachedThreshold={1}
                    showsVerticalScrollIndicator={false}
                    getItemLayout={(data, index) => ({
                        length: cardHeight,
                        offset: (index) * cardHeight,
                        index,
                    })}
                    viewabilityConfig={viewabilityConfig.current}
                    onViewableItemsChanged={viewableItemsChangedHandler}
                />}
                {isLoading && <Loader />}
                {isLoading === false && <Progressor goTop={scrollToTop} count={count} items={currentItem} />}
                {isLoading === false && <Footer />}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, },
    list: { marginTop: 5 }
})

export default List