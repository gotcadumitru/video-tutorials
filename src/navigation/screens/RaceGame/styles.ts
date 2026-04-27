import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get("window");
const LANE_COUNT = 3;
const LANE_WIDTH = width * 0.8 / LANE_COUNT;
const GAME_HEIGHT = height * 0.6;
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  fullScreen: { flex: 1 },
  safe: { flex: 1, alignItems: 'center' },
  header: { width: '100%', padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#fff', fontSize: 28, fontWeight: '900', fontStyle: 'italic' },
  scoreCounter: { backgroundColor: '#333', padding: 10, borderRadius: 5, borderWidth: 1, borderColor: '#FF0055' },
  scoreText: { color: '#FF0055', fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', fontSize: 20, fontWeight: 'bold' },
  track: { width: width * 0.8, height: GAME_HEIGHT, backgroundColor: '#050505', borderWidth: 2, borderColor: '#333', flexDirection: 'row', overflow: 'hidden' },
  laneLine: { flex: 1, borderRightWidth: 1, borderRightColor: '#222', borderStyle: 'dashed' },
  player: { position: 'absolute', bottom: 20, width: LANE_WIDTH * 0.8, height: 60, alignItems: 'center', justifyContent: 'center' },
  playerGlow: { position: 'absolute', bottom: -5, width: 20, height: 5, backgroundColor: '#FF0055', shadowColor: '#FF0055', shadowRadius: 10, shadowOpacity: 1, elevation: 5 },
  enemy: { position: 'absolute', width: LANE_WIDTH * 0.8, height: 50, alignItems: 'center' },
  controls: { flexDirection: 'row', marginTop: 40, width: '80%', justifyContent: 'space-between' },
  btn: { backgroundColor: '#222', width: '45%', height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#444' },
  btnText: { color: '#fff', fontWeight: 'bold', letterSpacing: 2 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  gameOverText: { color: '#FF0055', fontSize: 40, fontWeight: '900', marginBottom: 20 },
  startBtn: { backgroundColor: '#FF0055', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 5 },
  startBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});