import { View, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import Loader from './Loader'
import Card from './Card'
import Footer from './Footer'
import ListFooter from './ListFooter'

const List = () => {

    const [count, setCount] = useState(null)
    const [clothes, setClothes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getData = async () => {
        if (count !== null && clothes.length >= count) return

        if (count === null) {
            const result = await firestore().collection('clothes').count().get()
            setCount(result._data.count * 10)
        }

        let result = (await firestore().collection('clothes').get()).docs
        result = result.map(cloth => cloth.data())
        setClothes(prev => [...prev, ...result])
        if (isLoading === true) setIsLoading(false)
    }

    useEffect(() => { getData() }, [])

    const renderItem = ({ item, index }) => <Card index={index} cloth={item} />

    const endReachedHandler = () => getData()


    return (
        <View style={styles.container}>
            {isLoading === false && <FlatList
                data={clothes}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                numColumns={2}
                style={styles.list}
                ListFooterComponent={() => <ListFooter maxCount={count} count={clothes.length} />}
                onEndReached={endReachedHandler}
                onEndReachedThreshold={1}
            />}
            {isLoading && <Loader />}
            {isLoading === false && <Footer />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, },
    list: { marginTop: 5 }
})

export default List