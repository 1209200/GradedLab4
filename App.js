import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {MaterialIcons, AntDesign} from '@expo/vector-icons';
import React from 'react';
import Menu from "./Components/Menu/Menu";
import Profile from "./Components/Profile/Profile";
import Cart from "./Components/Cart/Cart";
import FormsStack from "./Components/Forms/FormsStack";
import { UserDataContextProvider } from "./Components/UserData/UserDataContextProvider";
import { CartProvider } from "./Components/Cart/CartContext";
import { ThemeProvider } from "./Components/Profile/ThemeContext";



function MainTabNavigator() {
    const Tabs = createBottomTabNavigator();
    
    return (
        <Tabs.Navigator initialRouteName="Menu">
            <Tabs.Screen name="Menu" component={Menu} 
            options={{
                tabBarIcon:({color})=>(
                    <MaterialIcons name="restaurant-menu" size={24} color="black" />
                )
            }}
                
            
            />
            <Tabs.Screen name="Cart" component={Cart} 
            options={{
                tabBarIcon:({color})=>(
                    <AntDesign name="shoppingcart" size={24} color="black" />
                )
            }}
            />
            <Tabs.Screen name="Profile" component={Profile} 
            options={{
                tabBarIcon:({color})=>(
                    <AntDesign name="user" size={24} color="black" />
                )
            }}
            />
        </Tabs.Navigator>
    );
}


function MainStackNavigator() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="FormsStack">
            <Stack.Screen 
                name="FormsStack" 
                component={FormsStack} 
                options={{ headerShown: false }}  
            />
            <Stack.Screen 
                name="MainTabNavigator" 
                component={MainTabNavigator} 
                options={{ headerShown: false }}  
            />
        </Stack.Navigator>
    );
}


export default function App() {
    return (
        <ThemeProvider>
            <UserDataContextProvider>
        <CartProvider>
            
        <NavigationContainer>
            <MainStackNavigator />
        </NavigationContainer>
        </CartProvider>
        
      </UserDataContextProvider>
        </ThemeProvider>
        
       
  
      
    );
}
