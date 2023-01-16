import { View, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from '../Reusable/CustomText'
import COLORS from '../../constants/Colors'

const Quote = ({ loading }) => {
    return (
        <>
            {loading === false && <View style={styles.container}>
                <View style={styles.line} />
                <CustomText fontFamily={'Roboto-Thin'}>
                    "Dressing well Is A Form Of Good Manners."
                </CustomText>
                <CustomText color={COLORS.SHADEDARK} style={{ alignSelf: 'center', }}>
                    Muiccia Prada
                </CustomText>
            </View>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        alignSelf: 'center',
    },
    line: {
        width: 90,
        height: 1,
        backgroundColor: 'black',
        marginBottom: 15,
        alignSelf: 'center',
    }
})

export default Quote