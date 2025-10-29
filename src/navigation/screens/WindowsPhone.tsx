import { Text } from '@react-navigation/elements';
import { StaticScreenProps } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = StaticScreenProps<{}>;

export function WindowsPhone({}: Props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000000',
      }}
    >
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          padding: 4,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ marginBottom: 8 }}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 32,
              fontWeight: '200',
              marginBottom: 4,
            }}
          >
            start
          </Text>
        </View>

        {/* First Row */}
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {/* Phone Tile */}
          <TouchableOpacity
            style={{
              width: '48%',
              height: 150,
              backgroundColor: '#0078D7',
              padding: 16,
              justifyContent: 'space-between',
            }}
            activeOpacity={0.8}
          >
            <View>
              <Text style={{ color: '#FFFFFF', fontSize: 40 }}>
                📞
              </Text>
            </View>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: '300',
              }}
            >
              Phone
            </Text>
          </TouchableOpacity>

          {/* Messages Tile */}
          <TouchableOpacity
            style={{
              width: '48%',
              height: 150,
              backgroundColor: '#00A300',
              padding: 16,
              justifyContent: 'space-between',
            }}
            activeOpacity={0.8}
          >
            <View>
              <View>
                <Text style={{ color: '#FFFFFF', fontSize: 40 }}>
                  💬
                </Text>
                <Text style={{ color: '#FFFFFF', fontSize: 12, marginTop: 8 }}>
                  3 new
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: '300',
              }}
            >
              Messages
            </Text>
          </TouchableOpacity>
        </View>

        {/* Second Row - Weather Wide Tile */}
        <TouchableOpacity
          style={{
            width: '100%',
            height: 150,
            backgroundColor: '#0078D7',
            padding: 16,
            justifyContent: 'space-between',
          }}
          activeOpacity={0.8}
        >
          <View>
            <View>
              <Text style={{ color: '#FFFFFF', fontSize: 56, fontWeight: '200' }}>
                72°
              </Text>
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '300' }}>
                Partly Cloudy
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 18,
              fontWeight: '300',
            }}
          >
            Weather
          </Text>
        </TouchableOpacity>

        {/* Third Row */}
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {/* Calendar Tile */}
          <TouchableOpacity
            style={{
              width: '48%',
              height: 150,
              backgroundColor: '#E74856',
              padding: 16,
              justifyContent: 'space-between',
            }}
            activeOpacity={0.8}
          >
            <View>
              <View>
                <Text style={{ color: '#FFFFFF', fontSize: 72, fontWeight: '200' }}>
                  16
                </Text>
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '300' }}>
                  Wednesday
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: '300',
              }}
            >
              Calendar
            </Text>
          </TouchableOpacity>

          {/* Mail Tile */}
          <TouchableOpacity
            style={{
              width: '48%',
              height: 150,
              backgroundColor: '#0063B1',
              padding: 16,
              justifyContent: 'space-between',
            }}
            activeOpacity={0.8}
          >
            <View>
              <View>
                <Text style={{ color: '#FFFFFF', fontSize: 48, fontWeight: '200' }}>
                  12
                </Text>
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '300' }}>
                  new messages
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: '300',
              }}
            >
              Mail
            </Text>
          </TouchableOpacity>
        </View>

        {/* Fourth Row */}
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {/* Photos Tile */}
          <TouchableOpacity
            style={{
              width: '48%',
              height: 150,
              backgroundColor: '#E3008C',
              padding: 16,
              justifyContent: 'space-between',
            }}
            activeOpacity={0.8}
          >
            <View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                <View style={{ width: 48, height: 48, backgroundColor: 'rgba(255,255,255,0.3)' }} />
                <View style={{ width: 48, height: 48, backgroundColor: 'rgba(255,255,255,0.4)' }} />
                <View style={{ width: 48, height: 48, backgroundColor: 'rgba(255,255,255,0.3)' }} />
                <View style={{ width: 48, height: 48, backgroundColor: 'rgba(255,255,255,0.4)' }} />
              </View>
            </View>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: '300',
              }}
            >
              Photos
            </Text>
          </TouchableOpacity>

          {/* Music Tile */}
          <TouchableOpacity
            style={{
              width: '48%',
              height: 150,
              backgroundColor: '#FF8C00',
              padding: 16,
              justifyContent: 'space-between',
            }}
            activeOpacity={0.8}
          >
            <View>
              <View>
                <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '300' }}>
                  ▶
                </Text>
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '300', marginTop: 8 }}>
                  Now Playing
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: '300',
              }}
            >
              Music
            </Text>
          </TouchableOpacity>
        </View>

        {/* Fifth Row - News Wide Tile */}
        <TouchableOpacity
          style={{
            width: '100%',
            height: 150,
            backgroundColor: '#107C10',
            padding: 16,
            justifyContent: 'space-between',
          }}
          activeOpacity={0.8}
        >
          <View>
            <View>
              <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '400', marginBottom: 8 }}>
                BREAKING NEWS
              </Text>
              <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '300' }}>
                Latest updates from around the world
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 18,
              fontWeight: '300',
            }}
          >
            News
          </Text>
        </TouchableOpacity>

        {/* Sixth Row */}
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {/* Store Tile */}
          <TouchableOpacity
            style={{
              width: '48%',
              height: 150,
              backgroundColor: '#00BCF2',
              padding: 16,
              justifyContent: 'space-between',
            }}
            activeOpacity={0.8}
          >
            <View>
              <View>
                <Text style={{ color: '#FFFFFF', fontSize: 40, fontWeight: '300' }}>
                  🛍
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: '300',
              }}
            >
              Store
            </Text>
          </TouchableOpacity>

          {/* Settings Tile */}
          <TouchableOpacity
            style={{
              width: '48%',
              height: 150,
              backgroundColor: '#5E5E5E',
              padding: 16,
              justifyContent: 'space-between',
            }}
            activeOpacity={0.8}
          >
            <View>
              <Text style={{ color: '#FFFFFF', fontSize: 40 }}>
                ⚙️
              </Text>
            </View>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: '300',
              }}
            >
              Settings
            </Text>
          </TouchableOpacity>
        </View>

        {/* Seventh Row */}
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {/* Maps Tile */}
          <TouchableOpacity
            style={{
              width: '48%',
              height: 150,
              backgroundColor: '#B91D47',
              padding: 16,
              justifyContent: 'space-between',
            }}
            activeOpacity={0.8}
          >
            <View>
              <Text style={{ color: '#FFFFFF', fontSize: 40 }}>
                🗺
              </Text>
            </View>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: '300',
              }}
            >
              Maps
            </Text>
          </TouchableOpacity>

          {/* Camera Tile */}
          <TouchableOpacity
            style={{
              width: '48%',
              height: 150,
              backgroundColor: '#525252',
              padding: 16,
              justifyContent: 'space-between',
            }}
            activeOpacity={0.8}
          >
            <View>
              <Text style={{ color: '#FFFFFF', fontSize: 40 }}>
                📷
              </Text>
            </View>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: '300',
              }}
            >
              Camera
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}