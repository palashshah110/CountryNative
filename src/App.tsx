import 'react-native-gesture-handler';
import 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator }  from '@react-navigation/stack';
import CountryForm from './screens/CountryForm';
import CountryDetails from './screens/CountryDetails';

function App(): React.JSX.Element {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={CountryForm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CountryDetails"
          component={CountryDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
