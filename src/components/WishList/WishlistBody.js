import { FlatList, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'
import Quote from '../Home/Quote'

const WishlistBody = () => {

    const { colors } = useSelector(state => state.theme)
    const { items } = useSelector(state => state.wishlist)

    return (
        <View style={{ backgroundColor: colors['LIGHT'], }}>
            <FlatList
                data={items}
                renderItem={({ item, index }) => <Card item={item} index={index} />}
                keyExtractor={item => item.clothId}
                numColumns={2}
                contentContainerStyle={{ paddingBottom: 200, paddingTop: 20 }}
                ListFooterComponent={
                    <View style={{ paddingTop: 50 }}>
                        <Quote loading={false} />
                    </View>
                }
            />
        </View>
    )
}

export default WishlistBody