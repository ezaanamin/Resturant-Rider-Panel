import React, { useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux'; // Changed to useDispatch
import { RiderInformation, NewOrdersDisplay } from '../../redux/slice/API';
import io from "socket.io-client"
import { BASE_URL } from '@env';

function Home({ navigation }) {
  const dispatch = useDispatch(); // Changed UseDispatch to useDispatch

  useEffect(() => {
    const getTokenAndFetchOrders = async () => {
      try {
        // Retrieve the token from SecureStore
        const token = await SecureStore.getItemAsync('authToken');

        const socket = io.connect(BASE_URL, {
          query: {
            token: token
          }
        });
        
        socket.on('connect', () => {
          console.log('Connected to server with token:', token);
        });
        
        socket.on('connection', data => {
          // Handle connection event if needed
        });

        // Dispatch the action to fetch new orders
        await dispatch(RiderInformation({ token }));
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    getTokenAndFetchOrders();
  }, [dispatch]);

  return (
    <View>
      {/* Your JSX content */}
    </View>
  );
}

export default Home;
