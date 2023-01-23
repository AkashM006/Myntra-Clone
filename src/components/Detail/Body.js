import { View, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Size from './Size'
import Details from './Details'
import COLORS from '../../constants/Colors'

const Body = ({ item, setStickyFooter }) => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => { setIsLoading(false) }, [])

    return (
        <View style={styles.container}>
            <Header
                brand={item.product.brand}
                name={item.product.name}
                price={item.product.mrp}
                discount={item.product.discount ?? null}
            />
            {isLoading === true ?
                <ActivityIndicator size={'small'} color={COLORS.PRIMARY} style={styles.loader} />
                :
                <>
                    <Size
                        sizes={item.size}
                        setStickyFooter={setStickyFooter}
                    />
                    <Details about={item.product.description} />
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