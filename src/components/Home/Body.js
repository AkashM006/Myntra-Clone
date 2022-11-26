import { View, Text, SectionList, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import commonStyles from '../../styles/Common'
import firestore from '@react-native-firebase/firestore'
import SectionHeader from './SectionHeader'
import Photo from './Photo'
import Slider from './Slider'
import Footer from './Footer'
import Quote from './Quote'

const Body = () => {

    const [sections, setSections] = useState([{ data: [], title: 'Section Title' }])
    const [isLoading, setIsLoading] = useState(true)

    const getData = async () => {
        try {
            let result = await (await firestore().collection('categories').orderBy('position').get()).docs
            let headerSection = result.map(categ => { return categ._data })

            result = await (await firestore().collection('gallery').orderBy('position').get()).docs

            let contents = result.map(el => el._data)

            setSections(prev => [{ data: [...prev[0].data, headerSection, ...contents], title: 'Section Title' }])
            setIsLoading(false)
        } catch (err) {
            console.log("Error: ", err)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const renderItem = ({ item, index }) => {

        if (item === null || item == undefined) return

        else if (index === 0) return

        else if (item.type === 'photo') return <Photo link={item.url} height={item.height} index={index} />

        else if (item.type === 'slider') return <Slider card={item} />

    }

    const renderSectionHeader = () => <SectionHeader sections={sections} />


    return (
        <View style={[commonStyles.fullScreen, styles.container]}>
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
            {/* <Quote /> */}
            <Footer />
            {isLoading === true && <View style={styles.loader}><ActivityIndicator size={'small'} color={'#FF69B4'} /></View>}
        </View>
    )
}

const styles = StyleSheet.create({
    loader: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 100,
        top: 120,
        alignSelf: 'center'
    },
})

export default Body