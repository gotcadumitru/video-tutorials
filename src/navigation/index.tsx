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
import Netflix from "./screens/Netflix/Netflix";
import Discord from "./screens/Discord/Discord";
import YouTube from "./screens/YouTube/YouTube";
import SpotifyPlayer from "./screens/SpotifyPlayer/SpotifyPlayer";
import Reddit from "./screens/Reddit/Reddit";
import WhatsApp from "./screens/WhatsApp/WhatsApp";
import X from "./screens/X/X";
import ChatGPT from "./screens/ChatGPT/ChatGPT";
import Uber from "./screens/Uber/Uber";
import Tinder from "./screens/Tinder/Tinder";
import Tetris from "./screens/Tetris/Tetris";
import Game2048 from "./screens/Game2048/Game2048";
import Wordle from "./screens/Wordle/Wordle";
import DinoRun from "./screens/DinoRun/DinoRun";
import Minesweeper from "./screens/Minesweeper/Minesweeper";
import PaywallCalculator from "./screens/PaywallCalculator/PaywallCalculator";
import TipJar from "./screens/TipJar/TipJar";
import CoinFlip from "./screens/CoinFlip/CoinFlip";
import Magic8Ball from "./screens/Magic8Ball/Magic8Ball";
import QRGenerator from "./screens/QRGenerator/QRGenerator";
import AICalculator from "./screens/AICalculator/AICalculator";
import AIRandom from "./screens/AIRandom/AIRandom";
import AIRockPaperScissors from "./screens/AIRockPaperScissors/AIRockPaperScissors";
import AIYesNo from "./screens/AIYesNo/AIYesNo";
import AIPassword from "./screens/AIPassword/AIPassword";
import Flashlight from "./screens/Flashlight/Flashlight";
import TikTok from "./screens/TikTok/TikTok";
import Airbnb from "./screens/Airbnb/Airbnb";
import GoogleMaps from "./screens/GoogleMaps/GoogleMaps";
import AIVoice from "./screens/AIVoice/AIVoice";
import TicketDrop from "./screens/TicketDrop/TicketDrop";
import Duolingo from "./screens/Duolingo/Duolingo";
import SpotifyWrapped from "./screens/SpotifyWrapped/SpotifyWrapped";
import Shazam from "./screens/Shazam/Shazam";
import Tesla from "./screens/Tesla/Tesla";
import Nike from "./screens/Nike/Nike";
import LockScreen from "./screens/LockScreen/LockScreen";
import IncomingCall from "./screens/IncomingCall/IncomingCall";
import Pinterest from "./screens/Pinterest/Pinterest";
import Snapchat from "./screens/Snapchat/Snapchat";
import AIArt from "./screens/AIArt/AIArt";
import AppleWallet from "./screens/AppleWallet/AppleWallet";
import IMessage from "./screens/IMessage/IMessage";
import AppleFitness from "./screens/AppleFitness/AppleFitness";
import Twitch from "./screens/Twitch/Twitch";
import CashApp from "./screens/CashApp/CashApp";
import Starbucks from "./screens/Starbucks/Starbucks";
import DoorDash from "./screens/DoorDash/DoorDash";
import BoardingPass from "./screens/BoardingPass/BoardingPass";
import Habits from "./screens/Habits/Habits";
import Sleep from "./screens/Sleep/Sleep";
import HingeProtractor from "./screens/HingeProtractor/HingeProtractor";
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
            <Button screen="HingeProtractor">Hinge Protractor (Duo)</Button>
            <Button screen="AppleWallet">Go to Apple Wallet</Button>
            <Button screen="IMessage">Go to iMessage</Button>
            <Button screen="AppleFitness">Go to Apple Fitness</Button>
            <Button screen="Twitch">Go to Twitch</Button>
            <Button screen="CashApp">Go to Cash App</Button>
            <Button screen="Starbucks">Go to Starbucks</Button>
            <Button screen="DoorDash">Go to DoorDash</Button>
            <Button screen="BoardingPass">Go to Boarding Pass</Button>
            <Button screen="Habits">Go to Habits</Button>
            <Button screen="Sleep">Go to Sleep Sounds</Button>
            <Button screen="Duolingo">Go to Duolingo</Button>
            <Button screen="SpotifyWrapped">Go to Spotify Wrapped</Button>
            <Button screen="Shazam">Go to Shazam</Button>
            <Button screen="Tesla">Go to Tesla</Button>
            <Button screen="Nike">Go to Nike SNKRS</Button>
            <Button screen="LockScreen">Go to Lock Screen</Button>
            <Button screen="IncomingCall">Go to Incoming Call</Button>
            <Button screen="Pinterest">Go to Pinterest</Button>
            <Button screen="Snapchat">Go to Snapchat</Button>
            <Button screen="AIArt">Go to AI Art</Button>
            <Button screen="TikTok">Go to TikTok</Button>
            <Button screen="Airbnb">Go to Airbnb</Button>
            <Button screen="GoogleMaps">Go to Google Maps</Button>
            <Button screen="AIVoice">Go to AI Voice</Button>
            <Button screen="TicketDrop">Go to Ticket Drop</Button>
            <Button screen="AICalculator">AI Calculator</Button>
            <Button screen="AIRandom">AI Random Number</Button>
            <Button screen="AIRockPaperScissors">AI Rock Paper Scissors</Button>
            <Button screen="AIYesNo">AI Yes/No Decider</Button>
            <Button screen="AIPassword">AI Password Generator</Button>
            <Button screen="PaywallCalculator">Calculator (Paywall)</Button>
            <Button screen="TipJar">TipJar (Paywall)</Button>
            <Button screen="CoinFlip">Coin Flip (Paywall)</Button>
            <Button screen="Magic8Ball">Magic 8 Ball (Paywall)</Button>
            <Button screen="QRGenerator">QR Generator (Paywall)</Button>
            <Button screen="Flashlight">Flashlight (Paywall)</Button>
            <Button screen="Tetris">Play Tetris</Button>
            <Button screen="Game2048">Play 2048</Button>
            <Button screen="Wordle">Play Wordle</Button>
            <Button screen="DinoRun">Play Dino Run</Button>
            <Button screen="Minesweeper">Play Minesweeper</Button>
            <Button screen="WhatsApp">Go to WhatsApp</Button>
            <Button screen="X">Go to X</Button>
            <Button screen="ChatGPT">Go to ChatGPT</Button>
            <Button screen="Uber">Go to Uber</Button>
            <Button screen="Tinder">Go to Tinder</Button>
            <Button screen="Netflix">Go to Netflix</Button>
            <Button screen="Discord">Go to Discord</Button>
            <Button screen="YouTube">Go to YouTube</Button>
            <Button screen="SpotifyPlayer">Go to Spotify Player</Button>
            <Button screen="Reddit">Go to Reddit</Button>
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
    Netflix: {
      screen: Netflix,
      options: {
        title: "Netflix",
        headerShown: false,
      },
    },
    Discord: {
      screen: Discord,
      options: {
        title: "Discord",
        headerShown: false,
      },
    },
    YouTube: {
      screen: YouTube,
      options: {
        title: "YouTube",
        headerShown: false,
      },
    },
    SpotifyPlayer: {
      screen: SpotifyPlayer,
      options: {
        title: "Spotify Player",
        headerShown: false,
      },
    },
    Reddit: {
      screen: Reddit,
      options: {
        title: "Reddit",
        headerShown: false,
      },
    },
    WhatsApp: {
      screen: WhatsApp,
      options: {
        title: "WhatsApp",
        headerShown: false,
      },
    },
    X: {
      screen: X,
      options: {
        title: "X",
        headerShown: false,
      },
    },
    ChatGPT: {
      screen: ChatGPT,
      options: {
        title: "ChatGPT",
        headerShown: false,
      },
    },
    Uber: {
      screen: Uber,
      options: {
        title: "Uber",
        headerShown: false,
      },
    },
    Tinder: {
      screen: Tinder,
      options: {
        title: "Tinder",
        headerShown: false,
      },
    },
    Tetris: {
      screen: Tetris,
      options: {
        title: "Tetris",
        headerShown: false,
      },
    },
    Game2048: {
      screen: Game2048,
      options: {
        title: "2048",
        headerShown: false,
      },
    },
    Wordle: {
      screen: Wordle,
      options: {
        title: "Wordle",
        headerShown: false,
      },
    },
    DinoRun: {
      screen: DinoRun,
      options: {
        title: "Dino Run",
        headerShown: false,
      },
    },
    Minesweeper: {
      screen: Minesweeper,
      options: {
        title: "Minesweeper",
        headerShown: false,
      },
    },
    PaywallCalculator: {
      screen: PaywallCalculator,
      options: {
        title: "Calc",
        headerShown: false,
      },
    },
    TipJar: {
      screen: TipJar,
      options: {
        title: "TipJar",
        headerShown: false,
      },
    },
    CoinFlip: {
      screen: CoinFlip,
      options: {
        title: "FlipCoin",
        headerShown: false,
      },
    },
    Magic8Ball: {
      screen: Magic8Ball,
      options: {
        title: "Oracle 8",
        headerShown: false,
      },
    },
    QRGenerator: {
      screen: QRGenerator,
      options: {
        title: "QRify",
        headerShown: false,
      },
    },
    AICalculator: {
      screen: AICalculator,
      options: {
        title: "MathGPT",
        headerShown: false,
      },
    },
    AIRandom: {
      screen: AIRandom,
      options: {
        title: "RandomAI",
        headerShown: false,
      },
    },
    AIRockPaperScissors: {
      screen: AIRockPaperScissors,
      options: {
        title: "RPS-GPT",
        headerShown: false,
      },
    },
    AIYesNo: {
      screen: AIYesNo,
      options: {
        title: "Decide.ai",
        headerShown: false,
      },
    },
    AIPassword: {
      screen: AIPassword,
      options: {
        title: "PassGPT",
        headerShown: false,
      },
    },
    Flashlight: {
      screen: Flashlight,
      options: {
        title: "Lumen",
        headerShown: false,
      },
    },
    TikTok: {
      screen: TikTok,
      options: {
        title: "TikTok",
        headerShown: false,
      },
    },
    Airbnb: {
      screen: Airbnb,
      options: {
        title: "Airbnb",
        headerShown: false,
      },
    },
    GoogleMaps: {
      screen: GoogleMaps,
      options: {
        title: "Google Maps",
        headerShown: false,
      },
    },
    AIVoice: {
      screen: AIVoice,
      options: {
        title: "Nova AI",
        headerShown: false,
      },
    },
    TicketDrop: {
      screen: TicketDrop,
      options: {
        title: "Ticket Drop",
        headerShown: false,
      },
    },
    Duolingo: {
      screen: Duolingo,
      options: {
        title: "Duolingo",
        headerShown: false,
      },
    },
    SpotifyWrapped: {
      screen: SpotifyWrapped,
      options: {
        title: "Spotify Wrapped",
        headerShown: false,
      },
    },
    Shazam: {
      screen: Shazam,
      options: {
        title: "Shazam",
        headerShown: false,
      },
    },
    Tesla: {
      screen: Tesla,
      options: {
        title: "Tesla",
        headerShown: false,
      },
    },
    Nike: {
      screen: Nike,
      options: {
        title: "SNKRS",
        headerShown: false,
      },
    },
    LockScreen: {
      screen: LockScreen,
      options: {
        title: "Lock Screen",
        headerShown: false,
      },
    },
    IncomingCall: {
      screen: IncomingCall,
      options: {
        title: "Incoming Call",
        headerShown: false,
      },
    },
    Pinterest: {
      screen: Pinterest,
      options: {
        title: "Pinterest",
        headerShown: false,
      },
    },
    Snapchat: {
      screen: Snapchat,
      options: {
        title: "Snapchat",
        headerShown: false,
      },
    },
    AIArt: {
      screen: AIArt,
      options: {
        title: "Dreamer",
        headerShown: false,
      },
    },
    AppleWallet: {
      screen: AppleWallet,
      options: {
        title: "Wallet",
        headerShown: false,
      },
    },
    IMessage: {
      screen: IMessage,
      options: {
        title: "Messages",
        headerShown: false,
      },
    },
    AppleFitness: {
      screen: AppleFitness,
      options: {
        title: "Fitness",
        headerShown: false,
      },
    },
    Twitch: {
      screen: Twitch,
      options: {
        title: "Twitch",
        headerShown: false,
      },
    },
    CashApp: {
      screen: CashApp,
      options: {
        title: "Cash App",
        headerShown: false,
      },
    },
    Starbucks: {
      screen: Starbucks,
      options: {
        title: "Starbucks",
        headerShown: false,
      },
    },
    DoorDash: {
      screen: DoorDash,
      options: {
        title: "DoorDash",
        headerShown: false,
      },
    },
    BoardingPass: {
      screen: BoardingPass,
      options: {
        title: "Boarding Pass",
        headerShown: false,
      },
    },
    Habits: {
      screen: Habits,
      options: {
        title: "Habits",
        headerShown: false,
      },
    },
    Sleep: {
      screen: Sleep,
      options: {
        title: "Sleep",
        headerShown: false,
      },
    },
    HingeProtractor: {
      screen: HingeProtractor,
      options: {
        title: "Hinge",
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
