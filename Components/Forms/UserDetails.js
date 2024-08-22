
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { userDataContext } from '../UserData/UserDataContextProvider';

export default function UserDetails({ navigation }) {
    const { userData, setUserData } = useContext(userDataContext);
    const { name, surname, email } = userData;

    const [errors, setErrors] = useState({});

    const validate = () => {
        let valid = true;
        let errors = {};

        if (!name) {
            errors.name = 'Name is required';
            valid = false;
        }
        if (!surname) {
            errors.surname = 'Surname is required';
            valid = false;
        }
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            errors.email = 'Valid email is required';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = () => {
        if (validate()) {
            navigation.navigate('AddressDetails');
        } else {
            Alert.alert("Validation Error", "Please fill all the fields correctly.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>User Details</Text>
            
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={[styles.input, errors.name && { borderColor: 'red' }]}
                placeholder='Enter your name...'
                value={name}
                onChangeText={(value) => setUserData({ ...userData, name: value })}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            
            <Text style={styles.label}>Surname</Text>
            <TextInput
                style={[styles.input, errors.surname && { borderColor: 'red' }]}
                placeholder='Enter your surname...'
                value={surname}
                onChangeText={(value) => setUserData({ ...userData, surname: value })}
            />
            {errors.surname && <Text style={styles.errorText}>{errors.surname}</Text>}
            
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={[styles.input, errors.email && { borderColor: 'red' }]}
                placeholder='Enter your Email address...'
                value={email}
                onChangeText={(value) => setUserData({ ...userData, email: value })}
                keyboardType='email-address'
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            
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

