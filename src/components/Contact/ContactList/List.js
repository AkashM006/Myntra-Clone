import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import CustomText from '../../Reusable/CustomText'
import MORE from '../../../DATA/More'
import FastImage from 'react-native-fast-image'
import ICONS from '../../../icons/icons'
import { useNavigation } from '@react-navigation/native'

const List = ({ item }) => {

    const { colors } = useSelector(state => state.theme)
    const currentItem = MORE.find(element => element.id === item.id)
    const navigation = useNavigation()

    const pressHandler = (id, title) => navigation.navigate('ContactDetail', {
        id,
        title
    })

    return (
        <View style={{ flex: 1, backgroundColor: colors['LIGHT'] }}>
            <View style={[{ borderColor: colors['SHADELIGHT'] }, styles.headerContainer]} >
                <CustomText weight='bold' color={colors['DARK']}>
                    {item.title}
                </CustomText>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    currentItem.category.map(item => (
                        <TouchableOpacity
                            onPress={_ => pressHandler(item.id, item.title)}
                            style={[styles.item, { borderBottomColor: colors['SHADELIGHT'] }]}
                            key={item.id}
                        >
                            <View style={{ width: '85%' }}>
                                <CustomText color={colors['SHADEDARK']}>
                                    {item.title}
                                </CustomText>
                            </View>
                            <FastImage
                                source={{ uri: ICONS.ICON_RIGHT }}
                                style={styles.icon}
                                tintColor={colors['DARK']}
                            />
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        borderBottomWidth: 1,
        paddingHorizontal: '5%',
        paddingVertical: 10,
    },
    item: {
        paddingHorizontal: '5%',
        paddingVertical: 15,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        height: 10,
        width: 10
    }
})

export default List