import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const roomTypes = [
  {
    id: 'deluxe-suite',
    title: 'Deluxe Suite',
    subtitle: 'City skyline • King bed • 2 guests',
    price: '$239 / night',
    accent: '#6366F1',
  },
  {
    id: 'business-loft',
    title: 'Business Loft',
    subtitle: 'Workspace • Lounge • 3 guests',
    price: '$189 / night',
    accent: '#22C55E',
  },
  {
    id: 'premium-studio',
    title: 'Premium Studio',
    subtitle: 'Sea view • Queen bed • 2 guests',
    price: '$214 / night',
    accent: '#F97316',
  },
];

const amenities = [
  { id: 'spa', title: 'Spa Access', description: 'Full wellness experience', icon: '💆‍♂️' },
  { id: 'dining', title: 'Fine Dining', description: 'Chef’s tasting menu', icon: '🍽️' },
  { id: 'pickup', title: 'Airport Transfer', description: 'Private EV pickup', icon: '🚘' },
  { id: 'workspace', title: 'Executive Lounge', description: '24/7 co-working', icon: '💼' },
];

const durations = ['Weekend', '3 Nights', '5 Nights'];

export function Booking() {
  const [selectedDuration, setSelectedDuration] = useState(durations[0]);

  const headline = useMemo(
    () =>
      selectedDuration === 'Weekend'
        ? 'Escape for the weekend'
        : selectedDuration === '3 Nights'
        ? 'Stay a little longer'
        : 'Design your perfect stay',
    [selectedDuration],
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroTag}>
            <Text style={styles.heroTagText}>New</Text>
          </View>
          <Text style={styles.heroTitle}>Modern stays, curated for you</Text>
          <Text style={styles.heroSubtitle}>{headline}</Text>
          <View style={styles.durationPills}>
            {durations.map((duration) => {
              const active = duration === selectedDuration;
              return (
                <TouchableOpacity
                  key={duration}
                  style={[styles.durationPill, active && styles.durationPillActive]}
                  onPress={() => setSelectedDuration(duration)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.durationPillText, active && styles.durationPillTextActive]}>
                    {duration}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended suites</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.sectionLink}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardStack}>
          {roomTypes.map((room) => (
            <TouchableOpacity key={room.id} activeOpacity={0.85} style={styles.roomCard}>
              <View style={[styles.roomAccent, { backgroundColor: room.accent }]} />
              <View style={styles.roomContent}>
                <Text style={styles.roomTitle}>{room.title}</Text>
                <Text style={styles.roomSubtitle}>{room.subtitle}</Text>
                <View style={styles.roomFooter}>
                  <Text style={styles.roomPrice}>{room.price}</Text>
                  <Text style={styles.roomCTA}>Book now →</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const CARD_WIDTH = width - 36;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 28,
  },
  heroCard: {
    backgroundColor: '#F9FAFB',
    padding: 24,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 30,
    elevation: 4,
  },
  heroTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  heroTagText: {
    color: '#4338CA',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0.4,
  },
  heroTitle: {
    marginTop: 14,
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
  },
  heroSubtitle: {
    marginTop: 6,
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 22,
  },
  durationPills: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  durationPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
  },
  durationPillActive: {
    backgroundColor: '#111827',
  },
  durationPillText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '600',
  },
  durationPillTextActive: {
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  sectionLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
  cardStack: {
    gap: 18,
  },
  roomCard: {
    width: CARD_WIDTH,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    elevation: 3,
  },
  roomAccent: {
    height: 6,
    width: '100%',
  },
  roomContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 6,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  roomSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  roomFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  roomPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  roomCTA: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '600',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  amenityCard: {
    width: (CARD_WIDTH - 14) / 2,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  amenityIcon: {
    fontSize: 24,
  },
  amenityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  amenityDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  summaryCard: {
    backgroundColor: '#111827',
    borderRadius: 28,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTitle: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
  },
  summaryPrice: {
    marginTop: 6,
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },
  summaryCaption: {
    marginTop: 4,
    color: '#9CA3AF',
    fontSize: 12,
  },
  primaryButton: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 999,
  },
  primaryButtonText: {
    color: '#3730A3',
    fontSize: 14,
    fontWeight: '700',
  },
});


