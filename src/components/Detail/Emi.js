import { View, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import { useSelector } from 'react-redux'

const Emi = ({ data, offer }) => {

    const { colors } = useSelector(state => state.theme)

    return (
        <View style={styles.container}>
            {
                offer && <View style={styles.offerContainer}>
                    <CustomText>
                        {offer}
                    </CustomText>
                </View>
            }
            <View style={styles.textContainer}>
                <CustomText size={13} weight='bolder'>
                    EMI option available
                </CustomText>
                <CustomText size={13} weight='bold' color={colors['PRIMARY']}>
                    View Plan
                </CustomText>
            </View>
            <CustomText top={10}>
                {data}
            </CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: '3.5%'
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    offerContainer: {
        backgroundColor: '#c9fcd4',
        marginBottom: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#77f993'
    }
})

export default Emi