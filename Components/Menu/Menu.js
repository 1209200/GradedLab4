import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useCart } from '../Cart/CartContext';
import { dataMenu } from './Data';
import { ThemeContext } from '../Profile/ThemeContext'; 

export default function Menu({ navigation }) {
    const [listMenu, setListMenu] = useState([]);
    const { addToCart } = useCart();
    const { theme } = useContext(ThemeContext); 

    useEffect(() => {
        setListMenu(dataMenu);
    }, []);

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <TouchableOpacity 
                style={[styles.cartButton, { backgroundColor: theme.fontColor }]}
                onPress={() => navigation.navigate('Cart')}
            >
                <Text style={[styles.cartButtonText, { color: theme.backgroundColor }]}>Cart</Text>
            </TouchableOpacity>
            <View style={styles.menuContainer}>
                {listMenu.map((item) => (
                    <View key={item.id} style={[styles.card, { backgroundColor: theme.backgroundColor }]}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={[styles.name, { color: theme.fontColor }]}>{item.name}</Text>
                        <Text style={[styles.description, { color: theme.fontColor }]}>{item.description}</Text>
                        <Text style={[styles.price, { color: theme.fontColor }]}>R{item.price.toFixed(2)}</Text>
                        <TouchableOpacity 
                            style={[styles.button, { backgroundColor: theme.fontColor }]} 
                            onPress={() => {addToCart(item); alert("added to cart")}}
                        >
                            <Text style={[styles.buttonText, { color: theme.backgroundColor }]}>Add to cart</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 15,
    },
    menuContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        borderRadius: 12,
        padding: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
    },
    image: {
        width: '100%',
        height: 140,
        borderRadius: 10,
        marginBottom: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        marginBottom: 12,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
    },
    button: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    cartButton: {
        alignSelf: 'flex-end',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        width: 70,
        height: 50,
        justifyContent: 'center',
    },
    cartButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
