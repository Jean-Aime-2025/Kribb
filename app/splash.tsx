import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      {/* Hero Image */}
      <View className="h-[58%] relative">
        <Image
          source={require('@/assets/images/pexels-joachim-hoholm-371880152-21837102.jpg')}
          resizeMode="cover"
          className="w-full h-full"
        />

        {/* Soft Bottom Fade */}
        <LinearGradient
          colors={[
            'transparent',
            'rgba(255,255,255,0.15)',
            'rgba(255,255,255,0.75)',
            '#ffffff',
          ]}
          locations={[0, 0.45, 0.75, 1]}
          className="absolute bottom-0 left-0 right-0 h-80"
        />
      </View>

      {/* Bottom Content */}
      <View className="flex-1 bg-white px-7 pb-10 justify-end">
        <View className="gap-y-6">
          {/* Logo */}
          <Image
            source={require('@/assets/images/kribb.png')}
            resizeMode="contain"
            className="w-28 h-12"
          />

          {/* Branding */}
          <View className="gap-y-3">
            {/* Heading */}
            <Text className="text-[38px] text-black leading-[46px] font-sans-extrabold">
              Find Your{'\n'}Perfect Dream Home
            </Text>

            {/* Description */}
            <Text className="text-base leading-7 text-neutral-500 max-w-[95%] font-sans-semibold">
              Browse modern properties, save favorites, and explore homes with a clean and intuitive experience.
            </Text>
          </View>

          {/* CTA Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.replace('/(auth)/sign-in')}
            className="bg-blue-600 rounded-2xl py-5 items-center justify-center shadow-lg shadow-blue-500/30 mt-2"
          >
            <Text className="text-white text-base font-sans-bold">Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
