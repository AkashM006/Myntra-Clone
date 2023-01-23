import { View, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import COLORS from '../../constants/Colors'

const Details = ({ about }) => {

    const dummy = Array(5).fill(1)

    return (
        <View style={styles.container}>
            <View>
                <CustomText weight={'light'} size={14}>
                    Product Details
                </CustomText>
                <CustomText vertical={20} size={13}>
                    {about}
                </CustomText>
                {dummy.map((item, index) => {
                    return (
                        <View key={index}>
                            <View style={styles.row}>
                                <View style={[styles.detailCard, { marginRight: 20 }]}>
                                    <CustomText size={14}>
                                        Fit
                                    </CustomText>
                                    <CustomText color={COLORS.SHADEDARK} style={styles.text}>
                                        Bootcut
                                    </CustomText>
                                </View>
                                <View style={styles.detailCard}>
                                    <CustomText size={14}>
                                        Length
                                    </CustomText>
                                    <CustomText color={COLORS.SHADEDARK} style={styles.text}>
                                        Regular
                                    </CustomText>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.detailCard, { marginRight: 20 }]}>
                                    <CustomText size={14} weight='light'>
                                        Waist Rise
                                    </CustomText>
                                    <CustomText color={COLORS.SHADEDARK} style={styles.text}>
                                        Mid-Rise
                                    </CustomText>
                                </View>
                                <View style={styles.detailCard}>
                                    <CustomText size={14}>
                                        Stretch
                                    </CustomText>
                                    <CustomText color={COLORS.SHADEDARK} style={styles.text}>
                                        Stretchable
                                    </CustomText>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    text: {
        marginVertical: 5
    },
    detailCard: {
        marginTop: 5,
        borderBottomWidth: 1,
        borderColor: 'lightslategray',
        width: '45%',
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 10
    }
})

export default Details