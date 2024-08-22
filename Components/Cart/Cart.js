import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useCart } from './CartContext';
import { ThemeContext } from '../Profile/ThemeContext'; 

export default function Cart() {
    const { cart, clearCart } = useCart();
    const [quantities, setQuantities] = useState([]);
    const { theme } = useContext(ThemeContext); 

    useEffect(() => {
        setQuantities(cart.map(() => 1));
    }, [cart]);

    const updateQuantity = (index, increment) => {
        setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            const newQuantity = newQuantities[index] + increment;
            newQuantities[index] = newQuantity > 0 ? newQuantity : 1;
            return newQuantities;
        });
    };

    const calculateTotal = () => {
        return cart.reduce((sum, item, index) => {
            return sum + item.price * quantities[index];
        }, 0);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[styles.header, { color: theme.fontColor }]}>Your Cart</Text>
            <FlatList
                data={cart}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={[styles.cartItem, { backgroundColor: theme.backgroundColor }]}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View style={styles.detailsContainer}>
                            <Text style={[styles.name, { color: theme.fontColor }]}>{item.name}</Text>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity 
                                    style={[styles.quantityButton, { backgroundColor: theme.fontColor }]}
                                    onPress={() => updateQuantity(index, -1)}
                                >
                                    <Text style={[styles.quantityButtonText, { color: theme.backgroundColor }]}>-</Text>
                                </TouchableOpacity>
                                <Text style={[styles.quantityText, { color: theme.fontColor }]}>{quantities[index]}</Text>
                                <TouchableOpacity 
                                    style={[styles.quantityButton, { backgroundColor: theme.fontColor }]}
                                    onPress={() => updateQuantity(index, 1)}
                                >
                                    <Text style={[styles.quantityButtonText, { color: theme.backgroundColor }]}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={[styles.price, { color: theme.fontColor }]}>R{(item.price * quantities[index]).toFixed(2)}</Text>
                    </View>
                )}
            />
            <View style={[styles.totalContainer, { backgroundColor: theme.backgroundColor }]}>
                <Text style={[styles.totalText, { color: theme.fontColor }]}>Total: R{calculateTotal().toFixed(2)}</Text>
            </View>
            <TouchableOpacity 
                style={[styles.cartButton, { backgroundColor: theme.fontColor }]}
                onPress={clearCart}
            >
                <Text style={[styles.cartButtonText, { color: theme.backgroundColor }]}>Proceed to Checkout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 15,
    },
    detailsContainer: {
        flex: 2,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        padding: 8,
        borderRadius: 4,
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: '600',
    },
    quantityText: {
        fontSize: 18,
        fontWeight: '600',
        marginHorizontal: 12,
    },
    price: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'right',
    },
    totalContainer: {
        marginTop: 20,
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    totalText: {
        fontSize: 24,
        fontWeight: '700',
    },
    cartButton: {
        marginTop: 30,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    cartButtonText: {
        fontSize: 18,
        fontWeight: '700',
    },
});
