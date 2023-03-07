import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import CountContainer from './CountContainer'
import Card from './Card'
import PopUp from './PopUp'
import Overlay from '../Reusable/Overlay'
import { useState } from 'react'
import Progressor from './Progressor'
import Price from './Price'
import Footer from './Footer'
import { useContext } from 'react'
import LoaderContext from '../../context/loaderContext'

const List = () => {
    const { items, } = useSelector(state => state.bag)

    const [showPopUp, setShowPopUp] = useState(false)
    const [popUpInfo, setPopUpInfo] = useState('')
    const [selectedId, setSelectedId] = useState(null)

    const {loaded} = useContext(LoaderContext)

    const showPopUpHandler = (selectedInfo, id) => {
        setShowPopUp(true)
        setPopUpInfo(selectedInfo)
        setSelectedId(id)
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={({ item }) => <Card showPopUpHandler={showPopUpHandler} item={item} />}
                contentContainerStyle={{ paddingBottom: 100 }}
                bounces={false}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        <Progressor />
                        <CountContainer />
                    </>
                }
                ListFooterComponent={
                    <>
                        <Price />
                    </>
                }
            />
            <Footer />
            <PopUp setShowPopUp={setShowPopUp} info={popUpInfo} id={selectedId} render={showPopUp} />
            <Overlay render={!loaded} onPressHandler={() => setShowPopUp(false)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flex: 1
    }
})

export default List