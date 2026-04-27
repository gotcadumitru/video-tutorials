import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButton, Text } from "@react-navigation/elements";
import { Button } from "@react-navigation/elements";
import { ScrollView, StyleSheet, View } from "react-native";

import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "react-native";
import bell from "../assets/bell.png";
import newspaper from "../assets/newspaper.png";
import { Home } from "./screens/Home";
import { Profile } from "./screens/Profile";
import { Settings } from "./screens/Settings";
import { NotFound } from "./screens/NotFound";
import { InstagramScreen } from "./screens/Instagram";
import { Calculator } from "./screens/Calculator";
import { WindowsPhone } from "./screens/WindowsPhone";
import {
  BrightnessControl,
  BrightnessControl2 as ControlScreen,
} from "./screens/BrightnessControl";
import { TikTokProfile } from "./screens/TikTokProfile";
import { Dashboard } from "./screens/Dashboard";
import { Dashboard2 } from "./screens/Dashboard2";
import { CryptoDashboard } from "./screens/CryptoDashboard";
import { StocksDashboard } from "./screens/StocksDashboard";
import { Booking } from "./screens/Booking";
import { SocialMedia } from "./screens/SocialMedia";
import { Coffey } from "./screens/Coffey";
import { Barber } from "./screens/Barber";
import { MoviesCinema } from "./screens/MoviesCinema";
import { CarEvents } from "./screens/CarEvents";
import { SpotifySignup } from "./screens/SpotifySignup";
import { FlappyBird } from "./screens/FlappyBird";
import { MidnightRegistration } from "./screens/RegistrationMidnight";
import { LoginScreen } from "./screens/Login_1";
import { RegistrationScreen } from "./screens/Registration";
import { FinanceRegisterScreen } from "./screens/RegistrationFinance";
import RaceRegistrationScreen from "./screens/RegistrationCarRace/RegistrationCarRace";
import RegistrationCarRaceing from "./screens/RegistrationCarRaceing/RegistrationCarRaceing";
import MotoRent from "./screens/MotoRent/MotoRent";
import SnakeGame from "./screens/SnakeGame/SnakeGame";
import { MemoryGame } from "./screens/MemoryGame";
import RaceGame from "./screens/RaceGame/RaceGame";
import JobSearch from "./screens/JobSearch/JobSearch";
import RaceSignup from "./screens/RaceSignup/RaceSignup";
import SpeedRegister from "./screens/SpeedRegister/SpeedRegister";
import { WeatherApp } from "./screens/WeatherApp/WeatherApp";
import AiChatbotLogin from "./screens/AiChatbotLogin/AiChatbotLogin";
import CarRacingLogin from "./screens/CarRacingLogin/CarRacingLogin";
import FacebookLogin from "./screens/FacebookLogin/FacebookLogin";
import SpotifyLogin from "./screens/SpotifyLogin/SpotifyLogin";
const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: () => (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.buttonList}
            showsVerticalScrollIndicator={false}
          >
            <Button screen="FacebookLogin">Go to Facebook Login</Button>
            <Button screen="SpotifyLogin">Go to Spotify Login</Button>
            <Button screen="CarRacingLogin">Go to Car Racing Login</Button>
            <Button screen="AiChatbotLogin">Go to AI Chatbot Login</Button>
            <Button screen="WeatherApp">Go to Weather App</Button>
            <Button screen="RaceSignup">Go to Race Signup</Button>
            <Button screen="JobSearch">Go to JobSearch</Button>
            <Button screen="SnakeGame">Go to SnakeGame</Button>
            <Button screen="RaceGame">Go to RaceGame</Button>
            <Button screen="MemoryGame">Go to MemoryGame</Button>
            <Button screen="MotoRent">Go to MotoRent</Button>
            <Button screen="RegistrationCarRaceing">
              Go to RegistrationCarRaceing
            </Button>
            <Button screen="RaceRegistrationScreen">
              Go to RaceRegistrationScreen
            </Button>
            <Button screen="FinanceRegisterScreen">
              Go to Finance Register
            </Button>
            <Button screen="Profile" params={{ user: "jane" }}>
              Go to Profile
            </Button>
            <Button screen="Settings">Go to Settings</Button>
            <Button screen="LoginScreen">Go to LoginScreen</Button>
            <Button screen="RegistrationScreen">Go to Registration</Button>
            <Button screen="Instagram">Go to Instagram</Button>
            <Button screen="Calculator" params={{}}>
              Go to Calculator
            </Button>
            <Button screen="WindowsPhone" params={{}}>
              Go to Windows Phone
            </Button>
            <Button screen="BrightnessControl" params={{}}>
              Go to Brightness Control
            </Button>
            <Button screen="BrightnessControl2">
              Go to Brightness Control 2
            </Button>
            <Button screen="TikTokProfile">Go to TikTok Profile</Button>
            <Button screen="Dashboard">Go to Dashboard</Button>
            <Button screen="Dashboard2">Go to Modern Dashboard</Button>
            <Button screen="CryptoDashboard">Go to Crypto Dashboard</Button>
            <Button screen="StocksDashboard">Go to Stocks Dashboard</Button>
            <Button screen="Booking">Go to Booking</Button>
            <Button screen="SocialMedia">Go to Social Media</Button>
            <Button screen="Coffey">Go to Coffey</Button>
            <Button screen="Barber">Go to Barber Shop</Button>
            <Button screen="MoviesCinema">Go to Aurora Cinemas</Button>
            <Button screen="SpotifySignup">Go to Spotify Signup</Button>
            <Button screen="MidnightRegistration">
              Go to Midnight Registration
            </Button>
            <Button screen="FlappyBird">Go to Flappy Bird</Button>
            <Button screen="EmptyShowcase">Go to Car Events</Button>
          </ScrollView>
        </View>
      ),
      options: {
        title: "Feed",
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
  },
  scrollView: {
    flex: 1,
  },
  buttonList: {
    alignItems: "center",
    gap: 12,
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: "Home",
        headerShown: false,
      },
    },

    Profile: {
      screen: Profile,
      linking: {
        path: ":user(@[a-zA-Z0-9-_]+)",
        parse: {
          user: (value) => value.replace(/^@/, ""),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: "modal",
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    LoginScreen: {
      screen: LoginScreen,
      options: {
        title: "LoginScreen",
        headerShown: false,
      },
    },
    JobSearch: {
      screen: JobSearch,
      options: {
        title: "JobSearch",
        headerShown: false,
      },
    },
    RaceSignup: {
      screen: RaceSignup,
      options: {
        title: "Race Signup",
        headerShown: false,
      },
    },
    SpeedRegister: {
      screen: SpeedRegister,
      options: {
        title: "Speed Register",
        headerShown: false,
      },
    },
    MotoRent: {
      screen: MotoRent,
      options: {
        title: "MotoRent",
        headerShown: false,
      },
    },
    RaceGame: {
      screen: RaceGame,
      options: {
        title: "RaceGame",
        headerShown: false,
      },
    },
    SnakeGame: {
      screen: SnakeGame,
      options: {
        title: "SnakeGame",
        headerShown: false,
      },
    },
    MemoryGame: {
      screen: MemoryGame,
      options: {
        title: "MemoryGame",
        headerShown: false,
      },
    },
    RegistrationScreen: {
      screen: RegistrationScreen,
      options: {
        title: "Registration",
        headerShown: false,
      },
    },
    RegistrationCarRaceing: {
      screen: RegistrationCarRaceing,
      options: {
        title: "RegistrationCarRaceing",
        headerShown: false,
      },
    },
    Instagram: {
      screen: InstagramScreen,
      options: {
        title: "Instagram",
        headerShown: false,
      },
    },
    Calculator: {
      screen: Calculator,
      options: {
        title: "Calculator",
        headerShown: false,
      },
    },
    WindowsPhone: {
      screen: WindowsPhone,
      options: {
        title: "Windows Phone",
        headerShown: false,
      },
    },
    BrightnessControl: {
      screen: BrightnessControl,
      options: {
        title: "Brightness Control",
        headerShown: false,
      },
    },
    BrightnessControl2: {
      screen: ControlScreen,
      options: {
        title: "Brightness Control 2",
        headerShown: false,
      },
    },
    TikTokProfile: {
      screen: TikTokProfile,
      options: {
        title: "TikTok Profile",
        headerShown: false,
      },
    },
    FinanceRegisterScreen: {
      screen: FinanceRegisterScreen,
      options: {
        title: "Finance Register",
        headerShown: false,
      },
    },
    RaceRegistrationScreen: {
      screen: RaceRegistrationScreen,
      options: {
        title: "RaceRegistrationScreen",
        headerShown: false,
      },
    },
    Dashboard: {
      screen: Dashboard,
      options: {
        title: "Dashboard",
        headerShown: false,
      },
    },
    Dashboard2: {
      screen: Dashboard2,
      options: {
        title: "Modern Dashboard",
        headerShown: false,
      },
    },
    CryptoDashboard: {
      screen: CryptoDashboard,
      options: {
        title: "Crypto Dashboard",
        headerShown: false,
      },
    },
    StocksDashboard: {
      screen: StocksDashboard,
      options: {
        title: "Stocks Dashboard",
        headerShown: false,
      },
    },
    Booking: {
      screen: Booking,
      options: {
        title: "Booking",
        headerShown: false,
      },
    },
    SocialMedia: {
      screen: SocialMedia,
      options: {
        title: "Social Media",
        headerShown: false,
      },
    },
    Coffey: {
      screen: Coffey,
      options: {
        title: "Coffey",
        headerShown: false,
      },
    },
    Barber: {
      screen: Barber,
      options: {
        title: "Barber",
        headerShown: false,
      },
    },
    MoviesCinema: {
      screen: MoviesCinema,
      options: {
        title: "Aurora Cinemas",
        headerShown: false,
      },
    },
    EmptyShowcase: {
      screen: CarEvents,
      options: {
        title: "Car events 1",
        headerShown: false,
      },
    },
    SpotifySignup: {
      screen: SpotifySignup,
      options: {
        title: "Spotify Signup",
        headerShown: false,
      },
    },
    MidnightRegistration: {
      screen: MidnightRegistration,
      options: {
        title: "Midnight Registration",
        headerShown: false,
      },
    },
    FlappyBird: {
      screen: FlappyBird,
      options: {
        title: "Flappy Bird",
        headerShown: false,
      },
    },
    AiChatbotLogin: {
      screen: AiChatbotLogin,
      options: {
        title: "AI Chatbot Login",
        headerShown: false,
      },
    },
    CarRacingLogin: {
      screen: CarRacingLogin,
      options: {
        title: "Car Racing Login",
        headerShown: false,
      },
    },
    FacebookLogin: {
      screen: FacebookLogin,
      options: {
        title: "Facebook Login",
        headerShown: false,
      },
    },
    SpotifyLogin: {
      screen: SpotifyLogin,
      options: {
        title: "Spotify Login",
        headerShown: false,
      },
    },
    WeatherApp: {
      screen: WeatherApp,
      options: {
        title: "Weather App",
        headerShown: false,
      },
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: "404",
      },
      linking: {
        path: "*",
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
