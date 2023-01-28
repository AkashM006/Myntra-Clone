import { BackHandler, View } from 'react-native'
import React from 'react'
import Header from '../components/WishList/Header'
import { useDispatch, useSelector } from 'react-redux'
import EmptyBody from '../components/WishList/EmptyBody'
import WishlistBody from '../components/WishList/WishlistBody'
import { useEffect } from 'react'
import { setIsEditing } from '../redux/wishlistSlice'
import Overlay from '../components/Reusable/Overlay'
import { useState } from 'react'

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

    useEffect(() => {
        // todo: here load the data from backend
        setTimeout(() => {
            setLoaded(true)
        }, 2000)

        return () => {
            dispatch(setIsEditing(false))
        }
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