import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import MORE from '../../DATA/More'
import CustomText from '../Reusable/CustomText'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import { useNavigation } from '@react-navigation/native'

const MoreQueries = () => {
    const DATA = MORE.map(item => ({ id: item.id, title: item.title }))
    const { colors } = useSelector(state => state.theme)
    const navigation = useNavigation()

    const borderColoring = colors['SHADELIGHT']

    const navigationHandler = item => {
        navigation.navigate('ContactList', {
            item: item
        })
    }

    return (
        <View style={styles.container}>
            {DATA.map((item, index) => (
                <TouchableOpacity
                    onPress={() => navigationHandler(item)}
                    style={[styles.item, { borderColor: borderColoring, borderBottomWidth: index !== DATA.length - 1 ? 0 : 1 }]}
                    key={item.id}
                >
                    <CustomText color={colors['SHADEDARK']}>
                        {item.title}
                    </CustomText>
                    <FastImage
                        source={{ uri: ICONS.ICON_RIGHT }}
                        style={styles.icon}
                        tintColor={colors['DARK']}
                    />
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderTopWidth: 1
    },
    icon: {
        height: 10,
        width: 10
    }
})

export default MoreQueries