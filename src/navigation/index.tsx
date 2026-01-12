import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import { Home } from './screens/Home';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { NotFound } from './screens/NotFound';
import { InstagramScreen } from './screens/Instagram';
import { Calculator } from './screens/Calculator';
import { WindowsPhone } from './screens/WindowsPhone';
import { BrightnessControl, BrightnessControl2 as ControlScreen } from './screens/BrightnessControl';
import { TikTokProfile } from './screens/TikTokProfile';
import { Dashboard } from './screens/Dashboard';
import { Dashboard2 } from './screens/Dashboard2';
import { CryptoDashboard } from './screens/CryptoDashboard';
import { StocksDashboard } from './screens/StocksDashboard';
import { Booking } from './screens/Booking';
import { SocialMedia } from './screens/SocialMedia';
import { Coffey } from './screens/Coffey';
import { Barber } from './screens/Barber';
import { MoviesCinema } from './screens/MoviesCinema';
import { CarEvents } from './screens/CarEvents';
import { SpotifySignup } from './screens/SpotifySignup';
import { FlappyBird } from './screens/FlappyBird';
import { MidnightRegistration } from './screens/RegistrationMidnight';
import { Register } from './screens/CarRegister';
import { LoginScreen } from './screens/Login_1';
import { RegistrationScreen } from './screens/Registration';
import { FinanceRegisterScreen } from './screens/RegistrationFinance';
import RaceRegistrationScreen from './screens/RegistrationCarRace/RegistrationCarRace';
import RegistrationCarRaceing from './screens/RegistrationCarRaceing/RegistrationCarRaceing';

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Feed',
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

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    
    Profile: {
      screen: Profile,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
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
        title: 'LoginScreen',
        headerShown: false,
      },
    },
    RegistrationScreen: {
      screen: RegistrationScreen,
      options: {
        title: 'Registration',
        headerShown: false,
      },
    },
    RegistrationCarRaceing: {
      screen: RegistrationCarRaceing,
      options: {
        title: 'RegistrationCarRaceing',
        headerShown: false,
      },
    },
    Instagram: {
      screen: InstagramScreen,
      options: {
        title: 'Instagram',
        headerShown: false,
      },
    },
    Calculator: {
      screen: Calculator,
      options: {
        title: 'Calculator',
        headerShown: false,
      },
    },
    WindowsPhone: {
      screen: WindowsPhone,
      options: {
        title: 'Windows Phone',
        headerShown: false,
      },
    },
    BrightnessControl: {
      screen: BrightnessControl,
      options: {
        title: 'Brightness Control',
        headerShown: false,
      },
    },
    BrightnessControl2: {
      screen: ControlScreen,
      options: {
        title: 'Brightness Control 2',
        headerShown: false,
      },
    },
    TikTokProfile: {
      screen: TikTokProfile,
      options: {
        title: 'TikTok Profile',
        headerShown: false,
      },
    },
    FinanceRegisterScreen: {
      screen: FinanceRegisterScreen,
      options: {
        title: 'Finance Register',
        headerShown: false,
      },
    },
    RaceRegistrationScreen: {
      screen: RaceRegistrationScreen,
      options: {
        title: 'RaceRegistrationScreen',
        headerShown: false,
      },
    },
    Dashboard: {
      screen: Dashboard,
      options: {
        title: 'Dashboard',
        headerShown: false,
      },
    },
    Dashboard2: {
      screen: Dashboard2,
      options: {
        title: 'Modern Dashboard',
        headerShown: false,
      },
    },
    CryptoDashboard: {
      screen: CryptoDashboard,
      options: {
        title: 'Crypto Dashboard',
        headerShown: false,
      },
    },
    StocksDashboard: {
      screen: StocksDashboard,
      options: {
        title: 'Stocks Dashboard',
        headerShown: false,
      },
    },
    Booking: {
      screen: Booking,
      options: {
        title: 'Booking',
        headerShown: false,
      },
    },
    SocialMedia: {
      screen: SocialMedia,
      options: {
        title: 'Social Media',
        headerShown: false,
      },
    },
    Coffey: {
      screen: Coffey,
      options: {
        title: 'Coffey',
        headerShown: false,
      },
    },
    Barber: {
      screen: Barber,
      options: {
        title: 'Barber',
        headerShown: false,
      },
    },
    MoviesCinema: {
      screen: MoviesCinema,
      options: {
        title: 'Aurora Cinemas',
        headerShown: false,
      },
    },
    EmptyShowcase: {
      screen: CarEvents,
      options: {
        title: 'Car events 1',
        headerShown: false,
      },
    },
    SpotifySignup: {
      screen: SpotifySignup,
      options: {
        title: 'Spotify Signup',
        headerShown: false,
      },
    },
    MidnightRegistration: {
      screen: MidnightRegistration,
      options: {
        title: 'Midnight Registration',
        headerShown: false,
      },
    },
    FlappyBird: {
      screen: FlappyBird,
      options: {
        title: 'Flappy Bird',
        headerShown: false,
      },
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
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
