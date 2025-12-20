import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';

export const MoviesCinema = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [seats, setSeats] = useState(1);

  const movies = [
    {
      id: 1,
      title: "Dune: Part Two",
      genre: "Sci-Fi/Adventure",
      duration: "166 min",
      rating: 8.8,
      price: 12.99,
      image: "https://beam-images.warnermediacdn.com/2024-05/scrid-1926466218111380_wb_duneparttwo_3000x3000_2024_lan-en-us_pur-tileburnedin.jpg?host=wbd-dotcom-drupal-prd-us-east-1.s3.amazonaws.com",
      times: ["10:30 AM", "2:15 PM", "6:00 PM", "9:30 PM"]
    },
    {
      id: 2,
      title: "Oppenheimer",
      genre: "Biography/Drama",
      duration: "180 min",
      rating: 8.5,
      price: 11.99,
      image: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg",
      times: ["11:00 AM", "3:30 PM", "7:45 PM"]
    },
    {
      id: 3,
      title: "The Batman",
      genre: "Action/Crime",
      duration: "176 min",
      rating: 8.2,
      price: 13.99,
      image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
      times: ["12:00 PM", "4:30 PM", "8:15 PM", "10:45 PM"]
    },
    {
      id: 4,
      title: "Barbie",
      genre: "Comedy/Fantasy",
      duration: "114 min",
      rating: 7.9,
      price: 10.99,
      image: "https://media.newyorker.com/photos/64baa7a29e87508ed764fdf3/4:3/w_1616,h_1212,c_limit/Brody-Barbie-Review.jpg",
      times: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"]
    }
  ];

  const handleReservation = () => {
    if (selectedMovie && selectedrTime && seats > 0) {
      const total = (selectedMovie.price * seats).toFixed(2);
      Alert.alert(
        'Reservation Confirmed! 🎉',
        `Movie: ${selectedMovie.title}\nTime: ${selectedTime}\nSeats: ${seats}\nTotal: $${total}\n\nEnjoy your movie!`,
        [
          {
            text: 'OK',
            onPress: () => {
              setSelectedMovie(null);
              setSelectedTime(null);
              setSeats(1);
            }
          }
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🎬 CineMax</Text>
          <Text style={styles.headerSubtitle}>📍 Downtown Theater - Now Showing</Text>
        </View>

        {/* Movies Grid */}
        <View style={styles.moviesContainer}>
          {movies.map((movie) => (
            <TouchableOpacity
              key={movie.id}
              style={[
                styles.movieCard,
                selectedMovie?.id === movie.id && styles.movieCardSelected
              ]}
              onPress={() => {
                setSelectedMovie(movie);
                setSelectedTime(null);
              }}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: movie.image }}
                style={styles.movieImage}
                resizeMode="cover"
              />
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>⭐ {movie.rating}</Text>
              </View>
              <View style={styles.movieInfo}>
                <Text style={styles.movieTitle}>{movie.title}</Text>
                <Text style={styles.movieGenre}>{movie.genre}</Text>
                <View style={styles.movieDetails}>
                  <Text style={styles.movieDuration}>🕐 {movie.duration}</Text>
                  <Text style={styles.moviePrice}>${movie.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Booking Section */}
        {selectedMovie && (
          <View style={styles.bookingContainer}>
            <Text style={styles.bookingTitle}>🎫 Complete Your Reservation</Text>

            {/* Showtimes */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select Showtime</Text>
              <View style={styles.timesGrid}>
                {selectedMovie.times.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeButton,
                      selectedTime === time && styles.timeButtonSelected
                    ]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text style={[
                      styles.timeButtonText,
                      selectedTime === time && styles.timeButtonTextSelected
                    ]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Seats */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Number of Seats</Text>
              <View style={styles.seatsControl}>
                <TouchableOpacity
                  style={styles.seatButton}
                  onPress={() => setSeats(Math.max(1, seats - 1))}
                >
                  <Text style={styles.seatButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.seatsNumber}>{seats}</Text>
                <TouchableOpacity
                  style={styles.seatButton}
                  onPress={() => setSeats(Math.min(10, seats + 1))}
                >
                  <Text style={styles.seatButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Summary */}
            <View style={styles.summary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Movie:</Text>
                <Text style={styles.summaryValue}>{selectedMovie.title}</Text>
              </View>
              {selectedTime && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Time:</Text>
                  <Text style={styles.summaryValue}>{selectedTime}</Text>
                </View>
              )}
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Seats:</Text>
                <Text style={styles.summaryValue}>{seats}</Text>
              </View>
              <View style={[styles.summaryRow, styles.summaryTotal]}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>
                  ${(selectedMovie.price * seats).toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Confirm Button */}
            <TouchableOpacity
              style={[
                styles.confirmButton,
                !selectedTime && styles.confirmButtonDisabled
              ]}
              onPress={handleReservation}
              disabled={!selectedTime}
            >
              <Text style={styles.confirmButtonText}>
                {selectedTime ? 'Confirm Reservation' : 'Select a Showtime'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
  moviesContainer: {
    paddingHorizontal: 20,
  },
  movieCard: {
    backgroundColor: '#1f1f2e',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  movieCardSelected: {
    borderColor: '#8b5cf6',
  },
  movieImage: {
    width: '100%',
    height: 400,
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fbbf24',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  movieInfo: {
    padding: 16,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  movieGenre: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 10,
  },
  movieDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movieDuration: {
    fontSize: 14,
    color: '#d1d5db',
  },
  moviePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#a78bfa',
  },
  bookingContainer: {
    backgroundColor: '#1f1f2e',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
  },
  bookingTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  timesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeButton: {
    backgroundColor: '#374151',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: '47%',
    alignItems: 'center',
  },
  timeButtonSelected: {
    backgroundColor: '#8b5cf6',
  },
  timeButtonText: {
    color: '#d1d5db',
    fontWeight: '600',
    fontSize: 14,
  },
  timeButtonTextSelected: {
    color: '#fff',
  },
  seatsControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  seatButton: {
    backgroundColor: '#374151',
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  seatsNumber: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    width: 60,
    textAlign: 'center',
  },
  summary: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    color: '#9ca3af',
    fontSize: 14,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: '#4b5563',
    paddingTop: 12,
    marginTop: 6,
    marginBottom: 0,
  },
  totalLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#a78bfa',
    fontSize: 24,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#4b5563',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});