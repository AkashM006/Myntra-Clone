import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BagEmpty from './BagEmpty'
import BagList from './BagList'
import Overlay from '../Reusable/Overlay'

const BagBody = () => {

    const count = useSelector(state => state.bag.count)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setTimeout(() => setLoaded(true), 1000)
    }, [])

    return (
        <View style={styles.container}>
            {
                loaded === true ? count === 0 ? <BagEmpty /> : <BagList /> : <Overlay render={true} hideShadow />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 20,
        paddingVertical: '3.5%'
    }
})

export default BagBody