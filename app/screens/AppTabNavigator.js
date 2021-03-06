import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "react-navigation";
import Home from "./Home";
import Basket from "./Basket";
import Search from "./Search";
import Profile from "./Profile";
import ProductDetailScreen from "./ProductDetailScreen";
import PasswordDetailScreen from "./PasswordDetailScreen";
import VerificationScreen from "./VerificationScreen";
import PaymentScreen from "./PaymentScreen";

import { createStackNavigator } from "react-navigation";
import OrdersDetailScreen from "./OrdersDetailScreen";
import UserCommentsScreen from "./UserCommentsScreen";
import OrderInvoiceScreen from "./OrderInvoiceScreen";
import ForYouScreen from "./ForYouScreen";

const HomePlus = createStackNavigator(
  {
    Home: {
      screen: Home,
    }, //this is the "global" screen
    ProductDetailScreen: {
      screen: ProductDetailScreen,
    }, //change this for each page
    //Product: { screen: Product },
  },
  {
    headerMode: "none",
  }
);
const SearchPlus = createStackNavigator(
  {
    Search: {
      screen: Search,
    },
    ProductDetailScreen: {
      screen: ProductDetailScreen,
    },
  },
  {
    headerMode: "none",
  }
);

const BasketPlus = createStackNavigator(
  {
    Basket: {
      screen: Basket,
    },
    PaymentScreen: {
      screen: PaymentScreen,
    },
    OrderInvoiceScreen: {
      screen: OrderInvoiceScreen,
    },
  },
  {
    headerMode: "none",
  }
);

const ProfilePlus = createStackNavigator(
  {
    Profile: {
      screen: Profile,
    }, //this is the "global" screen
    PasswordDetailScreen: {
      screen: PasswordDetailScreen,
    }, //change this for each page
    OrdersDetailScreen: {
      screen: OrdersDetailScreen,
    },
    UserCommentsScreen: {
      screen: UserCommentsScreen,
    },
    OrderInvoiceScreen: {
      screen: OrderInvoiceScreen,
    },
    ProductDetailScreen: {
      screen: ProductDetailScreen,
    },
    VerificationScreen: {
      screen: VerificationScreen,
    },
    ForYouScreen: {
      screen: ForYouScreen,
    },
  },
  {
    headerMode: "none",
  }
);

const AppTabNavigator = createMaterialTopTabNavigator(
  {
    HomePlus: {
      screen: HomePlus,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" color={tintColor} size={24} />
        ),
      },
    },
    SearchPlus: {
      screen: SearchPlus,
      navigationOptions: {
        tabBarLabel: "Search",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-search" color={tintColor} size={24} />
        ),
      },
    },
    BasketPlus: {
      screen: BasketPlus,
      navigationOptions: {
        tabBarLabel: "Basket",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-basket" color={tintColor} size={24} />
        ),
      },
    },
    ProfilePlus: {
      screen: ProfilePlus,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-person" color={tintColor} size={24} />
        ),
      },
    },
  },
  {
    tabBarPosition: "bottom",
    //swipeEnabled:false -->to disable swipe
    tabBarOptions: {
      activeTintColor: "darkseagreen",
      inactiveTintColor: "#f2f2f2",
      style: {
        backgroundColor: "black",
        borderTopColor: "grey",
        borderTopWidth: 0.2,
      },
      indicatorStyle: {
        height: 0,
      },
      showIcon: true,
    },
  }
);

export default AppTabNavigator;
