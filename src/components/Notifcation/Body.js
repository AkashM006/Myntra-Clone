import { FlatList, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

const Body = () => {

    const { data } = useSelector(state => state.notification)
    const { colors } = useSelector(state => state.theme)

    let items = data.filter(item => !item.read)
    items.push(...data.filter(item => item.read))

    const renderItem = ({ item }) => {
        return <Card item={item} />
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors['LIGHT'], }}>
            <FlatList
                data={items}
                keyExtractor={(item, index) => item.id ?? index}
                renderItem={renderItem}
                contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 10 }}
            />
        </View>
    )
}

export default Body