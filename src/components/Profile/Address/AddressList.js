import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomText from '../../Reusable/CustomText'
import Card from './Card'
import { setSelected } from '../../../redux/addressSlice'

const AddressList = ({ showForm, rerender }) => {

    const { colors } = useSelector(state => state.theme)
    const { addresses, selected } = useSelector(state => state.address)
    const dispatch = useDispatch()

    const openFormHandler = _ => {
        dispatch(setSelected(null))
        showForm()
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors['LIGHT'] }}>
            <Pressable onPress={openFormHandler} style={[styles.headerContainer, { backgroundColor: colors['LIGHT'] }]}>
                <CustomText color={colors['PRIMARY']} weight='bolder'>
                    + ADD NEW ADDRESS
                </CustomText>
            </Pressable>
            <FlatList
                data={addresses}
                renderItem={({ item, index }) => <Card address={item} showForm={showForm} rerender={rerender} selected={selected} index={index} />}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 150 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: '3.5%',
        paddingVertical: 10,
        paddingBottom: 15
    }
})

export default AddressList