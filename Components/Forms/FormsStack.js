import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserDetails from './UserDetails';
import AddressDetails from './AddressDetails';
import PaymentDetails from './PaymentDetails';

export default function FormsStack() {
    const StackForm = createStackNavigator();
    return (
        <StackForm.Navigator initialRouteName='UserDetails'>
            <StackForm.Screen name="UserDetails" component={UserDetails} />
            <StackForm.Screen name="AddressDetails" component={AddressDetails} />
            <StackForm.Screen name="PaymentDetails" component={PaymentDetails} />
        </StackForm.Navigator>
    );
}
