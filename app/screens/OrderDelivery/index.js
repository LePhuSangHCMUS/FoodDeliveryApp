import { View, Text, SafeAreaView, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, icons, FONTS, SIZES, routeNames } from '../../consts';

export default function OrderDelivery() {
    return (
        <SafeAreaView style={styles.container}>
    
          <View
            style={{
              flex: 1,
              paddingHorizontal: SIZES.padding,
            }}>

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