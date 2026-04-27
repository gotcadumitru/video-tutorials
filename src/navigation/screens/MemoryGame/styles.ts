import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000428',
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1,
  },
  accent: {
    color: '#00d2ff',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 4,
  },
  statsBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 210, 255, 0.3)',
    padding: 10,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  statLabel: {
    color: '#00d2ff',
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 30,
  },
  card: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardFaceDown: {
    backgroundColor: '#1a2a6c', // Dark blue back
    borderWidth: 2,
    borderColor: '#2b32b2',
  },
  cardFlipped: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
  },
  cardMatched: {
    borderColor: '#00d2ff',
    backgroundColor: '#e6fbff',
  },
  cardInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBackText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 24,
    fontWeight: '900',
  },
  cardIcon: {
    fontSize: 32,
  },
  matchedGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#00d2ff',
    shadowColor: "#00d2ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  winContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 210, 255, 0.1)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#00d2ff',
    width: '100%',
  },
  winText: {
    color: '#00d2ff',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 5,
    letterSpacing: 1,
  },
  winSubText: {
    color: '#fff',
    marginBottom: 20,
    fontSize: 14,
  },
  resetBtn: {
    backgroundColor: '#00d2ff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  resetBtnSmall: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  resetBtnText: {
    color: '#000428',
    fontWeight: 'bold',
    fontSize: 14,
  },
  resetBtnTextSmall: {
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
    fontSize: 12,
  },
});