import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import BottomTabsNavigation from "./BottomTabsNavigation";
import { routeOptions } from "../consts";

const Stack = createNativeStackNavigator();
export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

      })}
      initialRouteName='Home'>
      {
        routeOptions.STACK_ROUTERS?.map((item) => {
          return <Stack.Screen key={item.id} name={item?.name} component={item.component} />
        })
      }
    </Stack.Navigator>
  );
}
