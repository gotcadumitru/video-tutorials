import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1,
  },
  accentText: {
    color: '#00FF00',
  },
  scoreBoard: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  scoreLabel: {
    color: '#888',
    fontSize: 10,
    fontWeight: 'bold',
  },
  scoreValue: {
    color: '#00FF00',
    fontSize: 20,
    fontWeight: 'bold',
  },
  board: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: 2,
    borderColor: '#00FF00',
    position: 'relative',
    overflow: 'hidden',
  },
  snakeSegment: {
    position: 'absolute',
    borderRadius: 2,
  },
  food: {
    position: 'absolute',
    backgroundColor: '#FF0055',
    borderRadius: 50,
    shadowColor: '#FF0055',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  gameOverText: {
    color: '#FF0055',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 20,
  },
  restartBtn: {
    backgroundColor: '#00FF00',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 4,
    shadowColor: '#00FF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  restartText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  controls: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  controlRow: {
    flexDirection: 'row',
  },
  controlRowMiddle: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  controlBtn: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  controlText: {
    color: '#fff',
    fontSize: 24,
  },
});