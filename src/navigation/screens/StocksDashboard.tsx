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

// Data arrays for stocks
const stocksData = [
  { name: 'Apple Inc.', symbol: 'AAPL', price: '$178.45', change: '+2.34%', isPositive: true, color: '#007AFF' },
  { name: 'Google', symbol: 'GOOGL', price: '$142.67', change: '+1.89%', isPositive: true, color: '#4285F4' },
  { name: 'Microsoft', symbol: 'MSFT', price: '$378.92', change: '-0.56%', isPositive: false, color: '#00A4EF' },
  { name: 'Tesla', symbol: 'TSLA', price: '$248.12', change: '+4.12%', isPositive: true, color: '#E31937' },
];

const portfolioData = [
  { name: 'Technology', percentage: '42.5%', amount: '$125,450', color: '#007AFF' },
  { name: 'Healthcare', percentage: '28.3%', amount: '$83,200', color: '#34C759' },
  { name: 'Finance', percentage: '18.7%', amount: '$55,100', color: '#FF9500' },
  { name: 'Energy', percentage: '10.5%', amount: '$30,950', color: '#FF3B30' },
];

const chartData = [52, 68, 75, 62, 88, 82, 95];

const watchlistData = [
  { symbol: 'AMZN', name: 'Amazon', price: '$145.23', change: '+1.2%', isPositive: true },
  { symbol: 'META', name: 'Meta', price: '$312.45', change: '-0.8%', isPositive: false },
  { symbol: 'NVDA', name: 'NVIDIA', price: '$485.67', change: '+3.5%', isPositive: true },
  { symbol: 'JPM', name: 'JPMorgan', price: '$156.78', change: '+0.9%', isPositive: true },
];

const recentTradesData = [
  { type: 'Buy', symbol: 'AAPL', shares: '10 shares', price: '$178.45', time: '2 hours ago', typeStyle: 'buy' as const },
  { type: 'Sell', symbol: 'GOOGL', shares: '5 shares', price: '$142.67', time: '5 hours ago', typeStyle: 'sell' as const },
  { type: 'Buy', symbol: 'TSLA', shares: '15 shares', price: '$248.12', time: '1 day ago', typeStyle: 'buy' as const },
];

const getTradeTypeStyle = (style: 'buy' | 'sell') => {
    const styleMap = {
      buy: styles.tradeTypeBuy,
      sell: styles.tradeTypeSell,
    };
    return styleMap[style];
  };

