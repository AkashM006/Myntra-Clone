import { View, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Size from './Size'
import Details from './Details'
import COLORS from '../../constants/Colors'
import Emi from './Emi'

const Body = ({ item, setStickyFooter, selectedSize, setSelectedSize, addToBag }) => {

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
            {item.product.emiOption.length > 0 && <Emi data={item.product.emiOption} offer={item.product.offer} />}
            {isLoading === true ?
                <ActivityIndicator size={'small'} color={COLORS.PRIMARY} style={styles.loader} />
                :
                <>
                    <Size
                        sizes={item.size}
                        setStickyFooter={setStickyFooter}
                        setSize={setSelectedSize}
                        size={selectedSize}
                        addToBag={addToBag}
                    />
                    <Details about={item.product.productDetails} specs={item.specification} />
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    loader: {
        padding: '3%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 100
    }
})

export default Body