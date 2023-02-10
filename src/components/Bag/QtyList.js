import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import CustomText from '../Reusable/CustomText'

const QtyList = ({ item, qty, setQty }) => {

    const { colors } = useSelector(state => state.theme)
    const currentSize = item?.size.find(value => value.name === item.currentSize)
    const maxQty = currentSize?.maxQty > 10 ? 10 : currentSize?.maxQty

    return (
        <View style={{ height: 70 }}>
            {item && <ScrollView
                horizontal
                style={styles.scroll}
                contentContainerStyle={{ height: 50 }}
                showsHorizontalScrollIndicator={false}
            >
                {Array(maxQty).fill(0).map((_, index) => {
                    const getColor = _ => {
                        if (qty === (index + 1)) return colors['PRIMARY']
                        return colors['DARK']
                    }

                    const pressHandler = _ => {
                        setQty(index + 1)
                    }

                    return (<Pressable onPress={pressHandler} style={[styles.circle, { borderColor: getColor() }]} key={index}>
                        <CustomText color={getColor()} weight='bold'>
                            {index + 1}
                        </CustomText>
                    </Pressable>)
                })}
            </ScrollView>}
        </View>
    )
}

const styles = StyleSheet.create({
    circle: {
        width: 50,
        borderRadius: 200,
        borderWidth: 1,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scroll: {
        marginTop: 20,
    }
})

export default QtyList