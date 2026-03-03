import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
 return (
  <SafeAreaView edges={["top", "bottom"]}>
   <View>
    <Text>Welcome back!</Text>
    <Text className="text-2xl font-bold">Sign in to your account</Text>
    <View>
     <TextInput
      placeholder="Email"
      placeholderTextColor="gray"
      keyboardType="email-address"
      autoComplete="email"
      autoCapitalize="none"
     />
     <TextInput
      placeholder="Password"
      placeholderTextColor="gray"
      autoComplete="password"
      secureTextEntry={true}
      autoCapitalize="none"
     />
     <TouchableOpacity>
      <Text>Sign in</Text>
     </TouchableOpacity>
     <TouchableOpacity>
      <Text>Don&apos;t have an account? Sign up</Text>
     </TouchableOpacity>
    </View>
   </View>
  </SafeAreaView>
 );
}
