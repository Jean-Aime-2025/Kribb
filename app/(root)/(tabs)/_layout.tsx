import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useUserStore } from '@/store/userStore';

export default function TabsLayout() {
  const isAdmin = useUserStore((state) => state.isAdmin);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#155dfc',
        tabBarInactiveTintColor: '#90a1b9',
        animation: 'shift',
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 1,
          height: 120,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIconStyle: {
          marginTop: 10,
        },
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Search */}
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          href: isAdmin ? '/create' : null,
          title: '',
          tabBarIcon: () => (
            <View
              style={{
                backgroundColor: '#155dfc',
                width: 60,
                height: 60,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 30,
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <Ionicons name="add" size={30} color="white" />
            </View>
          ),
        }}
      />

      {/* Saved */}
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />

      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
