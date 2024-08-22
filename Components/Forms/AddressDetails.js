
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { userDataContext } from '../UserData/UserDataContextProvider';

export default function AddressDetails({ navigation }) {
    const { userData, setUserData } = useContext(userDataContext);
    const { city, state, zipCode } = userData;

    const [errors, setErrors] = useState({});

    const validate = () => {
        let valid = true;
        let errors = {};

        if (!city) {
            errors.city = 'City is required';
            valid = false;
        }
        if (!state) {
            errors.state = 'State is required';
            valid = false;
        }
        if (!zipCode || !/^\d{5}$/.test(zipCode)) {
            errors.zipCode = 'Valid Zip Code is required';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = () => {
        if (validate()) {
            navigation.navigate('PaymentDetails');
        } else {
            Alert.alert("Validation Error", "Please fill all the fields correctly.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Address Details</Text>
            
            <Text style={styles.label}>City</Text>
            <TextInput
                style={[styles.input, errors.city && { borderColor: 'red' }]}
                placeholder='Enter the city...'
                value={city}
                onChangeText={(value) => setUserData({ ...userData, city: value })}
            />
            {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
            
            <Text style={styles.label}>State</Text>
            <TextInput
                style={[styles.input, errors.state && { borderColor: 'red' }]}
                placeholder='Enter the state...'
                value={state}
                onChangeText={(value) => setUserData({ ...userData, state: value })}
            />
            {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
            
            <Text style={styles.label}>Zip Code</Text>
            <TextInput
                style={[styles.input, errors.zipCode && { borderColor: 'red' }]}
                placeholder='Enter the Zip Code...'
                value={zipCode}
                onChangeText={(value) => setUserData({ ...userData, zipCode: value })}
                keyboardType="numeric"
            />
            {errors.zipCode && <Text style={styles.errorText}>{errors.zipCode}</Text>}
            
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Next</Text>
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
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

