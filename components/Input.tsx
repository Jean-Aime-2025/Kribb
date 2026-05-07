import { View, TextInput } from 'react-native';
import React from 'react';

const Input = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
}: any) => (
  <View className="bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-1.5 mb-4">
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      className="text-black font-sans-medium"
    />
  </View>
);
export default Input;
