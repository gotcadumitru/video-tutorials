import { Button } from '@react-navigation/elements';
import { ScrollView, StyleSheet, View } from 'react-native';

export function Home() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.buttonList}
        showsVerticalScrollIndicator={false}
      >
        <Button screen="Profile" params={{ user: 'jane' }}>
          Go to Profile
        </Button>
        <Button screen="Settings">Go to Settings</Button>
        <Button screen="Instagram">Go to Instagram</Button>
        <Button screen="Calculator" params={{}}>Go to Calculator</Button>
        <Button screen="WindowsPhone" params={{}}>Go to Windows Phone</Button>
        <Button screen="BrightnessControl" params={{}}>Go to Brightness Control</Button>
        <Button screen="BrightnessControl2">Go to Brightness Control 2</Button>
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
        <Button screen="FlappyBird">Go to Flappy Bird</Button>
        <Button screen="EmptyShowcase">Go to Car Events</Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
  },
  scrollView: {
    flex: 1,
  },
  buttonList: {
    alignItems: 'center',
    gap: 12,
  },
});
