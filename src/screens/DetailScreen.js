import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Carousel from '../components/Detail/Carousel'
import { useNavigation, useRoute } from '@react-navigation/native'
import Body from '../components/Detail/Body'
import NavigationHeader from '../components/Detail/NavigationHeader'
import StickyFooter from '../components/Detail/StickyFooter'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import Overlay from '../components/Reusable/Overlay'
import axios from 'axios'
import Config from 'react-native-config'
import { showToast } from '../utils/utils'
import { useSelector } from 'react-redux'

const DetailScreen = () => {

    const id = useRoute().params.id
    const [isLoading, setIsLoading] = useState(true)
    const [cloth, setCloth] = useState(null)
    const navigation = useNavigation()
    const token = useSelector(state => state.user)
    const wishlisted = cloth?.isWishlisted

    const getData = async () => {
        // let result = await firestore().collection('clothes').where('name', '==', 'Men Bootcut Jeans').get()
        // result = await result.docs
        // result = result[0].data()
        // setCloth(result)
        axios.get(`${Config.API_KEY}/product/${id}`)
            .then(res => {
                let data = res.data
                if (data.status === false) {
                    showToast(data.message)
                    navigation.goBack()
                    return
                }
                data = data.data
                setCloth(data)
                if (isLoading === true) setIsLoading(false)
            })
            .catch(err => {
                showToast('Something went wrong! Please try again later')
                console.log("Error: ", err)
                if (isLoading === true) setIsLoading(false)
                navigation.goBack()
            })
    }

    useEffect(() => { getData() }, [])

    const [stickyFooter, setStickyFooter] = useState(null)
    const [sizeContainer, setSizeContainer] = useState(null)
    const scrollY = useSharedValue(0)
    const [selectedSize, setSelectedSize] = useState('')

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (e, ctx) => {
            scrollY.value = e.contentOffset.y
        }
    })

    const onAddToBagHandler = _ => {
        if (selectedSize === '') {
            showToast('Please select a size')
            return
        } else {
            // send api request
            if (!token) {
                showToast('Please login in order to add clothes to your bag')
                return
            }

            axios.post(`${Config.API_KEY}/bag/add`, {
                jwt: token,
                productId: cloth.product.id,
                size: selectedSize
            })
                .then(res => {
                    const data = res.data
                    // console.log("data: ", data)
                    showToast('Product added to bag successfully!')
                })
                .catch(err => {
                    console.log("Error: ", err)
                    showToast('Something went wrong. Please try again later!')
                })
        }
    }

    const addToWishlistHandler = () => {

        if (wishlisted) {
            navigation.navigate('Wishlist')
        }

        axios.post(`${Config.API_KEY}/wishlist/add`, {
            productId: id,
            jwt: token.token // remove this later
        })
            .then(res => {
                const data = res.data
                if (data.status)
                    setCloth({ ...cloth, isWishlisted: true })
                else
                    showToast(data.message)

            })
            .catch(err => {
                console.log("Error: ", err)
                showToast('Something went wrong. Please try again later!')
            })
    }

    return (
        <>
            {isLoading === false ?
                <>
                    <NavigationHeader id={cloth.product.id} name={cloth.product.brand} scroll={scrollY} />
                    <Animated.ScrollView
                        alwaysBounceHorizontal={false}
                        bounces={false}
                        contentContainerStyle={{ paddingBottom: 150 }}
                        onScroll={scrollHandler}
                        showsVerticalScrollIndicator={false}
                    >
                        <Carousel images={cloth.images} ratedCount={cloth.ratedCount ?? null} rating={cloth.product.star ?? null} />
                        <Body
                            addToBag={onAddToBagHandler}
                            selectedSize={selectedSize}
                            setSelectedSize={setSelectedSize}
                            setStickyFooter={setStickyFooter}
                            item={cloth}
                            setSizeContainer={setSizeContainer}
                        />
                    </Animated.ScrollView>
                    <StickyFooter
                        wishlisted={wishlisted}
                        addToWishlist={addToWishlistHandler}
                        addToBag={onAddToBagHandler}
                        scroll={scrollY}
                        footer={stickyFooter}
                        sizeContainer={sizeContainer}
                    />
                </>
                : <Overlay hideShadow render={true} />}
        </>
    )
}

export default DetailScreen