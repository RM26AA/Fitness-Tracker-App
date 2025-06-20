// screens/ProfileScreen.js
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';

export default function ProfileScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const user = {
    fullName: 'John Doe',
    age: 28,
    email: 'john.doe@example.com',
    phone: '+1 123 456 7890',
    address: '123 Main Street, Springfield, USA',
  };

  const handleContact = () => {
    Alert.alert('Contact Us', 'Reach out at support@example.com');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Account deleted') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Profile</Text>

          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
            style={styles.profilePic}
          />

          <View style={styles.card}>
            <FontAwesome5 name="user" size={20} color="#0a84ff" />
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>{user.fullName}</Text>
          </View>

          <View style={styles.card}>
            <FontAwesome5 name="birthday-cake" size={20} color="#34c759" />
            <Text style={styles.label}>Age</Text>
            <Text style={styles.value}>{user.age}</Text>
          </View>

          <View style={styles.card}>
            <MaterialIcons name="email" size={20} color="#ff9f0a" />
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>

          <View style={styles.card}>
            <Feather name="phone" size={20} color="#ff375f" />
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{user.phone}</Text>
          </View>

          <View style={styles.card}>
            <Feather name="map-pin" size={20} color="#5e5ce6" />
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{user.address}</Text>
          </View>

          <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
            <Text style={styles.contactText}>Contact Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fc',
  },
  scroll: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 60,
  },
  animatedContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0a84ff',
    marginBottom: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#0a84ff',
    marginBottom: 20,
    shadowColor: '#0a84ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    color: '#999',
    marginTop: 6,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  contactButton: {
    backgroundColor: '#0a84ff',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
    marginTop: 20,
    shadowColor: '#0a84ff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  contactText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
    marginTop: 12,
    shadowColor: '#ff3b30',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

