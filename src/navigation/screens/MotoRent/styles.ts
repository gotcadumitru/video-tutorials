import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#1a1816",
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height * 0.6, // Image takes top 60% initially
    position: "absolute",
    top: 0,
    left: 0,
  },
  gradientOverlay: {
    flex: 1,
    // paddingTop: height * 0.18, // Push content down
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
    padding: 24,
  },
  badge: {
    backgroundColor: "#ff6b00",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: "#e0dcd5",
    lineHeight: 48,
  },
  titleAccent: {
    color: "#ff6b00",
  },
  subtitle: {
    fontSize: 14,
    color: "#8a8580",
    fontWeight: "600",
    marginTop: 8,
    letterSpacing: 2,
  },
  card: {
    backgroundColor: "#24211f",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#332f2c",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    color: "#8a8580",
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#1a1816",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: "#e0dcd5",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#332f2c",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#5a5550",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxActive: {
    borderColor: "#ff6b00",
    backgroundColor: "rgba(255, 107, 0, 0.1)",
  },
  checkInner: {
    width: 12,
    height: 12,
    backgroundColor: "#ff6b00",
    borderRadius: 2,
  },
  checkboxLabel: {
    color: "#8a8580",
    fontSize: 13,
  },
  link: {
    color: "#ff6b00",
    fontWeight: "600",
  },
  primaryButton: {
    backgroundColor: "#ff6b00",
    borderRadius: 8,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#ff6b00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1,
  },
  orSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#332f2c",
  },
  orText: {
    color: "#5a5550",
    fontSize: 10,
    fontWeight: "700",
    paddingHorizontal: 12,
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    backgroundColor: "#1a1816",
    borderWidth: 1,
    borderColor: "#332f2c",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  socialBtnText: {
    color: "#e0dcd5",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
