import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const COLORS = {

    // base colors
    primary: "#FC6D3F", // orange
    secondary: "#CDCDD2",   // gray

    // colors
    black: "#1E1F20",
    white: "#FFFFFF",

    lightGray: "#F5F5F6",
    lightGray2: "#F6F6F7",
    lightGray3: "#EFEFF1",
    lightGray4: "#F8F8F9",
    transparent: "transparent",
    darkgray: '#898C95',


};
export const SIZES = {
    //Global sizes
    base: 8,
    font: 14,
    radiusBase: 12,
    radiusSmall:5,
    radiusMedium:30,
    radiusLarge:50,
    padding: 24,
    
    //Font Sizes
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,

    //App Dimension

    width,
    height
     
}

export const FONTS = {
    h1: {
        fontFamily: "Roboto-Black" ,
        fontSize: SIZES.h1,
        lineHeight: 36,
    },
    h2: {
        fontFamily: "Roboto-Bold",
        fontSize: SIZES.h2,
        lineHeight: 30,
    },
    h3: {
        fontFamily: "Roboto-Bold",
        fontSize: SIZES.h3,
        lineHeight: 22,
    },
    h4: {
        fontFamily: "Roboto-Bold",
        fontSize: SIZES.h4,
        lineHeight: 20,
    },
    body1: {
        fontFamily: "Roboto-Regular",
        fontSize: SIZES.h1,
        lineHeight: 36,
    },
    body2: {
        fontFamily: "Roboto-Regular",
        fontSize: SIZES.body2,
        lineHeight: 30,
    },
    body3: {
        fontFamily: "Roboto-Regular",
        fontSize: SIZES.body3,
        lineHeight: 22,
    },
    body4: {
        fontFamily: "Roboto-Regular",
        fontSize: SIZES.body4,
        lineHeight: 20,
    },
}

const appTheme = {
    COLORS,
    SIZES,
    FONTS
}

export default appTheme;