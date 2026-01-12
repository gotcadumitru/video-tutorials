import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 40,
    marginTop: 20,
  },
  brandTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1,
    fontStyle: 'italic',
  },
  brandAccent: {
    color: '#D32F2F',
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 5,
  },
  formContainer: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#D32F2F',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    height: 56,
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  consentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkboxBase: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#666',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: 'transparent', 
  },
  consentText: {
    color: '#999',
    fontSize: 13,
    flex: 1,
  },
  linkText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  primaryButton: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 30,
    transform: [{ skewX: '-10deg' }], 
  },
  gradientButton: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: 1,
    transform: [{ skewX: '10deg' }], 
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  orText: {
    color: '#666',
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  socialButton: {
    flex: 1,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});