export function StocksDashboard() {


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A0B2E" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerTitle}>Stocks Dashboard</Text>
              <Text style={styles.headerSubtitle}>Portfolio Overview</Text>
            </View>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>🔔</Text>
            </View>
          </View>
          <View style={styles.totalValueContainer}>
            <Text style={styles.totalValueLabel}>Total Portfolio Value</Text>
            <Text style={styles.totalValue}>$294,700.00</Text>
            <View style={styles.changeContainer}>
              <Text style={styles.changePositive}>+$12,450.00</Text>
              <Text style={styles.changeText}>(+4.41%)</Text>
            </View>
          </View>
        </View>
        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <View style={[styles.actionButton, styles.actionBuy]}>
            <Text style={styles.actionButtonIcon}>📈</Text>
            <Text style={styles.actionButtonText}>Buy</Text>
          </View>
          <View style={[styles.actionButton, styles.actionSell]}>
            <Text style={styles.actionButtonIcon}>📉</Text>
            <Text style={styles.actionButtonText}>Sell</Text>
          </View>
          <View style={[styles.actionButton, styles.actionResearch]}>
            <Text style={styles.actionButtonIcon}>🔍</Text>
            <Text style={styles.actionButtonText}>Research</Text>
          </View>
        </View>

        {/* Stocks Cards */}
        <View style={styles.stocksSection}>
          <Text style={styles.sectionTitle}>Top Holdings</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.stocksScrollContent}
          >
            {stocksData.map((stock, index) => (
              <View key={index} style={styles.stockCard}>
                <View style={styles.stockHeader}>
                  <View style={[styles.stockIcon, { backgroundColor: `${stock.color}20` }]}>
                    <Text style={[styles.stockIconText, { color: stock.color }]}>
                      {stock.symbol.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.stockInfo}>
                    <Text style={styles.stockSymbol}>{stock.symbol}</Text>
                    <Text style={styles.stockName} numberOfLines={1}>{stock.name}</Text>
                  </View>
                </View>
                <Text style={styles.stockPrice}>{stock.price}</Text>
                <View style={styles.stockChangeRow}>
                  <Text style={stock.isPositive ? styles.stockChangePositive : styles.stockChangeNegative}>
                    {stock.change}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Portfolio Distribution */}
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Portfolio by Sector</Text>
          <View style={styles.distributionList}>
            {portfolioData.map((item, index) => (
              <View key={index} style={styles.distributionItem}>
                <View style={styles.distributionLeft}>
                  <View style={[styles.distributionDot, { backgroundColor: item.color }]} />
                  <View style={styles.distributionInfo}>
                    <Text style={styles.distributionLabel}>{item.name}</Text>
                    <Text style={styles.distributionAmount}>{item.amount}</Text>
                  </View>
                </View>
                <Text style={styles.distributionValue}>{item.percentage}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Market Performance Chart */}
        <View style={styles.widget}>
          <View style={styles.widgetHeader}>
            <Text style={styles.widgetTitle}>Market Performance</Text>
            <Text style={styles.widgetSubtitle}>7 Days</Text>
          </View>
          <View style={styles.chartContainer}>
            {chartData.map((height, index) => (
              <View key={index} style={styles.chartBar}>
                <View style={[styles.chartFill, { height: `${height}%`, backgroundColor: '#A855F7' }]} />
              </View>
            ))}
          </View>
        </View>

        {/* Watchlist */}
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Watchlist</Text>
          <View style={styles.watchlistList}>
            {watchlistData.map((item, index) => (
              <View key={index} style={styles.watchlistItem}>
                <View style={styles.watchlistLeft}>
                  <View style={styles.watchlistIcon}>
                    <Text style={styles.watchlistIconText}>{item.symbol.charAt(0)}</Text>
                  </View>
                  <View style={styles.watchlistInfo}>
                    <Text style={styles.watchlistSymbol}>{item.symbol}</Text>
                    <Text style={styles.watchlistName}>{item.name}</Text>
                  </View>
                </View>
                <View style={styles.watchlistRight}>
                  <Text style={styles.watchlistPrice}>{item.price}</Text>
                  <Text style={item.isPositive ? styles.watchlistChangePositive : styles.watchlistChangeNegative}>
                    {item.change}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Trades */}
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Recent Trades</Text>
          <View style={styles.tradesList}>
            {recentTradesData.map((trade, index) => (
              <View key={index} style={styles.tradeItem}>
                <View style={styles.tradeLeft}>
                  <View style={[styles.tradeIcon, getTradeTypeStyle(trade.typeStyle)]}>
                    <Text style={styles.tradeIconText}>
                      {trade.type === 'Buy' ? '↑' : '↓'}
                    </Text>
                  </View>
                  <View style={styles.tradeInfo}>
                    <Text style={styles.tradeType}>{trade.type} {trade.symbol}</Text>
                    <Text style={styles.tradeDetails}>{trade.shares} @ {trade.price}</Text>
                  </View>
                </View>
                <Text style={styles.tradeTime}>{trade.time}</Text>
              </View>
            ))}
          </View>
        </View>


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0B2E',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#2D1B3D',
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#4A2C5A',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#B19CD9',
  },
  notificationBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A2C5A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 20,
  },
  totalValueContainer: {
    backgroundColor: '#1A0B2E',
    borderRadius: 16,
    padding: 18,
  },
  totalValueLabel: {
    fontSize: 12,
    color: '#B19CD9',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  totalValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#A855F7',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  changePositive: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
  changeText: {
    fontSize: 14,
    color: '#B19CD9',
  },
  stocksSection: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  stocksScrollContent: {
    gap: 12,
    paddingRight: 20,
  },
  stockCard: {
    width: 160,
    backgroundColor: '#2D1B3D',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#4A2C5A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  stockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stockIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stockIconText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockInfo: {
    flex: 1,
  },
  stockSymbol: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  stockName: {
    fontSize: 11,
    color: '#B19CD9',
  },
  stockPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  stockChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockChangePositive: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10B981',
    backgroundColor: '#064E3B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  stockChangeNegative: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F472B6',
    backgroundColor: '#831843',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  widget: {
    backgroundColor: '#2D1B3D',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#4A2C5A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  widgetSubtitle: {
    fontSize: 12,
    color: '#B19CD9',
    fontWeight: '500',
  },
  distributionList: {
    gap: 12,
  },
  distributionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  distributionLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  distributionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  distributionInfo: {
    flex: 1,
  },
  distributionLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    marginBottom: 2,
  },
  distributionAmount: {
    fontSize: 12,
    color: '#B19CD9',
  },
  distributionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A855F7',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    paddingHorizontal: 5,
  },
  chartBar: {
    flex: 1,
    height: '100%',
    backgroundColor: '#1A0B2E',
    borderRadius: 8,
    marginHorizontal: 3,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  chartFill: {
    width: '100%',
    borderRadius: 8,
  },
  watchlistList: {
    gap: 12,
  },
  watchlistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  watchlistLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  watchlistIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A2C5A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  watchlistIconText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B19CD9',
  },
  watchlistInfo: {
    flex: 1,
  },
  watchlistSymbol: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  watchlistName: {
    fontSize: 12,
    color: '#B19CD9',
  },
  watchlistRight: {
    alignItems: 'flex-end',
  },
  watchlistPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  watchlistChangePositive: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  watchlistChangeNegative: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F472B6',
  },
  tradesList: {
    gap: 12,
  },
  tradeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  tradeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tradeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tradeIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tradeInfo: {
    flex: 1,
  },
  tradeType: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  tradeDetails: {
    fontSize: 12,
    color: '#B19CD9',
  },
  tradeTime: {
    fontSize: 12,
    color: '#8B5CF6',
  },
  tradeTypeBuy: {
    backgroundColor: '#10B981',
  },
  tradeTypeSell: {
    backgroundColor: '#F472B6',
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 25,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  actionBuy: {
    backgroundColor: '#10B981',
  },
  actionSell: {
    backgroundColor: '#F472B6',
  },
  actionResearch: {
    backgroundColor: '#A855F7',
  },
  actionButtonIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

