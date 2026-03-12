import { Stack, useRouter, useSegments } from "expo-router";
import "../../global.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function RootLayout() {
 function RouteGuard() {
  const { user } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  const inAuthGroup = segments[0] === "(auth)";
  const inTabsGroup = segments[0] === "(tabs)";

  useEffect(() => {
   if (!user) {
    if (!inAuthGroup) {
     router.replace("/(auth)/login");
    }
   } else {
    if (inTabsGroup) {
     router.replace("/(tabs)");
    }
   }
  }, [user, segments, router]);

  return (
   <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="(auth)" />
   </Stack>
  );
 }

 return (
  <AuthProvider>
   <RouteGuard />
  </AuthProvider>
 );
}
