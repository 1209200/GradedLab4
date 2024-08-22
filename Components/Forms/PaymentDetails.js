import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { userDataContext } from '../UserData/UserDataContextProvider';

export default function PaymentDetails({ navigation }) {
    const { userData, setUserData } = useContext(userDataContext);
    const { cardNumber, date, cvv } = userData;

    const [errors, setErrors] = useState({});

    const validate = () => {
        let valid = true;
        let errors = {};

        if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
            errors.cardNumber = 'Valid card number is required';
            valid = false;
        }
        if (!date || !/^\d{2}\/\d{2}$/.test(date)) {
            errors.date = 'Valid expiration date (MM/YY) is required';
            valid = false;
        }
        if (!cvv || !/^\d{3}$/.test(cvv)) {
            errors.cvv = 'Valid CVV is required';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = () => {
        if (validate()) {
            navigation.navigate('MainTabNavigator');
        } else {
            Alert.alert("Validation Error", "Please fill all the fields correctly.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Payment Details</Text>
            
            <Text style={styles.label}>Card Number</Text>
            <TextInput
                style={[styles.input, errors.cardNumber && styles.errorInput]}
                placeholder='Enter the card number...'
                value={cardNumber}
                onChangeText={(value) => setUserData({ ...userData, cardNumber: value })}
                keyboardType="numeric"
            />
            {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber}</Text>}
            
            <Text style={styles.label}>Expiration Date (MM/YY)</Text>
            <TextInput
                style={[styles.input, errors.date && styles.errorInput]}
                placeholder='MM/YY'
                value={date}
                onChangeText={(value) => setUserData({ ...userData, date: value })}
                keyboardType="text"
            />
            {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
            
            <Text style={styles.label}>CVV</Text>
            <TextInput
                style={[styles.input, errors.cvv && styles.errorInput]}
                placeholder='Enter the CVV...'
                value={cvv}
                onChangeText={(value) => setUserData({ ...userData, cvv: value })}
                keyboardType="numeric"
                secureTextEntry
            />
            {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}
            
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Go to Menu</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333',
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
        color: '#555',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    errorInput: {
        borderColor: '#e74c3c',
    },
    errorText: {
        color: '#e74c3c',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
