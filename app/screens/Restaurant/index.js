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
    const [item, setItem] = useState(params.item);
    const [order, setOrder] = useState({});
    const handleDecrease = (menuId, price) => {
        if (order[menuId].quantity) {
            setOrder({
                ...order, [menuId]: {
                    quantity: order?.[menuId]?.quantity - 1,
                    price,
                }
            })
        } else {
            setOrder({
                ...order, [menuId]: {
                    quantity: 0,
                    price,
                }
            })

        }
    }
    const handleIncrease = (menuId, price) => {

        if (order[menuId]) {
            setOrder({
                ...order, [menuId]: {
                    quantity: order?.[menuId].quantity + 1,
                    price,
                }
            })
        } else {
            setOrder({
                ...order, [menuId]: {
                    quantity: 1,
                    price,
                }
            })

        }
    }



    const getBasketItemCount = () => {
        return Object.keys(order).reduce(((a, b) => a + order?.[b]?.quantity), 0)
    }
    const sumOrder = () => {
        return Object.keys(order).reduce(((a, b) => a + order?.[b]?.quantity * order?.[b]?.price), 0)

    }


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
            }}>{item?.name}</Text></View>
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
                                    <TouchableOpacity
                                        onPress={() => handleDecrease(item.menuId, item.price)}
                                        activeOpacity={0}
                                        style={{
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
                                            paddingHorizontal: SIZES.padding / 2

                                        }}
                                    >
                                        <Text style={{
                                            ...FONTS.body1,


                                        }}>{order?.[item?.menuId]?.quantity || 0}</Text>
                                    </View>

                                    <TouchableOpacity

                                        onPress={() => handleIncrease(item.menuId, item.price)}
                                        activeOpacity={0}
                                        style={{
                                            borderTopRightRadius: SIZES.radiusLarge,
                                            borderBottomRightRadius: SIZES.radiusLarge,
                                            backgroundColor: COLORS.white,
                                            width: 60,
                                            alignItems: "center",
                                            height: "100%",
                                            justifyContent: "center",

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

    const renderDot = () => {
        const dotPosition = Animated.divide(scrollX, SIZES.width)
        return <View style={styles.dotContainer}>{
            item?.menu.map((item, index) => {
                const opacity = dotPosition.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: "clamp"
                })
                const dotSize = dotPosition.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [SIZES.base, 17, SIZES.base],
                    extrapolate: "clamp"
                })
                return <Animated.View
                    opacity={opacity}
                    key={item.menuId}
                    style={{
                        width: 20,
                        height: 20,
                        borderRadius: 100,
                        backgroundColor: COLORS.primary,
                        margin: 5,
                        width: dotSize,
                        height: dotSize
                    }}></Animated.View>
            })
        }</View>
    }

    const renderOrder = () => {
        return <View style={[styles.orderContainer,styles.shadow]}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <Text style={{
                    ...FONTS.h3
                }}>{getBasketItemCount()} items in Cart</Text>

                <Text style={{
                    ...FONTS.h3
                }}>${sumOrder()}</Text>
            </View>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                 marginVertical:SIZES.padding
            }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Image style={{
                        width: 25,
                        height: 25,
                        marginRight: SIZES.padding / 2
                    }} source={icons.location} />
                    <Text style={{
                        ...FONTS.h3
                    }}>Location</Text>
                </View>
            </View>

            <TouchableOpacity style={{
                width: "100%",
                alignItems:"center",
                paddingVertical: SIZES.padding,
                backgroundColor: COLORS.primary,
                borderRadius: SIZES.radiusLarge,
                  marginTop:SIZES.padding/2
            }}><Text style={{
                    ...FONTS.h2,
                 color:COLORS.white
            }}>Order</Text></TouchableOpacity>
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
                {
                    renderDot()
                }

                {
                    renderOrder()
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
    },
    dotContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: SIZES.padding
        // position: "absolute",
        // bottom: SIZES.height > 700 ? '30%' : '20%',
    },
    orderContainer: {
        width: SIZES.width,
        position: "absolute",
        bottom: 0,
        padding: SIZES.padding,
        borderTopLeftRadius: SIZES.radiusLarge,
        borderTopRightRadius: SIZES.radiusLarge,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
        marginTop:10

    }
})