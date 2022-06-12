import routeNames from "./routeNames";
//Screens
import Home from "../screens/Home"
import OrderDelivery from "../screens/OrderDelivery"
import Restaurant from "../screens/Restaurant"
// Layouts
import EmptyLayout from "../layouts/EmptyLayout"
import CommonLayout from "../layouts/CommonLayout"
//Child Navigation
import BottomTabsNavigation from "../navigations/BottomTabsNavigation";


//ICON
import { icons } from "../consts";
export const STACK_ROUTERS = [
    {
        id: "1",
        title:"BottomTabsNavigation",
        name: routeNames.BOTTOM_TABS_NAVIGATION,
        component: BottomTabsNavigation,
        layout: EmptyLayout
    },
    {
        id: "2",
        title:"OrderDelivery",
        name: routeNames?.ORDER_DELIVERY,
        component: OrderDelivery,
        layout: EmptyLayout
    },
    {
        id: "3",
        title:"Restaurant",
        name: routeNames?.RESTAURANT,
        component: Restaurant,
        layout: EmptyLayout
    },
]
export const BOTTOM_ROUTERS = [
    {
        id: "1",
        title:"Home",
        name: routeNames.HOME,
        component: Home,
        layout: EmptyLayout,
        icon:icons.cutlery
    },
    {
        id: "2",
        title:"Search",
        name: routeNames?.SEARCH,
        component: Home,
        layout: EmptyLayout,
         icon:icons.search
    },
    {
        id: "3",
        title:"Like",
        name: routeNames?.LIKE,
        component: Home,
        layout: EmptyLayout,
         icon:icons.like
    },
    {
        id: "4",
        title:"User",
        name: routeNames?.USER,
        component: Home,
        layout: EmptyLayout,
         icon:icons.user
    },
]

export default {
    STACK_ROUTERS,
    BOTTOM_ROUTERS
}