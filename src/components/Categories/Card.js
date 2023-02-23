import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import CustomText from '../Reusable/CustomText'
import { substring } from '../../utils/utils'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import Collapsable from './Collapsable'
import { useState } from 'react'
import { useEffect } from 'react'

const Card = ({ item, selected, setSelected, index, last }) => {

    const { colors } = useSelector(state => state.theme)
    const categories = Object.keys(item.subCategory)
    let description = ''
    if (categories) {
        description = categories.reduce((prev, item) => {
            return prev === '' ? item : prev + ', ' + item
        }, '')
    }

    const rotation = useSharedValue(90)

    const rotationDest = selected === item.categoryName ? -90 : 90

    rotation.value = withSpring(rotationDest, {
        damping: 50
    })

    const subCategories = Object.keys(item.subCategory)

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                rotate: rotation.value + 'deg'
            }],
        }
    }, [])

    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {
        if (selected !== item.categoryName) setSelectedCategory(null)
    }, [selected])

    const toggleSelection = _ => {
        if (item.categoryName === selected)
            setSelected(null)
        else
            setSelected(item.categoryName)
    }

    return (
        <TouchableOpacity onPress={toggleSelection}>
            <View style={[styles.container, { backgroundColor: colors['LIGHT'], borderBottomWidth: index === last ? 0 : 1, borderBottomColor: colors['SHADELIGHT'] }]}>
                <View style={styles.mainContentContainer}>
                    <View style={styles.textContainer}>
                        <View style={styles.headerContainer}>
                            <CustomText size={18} weight='light' color={colors['DARK']}>
                                {item.categoryName}
                            </CustomText>
                            <Animated.View style={[rStyle, styles.indicator]}>
                                <FastImage
                                    source={{ uri: ICONS.ICON_RIGHT }}
                                    style={styles.icon}
                                    tintColor={colors['DARK']}
                                />
                            </Animated.View>
                        </View>
                        <CustomText color={colors['DARK']}>
                            {substring(description, 30)}
                        </CustomText>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.image}
                        />
                    </View>
                </View>
                {
                    selected === item.categoryName
                    &&
                    <View style={[styles.collapsableContainer, { borderTopColor: colors['SHADELIGHT'] }]}>
                        {subCategories.map(subCategory => {
                            return <Collapsable
                                name={subCategory}
                                item={item.subCategory[subCategory]}
                                key={subCategory}
                                selected={selectedCategory}
                                setSelected={setSelectedCategory}
                            />
                        })}
                    </View>
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: '3.5%',
        paddingVertical: '2.5%',
    },
    textContainer: { justifyContent: 'center', width: '45%' },
    image: {
        height: 150,
        width: '100%',
        resizeMode: 'contain',
        borderRadius: 1000
    },
    imageContainer: {
        height: '100%',
        width: '50%'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    icon: {
        height: 10,
        width: 10
    },
    indicator: { alignSelf: 'flex-start' },
    mainContentContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    divider: {
        width: '100%',
        height: 1,
        borderBottomWidth: 1
    },
    collapsableContainer: {
        borderTopWidth: 1,
        marginTop: 20
    }
})

export default Card