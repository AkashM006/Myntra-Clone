import { View, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'

const Details = ({ about, specs }) => {

    const dummy = Array(5).fill(1)

    if (specs) {
        delete specs.id
        delete specs.productId
    }

    const renderSpecs = _ => {
        let n = Object.keys(specs).length
        n /= 2
        let obj = {}
        for (let i = 0; i < n; i++) {
            let key = specs['s' + (i + 1)]
            obj[key] = specs['v' + (i + 1)]
        }
        return Object.entries(obj).map(item => (
            <View style={styles.specContainer} key={item[0]}>
                <CustomText weight='bolder' bottom={5} >{item[0]}</CustomText>
                <CustomText style={styles.textBody} >{item[1]}</CustomText>
            </View>
        ))
    }

    return (
        <View style={styles.container}>
            <View>
                <CustomText weight={'light'} size={14}>
                    Product Details
                </CustomText>
                <CustomText vertical={20} size={13}>
                    {about}
                </CustomText>
                {
                    specs && Object.keys(specs).length > 0 && <View style={styles.topContainer}>{renderSpecs()}</View>
                }
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
    },
    specContainer: {
        width: '45%',
        marginBottom: 20
    },
    textBody: {
        borderBottomWidth: 1,
        paddingBottom: 5,
        borderColor: 'black',
    },
    topContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }
})

export default Details