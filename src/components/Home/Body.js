import { View, SectionList, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import SectionHeader from './SectionHeader'
import Photo from './Photo'
import Slider from './Slider'
import Footer from '../Reusable/Footer'
import Quote from './Quote'
import Grid from './Grid'
import Carousel from './Carousel'
import COLORS from '../../constants/Colors'
import { useSelector } from 'react-redux'
import axios from 'axios'
import showToast from '../../utils/utils'
import Config from 'react-native-config'
import HighlightCarousel from './HighlightCarousel'

const Body = () => {

    const [sections, setSections] = useState([{ data: [], title: 'Section Title' }])
    const [isLoading, setIsLoading] = useState(true)
    const { colors } = useSelector(state => state.theme)

    const getData = async () => {
        try {
            // let result = await (await firestore().collection('categories').orderBy('position').get()).docs
            // let headerSection = result.map(categ => { return categ._data })
            let temp = {}
            let data = []
            temp = await axios.get(`${Config.PRODUCTS_API_KEY}/data/getcategoriesm`)
            if (temp) data = temp.data
            let headerSection = []
            if (data.data) {
                console.log("Here")
                headerSection = data.data.map(item => ({ id: item.categoryId, name: item.categoryName, photoURL: item.image }))
            }
            let result = (await firestore().collection('gallery').orderBy('position').get()).docs
            let contents
            if (result) contents = result.map(el => el._data)

            setSections(prev => [{ data: [...prev[0].data, headerSection, ...contents], title: 'Section Title' }])
            setIsLoading(false)
        } catch (err) {
            console.log("Error: ", err)
            showToast('Something went wrong while fetching product categories. Please try again later!')
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const renderItem = ({ item, index }) => {

        if (item === null || item == undefined) return

        else if (index === 0) return

        else if (item.type === 'photo') return <Photo link={item.url} title={item.title} height={item.height} index={index} />

        else if (item.type === 'slider') return <Slider card={item} />

        // else if (item.type === 'grid') return <Grid item={item} />
        else if (item.type === 'grid') return <HighlightCarousel item={item} />

        else if (item.type === 'carousel') return <Carousel item={item} />

    }

    const renderSectionHeader = () => <SectionHeader sections={sections} />


    return (
        <View style={{ flex: 1 }}>
            <SectionList
                sections={sections}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                renderSectionHeader={renderSectionHeader}
                stickyHeaderHiddenOnScroll={true}
                stickySectionHeadersEnabled={true}
                bounces={false}
                showsVerticalScrollIndicator={false}
                style={styles.list}
                ListFooterComponent={() => <Quote loading={isLoading} />}
            />
            <Footer />
            {isLoading === true && <View style={[styles.loader, {
                backgroundColor: colors.LIGHT
            }]}><ActivityIndicator size={'small'} color={COLORS.PRIMARY} /></View>}
        </View>
    )
}

const styles = StyleSheet.create({
    loader: {
        position: 'absolute',
        padding: 10,
        borderRadius: 100,
        top: 120,
        alignSelf: 'center'
    },
})

export default Body