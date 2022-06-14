import { View, Text, SafeAreaView, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, icons, FONTS, SIZES, routeNames } from '../../consts';
import { restaurantData, categoryData, initialCurrentLocation } from "./dummy"
import Restaurant from '../Restaurant';
import { useNavigation } from '@react-navigation/native';
export default function Home() {


  const navigation = useNavigation();
  const { navigate } = navigation;
  const [categorySelected, setCategorySelected] = useState(1)
  const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation)


  const handleChangeCategory = (id) => {
    setCategorySelected(id)
  }
  const getCategory = (id) => {
    return categoryData.find(item=>item.id==id)
  }
  const CategoryItem = (props) => {
    const { id, name, icon } = props;
    return <TouchableOpacity onPress={() => handleChangeCategory(id)}>
      <View style={[{
        padding: SIZES.padding / 2,
        paddingBottom: SIZES.padding * 1.5,
        borderRadius: SIZES.radiusLarge,
        alignItems: "center",
        backgroundColor: (categorySelected === id ? COLORS.primary : COLORS.white),
        marginRight: SIZES.padding,
        marginBottom: SIZES.padding / 2

      }, styles.shadow]}>
        <View style={{
          width: 60,
          height: 60,
          borderRadius: SIZES.radiusLarge,
          backgroundColor: (categorySelected === id ? COLORS.lightGray4 : COLORS.lightGray3),
          justifyContent: "center",
          alignItems: 'center',

        }}>
          < Image style={{
            width: 30,
            height: 30,
            resizeMode: "contain"
          }} source={icon} />
        </View>

        <Text style={{
          ...FONTS.body3,
          marginTop: SIZES.padding / 2,
          alignSelf: "center",
          color: (categorySelected === id ? COLORS.white : null),

        }}>{name}</Text>
      </View>
    </TouchableOpacity>
  }
  const RestaurantItem = (props) => {
    const { id, name, photo, duration, rating, categories,priceRating } = props;
    return <TouchableOpacity style={{
      marginBottom: SIZES.padding
    }}
      onPress={() => {
        navigate(routeNames.RESTAURANT, {
          item:props,
          currentLocation
       }) 
    }}
    
    >

      {/* Image  */}
      <View style={{

      }}>
        <Image style={{
          width: "100%",
          height: 200,
          resizeMode: "cover",
          borderRadius: SIZES.radiusMedium,
        }} source={photo} />

        <View style={{
          width: SIZES.width * 0.3,
          borderTopRightRadius: SIZES.radiusMedium,
          borderBottomLeftRadius: SIZES.radiusMedium,
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 50,
          backgroundColor: COLORS.white,
          justifyContent: "center",
          alignItems: 'center',
          ...styles.shadow
        }}>
          <Text style={{
            ...FONTS.body3s
          }}>{duration}</Text>
        </View>
      </View>

      {/* Restaurant Info */}
      <Text style={{
        ...FONTS.h2,
        marginVertical: SIZES.padding / 2
      }}>{name}</Text>

      <View style={{
        flexDirection: "row",
        alignItems: "center"
      }}>
        <Image style={{
          tintColor: COLORS.primary,
          width: 20,
          height: 20,
          marginRight: SIZES.padding / 2,
        }} source={icons.star} />
        <Text>{rating}</Text>

        {/* Category  */}
        <View style={{
          flexDirection: "row",
          alignItems: "center",
           marginHorizontal:SIZES.padding/2
        }}>

          {
            categories?.map((item) => {
              return <View key={item} style={{
                marginRight: SIZES.padding / 2,
                flexDirection: "row",
                alignItems:"center"
              }}>
                <Text>{getCategory(item)?.name}</Text>
                <Text style={{
                  // color:COLORS.lightGray4
                }}>*</Text>
              </View>
            })
          }
        </View>

        {/* Price  */}
        {
          [1, 2, 3].map(price => {
            return <Text
              key={price}
              style={{
                ...FONTS.body3,
                color:(price <= priceRating)?COLORS.black:COLORS.darkgray,
            }}
            >$</Text>
          })
        }
      </View>
    </TouchableOpacity>
  }


  const renderHeader = () => {
    return <View style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    }}>

      <TouchableOpacity>
        < Image style={{
          resizeMode: "contain",
          width: 25,
          height: 25
        }} source={icons.location} />

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
      }}>{currentLocation.streetName}</Text></View>
      < Image style={{
        width: 25,
        height: 25,
        resizeMode: "contain",

      }} source={icons.basket} />
    </View>
  }

  const renderMainCategories = () => {
    return <View>
      <View style={{ marginTop: SIZES.padding * 2, marginBottom: SIZES.padding }}>
        <Text style={{ ...FONTS.h1 }}>Main</Text>
        <Text style={{ ...FONTS.h1 }}>Categories</Text>
      </View>

      <FlatList showsHorizontalScrollIndicator={false} horizontal data={categoryData} keyExtractor={(item, index) => item.id} renderItem={({ item, index, separators }) => {
        return < CategoryItem {...item} />
      }} />
    </View>;
  }

  const renderRestaurantList = () => {
    return <FlatList data={restaurantData}
      keyExtractor={(item, index) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index, separators }) => {
        return < RestaurantItem {...item} />
      }}

      contentContainerStyle={{
        paddingBottom: SIZES.padding
      }}
    />
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
          renderMainCategories()
        }
        {
          renderRestaurantList()
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