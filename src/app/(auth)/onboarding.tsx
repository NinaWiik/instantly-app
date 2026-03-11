import { useState } from "react";
import {
 ActivityIndicator,
 TextInput,
 Text,
 TouchableOpacity,
 View,
 Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { supabase } from "@/lib/superbase/client";
import { uploadProfileImage } from "@/lib/superbase/storage";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";

export default function OnboardingScreen() {
 const [name, setName] = useState("");
 const [userName, setUserName] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const [profileImage, setProfileImage] = useState<string | null>(null);
 const { user, updateUser } = useAuth();

 const pickImage = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
   Alert.alert(
    "Permission Required",
    "You need to grant permission to access the media library",
   );
   return;
  }
  const result = await ImagePicker.launchImageLibraryAsync({
   mediaTypes: ["images"],
   allowsEditing: true,
   aspect: [1, 1],
   quality: 1,
  });
  if (!result.canceled && result.assets[0]) {
   setProfileImage(result.assets[0].uri);
  }
 };
 const takePhoto = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted") {
   Alert.alert(
    "Permission Required",
    "You need to grant permission to access the camera",
   );
   return;
  }
  const result = await ImagePicker.launchCameraAsync({
   allowsEditing: true,
   aspect: [1, 1],
   quality: 1,
   allowsMultipleSelection: false,
  });
  if (!result.canceled && result.assets[0]) {
   setProfileImage(result.assets[0].uri as string);
  }
 };

 const showImagePicker = () => {
  Alert.alert(
   "Select Profile Image",
   "Choose an image from your library or take a photo",
   [
    { text: "Select from Library", onPress: pickImage },
    { text: "Camera", onPress: takePhoto },
    { text: "Cancel", style: "cancel" },
   ],
  );
 };

 const handleComplete = async () => {
  if (!name || !userName) {
   Alert.alert("Error", "Please fill in all fields");
   return;
  }
  if (userName.length < 3) {
   Alert.alert("Error", "Username must be at least 3 characters long");
   return;
  }
  setIsLoading(true);
  try {
   if (!user) {
    throw new Error("User not authenticated");
   }
   // Check if username is already taken
   const { data: existingUser } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", userName)
    .neq("id", user.id)
    .single();

   if (existingUser) {
    Alert.alert("Error", "Username is already taken");
    setIsLoading(false);
    return;
   }

   // Upload profile image
   let profileImageUrl: string | undefined;
   if (profileImage) {
    try {
     profileImageUrl = await uploadProfileImage(
      user.id as string,
      profileImage,
     );
    } catch (error) {
     console.error("Error uploading profile image:", error);
     Alert.alert("Error", "Failed to upload profile image");
     setIsLoading(false);
     return;
    }
   }
   // Update user profile
   await updateUser({
    name,
    username: userName,
    profileImage: profileImageUrl,
    onBoardingCompleted: true,
   });
   Alert.alert("Success", "Onboarding completed successfully");
   router.replace("/(tabs)");
  } catch (error) {
   Alert.alert("Error", "Failed to complete onboarding");
   console.error("Error completing onboarding:", error);
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <SafeAreaView edges={["top", "bottom"]} className="flex-1">
   <View className="flex-1 justify-center p-6">
    <Text className="text-3xl font-bold mb-2">Complete your profile</Text>
    <Text className="text-md mb-16 text-gray-500">
     Add your information to get started
    </Text>
    <View className="w-full items-center justify-center">
     <TouchableOpacity className="mb-10" onPress={showImagePicker}>
      <View className="relative w-32 h-32">
       {profileImage ? (
        <View className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
         <Image
          source={{ uri: profileImage }}
          style={{ width: 128, height: 128 }}
          contentFit="cover"
         />
        </View>
       ) : (
        <View className="w-32 h-32 bg-white-200 rounded-full justify-center items-center border-2 border-[#E0E0E0] border-dashed">
         <Text className="text-5xl text-gray-400">+</Text>
        </View>
       )}
       <View className="absolute bottom-0 right-0 bg-black rounded-full px-3 py-1.5">
        <Text className="text-white text-xs">Edit</Text>
       </View>
      </View>
     </TouchableOpacity>
     <TextInput
      placeholder="Full Name"
      placeholderTextColor="gray"
      keyboardType="default"
      autoComplete="name"
      autoCapitalize="words"
      value={name}
      onChangeText={setName}
      className="border border-gray-300 rounded-md p-4 mb-4 w-full"
     />
     <TextInput
      placeholder="Username"
      placeholderTextColor="gray"
      autoComplete="username"
      autoCapitalize="none"
      value={userName}
      onChangeText={setUserName}
      className="border border-gray-300 rounded-md p-4 mb-4 w-full"
     />
     <TouchableOpacity
      onPress={handleComplete}
      className="bg-black rounded-md p-4 mb-4 items-center justify-center w-full"
     >
      {isLoading ? (
       <ActivityIndicator size={24} color="white" />
      ) : (
       <Text className="text-white font-bold text-md">Complete Profile</Text>
      )}
     </TouchableOpacity>
    </View>
   </View>
  </SafeAreaView>
 );
}
