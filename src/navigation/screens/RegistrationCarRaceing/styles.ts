import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');


const RED = "#E60023";

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },

  bgAccent: {
    position: "absolute",
    right: -40,
    top: 80,
    width: 260,
    height: 520,
    opacity: 0.16,
    borderRadius: 28,
    transform: [{ rotate: "12deg" }],
  },

  redGlow: {
    position: "absolute",
    left: -120,
    bottom: -140,
    width: 420,
    height: 420,
    borderRadius: 999,
    opacity: 1,
  },

  scrollContent: {
    paddingTop: 56,
    paddingHorizontal: 18,
    paddingBottom: 28,
  },

  header: {
    marginBottom: 16,
    gap: 8,
  },

  badgeRow: { flexDirection: "row", gap: 10 },
  badge: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  badgeText: { fontSize: 16 },

  title: {
    fontSize: 36,
    fontWeight: Platform.select({ ios: "800", android: "800", default: "800" }),
    color: "#fff",
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.62)",
    lineHeight: 20,
  },

  card: {
    borderRadius: 22,
    padding: 16,
    backgroundColor: "rgba(10,10,10,0.74)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
    gap: 14,
  },

  field: { gap: 8 },
  label: {
    fontSize: 12,
    color: "rgba(255,255,255,0.70)",
    letterSpacing: 0.3,
  },

  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 52,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  inputIcon: { width: 26, textAlign: "center", opacity: 0.9 },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    paddingVertical: 0,
    paddingHorizontal: 8,
  },

  consentRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 2 },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.22)",
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  consentText: { flex: 1, fontSize: 12.5, color: "rgba(255,255,255,0.65)" },

  primaryBtn: {
    marginTop: 2,
    height: 54,
    borderRadius: 18,
    backgroundColor: RED,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 15.5,
    fontWeight: Platform.select({ ios: "700", android: "700", default: "700" }),
    letterSpacing: 0.2,
  },
  primaryBtnPill: {
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.22)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnPillText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: Platform.select({ ios: "800", android: "800", default: "800" }),
    letterSpacing: 1,
  },

  dividerRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 4 },
  divider: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.10)" },
  dividerText: { color: "rgba(255,255,255,0.45)", fontSize: 12 },

  socialRow: { flexDirection: "row", gap: 10 },
  socialBtn: {
    flex: 1,
    height: 52,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  googleBtn: { backgroundColor: "rgba(255,255,255,0.06)" },
  fbBtn: { backgroundColor: "rgba(255,255,255,0.06)" },
  socialIcon: {
    width: 22,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: Platform.select({ ios: "800", android: "800", default: "800" }),
    opacity: 0.9,
  },
  socialText: {
    color: "rgba(255,255,255,0.86)",
    fontSize: 14,
    fontWeight: Platform.select({ ios: "700", android: "700", default: "700" }),
  },

  footerRow: { flexDirection: "row", justifyContent: "center", marginTop: 2 },
  footerText: { color: "rgba(255,255,255,0.60)", fontSize: 13 },
  footerLink: { color: RED, fontSize: 13, fontWeight: Platform.select({ ios: "700", android: "700", default: "700" }) },

  bottomHint: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    opacity: 0.85,
  },
  speedLine: { width: 48, height: 1, backgroundColor: "rgba(255,255,255,0.18)" },
  bottomHintText: { color: "rgba(255,255,255,0.55)", fontSize: 12, letterSpacing: 1 },
});