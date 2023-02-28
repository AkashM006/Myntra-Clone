import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useReducer } from 'react'
import loadingStatus, { initialState } from '../../reducer/LoadingReducer'
import { useEffect } from 'react'
import { useState } from 'react'
import { data } from '../../DATA/Coupons'
import CouponCard from './CouponCard'
import Overlay from '../Reusable/Overlay'

const List = ({ category, active }) => {

    const [loading, setLoading] = useReducer(loadingStatus, initialState)
    const [listData, setListData] = useState([])

    const getData = async _ => {
        setTimeout(() => {
            setListData(data)
            setLoading({type: 'success'})
        }, 3000)
    }

    useEffect(() => {
        setLoading({ type: 'loading' })
        getData()
    }, [category, active])

    return (
        <View style={styles.container}>
            {
                loading.isLoading ?
                    <Overlay render hideShadow />
                    :
                    <FlatList
                        data={listData}
                        renderItem={({ item }) => <CouponCard item={item} />}
                        keyExtractor={(item, index) => index} // change to item.id when fetching from db
                        showsVerticalScrollIndicator={false}
                    />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: '5%',
        paddingHorizontal: '3.5%',
        flex: 1
    }
})

export default List