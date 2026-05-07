import Button from '@/components/Button';
import Input from '@/components/Input';
import OTPInput from '@/components/OTPInput';
import { useSignIn } from '@clerk/expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function SignInScreen() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const onSignInPress = async () => {
    const { error } = await signIn.password({
      emailAddress: email,
      password,
    });
    if (error) {
      return;
    }

    if (signIn.status === 'complete') {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          const url = decorateUrl('/');
          router.replace(url as any);
        },
      });
    } else if (signIn.status === 'needs_second_factor') {
      await signIn.mfa.sendPhoneCode();
    } else if (signIn.status === 'needs_client_trust') {
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === 'email_code',
      );
      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else {
      console.error('Sign-in attempt not complete:', signIn);
    }
  };

  const onVerifyPress = async () => {
    await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status === 'complete') {
      await signIn.finalize({
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
      console.error('Sign-in attempt not complete:', signIn);
    }
  };

  const isLoading = fetchStatus === 'fetching';

  if (signIn.status === 'needs_client_trust') {
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
          Enter the code sent to your email
        </Text>

        <OTPInput value={code} onChange={setCode} />

        {errors.fields.code && (
          <Text className="text-red-500 mt-4 font-sans-medium">
            {errors.fields.code.message}
          </Text>
        )}

        <View className="mt-8">
          <Button title="Verify" onPress={onVerifyPress} loading={isLoading} />
        </View>

        <TouchableOpacity
          className="mt-6 border border-primary py-4 rounded-xl bg-primary/5"
          onPress={() => signIn.mfa.sendEmailCode()}
        >
          <Text className="text-primary text-center font-sans-medium">
            Resend code
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-6 border border-neutral-500 py-4 rounded-xl"
          onPress={() => {
            signIn.reset();
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
          Welcome back
        </Text>

        <Text className="text-neutral-500 mb-10 font-sans-medium">
          Sign in to continue exploring homes
        </Text>

        {/* Inputs */}
        <Input
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {errors.fields.identifier && (
          <Text className="text-red-500 mb-3 font-sans-medium">
            {errors.fields.identifier.message}
          </Text>
        )}

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
          <Button title="Sign In" onPress={onSignInPress} loading={isLoading} />
        </View>

        {/* Footer */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-neutral-500 font-sans-medium">
            Don&apos;t have an account?{' '}
          </Text>

          <Link href="/sign-up">
            <Text className="text-primary font-sans-semibold">Sign Up</Text>
          </Link>
        </View>

        <View nativeID="clerk-captcha" />
      </View>
    </ScrollView>
  );
}
