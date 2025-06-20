// screens/AchievementsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { FontAwesome5 } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const userStats = {
  steps: 7500,
  calories: 280,
  distance: 4.7,
  rewards: 120,
};

const Badge = ({ label, subtitle, achieved }) => (
  <View style={[styles.badge, { opacity: achieved ? 1 : 0.3 }]}>
    <Text style={styles.badgeIcon}>{achieved ? '🛡️' : '⚪'}</Text>
    <Text style={styles.badgeText}>{label}</Text>
    <Text style={styles.badgeSubtitle}>{subtitle}</Text>
  </View>
);

const DistanceTab = () => (
  <View style={styles.tabContent}>
    <Badge label="2k" subtitle="Distance" achieved={userStats.distance >= 2} />
    <Badge label="4k" subtitle="Distance" achieved={userStats.distance >= 4} />
    <Badge label="6k" subtitle="Distance" achieved={userStats.distance >= 6} />
    <Badge label="8k" subtitle="Distance" achieved={userStats.distance >= 8} />
  </View>
);

const CaloriesTab = () => (
  <View style={styles.tabContent}>
    <Badge label="100" subtitle="Calories" achieved={userStats.calories >= 100} />
    <Badge label="200" subtitle="Calories" achieved={userStats.calories >= 200} />
    <Badge label="300" subtitle="Calories" achieved={userStats.calories >= 300} />
    <Badge label="400" subtitle="Calories" achieved={userStats.calories >= 400} />
  </View>
);

const StepsTab = () => (
  <View style={styles.tabContent}>
    <Badge label="2k" subtitle="Steps" achieved={userStats.steps >= 2000} />
    <Badge label="5k" subtitle="Steps" achieved={userStats.steps >= 5000} />
    <Badge label="7k" subtitle="Steps" achieved={userStats.steps >= 7000} />
    <Badge label="10k" subtitle="Steps" achieved={userStats.steps >= 10000} />
  </View>
);

const initialLayout = { width: screenWidth };

export default function AchievementsScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'distance', title: 'Distance' },
    { key: 'calories', title: 'Calories' },
    { key: 'steps', title: 'Steps' },
  ]);

  const renderScene = SceneMap({
    distance: DistanceTab,
    calories: CaloriesTab,
    steps: StepsTab,
  });

  const badges = [
    { label: '2k', subtitle: 'Distance', achieved: userStats.distance >= 2 },
    { label: '4k', subtitle: 'Distance', achieved: userStats.distance >= 4 },
    { label: '6k', subtitle: 'Distance', achieved: userStats.distance >= 6 },
    { label: '8k', subtitle: 'Distance', achieved: userStats.distance >= 8 },
    { label: '100', subtitle: 'Calories', achieved: userStats.calories >= 100 },
    { label: '200', subtitle: 'Calories', achieved: userStats.calories >= 200 },
    { label: '300', subtitle: 'Calories', achieved: userStats.calories >= 300 },
    { label: '400', subtitle: 'Calories', achieved: userStats.calories >= 400 },
    { label: '2k', subtitle: 'Steps', achieved: userStats.steps >= 2000 },
    { label: '5k', subtitle: 'Steps', achieved: userStats.steps >= 5000 },
    { label: '7k', subtitle: 'Steps', achieved: userStats.steps >= 7000 },
    { label: '10k', subtitle: 'Steps', achieved: userStats.steps >= 10000 },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>Your Achievements</Text>

        {/* User Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <FontAwesome5 name="walking" size={24} color="#0a84ff" />
            <Text style={styles.statValue}>{userStats.steps}</Text>
            <Text style={styles.statLabel}>Steps</Text>
          </View>
          <View style={styles.statBox}>
            <FontAwesome5 name="fire" size={24} color="#ff3b30" />
            <Text style={styles.statValue}>{userStats.calories}</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
          <View style={styles.statBox}>
            <FontAwesome5 name="map-marker-alt" size={24} color="#34c759" />
            <Text style={styles.statValue}>{userStats.distance} km</Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>
        </View>

        {/* Tabs */}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: '#0a84ff' }}
              style={{ backgroundColor: '#fff', marginBottom: 10 }}
              labelStyle={{ color: '#0a84ff', fontWeight: '600' }}
            />
          )}
        />

        {/* Pie Chart */}
        <Text style={styles.subheader}>Progress Breakdown</Text>
        <PieChart
          data={[
            {
              name: 'Steps',
              population: userStats.steps,
              color: '#0a84ff',
              legendFontColor: '#333',
              legendFontSize: 14,
            },
            {
              name: 'Calories',
              population: userStats.calories,
              color: '#ff3b30',
              legendFontColor: '#333',
              legendFontSize: 14,
            },
            {
              name: 'Distance',
              population: userStats.distance * 1000,
              color: '#34c759',
              legendFontColor: '#333',
              legendFontSize: 14,
            },
          ]}
          width={screenWidth - 40}
          height={180}
          chartConfig={{
            backgroundColor: '#fff',
            color: () => '#333',
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={styles.pie}
        />

        {/* Rewards Points */}
        <View style={styles.rewardsBox}>
          <FontAwesome5 name="star" size={28} color="#FFD700" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.rewardsTitle}>Reward Points</Text>
            <Text style={styles.rewardsValue}>{userStats.rewards} pts</Text>
          </View>
        </View>

        {/* All Badges Section */}
        <Text style={[styles.subheader, { marginTop: 30 }]}>All Badges</Text>
        <View style={styles.badgesContainer}>
          {badges.map((badge, idx) => (
            <Badge
              key={idx}
              label={badge.label}
              subtitle={badge.subtitle}
              achieved={badge.achieved}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    padding: 20,
    paddingBottom: 60,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0a84ff',
    marginBottom: 20,
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  tabContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  badge: {
    alignItems: 'center',
    marginBottom: 20,
    width: 80,
  },
  badgeIcon: {
    fontSize: 30,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  badgeSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: 30,
  },
  subheader: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#0a84ff',
  },
  pie: {
    marginBottom: 30,
  },
  rewardsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbe6',
    padding: 15,
    borderRadius: 16,
    elevation: 3,
  },
  rewardsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  rewardsValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ff9f0a',
  },
});





