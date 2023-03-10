/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';


// routing
import { HomeScreen } from '../screens/HomeScreen';
import { VideoScreen } from '../screens/VideoScreen';

// type
import { RootStackParamList } from './types';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {

  return (
    <NavigationContainer
    >
      <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{
            headerShown: false,
          }} component={HomeScreen} />
          <Stack.Screen name="Video" options={{
            headerShown: false,
          }} component={VideoScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

// /**
//  * Learn more about deep linking with React Navigation
//  * https://reactnavigation.org/docs/deep-linking
//  * https://reactnavigation.org/docs/configuring-links
//  */
// import { LinkingOptions } from '@react-navigation/native';
// import { Linking } from 'react-native';

// const linking: LinkingOptions<RootStackParamList> = {
//   prefixes: [Linking.('/')],
//   config: {
//     screens: {
//       Home: 'home',
//       Video: 'video',
//     },
//   },
// };