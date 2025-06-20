import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Platform, SafeAreaView } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [stepCount, setStepCount] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bubbleFadeAnim = useRef(new Animated.Value(0)).current;

  // Sample data for last 7 days step counts
  const weeklySteps = [
    { day: 'Mon', steps: 7000 },
    { day: 'Tue', steps: 8500 },
    { day: 'Wed', steps: 9000 },
    { day: 'Thu', steps: 6500 },
    { day: 'Fri', steps: 10000 },
    { day: 'Sat', steps: 11000 },
    { day: 'Sun', steps: 9500 },
  ];

  const goal = 10000;
  const progress = Math.min(stepCount / goal, 1);
  const distance = (stepCount * 0.78 / 1000).toFixed(2);
  const calories = (stepCount * 0.04).toFixed(1);

  useEffect(() => {
    if (Platform.OS === 'web') {
      setStepCount(5000);
    } else {
      const subscription = Pedometer.watchStepCount(result => {
        setStepCount(result.steps);
      });
      return () => subscription.remove();
    }
  }, []);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(bubbleFadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
          Welcome to M-Track
        </Animated.Text>

        <AnimatedCircularProgress
          size={200}
          width={15}
          fill={progress * 100}
          tintColor="#0a84ff"
          backgroundColor="#e6f0ff"
          rotation={0}
          duration={1000}
          lineCap="round"
        >
          {() => (
            <View style={styles.stepTextContainer}>
              <Text style={styles.stepCount}>{stepCount}</Text>
              <Text style={styles.stepLabel}>Steps</Text>
            </View>
          )}
        </AnimatedCircularProgress>

        <Animated.View style={[styles.bubbleRow, { opacity: bubbleFadeAnim }]}>
          <View style={styles.bubble}>
            <Text style={styles.bubbleValue}>{distance} km</Text>
            <Text style={styles.bubbleLabel}>Distance</Text>
          </View>
          <View style={styles.bubble}>
            <Text style={styles.bubbleValue}>{calories} kcal</Text>
            <Text style={styles.bubbleLabel}>Calories</Text>
          </View>
          <View style={styles.bubble}>
            <Text style={styles.bubbleValue}>{Math.floor(progress * 100)}%</Text>
            <Text style={styles.bubbleLabel}>Goal</Text>
          </View>
        </Animated.View>

        <View style={styles.chartContainer}>
          <VictoryChart
            width={screenWidth - 40}
            theme={VictoryTheme.material}
            domainPadding={{ x: 20, y: 10 }}
            padding={{ top: 10, bottom: 40, left: 50, right: 20 }}
          >
            <VictoryAxis
              tickValues={weeklySteps.map((d) => d.day)}
              style={{
                axis: { stroke: '#0a84ff' },
                tickLabels: { fill: '#0a84ff', fontWeight: 'bold' },
                grid: { stroke: '#e6f0ff' },
              }}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => `${x / 1000}k`}
              style={{
                axis: { stroke: '#0a84ff' },
                tickLabels: { fill: '#0a84ff' },
                grid: { stroke: '#e6f0ff' },
              }}
            />
            <VictoryLine
              interpolation="natural"
              data={weeklySteps}
              x="day"
              y="steps"
              style={{
                data: { stroke: '#0a84ff', strokeWidth: 3 },
              }}
            />
          </VictoryChart>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0a84ff',
    marginTop: 20,
    marginBottom: 30,
  },
  stepTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCount: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#0a84ff',
  },
  stepLabel: {
    fontSize: 18,
    color: '#555',
    marginTop: 4,
  },
  bubbleRow: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    width: screenWidth - 40,
  },
  bubble: {
    backgroundColor: '#f0f4ff',
    paddingVertical: 20,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    elevation: 3,
    shadowColor: '#0a84ff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  bubbleValue: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0a84ff',
  },
  bubbleLabel: {
    fontSize: 15,
    color: '#333',
    marginTop: 6,
  },
  chartContainer: {
    marginTop: 40,
  },
});



