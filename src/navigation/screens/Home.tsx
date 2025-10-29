import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

export function Home() {
  return (
    <View style={styles.container}>
      <Button screen="Profile" params={{ user: 'jane' }}>
        Go to Profile
      </Button>
      <Button screen="Settings">Go to Settings</Button>
      <Button screen="Register">Go to Register</Button>
      <Button screen="Instagram">Go to Instagram</Button>
      <Button screen="Calculator" params={{}}>Go to Calculator</Button>
      <Button screen="WindowsPhone" params={{}}>Go to Windows Phone</Button>
      <Button screen="BrightnessControl" params={{}}>Go to Brightness Control</Button>
      <Button screen="BrightnessControl2">Go to Brightness Control 2</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
