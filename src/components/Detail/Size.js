import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import COLORS from '../../constants/Colors'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'
import { useSelector } from 'react-redux'

const Size = ({ sizes, setStickyFooter, size, setSize, addToBag }) => {
    let clothSizes = { ...sizes }

    delete clothSizes.id
    delete clothSizes.productId

    const { colors } = useSelector(state => state.theme)

    const transform = sizes => {
        return [
            {
                id: 1,
                name: 'XS',
                available: sizes.xsavailable > 0,
                maxQty: sizes.xsavailable
            },
            {
                id: 2,
                name: 'S',
                available: sizes.savailable > 0,
                maxQty: sizes.savailable
            },
            {
                id: 3,
                name: 'M',
                available: sizes.mavailable > 0,
                maxQty: sizes.mavailable
            },
            {
                id: 4,
                name: 'L',
                available: sizes.lavailable > 0,
                maxQty: sizes.lavailable
            },
            {
                id: 5,
                name: 'XL',
                available: sizes.xlavailable > 0,
                maxQty: sizes.xlavailable
            },
            {
                id: 6,
                name: 'XXL',
                available: sizes.xxlavailable > 0,
                maxQty: sizes.xxlavailable
            }
        ]
    }

    clothSizes = transform(clothSizes)


    return (
        <View onLayout={event => { setStickyFooter(event.nativeEvent.layout) }} style={styles.container}>
            <View style={styles.titleContainer}>
                <CustomText weight={'light'} size={18}>
                    Select Size
                </CustomText>
                <TouchableOpacity>
                    <CustomText weight={'light'} size={14} color={COLORS.PRIMARY}>
                        Size chart
                    </CustomText>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal style={styles.sizesContainer}>
                {clothSizes.map(item => (
                    <View style={styles.sizeInnerContainer} key={item.id}>
                        <TouchableOpacity disabled={!item.available} onPress={() => setSize(item.name)} style={[styles.size, {
                            borderColor: item.available ? item.name === size ? COLORS.PRIMARY : COLORS.BLACK : COLORS.SHADEDARK
                        }]}>
                            <View>
                                <CustomText color={item.available ? item.name === size ? COLORS.PRIMARY : COLORS.BLACK : COLORS.SHADEDARK}>
                                    {item.name}
                                </CustomText>
                            </View>
                            {!item.available && <View style={styles.strike} />}
                        </TouchableOpacity>
                        {item.available && item.maxQty <= 5 && <CustomText weight='bold' style={[{ borderColor: colors['DANGER'] }, styles.dangerText]} color={colors['DANGER']}>
                            {item.maxQty} left
                        </CustomText>}
                    </View>
                ))}
            </ScrollView>
            <View
                style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, { borderColor: 'lightgray', borderWidth: 1, width: '40%' }]}>
                    <FastImage source={{ uri: ICONS.ICON_HEART }} style={styles.icon} />
                    <CustomText weight={'light'} style={[styles.text]}>
                        WISHLIST
                    </CustomText>
                </TouchableOpacity>
                <TouchableOpacity onPress={addToBag} style={[styles.button, { backgroundColor: '#ff3e6c', width: '50%' }]}>
                    <FastImage source={{ uri: ICONS.ICON_BAG }} tintColor='white' style={[styles.icon, { tintColor: 'white' }]} />
                    <CustomText weight={'light'} color={COLORS.WHITE} style={[styles.text,]}>
                        ADD TO BAG
                    </CustomText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingBottom: 10,
        marginBottom: 10
    },
    titleContainer: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sizesContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        height: 90
    },
    size: {
        borderRadius: 100,
        borderWidth: 1,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginVertical: 10
    },
    strike: {
        height: 1,
        borderColor: 'lightgray',
        borderTopWidth: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '50%',
        top: '50%',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 3,
        height: 50
    },
    icon: {
        height: 30,
        width: 30
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    text: { marginLeft: 10 },
    sizeInnerContainer: {
        alignItems: 'center',
    },
    dangerText: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 4
    }
})

export default Size