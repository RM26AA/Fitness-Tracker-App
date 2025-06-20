import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { Pedometer } from 'expo-sensors';

export default function OnboardingScreen({ onDone }) {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    checkPermission();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  const checkPermission = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    if (!isAvailable) {
      alert('Pedometer not available on this device');
    }
  };

  const handleGrant = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    if (isAvailable) {
      setPermissionGranted(true);
      onDone();  // <-- signal onboarding complete to parent
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/logo3.png')}
        style={[styles.logo, { opacity: fadeAnim }]}
      />
      <Text style={styles.title}>Welcome to M-Track</Text>
      <Text style={styles.subtitle}>
        Track your steps, distance, and progress every day.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleGrant}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const BLUE = '#0a84ff';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: BLUE,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: BLUE,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});


