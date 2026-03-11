import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
 ActivityIndicator,
 Alert,
 Text,
 TextInput,
 TouchableOpacity,
 View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";

export default function SignupScreen() {
 const router = useRouter();
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const { signUp } = useAuth();

 const handleSignUp = async () => {
  if (!email || !password) {
   Alert.alert("Error", "Please fill in all fields");
   return;
  }
  if (password.length < 6) {
   Alert.alert("Error", "Password must be at least 6 characters long");
   return;
  }
  setIsLoading(true);
  try {
   await signUp(email, password);
   router.push("/(auth)/onboarding");
  } catch (error) {
   console.error("Error signing up:", error);
   Alert.alert("Error", "Failed to create account");
  } finally {
   setIsLoading(false);
  }
 };

 /*  useEffect(() => {
  router.push("/(auth)/onboarding");
 }, []); */

 const handleSignIn = () => {
  router.push("/(auth)/login");
 };

 return (
  <SafeAreaView edges={["top", "bottom"]} className="flex-1">
   <View className="flex-1 justify-center p-6">
    <Text className="text-3xl font-bold mb-2">Create Account</Text>
    <Text className="text-xl mb-6 text-gray-500">Sign up to get started</Text>
    <View className="w-full">
     <TextInput
      value={email}
      onChangeText={setEmail}
      placeholder="Email"
      placeholderTextColor="gray"
      keyboardType="email-address"
      autoComplete="email"
      autoCapitalize="none"
      className="border border-gray-300 rounded-md p-4 mb-4"
     />
     <TextInput
      value={password}
      onChangeText={setPassword}
      placeholder="Password"
      placeholderTextColor="gray"
      autoComplete="password"
      secureTextEntry={true}
      autoCapitalize="none"
      className="border border-gray-300 rounded-md p-4 mb-4"
     />
     <TouchableOpacity
      onPress={handleSignUp}
      className="bg-black rounded-md p-4 mb-4 items-center justify-center"
     >
      {isLoading ? (
       <ActivityIndicator size={24} color="white" />
      ) : (
       <Text className="text-white font-bold text-md">Sign up</Text>
      )}
     </TouchableOpacity>
     <TouchableOpacity
      onPress={handleSignIn}
      className="items-center justify-center text-xs"
     >
      <Text className="text-gray-600 text-sm">
       Don&apos;t have an account?{" "}
       <Text className="text-black font-bold">Sign in</Text>
      </Text>
     </TouchableOpacity>
    </View>
   </View>
  </SafeAreaView>
 );
}
