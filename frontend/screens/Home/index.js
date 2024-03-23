import React, { useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert,Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux'; // Changed to useDispatch
import { RiderInformation, NewOrdersDisplay } from '../../redux/slice/API';
import io from "socket.io-client"
import { BASE_URL } from '@env';
import { useState } from 'react';
function Home({ navigation }) {
  const dispatch = useDispatch(); // Changed UseDispatch to useDispatch
  const [socket, setSocket] = useState(null); // State to hold the socket instance
  const [new_order,SetNewOrder]=useState(false);
  useEffect(() => {
    const getTokenAndFetchOrders = async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken');

        const newsocket = io.connect(BASE_URL, {
          query: {
            token: token
          }
        });
        
        newsocket.on('connect', () => {
          console.log('Connected to server with token:', token);
        });
        setSocket(newsocket)
        newsocket.on('connection', data => {
      
        });

       
        await dispatch(RiderInformation({ token }));
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    getTokenAndFetchOrders();
  }, [dispatch]);


  useEffect(() => {
    if(socket)
    {
        socket.on("new_order", (data) => {
      console.log(dat,'new_order')
      SetNewOrder(true)
    });
    }
  
  }, [socket]);

// const showAlert = (order) =>
// Alert.alert(
//   'Order Number 3',
//   'Name: ezaan',
//   'Address:',

//   [
//     {
//       text: 'Cancel',
//       onPress: () => Alert.alert('Cancel Pressed'),
//       style: 'cancel',
//     },
//     {
//       text: 'hiiii',
//       onPress: () => Alert.alert('Cancel Pressed'),
//       style: 'cancel',
//     },
//   ],
  
//   {
//     cancelable: true,
//     onDismiss: () =>
//       Alert.alert(
//         'This alert was dismissed by tapping outside of the alert dialog.',
//       ),
//   },
// );
  return (
    <View>
    {/* <Button title="Show alert" onPress={() => showAlert(3)} /> */}
    </View>
  );
}

export default Home;
