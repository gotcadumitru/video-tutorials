import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width } = Dimensions.get('window');

export function Dashboard() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366F1" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>Welcome back!</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.statValue}>1,234</Text>
            <Text style={styles.statLabel}>Total Users</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.statValue}>$45.2K</Text>
            <Text style={styles.statLabel}>Revenue</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#FFE66D' }]}>
            <Text style={styles.statValue}>892</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#A78BFA' }]}>
            <Text style={styles.statValue}>98%</Text>
            <Text style={styles.statLabel}>Satisfaction</Text>
          </View>
        </View>

        {/* Activity Widget */}
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: '#FF6B6B' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>New user registered</Text>
                <Text style={styles.activityTime}>2 minutes ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: '#4ECDC4' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Order completed</Text>
                <Text style={styles.activityTime}>15 minutes ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: '#FFE66D' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Payment processed</Text>
                <Text style={styles.activityTime}>1 hour ago</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Progress Widget */}
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Monthly Goals</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Sales Target</Text>
                <Text style={styles.progressPercent}>75%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '75%', backgroundColor: '#FF6B6B' }]} />
              </View>
            </View>
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>User Growth</Text>
                <Text style={styles.progressPercent}>60%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '60%', backgroundColor: '#4ECDC4' }]} />
              </View>
            </View>
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Engagement</Text>
                <Text style={styles.progressPercent}>90%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '90%', backgroundColor: '#FFE66D' }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <View style={[styles.actionButton, { backgroundColor: '#6366F1' }]}>
              <Text style={styles.actionButtonText}>📊 Reports</Text>
            </View>
            <View style={[styles.actionButton, { backgroundColor: '#EC4899' }]}>
              <Text style={styles.actionButtonText}>⚙️ Settings</Text>
            </View>
            <View style={[styles.actionButton, { backgroundColor: '#10B981' }]}>
              <Text style={styles.actionButtonText}>👥 Users</Text>
            </View>
            <View style={[styles.actionButton, { backgroundColor: '#F59E0B' }]}>
              <Text style={styles.actionButtonText}>📈 Analytics</Text>
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
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#6366F1',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E0E7FF',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    gap: 15,
  },
  statCard: {
    width: (width - 45) / 2,
    borderRadius: 20,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  widget: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  widgetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  activityList: {
    gap: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 3,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  progressContainer: {
    gap: 20,
  },
  progressItem: {
    marginBottom: 5,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  progressPercent: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    width: (width - 74) / 2,
    borderRadius: 15,
    padding: 18,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

