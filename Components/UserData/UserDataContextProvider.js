import React, { useState, createContext } from 'react';

export const userDataContext = createContext();

export const UserDataContextProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        email: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        date: '',
        cvv: ''
    });

    return (
        <userDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </userDataContext.Provider>
    );
};
