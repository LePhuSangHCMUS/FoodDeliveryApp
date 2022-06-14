import { View, Text, SafeAreaView, Image, Animated, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, icons, FONTS, SIZES, routeNames } from '../../consts';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Restaurant() {
    const scrollX = new Animated.Value(0)
    const { params } = useRoute()
    const navigation = useNavigation();
    const { navigate, goBack } = navigation;
    const [currentLocation, setCurrentLocation] = useState(params.currentLocation)
    const [item, setItem] = useState(params.item)
    const renderHeader = () => {
        return <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }}>

            <TouchableOpacity onPress={() => {
                goBack()
            }}>
                < Image style={{
                    resizeMode: "contain",
                    width: 25,
                    height: 25
                }} source={icons.back} />

            </TouchableOpacity>

            <View
                style={{
                    height: 50,
                    width: "60%",
                    borderRadius: SIZES.radiusMedium,
                    backgroundColor: COLORS.lightGray3,
                    justifyContent: 'center',
                    alignItems: "center"
                }}
            ><Text style={{
                ...FONTS.h3
            }}>{currentLocation?.streetName}</Text></View>
            < Image style={{
                width: 25,
                height: 25,
                resizeMode: "contain",

            }} source={icons.list} />
        </View>
    }
    const renderFoodInfo = () => {
        return <View style={{
            marginTop: SIZES.padding * 1.5
        }}>


            <ScrollView
                decelerationRate={0}
                scrollEventThrottle={16}
                snapToAlignment={"center"}
                // scrollEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled
                onScroll={
                    Animated.event([
                        {
                            nativeEvent: { contentOffset: { x: scrollX } }
                        }
                    ], { useNativeDriver: false })
                }
            >


                {
                    item?.menu?.map(item => {
                        return <View style={{
                            width: SIZES.width - SIZES.padding * 2,
                            alignItems: "center",
                        }} key={item.menuId}>

                            {/* Image  */}
                            <View
                                style={{
                                    alignItems: 'center',
                                    marginBottom: SIZES.padding
                                }}
                            >
                                <Image style={{
                                    width: 280,
                                    height: 280,
                                    resizeMode: "cover",
                                    borderRadius: 200
                                }} source={item.photo} />
                                {/* Control  */}

                                <View style={{
                                    flexDirection: "row",
                                    alignItems: 'center',
                                    height: 50,
                                    backgroundColor: COLORS.transparent,
                                    borderRadius: SIZES.radiusLarge,
                                    ...styles.shadow,
                                    margin: SIZES.padding / 2,
                                    position: "absolute",
                                    bottom: -20
                                }}>
                                    <TouchableOpacity activeOpacity={0} style={{
                                        borderTopLeftRadius: SIZES.radiusLarge,
                                        borderBottomLeftRadius: SIZES.radiusLarge,
                                        backgroundColor: COLORS.white,
                                        width: 60,
                                        alignItems: "center",
                                        height: "100%",
                                        justifyContent: "center"

                                    }}>
                                        <Text style={{
                                            ...FONTS.body1,

                                        }}>-</Text>
                                    </TouchableOpacity>
                                    <View
                                        style={{
                                            justifyContent: "center",
                                            height: "100%",
                                            backgroundColor: COLORS.white,
                                            paddingHorizontal:SIZES.padding/2

                                    }}
                                    >
                                        <Text style={{
                                            ...FONTS.body1,


                                        }}>0</Text>
                                    </View>

                                    <TouchableOpacity style={{
                                        width: 60,
                                        alignItems: "center",
                                        height: "100%",
                                        justifyContent: "center",

                                        borderTopRightRadius: SIZES.radiusLarge,
                                        borderBottomRightRadius: SIZES.radiusLarge,
                                        backgroundColor: COLORS.white
                                    }}>
                                        <Text style={{
                                            ...FONTS.body2
                                        }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                            {/* Name  */}

                            <View style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                width: "100%",

                            }}>
                                <Text style={{
                                    ...FONTS.h2,
                                    textAlign: "center"
                                }}>{item?.name} - ${item.price}</Text>

                            </View>

                            {/* Description  */}

                            <Text style={{
                                ...FONTS.body3,
                                paddingHorizontal: SIZES.padding / 2,
                                textAlign: "center",
                                marginTop: SIZES.padding / 2
                            }}>{item.description}</Text>
                            {/* CALO  */}

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: SIZES.padding / 2
                            }}>
                                <Image style={{
                                    width: 30,
                                    height: 30,
                                    resizeMode: "contain",
                                    marginRight: SIZES.padding / 2
                                }} source={icons.fire} />

                                <Text style={{
                                    ...FONTS.body3,
                                    color: COLORS.darkgray

                                }}>{item.calories} cal</Text>
                            </View>
                        </View>
                    })
                }

            </ScrollView>

        </View>
    }

    return (
        <SafeAreaView style={styles.container}>

            <View
                style={{
                    flex: 1,
                    paddingHorizontal: SIZES.padding,
                }}>
                {
                    renderHeader()
                }
                {
                    renderFoodInfo()
                }
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: COLORS.lightGray4,
        flex: 1,
        paddingHorizontal: SIZES.padding,

    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})