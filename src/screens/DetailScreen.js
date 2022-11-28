import { ActivityIndicator, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Carousel from '../components/Detail/Carousel'
import { useRoute } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import Body from '../components/Detail/Body'
import NavigationHeader from '../components/Detail/NavigationHeader'

const DetailScreen = () => {

    const clothName = useRoute().params.name
    const [isLoading, setIsLoading] = useState(true)
    const [cloth, setCloth] = useState(null)

    const getData = async () => {
        let result = await firestore().collection('clothes').where('name', '==', 'Men Bootcut Jeans').get()
        result = await result.docs
        result = result[0].data()
        setCloth(result)
        if (isLoading === true) setIsLoading(false)
    }

    useEffect(() => { getData() }, [])

    return (
        <>
            {isLoading === false ?
                <View>
                    <NavigationHeader />
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Carousel images={cloth.preview} ratedCount={cloth.ratedCount ?? null} totalRating={cloth.totalRating ?? null} />
                        <Body item={cloth} />
                    </ScrollView>
                </View>
                : <ActivityIndicator />}
        </>
    )
}

export default DetailScreen