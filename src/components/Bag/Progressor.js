import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useSelector } from 'react-redux'

const Progressor = () => {

    const { colors } = useSelector(state => state.theme)

    return (
        <View style={[styles.container]}>
            <View style={[styles.arrow, { backgroundColor: 'green' }]}>
                <View style={[styles.head, { borderColor: colors['LIGHT'], backgroundColor: colors['SHADEDARK'] }]}>
                    <View style={styles.indicator} />
                </View>
            </View>
            <CustomText weight={'light'} size={10} color={colors['SHADEDARK']}>
                Bag
            </CustomText>
            <View style={[styles.arrow,]}>
                <View style={[styles.head, { borderColor: colors['LIGHT'], backgroundColor: colors['SHADELIGHT'], borderWidth: 0 }]}>
                    {/* <View style={styles.indicator} /> */}
                </View>
            </View>
            <CustomText size={10} color={colors['SHADEDARK']}>
                Address
            </CustomText>
            <View style={[styles.arrow,]}>
                <View style={[styles.head, { borderColor: colors['LIGHT'], backgroundColor: colors['SHADELIGHT'], borderWidth: 0 }]}>
                    {/* <View style={styles.indicator} /> */}
                </View>
            </View>
            <CustomText size={10} color={colors['SHADEDARK']}>
                Payment
            </CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    arrow: {
        width: '20%',
        backgroundColor: 'gray',
        height: 2,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    head: {
        width: 8,
        height: 8,
        borderRadius: 5,
        borderWidth: 1,
        justifyContent: 'center',
    },
    indicator: {
        height: 12,
        width: 12,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 15,
        alignSelf: 'center',
    }
})

export default Progressor