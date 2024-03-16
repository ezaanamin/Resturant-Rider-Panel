import React, { useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux'; // Changed to useDispatch
import { RiderInformation,NewOrdersDisplay } from '../../redux/slice/API';

function Home({ navigation }) {
  const dispatch = useDispatch(); // Changed UseDispatch to useDispatch

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken');
        const promise = await dispatch(RiderInformation({ token }));
        // if(promise)
        // {
        //   console.log(promise.payload)
        // }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    getToken();
  }, []);


  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken');
        const promise = await dispatch(NewOrdersDisplay({ token }));
        if (promise) {
          console.log(promise.payload);
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    getToken();
    const intervalId = setInterval(getToken, 5000);


    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <View>
      {/* Your JSX content */}
    </View>
  );
}

export default Home;
