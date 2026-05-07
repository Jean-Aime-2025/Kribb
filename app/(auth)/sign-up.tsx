import Button from '@/components/Button';
import Input from '@/components/Input';
import OTPInput from '@/components/OTPInput';
import { useAuth, useSignUp } from '@clerk/expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const isLoading = fetchStatus === 'fetching';

  const onSignUpPress = async () => {
    const { error } = await signUp.password({
      emailAddress: email,
      password,
      firstName,
      lastName,
    });
    if (error) {
      return;
    }

    if (!error) await signUp.verifications.sendEmailCode();
  };

  const onVerifyPress = async () => {
    await signUp.verifications.verifyEmailCode({
      code,
    });

    if (signUp.status === 'complete') {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          const url = decorateUrl('/');
          router.replace(url as any);
        },
      });
    } else {
      console.error('Sign-up attempt not complete:', signUp);
    }
  };

  if (signUp.status === 'complete' || isSignedIn) return null;

  // OTP SCREEN
  if (
    signUp.status === 'missing_requirements' &&
    signUp.unverifiedFields.includes('email_address')
  ) {
    return (
      <View className="flex-1 bg-white px-6 justify-center">
        <Image
          source={require('../../assets/images/kribb.png')}
          className="w-32 h-14 mb-8"
          resizeMode="contain"
        />

        <Text className="text-3xl font-sans-bold text-black mb-2">
          Verify your account
        </Text>

        <Text className="text-neutral-500 mb-6 font-sans-medium">
          Enter the code sent to {email}
        </Text>

        <OTPInput value={code} onChange={setCode} />

        {errors.fields.code && (
          <Text className="text-red-500 mt-4 font-sans-medium text-center">
            {errors.fields.code.message}
          </Text>
        )}

        <View className="mt-8">
          <Button
            title="Verify Account"
            onPress={onVerifyPress}
            loading={isLoading}
          />
        </View>

        <TouchableOpacity
          className="mt-6 border border-primary py-4 rounded-xl bg-primary/5"
          onPress={() => signUp.verifications.sendEmailCode()}
        >
          <Text className="text-primary text-center font-sans-medium">
            Resend code
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-6 border border-neutral-500 py-4 rounded-xl"
          onPress={() => {
            signUp.reset();
            router.push('/(auth)/sign-up');
          }}
        >
          <Text className="text-neutral-500 text-center font-sans-medium">
            Start over
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // SIGN UP FORM
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center px-6 py-12">
        {/* Logo */}
        <Image
          source={require('../../assets/images/kribb.png')}
          className="w-36 h-16 mb-8"
          resizeMode="contain"
        />

        {/* Heading */}
        <Text className="text-4xl font-sans-extrabold text-black mb-2">
          Create account
        </Text>

        <Text className="text-neutral-500 mb-10 font-sans-medium">
          Find your dream home today
        </Text>

        {/* Name row */}
        <View className="flex-row gap-3">
          <View className="flex-1">
            <Input
              placeholder="First name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View className="flex-1">
            <Input
              placeholder="Last name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>

        {errors.fields.firstName && (
          <Text className="text-red-500 mt-2 font-sans-medium">
            {errors.fields.firstName.message}
          </Text>
        )}

        {/* Email */}
        <Input
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {errors.fields.emailAddress && (
          <Text className="text-red-500 mb-3 font-sans-medium">
            {errors.fields.emailAddress.message}
          </Text>
        )}

        {/* Password */}
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {errors.fields.password && (
          <Text className="text-red-500 mb-3 font-sans-medium">
            {errors.fields.password.message}
          </Text>
        )}

        {/* Button */}
        <View className="mt-4">
          <Button
            title="Create Account"
            onPress={onSignUpPress}
            loading={isLoading}
          />
        </View>

        {/* Footer */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-neutral-500 font-sans-medium">
            Already have an account?{' '}
          </Text>

          <Link href="/sign-in">
            <Text className="text-primary font-sans-semibold">Sign In</Text>
          </Link>
        </View>

        <View nativeID="clerk-captcha" />
      </View>
    </ScrollView>
  );
}
