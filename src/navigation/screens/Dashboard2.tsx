import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
const { width } = Dimensions.get('window');

export function Dashboard2() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FF6B9D" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Gradient Header Section */}
        <View style={styles.gradientHeader}>
          <View style={styles.headerContent}>
            <Text style={styles.headerEmoji}>✨</Text>
            <Text style={styles.headerTitle}>Modern Dashboard</Text>
            <Text style={styles.headerSubtitle}>Your analytics at a glance</Text>
          </View>
        </View>

        {/* Main Stats Row - Horizontal Scroll Style */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.horizontalContent}
        >
          <View style={[styles.horizontalCard, styles.cardGradient1]}>
            <Text style={styles.cardEmoji}>💎</Text>
            <Text style={styles.cardValue}>2.4K</Text>
            <Text style={styles.cardLabel}>Active Users</Text>
          </View>
          <View style={[styles.horizontalCard, styles.cardGradient2]}>
            <Text style={styles.cardEmoji}>🚀</Text>
            <Text style={styles.cardValue}>$12.5K</Text>
            <Text style={styles.cardLabel}>Revenue</Text>
          </View>
          <View style={[styles.horizontalCard, styles.cardGradient3]}>
            <Text style={styles.cardEmoji}>⭐</Text>
            <Text style={styles.cardValue}>4.8</Text>
            <Text style={styles.cardLabel}>Rating</Text>
          </View>
        </ScrollView>

        {/* Glassmorphism Widgets Section */}
        <View style={styles.widgetsSection}>
          {/* Top Performance Widget */}
          <View style={styles.glassWidget}>
            <View style={styles.widgetHeader}>
              <Text style={styles.widgetIcon}>📊</Text>
              <Text style={styles.widgetTitle}>Performance</Text>
            </View>
            <View style={styles.performanceRow}>
              <View style={styles.performanceItem}>
                <Text style={styles.performanceValue}>87%</Text>
                <Text style={styles.performanceLabel}>CPU</Text>
              </View>
              <View style={styles.performanceDivider} />
              <View style={styles.performanceItem}>
                <Text style={styles.performanceValue}>64%</Text>
                <Text style={styles.performanceLabel}>Memory</Text>
              </View>
              <View style={styles.performanceDivider} />
              <View style={styles.performanceItem}>
                <Text style={styles.performanceValue}>92%</Text>
                <Text style={styles.performanceLabel}>Storage</Text>
              </View>
            </View>
          </View>

          {/* Chart Widget */}
          <View style={styles.glassWidget}>
            <View style={styles.widgetHeader}>
              <Text style={styles.widgetIcon}>📈</Text>
              <Text style={styles.widgetTitle}>Growth Chart</Text>
            </View>
            <View style={styles.chartContainer}>
              <View style={styles.chartBar}>
                <View style={[styles.chartFill, { height: '60%', backgroundColor: '#FF6B9D' }]} />
              </View>
              <View style={styles.chartBar}>
                <View style={[styles.chartFill, { height: '80%', backgroundColor: '#4ECDC4' }]} />
              </View>
              <View style={styles.chartBar}>
                <View style={[styles.chartFill, { height: '45%', backgroundColor: '#FFE66D' }]} />
              </View>
              <View style={styles.chartBar}>
                <View style={[styles.chartFill, { height: '95%', backgroundColor: '#A78BFA' }]} />
              </View>
              <View style={styles.chartBar}>
                <View style={[styles.chartFill, { height: '70%', backgroundColor: '#FF6B9D' }]} />
              </View>
              <View style={styles.chartBar}>
                <View style={[styles.chartFill, { height: '85%', backgroundColor: '#EC4899' }]} />
              </View>
            </View>
          </View>

          {/* Quick Stats List */}
          <View style={styles.glassWidget}>
            <View style={styles.widgetHeader}>
              <Text style={styles.widgetIcon}>⚡</Text>
              <Text style={styles.widgetTitle}>Quick Stats</Text>
            </View>
            <View style={styles.statsList}>
              <View style={styles.statRow}>
                <View style={styles.statLeft}>
                  <Text style={styles.statIcon}>🎯</Text>
                  <View>
                    <Text style={styles.statText}>Goals Completed</Text>
                    <Text style={styles.statSubtext}>This month</Text>
                  </View>
                </View>
                <Text style={styles.statNumber}>24</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statRow}>
                <View style={styles.statLeft}>
                  <Text style={styles.statIcon}>🔥</Text>
                  <View>
                    <Text style={styles.statText}>Streak</Text>
                    <Text style={styles.statSubtext}>Days in a row</Text>
                  </View>
                </View>
                <Text style={styles.statNumber}>12</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statRow}>
                <View style={styles.statLeft}>
                  <Text style={styles.statIcon}>🏆</Text>
                  <View>
                    <Text style={styles.statText}>Achievements</Text>
                    <Text style={styles.statSubtext}>Unlocked</Text>
                  </View>
                </View>
                <Text style={styles.statNumber}>8</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={[styles.actionBtn, styles.actionBtnPrimary]}>
              <Text style={styles.actionBtnText}>🎨 Customize</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.actionBtnSecondary]}>
              <Text style={styles.actionBtnText}>📱 Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  gradientHeader: {
    backgroundColor: '#FF6B9D',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    letterSpacing: 0.5,
  },
  horizontalScroll: {
    marginTop: 20,
    marginBottom: 10,
  },
  horizontalContent: {
    paddingHorizontal: 20,
    gap: 15,
  },
  horizontalCard: {
    width: 160,
    borderRadius: 25,
    padding: 25,
    marginRight: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardGradient1: {
    backgroundColor: '#FF6B9D',
  },
  cardGradient2: {
    backgroundColor: '#4ECDC4',
  },
  cardGradient3: {
    backgroundColor: '#FFE66D',
  },
  cardEmoji: {
    fontSize: 32,
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  cardLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
    fontWeight: '500',
  },
  widgetsSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  glassWidget: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFE5ED',
    elevation: 3,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  widgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  widgetIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  performanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  performanceItem: {
    alignItems: 'center',
  },
  performanceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B9D',
    marginBottom: 5,
  },
  performanceLabel: {
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
  },
  performanceDivider: {
    width: 2,
    height: 40,
    backgroundColor: '#FFE5ED',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    paddingHorizontal: 10,
  },
  chartBar: {
    flex: 1,
    height: '100%',
    backgroundColor: '#FFE5ED',
    borderRadius: 8,
    marginHorizontal: 3,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  chartFill: {
    width: '100%',
    borderRadius: 8,
  },
  statsList: {
    gap: 0,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  statLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  statText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  statSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4ECDC4',
  },
  statDivider: {
    height: 1,
    backgroundColor: '#FFE5ED',
    marginVertical: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  actionBtn: {
    flex: 1,
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  actionBtnPrimary: {
    backgroundColor: '#FF6B9D',
  },
  actionBtnSecondary: {
    backgroundColor: '#4ECDC4',
  },
  actionBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

