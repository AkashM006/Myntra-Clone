import { FlatList, View } from 'react-native'
import React from 'react'
import Card from './Card'

const Tags = ({ data, active, setActive }) => {
    
    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item, index }) => <Card setActive={setActive} item={item} index={index} active={active} />}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default Tags