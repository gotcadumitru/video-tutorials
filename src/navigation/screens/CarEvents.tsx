import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';

const EVENTS_DATA = [
  {
    id: '1',
    name: 'Grand Prix of Monaco',
    date: 'Sat, Nov 15th at 3:00 PM',
    location: 'Circuit de Monaco',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
  },
  {
    id: '2',
    name: 'Le Mans 24 Hours',
    date: 'Sun, Nov 23rd at 12:00 PM',
    location: 'Circuit de la Sarthe',
    image: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800&q=80',
  },
  {
    id: '3',
    name: 'Italian Grand Prix',
    date: 'Sat, Dec 6th at 2:00 PM',
    location: 'Autodromo Nazionale di Monza',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80',
  },
  {
    id: '4',
    name: 'Singapore Night Race',
    date: 'Sun, Dec 14th at 8:00 PM',
    location: 'Marina Bay Street Circuit',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80',
  },
  {
    id: '5',
    name: 'British Grand Prix',
    date: 'Sat, Dec 20th at 1:00 PM',
    location: 'Silverstone Circuit',
    image: 'https://images.unsplash.com/photo-1612810806695-30f7a8258391?w=800&q=80',
  },
];

const FEATURED_EVENT = {
  name: 'Abu Dhabi Grand Prix',
  date: 'Sunday, Nov 10th at 5:00 PM',
  location: 'Yas Marina Circuit',
  image: 'https://images.unsplash.com/photo-1536909526839-8f10e29ba80c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740',
};

export function CarEvents() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sport Car Events</Text>
        <TouchableOpacity style={styles.filterButton}>
          <View style={styles.filterIcon}>
            <View style={styles.filterLine} />
            <View style={styles.filterLine} />
            <View style={styles.filterLine} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Featured Event Card */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Event</Text>
          <View style={styles.featuredCard}>
            <ImageBackground
              source={{ uri: FEATURED_EVENT.image }}
              style={styles.featuredImagePlaceholder}
              resizeMode="cover"
            >
              <View style={styles.featuredOverlay}>
                <View style={styles.liveBadge}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>NEXT RACE</Text>
                </View>
              </View>
            </ImageBackground>
            <View style={styles.featuredContent}>
              <Text style={styles.featuredEventName}>{FEATURED_EVENT.name}</Text>
              <View style={styles.featuredDetails}>
                <View style={styles.detailRow}>
                  <View style={styles.iconPlaceholder}>
                    <Text style={styles.iconText}>📅</Text>
                  </View>
                  <Text style={styles.featuredDate}>{FEATURED_EVENT.date}</Text>
                </View>
                <View style={styles.detailRow}>
                  <View style={styles.iconPlaceholder}>
                    <Text style={styles.iconText}>📍</Text>
                  </View>
                  <Text style={styles.featuredLocation}>{FEATURED_EVENT.location}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.viewDetailsButton}>
                <Text style={styles.viewDetailsText}>View Details</Text>
                <Text style={styles.arrow}>→</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* All Upcoming Races */}
        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>All Upcoming Races</Text>
          {EVENTS_DATA.map((event) => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <Image 
                source={{ uri: event.image }}
                style={styles.eventThumbnail}
                resizeMode="cover"
              />
              <View style={styles.eventContent}>
                <View style={styles.eventHeader}>
                  <Text style={styles.eventName}>{event.name}</Text>
                  <View style={styles.urgencyDot} />
                </View>
                <View style={styles.eventDetail}>
                  <Text style={styles.iconText}>📅</Text>
                  <Text style={styles.eventDate}>{event.date}</Text>
                </View>
                <View style={styles.eventDetail}>
                  <Text style={styles.iconText}>📍</Text>
                  <Text style={styles.eventLocation}>{event.location}</Text>
                </View>
              </View>

            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#0A0A0A',
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E53935',
  },
  filterIcon: {
    width: 18,
    height: 14,
    justifyContent: 'space-between',
  },
  filterLine: {
    height: 2,
    backgroundColor: '#E53935',
    borderRadius: 1,
  },
  scrollView: {
    flex: 1,
  },
  featuredSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  featuredCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  featuredImagePlaceholder: {
    height: 200,
    backgroundColor: '#0F0F0F',
    position: 'relative',
  },
  featuredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E53935',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 6,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  featuredContent: {
    padding: 20,
  },
  featuredEventName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  featuredDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: {
    fontSize: 16,
  },
  featuredDate: {
    fontSize: 16,
    color: '#CCCCCC',
    fontWeight: '600',
  },
  featuredLocation: {
    fontSize: 16,
    color: '#CCCCCC',
    fontWeight: '600',
  },
  viewDetailsButton: {
    backgroundColor: '#E53935',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
    letterSpacing: 0.5,
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  listSection: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  eventCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  redAccent: {
    width: 4,
    height: '100%',
    backgroundColor: '#E53935',
  },
  eventThumbnail: {
    width: 100,
    height: "100%",
    backgroundColor: '#0F0F0F',
  },
  eventContent: {
    flex: 1,
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },
  urgencyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E53935',
    marginLeft: 8,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  eventDate: {
    fontSize: 14,
    color: '#999999',
    fontWeight: '500',
    marginLeft: 8,
  },
  eventLocation: {
    fontSize: 14,
    color: '#999999',
    fontWeight: '500',
    marginLeft: 8,
  },
  chevron: {
    paddingRight: 16,
  },
  chevronText: {
    fontSize: 28,
    color: '#E53935',
    fontWeight: '300',
  },
  bottomPadding: {
    height: 40,
  },
});