import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CommittedActionsScreen from '../screens/CommittedActionsScreen';
import CongruenceScreen from '../screens/CongruenceScreen';
import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import ResetPassword from '../screens/ResetPasswordScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ManageAccountScreen from '../screens/ManageAccounts';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function Home() {
  
  return (
    <Tab.Navigator>
      <Tab.Screen name="Committed Actions" component={CommittedActionsScreen} />
      <Tab.Screen name="Congruence" component={CongruenceScreen} />
      <Tab.Screen name="Manage Account" component={ManageAccountScreen} />
      </Tab.Navigator>
  );
}

const MainTabNavigator = (props) => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{headerShown: false}} /> 
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}} />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerShown: false}} />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown: false}} />
          <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default MainTabNavigator;