import { View, StyleSheet, TouchableOpacity, TouchableOpacityBase, Image } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'

const Size = ({ sizes, itemSizes }) => {

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <CustomText style={styles.title}>
                    Select Size
                </CustomText>
                <TouchableOpacity>
                    <CustomText style={styles.select}>
                        Size chart
                    </CustomText>
                </TouchableOpacity>
            </View>
            <View style={styles.sizesContainer}>
                {sizes.map((size, index) => (
                    <TouchableOpacity key={index} style={[styles.size, {
                        borderColor: !(itemSizes.includes(size)) ? 'lightgray' : 'black'
                    }]}>
                        <View>
                            <CustomText style={{ color: itemSizes.includes(size) ? 'black' : 'lightgray' }}>
                                {size}
                            </CustomText>
                        </View>
                        {!(itemSizes.includes(size)) && <View style={styles.strike} />}
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, { borderColor: 'lightgray', borderWidth: 1, width: '40%' }]}>
                    <Image source={require('../../icons/heart.png')} style={styles.icon} />
                    <CustomText style={[styles.text, { color: 'black' }]}>
                        WISHLIST
                    </CustomText>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#ff3e6c', width: '50%' }]}>
                    <Image source={require('../../icons/bag.png')} style={[styles.icon, { tintColor: 'white' }]} />
                    <CustomText style={[styles.text, { color: 'white' }]}>
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
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
    },
    select: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FF69B4',
    },
    sizesContainer: {
        flexDirection: 'row',
        marginBottom: 10
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
        borderRadius: 3
    },
    icon: {
        height: 30,
        width: 30
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 12,
        fontWeight: '700',
        marginLeft: 10
    }
})

export default Size