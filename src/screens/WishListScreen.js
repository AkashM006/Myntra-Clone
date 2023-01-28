import { View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/WishList/Header'
import { useSelector } from 'react-redux'
import EmptyBody from '../components/WishList/EmptyBody'
import WishlistBody from '../components/WishList/WishlistBody'

const WishListScreen = () => {

    const navigation = useNavigation()
    const { items } = useSelector(state => state.wishlist)

    return (
        <View style={{ flex: 1 }}>
            <Header />
            {items.length === 0 ? <EmptyBody /> : <WishlistBody />}
        </View>
    )
}

export default WishListScreen