import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import React from 'react'
import { Home } from '../screens';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, icons, routeNames, routeOptions } from '../consts';
import Svg, { Path } from 'react-native-svg';
const Tab = createBottomTabNavigator();

export function TabBarCustomButton(props) {
    const { accessibilityState, children, onPress } = props;
    const isSelected = accessibilityState.selected;
    if (isSelected) {
        return <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                <Svg
                    width={70}
                    height={61}
                    viewBox="0 0 75 61"
                >
                    <Path
                        d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                        fill={COLORS.white}
                    />
                </Svg>
                <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
            </View>

            <TouchableOpacity
                style={{
                    top: -22.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: COLORS.white,
                }}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        </View>
    }

    return <TouchableOpacity
        style={{
            flex: 1,
            height: 60,
            backgroundColor: COLORS.white
        }}
        activeOpacity={1}
        onPress={onPress}
    >{children}</TouchableOpacity>
}

const CustomTabBar = (props) => {
    return <View >

        <View style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            height: 30,

            backgroundColor: COLORS.white
        }}></View>
        <BottomTabBar {...props} />
    </View>
}

export default function BottomTabsNavigation() {
    return (
        <Tab.Navigator

            // tabBar={(props) => <BottomTabBar {...props}/>} //Default
            tabBar={(props) => <CustomTabBar {...props} />} //Default

            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarIcon: ({ focused, color, size }) => {
                    const { params, name } = route;
                    return <Image style={[styles.icon, {
                        tintColor: color,

                    }]} source={params?.icon} />
                },
                tabBarStyle: {
                    backgroundColor: "transparent",
                    borderTopWidth: 0,
                    elevation: 0,

                },
                title: ({ focused, color, size }) => {
                    return null
                },

                //Override title and tabBarIcon 
                tabBarButton: (props) => {
                    return <TabBarCustomButton {...props} />
                }
                //   tabBarStyle: { position: 'absolute' ,top:"50%"},

            })}

            initialRouteName={routeNames.HOME}>

            {
                routeOptions?.BOTTOM_ROUTERS?.map((item) => {
                    return <Tab.Screen key={item.id} name={item.name} component={item.component} initialParams={{
                        icon: item.icon
                    }} />
                })
            }

        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({

    icon: {
        width: 25,
        height: 25,
        resizeMode: "contain"
    },
    camera: {
        backgroundColor: COLORS.green,
        // padding: 15,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100
    }
}
)

//Priority
// 1: Props: TabBar
// 2: screenOption:{
//     tabBarButton
// } 
// 3: title and tabBarIcon