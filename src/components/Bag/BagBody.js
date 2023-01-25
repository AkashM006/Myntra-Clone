import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BagEmpty from './BagEmpty'
import BagList from './BagList'
import Overlay from '../Reusable/Overlay'

const BagBody = () => {

    const count = useSelector(state => state.bag.count)
    const [loaded, setLoaded] = useState(false)
    const { colors } = useSelector(state => state.theme)

    useEffect(() => {
        // in this useEffect
        // load items from server
        // then setLoaded true
        setTimeout(() => setLoaded(true), 1000)
    }, [])



    return (
        <View style={[styles.container, { backgroundColor: colors['LIGHT'] }]}>
            {
                loaded === true ? count === 0 ? <BagEmpty /> : <BagList /> : <Overlay render={true} hideShadow />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingVertical: '3.5%'
    }
})

export default BagBody