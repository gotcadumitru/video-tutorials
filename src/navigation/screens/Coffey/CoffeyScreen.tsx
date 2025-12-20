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
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80';

const productImages = [
  'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1464306076886-da185f6a9d05?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80',
];

const priceList = [
  { id: 'espresso', title: 'Espresso', description: 'Single origin, slow roasted beans', price: '$3.20' },
  { id: 'flat-white', title: 'Flat White', description: 'Velvety milk, honey drizzle', price: '$4.60' },
  { id: 'cold-brew', title: 'Cold Brew', description: '18-hour brew, citrus finish', price: '$5.10' },
  { id: 'pour-over', title: 'Pour Over', description: 'Hand-crafted seasonal roast', price: '$4.90' },
];

export function Coffey() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F1EA" />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <Image source={{ uri: heroImage }} style={styles.heroImage} />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Coffey Atelier</Text>
            <Text style={styles.heroSubtitle}>Handcrafted coffee moments, one cup at a time.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>About Us</Text>
          <Text style={styles.sectionTitle}>Minimalist vibes, soulful brews</Text>
          <Text style={styles.sectionBody}>
            Nestled in the heart of the creative district, Coffey Atelier is a slow-coffee sanctuary inspired by
            Scandinavian design. We roast in micro batches, source responsibly, and brew with intention so every sip
            tastes like a pause worth taking.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Our Products</Text>
          <Text style={styles.sectionTitle}>Favorites curated for every ritual</Text>
          <View style={styles.productGrid}>
            {productImages.map((uri, index) => (
              <View key={uri} style={styles.productCard}>
                <Image source={{ uri }} style={styles.productImage} />
                <Text style={styles.productName}>
                  {index === 0 && 'Hazelnut Latte'}
                  {index === 1 && 'Charcoal Mocha'}
                  {index === 2 && 'Iced Matcha Espresso'}
                </Text>
                <Text style={styles.productTag}>Seasonal</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Prices</Text>
          <Text style={styles.sectionTitle}>Simple menu, quality first</Text>
          <View style={styles.priceList}>
            {priceList.map((item) => (
              <View key={item.id} style={styles.priceRow}>
                <View>
                  <Text style={styles.priceTitle}>{item.title}</Text>
                  <Text style={styles.priceDescription}>{item.description}</Text>
                </View>
                <Text style={styles.priceValue}>{item.price}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Location</Text>
          <Text style={styles.sectionTitle}>Find us in the creative quarter</Text>
          <View style={styles.locationCard}>
            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText}>122 Artisan Lane, Creative District, Portland</Text>
            </View>
            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>🕰️</Text>
              <Text style={styles.locationText}>Mon - Sat · 8:00 AM - 7:00 PM</Text>
            </View>
            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>☎️</Text>
              <Text style={styles.locationText}>+1 (503) 555-0145</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1EA',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 68,
    paddingBottom: 40,
    gap: 36,
  },
  heroCard: {
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#E7E0D9',
    height: 260,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heroSubtitle: {
    marginTop: 8,
    color: '#F8FAFC',
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    gap: 12,
  },
  sectionLabel: {
    fontSize: 12,
    letterSpacing: 1.6,
    color: '#9A7E5C',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 22,
    color: '#2F2A23',
    fontWeight: '700',
  },
  sectionBody: {
    fontSize: 15,
    lineHeight: 22,
    color: '#5C554C',
  },
  productGrid: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  productCard: {
    width: '30%',
    minWidth: 110,
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#EFEAE4',
  },
  productImage: {
    width: '100%',
    height: 120,
  },
  productName: {
    paddingHorizontal: 12,
    paddingTop: 12,
    color: '#3D352C',
    fontSize: 14,
    fontWeight: '600',
  },
  productTag: {
    paddingHorizontal: 12,
    paddingBottom: 14,
    color: '#9A7E5C',
    fontSize: 12,
    letterSpacing: 1,
  },
  priceList: {
    gap: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#EFEAE4',
    borderRadius: 24,
  },
  priceTitle: {
    color: '#2F2A23',
    fontSize: 16,
    fontWeight: '600',
  },
  priceDescription: {
    marginTop: 4,
    color: '#7A7265',
    fontSize: 13,
  },
  priceValue: {
    color: '#2F2A23',
    fontSize: 16,
    fontWeight: '700',
  },
  locationCard: {
    gap: 14,
    padding: 22,
    backgroundColor: '#EFEAE4',
    borderRadius: 28,
  },
  locationRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 18,
  },
  locationText: {
    color: '#5C554C',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
});


