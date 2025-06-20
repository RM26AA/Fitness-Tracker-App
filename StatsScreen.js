import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [4500, 8000, 6500, 9000, 7000, 10000, 5500],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#f0f4ff',
  backgroundGradientTo: '#e6efff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(10, 132, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

export default function StatsScreen() {
  const totalSteps = data.datasets[0].data.reduce((a, b) => a + b, 0);
  const distance = (totalSteps * 0.78 / 1000).toFixed(2);
  const calories = (totalSteps * 0.04).toFixed(1);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Animated.Text
          style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          Weekly Summary
        </Animated.Text>

        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <BarChart
            data={data}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
            fromZero
            showValuesOnTopOfBars
          />
        </Animated.View>

        <Animated.View
          style={[styles.statsRow, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          <View style={styles.statCard}>
            <Ionicons name="walk" size={28} color="#0a84ff" />
            <Text style={styles.statValue}>{totalSteps}</Text>
            <Text style={styles.statLabel}>Steps</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="map" size={28} color="#0a84ff" />
            <Text style={styles.statValue}>{distance} km</Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="flame" size={28} color="#0a84ff" />
            <Text style={styles.statValue}>{calories} kcal</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[styles.footerBox, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          <Text style={styles.motivationalTitle}>Keep it up! 💪</Text>
          <Text style={styles.motivationalText}>
            You’re staying active! Check your progress each week to stay on track.
          </Text>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
  <View style={styles.ringRow}>
    <View style={styles.ringItem}>
      <AnimatedCircularProgress
        size={100}
        width={10}
        fill={75}
        tintColor="#0a84ff"
        backgroundColor="#e0eaff"
        lineCap="round"
        rotation={0}
      >
        {() => (
          <>
            <Text style={styles.ringValue}>75%</Text>
            <Text style={styles.ringLabel}>Health</Text>
          </>
        )}
      </AnimatedCircularProgress>
    </View>
    <View style={styles.ringItem}>
      <AnimatedCircularProgress
        size={100}
        width={10}
        fill={60}
        tintColor="#34c759"
        backgroundColor="#e0f7e9"
        lineCap="round"
        rotation={0}
      >
        {() => (
          <>
            <Text style={styles.ringValue}>60%</Text>
            <Text style={styles.ringLabel}>Jogging</Text>
          </>
        )}
      </AnimatedCircularProgress>
    </View>
    <View style={styles.ringItem}>
      <AnimatedCircularProgress
        size={100}
        width={10}
        fill={82}
        tintColor="#ff3b30"
        backgroundColor="#ffeef0"
        lineCap="round"
        rotation={0}
      >
        {() => (
          <>
            <Text style={styles.ringValue}>82%</Text>
            <Text style={styles.ringLabel}>Heart</Text>
          </>
        )}
      </AnimatedCircularProgress>
    </View>
  </View>
</Animated.View>


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0a84ff',
    marginBottom: 20,
  },
  chart: {
    borderRadius: 16,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a84ff',
    marginTop: 6,
  },
  statLabel: {
    fontSize: 14,
    color: '#444',
    marginTop: 2,
  },
  footerBox: {
    backgroundColor: '#e6f2ff',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  motivationalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0a84ff',
    marginBottom: 6,
  },
  motivationalText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  ringRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 30,
},
ringItem: {
  alignItems: 'center',
  flex: 1,
},
ringValue: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#0a84ff',
  marginTop: 10,
},
ringLabel: {
  fontSize: 13,
  color: '#555',
  marginTop: 2,
},

});


