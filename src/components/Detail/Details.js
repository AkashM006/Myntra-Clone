import { View, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'

const Details = () => {

    const dummy = Array(5).fill(1)

    return (
        <View style={styles.container}>
            <View>
                <CustomText style={styles.title}>
                    Product Details
                </CustomText>
                {dummy.map((item, index) => {
                    return (
                        <View key={index}>
                            <View style={styles.row}>
                                <View style={[styles.detailCard, { marginRight: 20 }]}>
                                    <CustomText style={styles.title}>
                                        Fit
                                    </CustomText>
                                    <CustomText style={styles.text}>
                                        Bootcut
                                    </CustomText>
                                </View>
                                <View style={styles.detailCard}>
                                    <CustomText style={styles.title}>
                                        Length
                                    </CustomText>
                                    <CustomText style={styles.text}>
                                        Regular
                                    </CustomText>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.detailCard, { marginRight: 20 }]}>
                                    <CustomText weight='light' style={styles.title}>
                                        Waist Rise
                                    </CustomText>
                                    <CustomText style={styles.text}>
                                        Mid-Rise
                                    </CustomText>
                                </View>
                                <View style={styles.detailCard}>
                                    <CustomText style={styles.title}>
                                        Stretch
                                    </CustomText>
                                    <CustomText style={styles.text}>
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
    title: {
        fontSize: 14,
        color: 'black'
    },
    text: {
        color: 'gray',
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