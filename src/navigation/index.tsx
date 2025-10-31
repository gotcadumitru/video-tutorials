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
import { Register } from './screens/CarRegister/Register';
import { InstagramScreen } from './screens/Instagram/InstagramScreen';
import { Calculator } from './screens/Calculator';
import { WindowsPhone } from './screens/WindowsPhone';
import { BrightnessControl } from './screens/BrightnessControl/BrightnessControl';
import ControlScreen from './screens/BrightnessControl/BrightnessControl2';
import TikTokProfile from './screens/TikTokProfile/TikTokProfile';

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
    Register: {
      screen: Register,
      options: {
        title: 'Register',
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
