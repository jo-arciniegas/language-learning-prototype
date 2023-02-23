// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, View, StyleSheet, PermissionsAndroid } from 'react-native';
import React from 'react';
import {request, PERMISSIONS} from 'react-native-permissions';
import { useEffect } from 'react';
import { Platform } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = (props) => {
    useEffect(() => {
      onRequestPermissions();
    }, []);

    const onRequestPermissions = async () => {
      if(Platform.OS === "ios"){
        request(PERMISSIONS.IOS.MICROPHONE).then((result) => {
          console.log('permission result: ' + result);
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
          } else {
            console.log('All required permissions not granted');
            return;
          }
        } catch (err) {
          console.warn(err);
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
          <Button onPress={onPressLearnMore} title="View video" color="#841584" />
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