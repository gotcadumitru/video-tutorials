import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const stories = [
  { id: '1', name: 'Ava', gradient: ['#F97316', '#F97316'] },
  { id: '2', name: 'Kai', gradient: ['#8B5CF6', '#6366F1'] },
  { id: '3', name: 'Luna', gradient: ['#EC4899', '#EF4444'] },
  { id: '4', name: 'Milo', gradient: ['#22C55E', '#0EA5E9'] },
  { id: '5', name: 'Ezra', gradient: ['#F59E0B', '#EF4444'] },
];

const feed = [
  {
    id: 'post-1',
    author: 'Jordan Lee',
    handle: '@jordan.design',
    time: '12m ago',
    text: 'Crafting a new brand language for a travel startup. Early explorations in motion and color.',
    tag: 'Case Study',
    stats: { likes: '1.4k', comments: '321', saves: '89' },
  },
  {
    id: 'post-2',
    author: 'Mia Carter',
    handle: '@miacodes',
    time: '32m ago',
    text: 'Dark mode dashboard shipped. Built with accessibility-first design and realtime analytics.',
    tag: 'Product Update',
    stats: { likes: '982', comments: '147', saves: '203' },
  },
];

const spaces = [
  { id: 'space-1', title: 'Design Sprints', members: '2.1k members', status: 'Live' },
  { id: 'space-2', title: 'AI Builders', members: '4.8k members', status: 'New drops daily' },
  { id: 'space-3', title: 'Indie Makers', members: '6.2k members', status: 'Trending' },
];

export function SocialMedia() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1120" />
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Night Mode</Text>
            <Text style={styles.subtitle}>Discover what your circle is sharing</Text>
          </View>
          <TouchableOpacity style={styles.avatarButton} activeOpacity={0.8}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=80&h=80&q=80' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.storiesRow}>
          {stories.map((story) => (
            <TouchableOpacity key={story.id} activeOpacity={0.85} style={styles.storyCard}>
              <View style={[styles.storyRing, { borderColor: story.gradient[0] }]}>
                <Image
                  source={{ uri: `https://api.dicebear.com/7.x/identicon/png?seed=${story.name}` }}
                  style={styles.storyAvatar}
                />
              </View>
              <Text style={styles.storyLabel}>{story.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your feed</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.sectionLink}>Filter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.feedStack}>
          {feed.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View>
                  <Text style={styles.postAuthor}>{post.author}</Text>
                  <Text style={styles.postMeta}>
                    {post.handle} · {post.time}
                  </Text>
                </View>
                <View style={styles.tagPill}>
                  <Text style={styles.tagText}>{post.tag}</Text>
                </View>
              </View>
              <Text style={styles.postText}>{post.text}</Text>
              <View style={styles.postFooter}>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.postStat}>❤ {post.stats.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.postStat}>💬 {post.stats.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.postStat}>🔖 {post.stats.saves}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Spaces for you</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.sectionLink}>Explore all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spaceStack}>
          {spaces.map((space) => (
            <TouchableOpacity key={space.id} activeOpacity={0.85} style={styles.spaceCard}>
              <View>
                <Text style={styles.spaceTitle}>{space.title}</Text>
                <Text style={styles.spaceMeta}>{space.members}</Text>
              </View>
              <Text style={styles.spaceStatus}>{space.status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const STORY_SIZE = 72;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
  },
  contentContainer: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    gap: 28,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 4,
    color: '#94A3B8',
    fontSize: 14,
  },
  avatarButton: {
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#1E293B',
    padding: 4,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  storiesRow: {
    flexDirection: 'row',
    gap: 18,
  },
  storyCard: {
    alignItems: 'center',
    gap: 8,
  },
  storyRing: {
    width: STORY_SIZE,
    height: STORY_SIZE,
    borderRadius: STORY_SIZE / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#020617',
  },
  storyAvatar: {
    width: STORY_SIZE - 12,
    height: STORY_SIZE - 12,
    borderRadius: (STORY_SIZE - 12) / 2,
  },
  storyLabel: {
    color: '#CBD5F5',
    fontSize: 12,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#E2E8F0',
    fontSize: 18,
    fontWeight: '700',
  },
  sectionLink: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '600',
  },
  feedStack: {
    gap: 20,
  },
  postCard: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 6,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postAuthor: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
  },
  postMeta: {
    marginTop: 4,
    color: '#94A3B8',
    fontSize: 13,
  },
  tagPill: {
    borderRadius: 999,
    backgroundColor: '#312E81',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    color: '#C7D2FE',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  postText: {
    color: '#E2E8F0',
    fontSize: 15,
    lineHeight: 22,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postStat: {
    color: '#CBD5F5',
    fontSize: 13,
    fontWeight: '600',
  },
  spaceStack: {
    gap: 16,
  },
  spaceCard: {
    width: width - 40,
    backgroundColor: '#111827',
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#1E293B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spaceTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
  },
  spaceMeta: {
    marginTop: 4,
    color: '#64748B',
    fontSize: 13,
  },
  spaceStatus: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '600',
  },
});


