import { BackHandler, View } from 'react-native'
import React from 'react'
import Header from '../components/WishList/Header'
import { useDispatch, useSelector } from 'react-redux'
import EmptyBody from '../components/WishList/EmptyBody'
import WishlistBody from '../components/WishList/WishlistBody'
import { useEffect } from 'react'
import { setIsEditing, setItems } from '../redux/wishlistSlice'
import Overlay from '../components/Reusable/Overlay'
import { useState } from 'react'
import { showToast, transformWishlistData } from '../utils/utils'
import axios from 'axios'
import Config from 'react-native-config'

const WishListScreen = () => {

    const { items, isEditing } = useSelector(state => state.wishlist)
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const { colors } = useSelector(state => state.theme)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', _ => {
            if (isEditing) {
                dispatch(setIsEditing(false))
                return true
            }
            return false
        })

        return () => backHandler.remove()
    }, [isEditing])

    const getData = async () => {
        try {
            const result = await axios.get(`${Config.API_KEY}/wishlist`)
            data = result.data.data.items
            data = transformWishlistData(data)
            dispatch(setItems(data))
            setLoaded(true)
        } catch (err) {
            setLoaded(true)
            console.log("Error: ", err)
            showToast('Something went wrong while fetching your wishlist details. Please try again later!')
        }
    }

    useEffect(() => {
        getData()
        return () => dispatch(setIsEditing(false))
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Header />
            {loaded &&
                <>
                    {items.length === 0 ? <EmptyBody /> : <WishlistBody />}
                </>
            }
            {!loaded && <View style={{ flex: 1, backgroundColor: colors['LIGHT'] }} >
                <Overlay hideShadow render={!loaded} />
            </View>}
        </View>
    )
}

export default WishListScreen