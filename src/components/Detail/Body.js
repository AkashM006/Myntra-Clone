import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Size from './Size'
import firestore from '@react-native-firebase/firestore'
import Details from './Details'

const Body = ({ item, setStickyFooter }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [sizes, setSizes] = useState([])

    const getData = async () => {
        const result = await (await firestore().collection('size').where('type', '==', 'pant').get()).docs
        setSizes(result[0].data().sizes)
        setIsLoading(false)
    }

    useEffect(() => { getData() }, [])

    return (
        <View style={styles.container}>
            <Header
                brand={item.brand}
                name={item.name}
                price={item.price}
                discount={item.discount ?? null}
            />
            {isLoading === true ?
                <ActivityIndicator size={'small'} color={'#FF69B4'} style={styles.loader} />
                :
                <>
                    <Size
                        sizes={sizes}
                        itemSizes={item.sizes}
                        setStickyFooter={setStickyFooter}
                    />
                    <Details />
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    loader: {
        padding: '3%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 100
    }
})

export default Body