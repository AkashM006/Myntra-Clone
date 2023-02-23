import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import Quote from '../Home/Quote'
import COLORS from '../../constants/Colors'

const ListFooter = ({ count, maxCount }) => {
    return (
        <View style={styles.container}>
            {count < maxCount &&
                <View>
                    <ActivityIndicator style={styles.loader} size={'small'} color={COLORS.PRIMARY} />
                </View>
            }
            <Quote loading={false} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        height: 115
    },
    loader: {
        padding: '2%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 100
    }
})

export default ListFooter