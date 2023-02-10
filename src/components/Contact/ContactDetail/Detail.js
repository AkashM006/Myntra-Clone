import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { CATEGORYCONTENT } from '../../../DATA/More'
import { useSelector } from 'react-redux'
import CustomText from '../../Reusable/CustomText'

const Detail = ({ id, title }) => {

    const category = CATEGORYCONTENT.find(item => item.id === id)

    const { colors } = useSelector(state => state.theme)

    return (
        <>
            <View style={[{ backgroundColor: colors['LIGHT'], borderBottomColor: colors['SHADELIGHT'] }, styles.headerContainer]}>
                <CustomText color={colors['DARK']} size={16} weight='bold' >
                    {title}
                </CustomText>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[{ backgroundColor: colors['LIGHT'], }, styles.scrollContainer]}>
                {
                    category.data.map(item => (
                        <View key={item.id} style={styles.container}>
                            {item.title && <CustomText color={colors['DARK']} weight='bold' size={11}>
                                {item.title}
                            </CustomText>}
                            <CustomText color={colors['SHADEDARK']} size={14}>
                                {item.content}
                            </CustomText>
                        </View>
                    ))
                }
                <View style={[styles.footerContainer, { borderTopColor: colors['SHADELIGHT'] }]}>
                    <CustomText color={colors['SHADEDARK']}>
                        Was this helpful?
                    </CustomText>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.icon}>
                            <CustomText>
                                👍
                            </CustomText>
                        </View>
                        <View style={styles.icon}>
                            <CustomText>
                                👎
                            </CustomText>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 30, paddingHorizontal: '5%' }}>
                    <CustomText weight='light' color={colors['DARK']} size={14}>
                        Still need help?
                    </CustomText>
                    <CustomText vertical={20} color={colors['SHADEDARK']}>
                        Have queries? Please get in touch and we will be happy to help you
                    </CustomText>
                    <CustomText size={14} color={colors['PRIMARY']} weight='bold'>
                        CONTACT US
                    </CustomText>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: { marginBottom: 20, paddingHorizontal: '5%', },
    scrollContainer: {
        flex: 1,
        paddingTop: 30,
        paddingBottom: 100
    },
    headerContainer: {
        paddingHorizontal: '5%',
        paddingVertical: 15,
        borderBottomWidth: 1,
    },
    footerContainer: {
        borderTopWidth: 1,
        paddingHorizontal: '5%',
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#f5f5f5',
        marginRight: 15,
        borderRadius: 100
    }
})

export default Detail