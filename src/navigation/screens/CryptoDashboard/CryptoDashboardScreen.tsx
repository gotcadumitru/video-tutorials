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

// Data arrays to eliminate duplication
const cryptoData = [
  { name: 'Bitcoin', symbol: 'BTC', icon: '₿', price: '$43,245.67', change: '+5.23%', isPositive: true, cardStyle: { backgroundColor: '#F7931A' } },
  { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', price: '$2,456.78', change: '+3.12%', isPositive: true, cardStyle: { backgroundColor: '#627EEA' } },
  { name: 'Solana', symbol: 'SOL', icon: '◎', price: '$98.45', change: '-2.34%', isPositive: false, cardStyle: { backgroundColor: '#14F195' } },
  { name: 'Cardano', symbol: 'ADA', icon: '₳', price: '$0.52', change: '+1.89%', isPositive: true, cardStyle: { backgroundColor: '#0033AD' } },
];

const distributionData = [
  { name: 'Bitcoin', color: '#F7931A', percentage: '45.2%', amount: '$56,234' },
  { name: 'Ethereum', color: '#627EEA', percentage: '32.8%', amount: '$40,857' },
  { name: 'Solana', color: '#14F195', percentage: '15.6%', amount: '$19,432' },
  { name: 'Cardano', color: '#0033AD', percentage: '6.4%', amount: '$7,972' },
];

const chartData = [45, 65, 80, 70, 90, 85, 95];

const actionData = [
  { icon: '📈', label: 'Buy', color: '#14F195' },
  { icon: '📉', label: 'Sell', color: '#FF6B9D' },
  { icon: '🔄', label: 'Swap', color: '#00D4FF' },
  { icon: '💸', label: 'Send', color: '#A78BFA' },
];

const transactionData = [
  { icon: '📥', type: 'Received BTC', time: '2 hours ago', amount: '+0.5 BTC', amountStyle: 'positive' as const, iconBg: '#00D4FF20' },
  { icon: '📤', type: 'Sent ETH', time: '5 hours ago', amount: '-2.5 ETH', amountStyle: 'negative' as const, iconBg: '#FF6B9D20' },
  { icon: '🔄', type: 'Swapped SOL', time: '1 day ago', amount: '50 SOL', amountStyle: 'neutral' as const, iconBg: '#14F19520' },
];
  const getTransactionAmountStyle = (style: 'positive' | 'negative' | 'neutral') => {
    const styleMap = {
      positive: styles.transactionAmountPositive,
      negative: styles.transactionAmountNegative,
      neutral: styles.transactionAmountNeutral,
    };
    return styleMap[style];
  };
export function CryptoDashboard() {

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0E27" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Crypto Dashboard</Text>
          <Text style={styles.headerSubtitle}>Your Portfolio</Text>
          <View style={styles.totalValueContainer}>
            <Text style={styles.totalValueLabel}>Total Balance</Text>
            <Text style={styles.totalValue}>$124,567.89</Text>
            <View style={styles.changeContainer}>
              <Text style={styles.changePositive}>+12.45%</Text>
              <Text style={styles.changeText}>24h</Text>
            </View>
          </View>
        </View>

        {/* Crypto Cards Grid */}
        <View style={styles.cardsGrid}>
          {cryptoData.map((crypto, index) => (
            <View key={index} style={[styles.cryptoCard, crypto.cardStyle]}>
              <View style={styles.cryptoHeader}>
                <View style={styles.cryptoIconContainer}>
                  <Text style={styles.cryptoIcon}>{crypto.icon}</Text>
                </View>
                <View style={styles.cryptoInfo}>
                  <Text style={styles.cryptoName}>{crypto.name}</Text>
                  <Text style={styles.cryptoSymbol}>{crypto.symbol}</Text>
                </View>
              </View>
              <Text style={styles.cryptoPrice}>{crypto.price}</Text>
              <View style={styles.cryptoChangeRow}>
                <Text style={crypto.isPositive ? styles.cryptoChangePositive : styles.cryptoChangeNegative}>
                  {crypto.change}
                </Text>
                <Text style={styles.cryptoChangeTime}>24h</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Portfolio Distribution */}
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Portfolio Distribution</Text>
          <View style={styles.distributionList}>
            {distributionData.map((item, index) => (
              <View key={index} style={styles.distributionItem}>
                <View style={styles.distributionLeft}>
                  <View style={[styles.distributionDot, { backgroundColor: item.color }]} />
                  <Text style={styles.distributionLabel}>{item.name}</Text>
                </View>
                <View style={styles.distributionRight}>
                  <Text style={styles.distributionValue}>{item.percentage}</Text>
                  <Text style={styles.distributionAmount}>{item.amount}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Market Trends */}
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Market Trends</Text>
          <View style={styles.chartContainer}>
            {chartData.map((height, index) => (
              <View key={index} style={styles.chartBar}>
                <View style={[styles.chartFill, { height: `${height}%`, backgroundColor: '#00D4FF' }]} />
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {actionData.map((action, index) => (
              <View key={index} style={[styles.actionButton, { backgroundColor: action.color }]}>
                <Text style={styles.actionButtonIcon}>{action.icon}</Text>
                <Text style={styles.actionButtonText}>{action.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Recent Transactions</Text>
          <View style={styles.transactionList}>
            {transactionData.map((transaction, index) => (
              <View key={index} style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={[styles.transactionIcon, { backgroundColor: transaction.iconBg }]}>
                    <Text style={styles.transactionIconText}>{transaction.icon}</Text>
                  </View>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionType}>{transaction.type}</Text>
                    <Text style={styles.transactionTime}>{transaction.time}</Text>
                  </View>
                </View>
                <Text style={getTransactionAmountStyle(transaction.amountStyle)}>
                  {transaction.amount}
                </Text>
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
    backgroundColor: '#0A0E27',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#1A1F3A',
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
    color: '#8B92B2',
    marginBottom: 20,
  },
  totalValueContainer: {
    backgroundColor: '#0A0E27',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
  },
  totalValueLabel: {
    fontSize: 14,
    color: '#8B92B2',
    marginBottom: 8,
  },
  totalValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00D4FF',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  changePositive: {
    fontSize: 16,
    fontWeight: '600',
    color: '#14F195',
  },
  changeText: {
    fontSize: 14,
    color: '#8B92B2',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    gap: 15,
  },
  cryptoCard: {
    width: (width - 45) / 2,
    borderRadius: 20,
    padding: 18,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cryptoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cryptoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF30',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cryptoIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cryptoInfo: {
    flex: 1,
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  cryptoSymbol: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  cryptoPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cryptoChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cryptoChangePositive: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#FFFFFF20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cryptoChangeNegative: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#FF6B9D40',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cryptoChangeTime: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7,
  },
  widget: {
    backgroundColor: '#1A1F3A',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 20,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  widgetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  distributionList: {
    gap: 15,
  },
  distributionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distributionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  distributionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  distributionLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  distributionRight: {
    alignItems: 'flex-end',
  },
  distributionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00D4FF',
    marginBottom: 2,
  },
  distributionAmount: {
    fontSize: 12,
    color: '#8B92B2',
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
    backgroundColor: '#0A0E27',
    borderRadius: 8,
    marginHorizontal: 3,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  chartFill: {
    width: '100%',
    borderRadius: 8,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    width: (width - 94) / 2,
    borderRadius: 15,
    padding: 18,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  actionButtonIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  transactionList: {
    gap: 15,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionIconText: {
    fontSize: 20,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  transactionTime: {
    fontSize: 12,
    color: '#8B92B2',
  },
  transactionAmountPositive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#14F195',
  },
  transactionAmountNegative: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B9D',
  },
  transactionAmountNeutral: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00D4FF',
  },
});

