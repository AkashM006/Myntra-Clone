import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import COLORS from '../../constants/Colors'
import { useSelector } from 'react-redux'
import { formatCurrency, getSizes } from '../../utils/utils'

const Size = ({ sizes, setStickyFooter, size, setSize, setSizeContainer }) => {
    let clothSizes = { ...sizes }

    delete clothSizes.id
    delete clothSizes.productId

    const { colors } = useSelector(state => state.theme)

    const item = { size: clothSizes }

    clothSizes = getSizes(item)

    const getColor = item => {
        return item.available ? item.name === size ? COLORS.PRIMARY : COLORS.BLACK : COLORS.SHADEDARK
    }

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
            <ScrollView onLayout={event => setSizeContainer(event.nativeEvent.layout)} showsHorizontalScrollIndicator={false} horizontal style={styles.sizesContainer}>
                {clothSizes.map(item => (
                    <View style={styles.sizeInnerContainer} key={item.name}>
                        <TouchableOpacity disabled={!item.available} onPress={() => setSize(item.name)} style={[styles.size, {
                            borderColor: getColor(item)
                        }]}>
                            <View>
                                <CustomText color={getColor(item)}>
                                    {item.name}
                                </CustomText>
                            </View>
                            {!item.available && <View style={styles.strike} />}
                            {
                                !clothSizes.hasSameAmount && item.available && <CustomText color={getColor(item)}>
                                    {formatCurrency(item.amount).split('.')[0]}
                                </CustomText>
                            }
                        </TouchableOpacity>
                        {item.available && item.maxQty <= 5 && <CustomText weight='bold' style={[{ borderColor: colors['DANGER'] }, styles.dangerText]} color={colors['DANGER']}>
                            {item.maxQty} left
                        </CustomText>}
                    </View>
                ))}
            </ScrollView>
            <View
                style={styles.buttonContainer}>
                {/* <TouchableOpacity style={[styles.button, { borderColor: 'lightgray', borderWidth: 1, width: '40%' }]}>
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
                </TouchableOpacity> */}
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
    },
    size: {
        borderRadius: 100,
        borderWidth: 1,
        height: 50,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        marginVertical: 10
    },
    strike: {
        height: 1,
        borderColor: 'lightgray',
        borderTopWidth: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
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
        padding: 10,
        height: 50,
        margin: 10
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