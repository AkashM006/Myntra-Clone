import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import CustomText from '../Reusable/CustomText'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const Collapsable = ({ name, item, selected, setSelected }) => {

    const { colors } = useSelector(state => state.theme)

    const pressHandler = _ => {
        if (selected === name) setSelected(null)
        else setSelected(name)
    }

    const rotationValue = useSharedValue(90)

    const rotationDest = selected === name ? -90 : 90

    rotationValue.value = withSpring(rotationDest, {
        damping: 50
    })

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                rotate: rotationValue.value + 'deg'
            }]
        }
    }, [])

    return (
        <TouchableOpacity onPress={pressHandler} style={[styles.container, { borderColor: colors['SHADELIGHT'] }]}>
            <View style={styles.textContainer}>
                <CustomText color={colors['DARK']} >
                    {name}
                </CustomText>
                {item.length > 0 && <Animated.View style={[rStyle, styles.iconContainer]}>
                    <FastImage
                        source={{ uri: ICONS.ICON_RIGHT }}
                        style={styles.icon}
                        tintColor={colors['DARK']}
                    />
                </Animated.View>}
            </View>
            {selected === name && <View>
                {item.map((subCategory, index) =>
                    <TouchableOpacity
                        style={[styles.subCategoryItem, { borderBottomColor: colors['SHADELIGHT'], borderBottomWidth: index === item.length - 1 ? 0 : 1 }]}
                        key={subCategory.childCategoryId}>
                        <CustomText color={colors['SHADEDARK']}>
                            {subCategory.childCategoryName}
                        </CustomText>
                    </TouchableOpacity>
                )}
            </View>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 10
    },
    icon: {
        height: 10,
        width: 10,
    },
    textContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    iconContainer: { alignSelf: 'flex-start' },
    subCategoryItem: {
        paddingHorizontal: '5%',
        paddingVertical: 10,
    }
})

export default Collapsable