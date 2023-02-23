import { View, ScrollView } from 'react-native'
import React from 'react'
import { useReducer } from 'react'
import loadingStatus, { initialState } from '../../reducer/LoadingReducer'
import Overlay from '../Reusable/Overlay'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Config from 'react-native-config'
import { showToast } from '../../utils/utils'
import axios from 'axios'
import { useState } from 'react'
import Card from './Card'

const Body = () => {

    const [loading, setLoading] = useReducer(loadingStatus, initialState)
    const { theme, colors } = useSelector(state => state.theme)
    const [categories, setCategories] = useState([])
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        setLoading({ type: 'loading' })
        axios.get(`${Config.API_KEY}/home/shopbycategoriesm`)
            .then(res => {
                let data = res.data
                if (data.status) {
                    data = data.data
                    setCategories(data)
                } else showToast(data.message)
                setLoading({ type: 'success' })

            })
            .catch(err => {
                console.log("Error in Categories.Body.js: ", err)
                showToast('Something went wrong while fetching categories. Please try again later!')
            })
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: colors['LIGHT'] }}>
            {
                loading.isLoading ?
                    <Overlay render hideShadow={theme === 'light'} />
                    :
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: '5%' }}>
                        {categories.map((category, index) => {
                            return <Card
                                key={category.categoryName}
                                item={category}
                                selected={selected}
                                setSelected={setSelected}
                                index={index}
                                last={categories.length - 1}
                            />
                        })}
                    </ScrollView>
            }
        </View>
    )
}

export default Body