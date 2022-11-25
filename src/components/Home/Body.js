import { View, Text, SectionList } from 'react-native'
import React, { useEffect, useState } from 'react'
import commonStyles from '../../styles/Common'
import firestore from '@react-native-firebase/firestore'
import SectionHeader from './SectionHeader'

const Body = () => {

    const [sections, setSections] = useState([{ data: [], title: 'Section Title' }])

    const getData = async () => {
        try {
            const result = await (await firestore().collection('categories').get()).docs
            let headerSection = result.map(categ => { return categ._data })
            setSections(prev => [{ data: [...prev[0].data, headerSection], title: 'Section Title' }])
        } catch (err) {
            console.log("Error: ", err)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const renderItem = ({ item, index }) => {
        if (item === null || item == undefined) return
        if (index === 0) return
        return <Text>HEllo</Text>
    }

    const renderSectionHeader = () => {
        return <SectionHeader sections={sections} />
    }

    return (
        <View style={[commonStyles.fullScreen]}>
            <SectionList
                sections={sections}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                renderSectionHeader={renderSectionHeader}
                stickyHeaderHiddenOnScroll={true}
                stickySectionHeadersEnabled={true}
            />
        </View>
    )
}

export default Body