import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomText from '../Reusable/CustomText'
import { useNavigation, useRoute } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import Skeleton from '../Reusable/Skeleton'

const ListHeader = () => {

    // todo: Need to get count of items from db
    // use skeleton instead of that

    const navigation = useNavigation()
    let title = useRoute().params.title?.toUpperCase()
    title = title.length > 20 ? title.substring(0, 18) + '...' : title

    const [count, setCount] = useState(null)

    const getData = async () => {
        const result = await firestore().collection('clothes').count().get()
        // setCount(result._data.count) use this when there are more item
        setCount(result._data.count * 10)
    }

    useEffect(() => {
        getData()
    }, [])

    const pressHandler = () => navigation.goBack()

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <TouchableOpacity style={styles.backContainer} onPress={pressHandler}>
                    <Image source={require('../../icons/back.png')} style={styles.back} />
                </TouchableOpacity>
                <View style={styles.left}>
                    <CustomText weight={'light'}>
                        {title}
                    </CustomText>
                    {count === null ? <Skeleton height={15} width={70} borderRadius={4} /> : <CustomText>
                        {count} Items
                    </CustomText>}
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Image source={require('../../icons/search.png')} style={styles.icon} />
                <Image source={require('../../icons/heart.png')} style={styles.icon} />
                <Image source={require('../../icons/bag.png')} style={[styles.icon, { marginRight: 10 }]} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 60,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '3.5%',
        justifyContent: 'space-between',
    },
    back: { height: 20, width: 20, },
    backContainer: { marginRight: 15 },
    left: { flexDirection: 'column' },
    icon: {
        height: 25,
        width: 25,
        marginRight: 20,
    },
    rightContainer: { flexDirection: 'row', },
    leftContainer: { flexDirection: 'row', alignItems: 'center', }
})

export default ListHeader