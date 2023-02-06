import { StyleSheet, View } from 'react-native'
import React from 'react'
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated'
import SizeList from '../Bag/SizeList'
import CustomButton from '../Reusable/CustomButton'
import CustomText from '../Reusable/CustomText'
import { useSelector } from 'react-redux'

const PopUp = ({ selected, currentSize, setCurrentSize, handlePress }) => {

    const { colors } = useSelector(state => state.theme)

    return (
        <>
            {selected && <Animated.View entering={SlideInDown} exiting={SlideOutDown} style={[styles.popup, { backgroundColor: colors['LIGHT'], }]}>
                <View style={styles.header}>
                    <CustomText weight='bolder' size={16} color={colors['DARK']} >
                        Select size
                    </CustomText>
                    <CustomText weight='light' size={14} color={colors['PRIMARY']}>
                        Size chart
                    </CustomText>
                </View>
                <SizeList item={selected} size={currentSize} setSize={setCurrentSize} />
                <CustomButton
                    text='DONE'
                    onPressHandler={handlePress}
                    disabled={currentSize === null}
                />
            </Animated.View>}
        </>
    )
}

const styles = StyleSheet.create({
    popup: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        paddingHorizontal: '3.5%',
        paddingBottom: 70,
        paddingTop: 20,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})

export default PopUp