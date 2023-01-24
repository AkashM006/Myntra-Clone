import { Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import Skeleton from '../Reusable/Skeleton'
import { useNavigation } from '@react-navigation/native'
import CustomText from '../Reusable/CustomText'
import { useSelector } from 'react-redux'

const SectionHeader = ({ sections }) => {

    const navigation = useNavigation()
    const { colors } = useSelector(state => state.theme)

    const renderCard = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.card} key={index} onPress={() => navigation.navigate('List', {
                title: item.name
            })} >
                <Image style={styles.image} source={{ uri: item.photoURL }} />
                <CustomText size={10} style={styles.text}>{item.name.toUpperCase()}</CustomText>
            </TouchableOpacity>
        )
    }

    const renderSkeleton = () => <Skeleton height={70} width={60} borderRadius={8} />

    if (sections[0].data.length === 0) {
        let data = Array(10).fill(1)
        return <FlatList
            horizontal
            style={[styles.list, { backgroundColor: colors['LIGHT'] }]}
            contentContainerStyle={styles.container}
            data={data}
            renderItem={renderSkeleton}
            keyExtractor={(item, index) => index}
            showsHorizontalScrollIndicator={false}
        />
    }
    let data = sections[0].data[0]
    return (
        <FlatList
            horizontal
            style={[styles.list, { backgroundColor: colors['LIGHT'] }]}
            contentContainerStyle={[styles.container, { backgroundColor: colors['LIGHT'] }]}
            data={data}
            renderItem={renderCard}
            keyExtractor={(item, index) => index}
            showsHorizontalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({
    image: {
        height: 65,
        width: 65,
        borderRadius: 100,
        resizeMode: 'cover',
        alignSelf: 'center',
    },
    container: {
        marginTop: 5,
        marginLeft: 15,
        // backgroundColor: 'white',
    },
    text: {
        textAlign: 'center',
        marginTop: 2
    },
    card: { marginRight: 15, height: 80 },
    list: {
        // backgroundColor: 'white',
        paddingBottom: 5,
        height: 90,
    }
})

export default SectionHeader