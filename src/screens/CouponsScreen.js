import { View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Coupons/Header'
import Tags from '../components/Coupons/Tags'
import { useState } from 'react'
import { useEffect } from 'react'
import { tags } from '../DATA/Coupons'
import { useReducer } from 'react'
import loadingStatus, { initialState } from '../reducer/LoadingReducer'
import Overlay from '../components/Reusable/Overlay'
import List from '../components/Coupons/List'

const CouponsScreen = () => {

    const { colors } = useSelector(state => state.theme)

    const [tagList, setTagList] = useState([])
    const [activeTagIndex, setActiveTagIndex] = useState(0)

    const [loading, setLoading] = useReducer(loadingStatus, initialState)

    const getData = async _ => {
        // write logic to integrate this with backend
        setTimeout(() => {
            setTagList(tags)
            setLoading({type: 'success'})
        },3000)
    }

    useEffect(() => {
        setLoading({type: 'loading'})
        getData()
    },[])

    return (
        <View style={{ flex: 1, backgroundColor: colors['LIGHT'] }}>
            <Header />
            {loading.isLoading ? <Overlay render /> : <Tags setActive={setActiveTagIndex} data={tagList} active={activeTagIndex} />}
            {!loading.isLoading && <List active={activeTagIndex} category={tagList.length === 0 ? null : tagList[setActiveTagIndex]} />}
        </View>
    )
}

export default CouponsScreen