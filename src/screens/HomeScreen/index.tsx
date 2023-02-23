// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, View, StyleSheet, PermissionsAndroid } from 'react-native';
import React from 'react';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useState } from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = (props) => {
    const [permissionGranted, setPermissionGranted] = useState(false);
    useEffect(() => {
      onRequestPermissions();
    }, []);

    useEffect(() => {
      if(permissionGranted){
        setTimeout(() => {
          props.navigation.replace('Video');
        }, 500);
      }
    }, [permissionGranted]);

    const onRequestPermissions = async () => {
      if(Platform.OS === "ios"){
        request(PERMISSIONS.IOS.MICROPHONE).then((result) => {
          if(result){
            setPermissionGranted(result === RESULTS.GRANTED);
          }
          else {
            setPermissionGranted(false);
          }
        });
      }
      else if(Platform.OS === "android"){
        try {
          const grants = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);
      
          console.log('write external stroage', grants);
      
          if (
            grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.READ_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.RECORD_AUDIO'] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('Permissions granted');
            setPermissionGranted(true);
          } else {
            console.log('All required permissions not granted');
            setPermissionGranted(false);
            return;
          }
        } catch (err) {
          console.warn(err);
          setPermissionGranted(false);
          return;
        }
      }
    }


    const onPressLearnMore = () => {
        //For generating alert on buttton click
        // alert('Hello');
        props.navigation.navigate('Video');
      };
      return (
        <View style={styles.container}>
        </View>
      );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });