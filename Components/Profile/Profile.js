import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from './ThemeContext'; 
import { userDataContext } from '../UserData/UserDataContextProvider';

export default function Profile() {
    const { userData } = useContext(userDataContext);
    const { name, surname, email, city, state, zipCode, cardNumber, date, cvv } = userData;
    
    const { theme, changeTheme } = useContext(ThemeContext);
    const [selectedTheme, setSelectedTheme] = useState('light'); 

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[styles.header, { color: theme.fontColor }]}>Profile Information</Text>
            
            <View style={styles.infoContainer}>
                <Text style={[styles.label, { color: theme.fontColor }]}>Name: {name}</Text>
                <Text style={[styles.label, { color: theme.fontColor }]}>Surname: {surname}</Text>
                <Text style={[styles.label, { color: theme.fontColor }]}>Email: {email}</Text>
                <Text style={[styles.label, { color: theme.fontColor }]}>City: {city}</Text>
                <Text style={[styles.label, { color: theme.fontColor }]}>State: {state}</Text>
                <Text style={[styles.label, { color: theme.fontColor }]}>Zip Code: {zipCode}</Text>
                <Text style={[styles.label, { color: theme.fontColor }]}>Card Number: {cardNumber}</Text>
                <Text style={[styles.label, { color: theme.fontColor }]}>Expiration Date: {date}</Text>
                <Text style={[styles.label, { color: theme.fontColor }]}>CVV: {cvv}</Text>
            </View>

            <View style={styles.themeContainer}>
                <Text style={[styles.themeLabel, { color: theme.fontColor }]}>Change App Theme</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={[styles.button, selectedTheme === 'light' && styles.selectedButton, { backgroundColor: selectedTheme === 'light' ? '#007BFF' : theme.backgroundColor }]}
                        onPress={() => { setSelectedTheme('light'); changeTheme('light'); }}>
                        <Text style={[styles.buttonText, { color: selectedTheme === 'light' ? '#fff' : theme.fontColor }]}>Light Theme</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selectedTheme === 'dark' && styles.selectedButton, { backgroundColor: selectedTheme === 'dark' ? '#007BFF' : theme.backgroundColor }]}
                        onPress={() => { setSelectedTheme('dark'); changeTheme('dark'); }}>
                        <Text style={[styles.buttonText, { color: selectedTheme === 'dark' ? '#fff' : theme.fontColor }]}>Dark Theme</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 26,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    infoContainer: {
        backgroundColor: '#ffffff10', 
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: '500',
    },
    themeContainer: {
        marginTop: 20,
    },
    themeLabel: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#007BFF',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    selectedButton: {
        backgroundColor: '#007BFF',
        borderColor: '#007BFF',
    },
});
