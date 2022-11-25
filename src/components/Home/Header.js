import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <TouchableOpacity style={styles.menuContainer}>
                    <Image source={require('../../icons/menu.png')} style={styles.menu} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.premium}>
                    <Image source={require('../../icons/myntra.webp')} style={styles.logo} />
                    <View style={{ justifyContent: 'flex-start' }}>
                        <Text style={styles.premiumText}>Become</Text>
                        <Text style={[styles.premiumText, styles.golden]}>Insider</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.rightContainer}>
                <TouchableOpacity>
                    <Image source={require('../../icons/search.png')} style={[styles.icon, { marginRight: 17.5 }]} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../icons/bell.png')} style={[styles.icon, { marginRight: 17.5 }]} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../icons/heart.png')} style={[styles.icon, { marginRight: 17.5 }]} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../icons/bag.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '3.5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        backgroundColor: 'white',
        elevation: 3
    },
    menu: {
        height: 15,
        width: 15,
    },
    logo: {
        height: 30,
        width: 30,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    premium: {
        flexDirection: 'row'
    },
    premiumText: {
        fontSize: 8,
        color: 'black'
    },
    golden: {
        fontSize: 12,
        color: '#FFD700'
    },
    icon: {
        height: 25,
        width: 25,
        marginRight: 10
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuContainer: { marginRight: 15, },
})

export default Header