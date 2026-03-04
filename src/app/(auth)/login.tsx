import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
 const router = useRouter();

 const handleSignIn = () => {
  router.push("/(auth)/signup");
 };

 return (
  <SafeAreaView edges={["top", "bottom"]} className="flex-1">
   <View className="flex-1 justify-center p-6">
    <Text className="text-3xl font-bold mb-2">Welcome back!</Text>
    <Text className="text-xl mb-6 text-gray-500">Sign in to your account</Text>
    <View className="w-full">
     <TextInput
      placeholder="Email"
      placeholderTextColor="gray"
      keyboardType="email-address"
      autoComplete="email"
      autoCapitalize="none"
      className="border border-gray-300 rounded-md p-4 mb-4"
     />
     <TextInput
      placeholder="Password"
      placeholderTextColor="gray"
      autoComplete="password"
      secureTextEntry={true}
      autoCapitalize="none"
      className="border border-gray-300 rounded-md p-4 mb-4"
     />
     <TouchableOpacity className="bg-black rounded-md p-4 mb-4 items-center justify-center">
      <Text className="text-white font-bold text-md">Sign in</Text>
     </TouchableOpacity>
     <TouchableOpacity
      onPress={handleSignIn}
      className="items-center justify-center text-xs"
     >
      <Text className="text-gray-600 text-sm">
       Don&apos;t have an account?{" "}
       <Text className="text-black font-bold">Sign up</Text>
      </Text>
     </TouchableOpacity>
    </View>
   </View>
  </SafeAreaView>
 );
}
