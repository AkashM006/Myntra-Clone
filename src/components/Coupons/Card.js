import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useSelector } from 'react-redux'

const Card = ({ item: data, index, active, setActive }) => {

    const { colors } = useSelector(state => state.theme)
    
    const pressHandler = _ => {
        setActive(index)
    }

    return (
        <TouchableOpacity onPress={pressHandler} style={[styles.container, {
            borderColor: index === active ? colors['PRIMARY'] : colors['SHADEDARK']
        }]}>
            <CustomText color={index === active? colors['PRIMARY'] : colors["DARK"]} weight='bold' size={14}>
                {data.name}
            </CustomText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
        borderWidth: 1,
        marginRight: 10 
    }
})

export default Card