import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const heroImage =
  'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1200&q=80';

const signatureLooks = [
  {
    id: 'look-1',
    name: 'After Hours Fade',
    description: 'Low fade, matte finish, cold towel seal',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'look-2',
    name: 'Modern Pompadour',
    description: 'Volume sculpt, high shine detail spray',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=70',
  },
];

const services = [
  { id: 'scalp', title: 'Scalp Reset', copy: 'Charcoal cleanse, steam therapy, tonic finish', length: '25 min' },
  { id: 'fade', title: 'Precision Fade', copy: 'Clipper fade with razor line-up and hot towel press', length: '45 min' },
  { id: 'shave', title: 'Straight Razor Shave', copy: 'Hot stones, botanical oil, double razor pass', length: '35 min' },
];

const pricing = [
  { id: 'classic', title: 'Classic Cut', caption: 'Consultation + tailored finish', price: '$32' },
  { id: 'combo', title: 'Cut & Shave', caption: 'Precision cut with razor finish', price: '$58' },
  { id: 'vip', title: 'Signature Session', caption: 'Full grooming ritual + refresh', price: '$84' },
];

const mapImage =
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80';

export function Barber() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={{ uri: heroImage }} style={styles.heroImage} />
          <View style={styles.heroGradient} />
          <View style={styles.heroContent}>
            <Text style={styles.heroKicker}>Barber Studio</Text>
            <Text style={styles.heroTitle}>District Twelve Barber Club</Text>
            <Text style={styles.heroSubtitle}>
              A monochrome lounge dedicated to crafted cuts, revived rituals, and understated detail.
            </Text>
          </View>
          <View style={styles.heroStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Years refining craft</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>6</Text>
              <Text style={styles.statLabel}>Master barbers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Complimentary pours</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionBadge}>The House</Text>
            <Text style={styles.sectionTitle}>Curated calm, razor sharp</Text>
          </View>
          <Text style={styles.sectionBody}>
            We built District Twelve for the urban minimalist: concrete, cedar, and soft light. Settle into the lounge,
            sip slow-drip espresso, and let the playlist guide the pace while our team shapes your signature look.
          </Text>
          <View style={styles.sectionBodyRow}>
            <Text style={styles.sectionBodyEmphasis}>• Membership waitlist open</Text>
            <Text style={styles.sectionBodyEmphasis}>• Walk-ins after 7PM lounge hours</Text>
          </View>
        </View>

        <View style={styles.servicesSection}>
          <View style={styles.sectionHeaderInline}>
            <Text style={styles.sectionBadge}>Services</Text>
            <Text style={styles.sectionTitle}>Cutting table</Text>
          </View>
          <View style={styles.serviceRow}>
            {services.map((service) => (
              <View key={service.id} style={styles.serviceTile}>
                <Text style={styles.serviceLength}>{service.length}</Text>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceCopy}>{service.copy}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.signatureSection}>
          <View style={styles.sectionHeaderInline}>
            <Text style={styles.sectionBadge}>Signature</Text>
            <Text style={styles.sectionTitle}>Looks on rotation</Text>
          </View>
          <View style={styles.signatureGrid}>
            {signatureLooks.map((look) => (
              <View key={look.id} style={styles.signatureCard}>
                <Image source={{ uri: look.image }} style={styles.signatureImage} />
                <View style={styles.signatureOverlay}>
                  <Text style={styles.signatureName}>{look.name}</Text>
                  <Text style={styles.signatureDescription}>{look.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.pricingSection}>
          <View style={styles.sectionHeaderInline}>
            <Text style={styles.sectionBadge}>Rates</Text>
            <Text style={styles.sectionTitle}>Menu</Text>
          </View>
          <View style={styles.pricingBoard}>
            {pricing.map((tier) => (
              <View key={tier.id} style={styles.pricingRow}>
                <View>
                  <Text style={styles.pricingTitle}>{tier.title}</Text>
                  <Text style={styles.pricingCaption}>{tier.caption}</Text>
                </View>
                <Text style={styles.pricingValue}>{tier.price}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.locationSection}>
          <View style={styles.sectionHeaderInline}>
            <Text style={styles.sectionBadge}>Find us</Text>
            <Text style={styles.sectionTitle}>The chair awaits</Text>
          </View>
          <Image source={{ uri: mapImage }} style={styles.mapImage} />
          <View style={styles.locationDetails}>
            <Text style={styles.locationLine}>48 Mercer Street, Warehouse District, NYC</Text>
            <Text style={styles.locationLine}>Tue – Sat · 10:00 – 21:00 · Lounge late Thursdays</Text>
            <Text style={styles.locationLine}>bookings@districttwelve.barber · (917) 555-0184</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    paddingTop: 48,
    paddingBottom: 56,
    paddingHorizontal: 20,
    gap: 36,
  },
  hero: {
    borderRadius: 32,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 280,
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
  },
  heroContent: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 96,
    gap: 10,
  },
  heroKicker: {
    color: '#38BDF8',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
  heroSubtitle: {
    color: '#CBD5F5',
    fontSize: 15,
    lineHeight: 22,
  },
  heroStats: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.72)',
    borderRadius: 22,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#1E293B',
  },
  sectionCard: {
    backgroundColor: '#111C30',
    borderRadius: 28,
    padding: 26,
    gap: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  sectionHeader: {
    gap: 10,
  },
  sectionHeaderInline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionBadge: {
    color: '#38BDF8',
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: '700',
  },
  sectionBody: {
    color: '#CBD5F5',
    fontSize: 15,
    lineHeight: 22,
  },
  sectionBodyRow: {
    gap: 6,
  },
  sectionBodyEmphasis: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '600',
  },
  servicesSection: {
    gap: 18,
  },
  serviceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  serviceTile: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#111C30',
    borderRadius: 24,
    padding: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  serviceLength: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  serviceTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '600',
  },
  serviceCopy: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 20,
  },
  signatureSection: {
    gap: 18,
  },
  signatureGrid: {
    gap: 16,
  },
  signatureCard: {
    borderRadius: 28,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#111C30',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  signatureImage: {
    width: '100%',
    height: 200,
  },
  signatureOverlay: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: 20,
    padding: 16,
    gap: 6,
  },
  signatureName: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '600',
  },
  signatureDescription: {
    color: '#CBD5F5',
    fontSize: 13,
  },
  pricingSection: {
    gap: 18,
  },
  pricingBoard: {
    backgroundColor: '#111C30',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#1E293B',
    paddingVertical: 12,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  pricingTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '600',
  },
  pricingCaption: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 4,
  },
  pricingValue: {
    color: '#38BDF8',
    fontSize: 16,
    fontWeight: '700',
  },
  locationSection: {
    gap: 18,
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 26,
  },
  locationDetails: {
    gap: 8,
    backgroundColor: '#111C30',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  locationLine: {
    color: '#CBD5F5',
    fontSize: 13,
  },
});

