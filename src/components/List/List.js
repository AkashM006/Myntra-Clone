import { View, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import Loader from './Loader'
import Card from './Card'

const List = () => {

    const [count, setCount] = useState(null)
    const [clothes, setClothes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getData = async () => {
        if (count === null) {
            const result = await firestore().collection('clothes').count().get()
            setCount(result._data.count * 10)
        }

        let result = await (await firestore().collection('clothes').get()).docs
        result = result.map(cloth => cloth._data)
        setClothes(prev => [...prev, ...result])
        setIsLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])

    const renderItem = ({ item, index }) => <Card index={index} cloth={item} />


    return (
        <View style={styles.container}>
            <FlatList
                data={clothes}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                numColumns={2}
                style={styles.list}
            />
            {isLoading && <Loader />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    list: { marginTop: 5 }
})

export default List