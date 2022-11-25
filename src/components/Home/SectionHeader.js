import { Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import Skeleton from '../Reusable/Skeleton'

const SectionHeader = ({ sections }) => {

    const renderCard = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.card} key={index}>
                <Image style={styles.image} source={{ uri: item.photoURL }} />
                <Text style={styles.text}>{item.name.toUpperCase()}</Text>
            </TouchableOpacity>
        )
    }

    const renderSkeleton = () => {
        return <Skeleton height={70} width={60} borderRadius={8} />
    }

    if (sections[0].data.length === 0) {
        let data = Array(10).fill(1)
        return <FlatList
            horizontal
            style={{ backgroundColor: 'white', paddingBottom: 5, height: 85 }}
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
            style={{ backgroundColor: 'white', paddingBottom: 5, height: 85 }}
            contentContainerStyle={styles.container}
            data={data}
            renderItem={renderCard}
            keyExtractor={(item, index) => index}
            showsHorizontalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({
    image: {
        height: 60,
        width: 60,
        borderRadius: 100,
        resizeMode: 'cover',
        alignSelf: 'center',
    },
    container: {
        marginTop: 5,
        marginLeft: 15,
        backgroundColor: 'white',
    },
    text: {
        color: 'black',
        fontSize: 10,
        textAlign: 'center',
    },
    card: { marginRight: 10, height: 70 },
})

export default SectionHeader