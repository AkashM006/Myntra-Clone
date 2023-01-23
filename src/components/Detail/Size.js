import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import COLORS from '../../constants/Colors'
import FastImage from 'react-native-fast-image'
import ICONS from '../../icons/icons'

const Size = ({ sizes, setStickyFooter }) => {
    let clothSizes = { ...sizes }

    delete clothSizes.id
    delete clothSizes.productId

    clothSizes = Object.entries(clothSizes)


    return (
        <View style={styles.container}>
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
            <View style={styles.sizesContainer}>
                {clothSizes.map((size, index) => (
                    <TouchableOpacity key={index} style={[styles.size, {
                        borderColor: !size[1] ? 'lightgray' : 'black'
                    }]}>
                        <View>
                            <CustomText color={size[1] ? COLORS.BLACK : COLORS.SHADEDARK}>
                                {size[0].toUpperCase()}
                            </CustomText>
                        </View>
                        {!size[1] && <View style={styles.strike} />}
                    </TouchableOpacity>
                ))}
            </View>
            <View
                onLayout={event => { setStickyFooter(event.nativeEvent.layout) }}
                style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, { borderColor: 'lightgray', borderWidth: 1, width: '40%' }]}>
                    <FastImage source={{ uri: ICONS.ICON_HEART }} style={styles.icon} />
                    <CustomText weight={'light'} style={[styles.text]}>
                        WISHLIST
                    </CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#ff3e6c', width: '50%' }]}>
                    <FastImage source={{ uri: ICONS.ICON_BAG }} style={[styles.icon, { tintColor: 'white' }]} />
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
        flexWrap: 'wrap'
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
    text: {
        marginLeft: 10
    }
})

export default Size