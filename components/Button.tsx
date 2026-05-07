import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'

const Button = ({ title, onPress, loading }: any) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.85}
      className="bg-primary py-4 rounded-2xl items-center justify-center shadow-lg shadow-primary/20"
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white font-sans-semibold text-base">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );

export default Button