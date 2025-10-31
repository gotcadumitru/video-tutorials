import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet, ImageBackground } from 'react-native';

// Reuse some placeholder images from the Instagram demo assets
import profileImg from '../Instagram/instagramIcons/my_image.jpg';
import pinIcon from '../Instagram/instagramIcons/big-plus.png';
import playIcon from '../Instagram/instagramIcons/play.png';
import gridIcon from '../Instagram/instagramIcons/home.png';
import lockIcon from '../Instagram/instagramIcons/person.png';

// Thumbnails: use a few random people images as placeholders
import thumb1 from '../Instagram/instagramIcons/randpom-person-1.jpg';
import thumb2 from '../Instagram/instagramIcons/randpom-person-2.jpg';
import thumb3 from '../Instagram/instagramIcons/randpom-person-3.jpg';
import thumb4 from '../Instagram/instagramIcons/randpom-person-4.jpg';
import thumb5 from '../Instagram/instagramIcons/randpom-person-5.jpg';
import thumb6 from '../Instagram/instagramIcons/randpom-person-6.jpg';

const thumbnails = [thumb1, thumb2, thumb3, thumb4, thumb5, thumb6];

export default function TikTokProfile() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header area with avatar and actions */}
      <View style={styles.headerBlock}>
        <View style={styles.avatarWrap}>
          <Image source={profileImg} style={styles.avatar} />
          <View style={styles.addBadge}>
            <Image source={pinIcon} style={styles.addBadgeIcon} />
          </View>
        </View>
        <View style={styles.headerTextBlock}>
          <Text style={styles.username}>robert_developer</Text>
          <Text style={styles.handle}>@robert_developer</Text>
        </View>
        <View style={styles.actionRow}>
          <View style={styles.editButton}><Text style={styles.editText}>Edit</Text></View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>1,667</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>94.5K</Text>
          <Text style={styles.statLabel}>Likes</Text>
        </View>
      </View>

      {/* Bio */}
      <View style={styles.bioBlock}>
        <Text style={styles.bioText}>Web + Mobile Dev in short videos 💻 | Projects, tutorials & coding explained</Text>
        <Text style={styles.linkText}>⭐ TikTok Studio</Text>
      </View>

      {/* Tabs row (grid, lock, favorites) */}
      <View style={styles.tabsRow}>
        <Image source={gridIcon} style={[styles.tabIcon, styles.tabIconActive]} />
        <Image source={lockIcon} style={styles.tabIcon} />
        <Image source={lockIcon} style={styles.tabIcon} />
      </View>

      {/* Stories banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>View expired Stories in “Your private videos”</Text>
      </View>

      {/* Grid with 6 items and pinned labels on first three */}
      <View style={styles.grid}>
        {thumbnails.map((src, index) => (
          <View key={index} style={styles.cell}>
            {index < 3 && (
              <View style={styles.pinnedBadge}><Text style={styles.pinnedText}>Pinned</Text></View>
            )}
            <ImageBackground source={src} style={styles.thumb}>
              <View style={styles.videoMeta}>
                <Image source={playIcon} style={styles.playIcon} />
                <Text style={styles.playCount}>{["339.9K","366.8K","526.1K","","","" ][index] || ''}</Text>
              </View>
            </ImageBackground>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    paddingBottom: 24,
  },
  headerBlock: {
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  avatarWrap: {
    alignSelf: 'center',
    width: 96,
    height: 96,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 48,
  },
  addBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    backgroundColor: '#0ea5e9',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000',
  },
  addBadgeIcon: {
    width: 16,
    height: 16,
    tintColor: '#fff',
  },
  headerTextBlock: {
    alignItems: 'center',
    marginTop: 12,
  },
  username: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  handle: {
    color: '#9ca3af',
    marginTop: 2,
  },
  actionRow: {
    marginTop: 10,
    alignItems: 'center',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#262626',
  },
  editText: {
    color: '#fff',
    fontWeight: '600',
  },
  statsRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 12,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 2,
  },
  bioBlock: {
    marginTop: 14,
    paddingHorizontal: 20,
  },
  bioText: {
    color: '#fff',
    lineHeight: 18,
  },
  linkText: {
    color: '#f43f5e',
    marginTop: 8,
    fontWeight: '700',
  },
  tabsRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 6,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#1f2937',
  },
  tabIcon: {
    width: 20,
    height: 20,
    tintColor: '#9ca3af',
  },
  tabIconActive: {
    tintColor: '#fff',
  },
  banner: {
    marginTop: 8,
    marginHorizontal: 12,
    backgroundColor: '#0b0b0b',
    borderWidth: 1,
    borderColor: '#1f2937',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  bannerText: {
    color: '#d1d5db',
  },
  grid: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '33.3333%',
    aspectRatio: 0.75,
    padding: 1,
  },
  thumb: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  videoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  playIcon: {
    width: 12,
    height: 12,
    tintColor: '#fff',
    marginRight: 4,
  },
  playCount: {
    color: '#fff',
    fontSize: 12,
  },
  pinnedBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 1,
    backgroundColor: '#ef4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pinnedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});



