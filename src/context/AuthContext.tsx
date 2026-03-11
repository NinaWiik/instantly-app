import { supabase } from "@/lib/superbase/client";
import { createContext, useContext, useState } from "react";

export interface User {
 id: string;
 name: string;
 email: string;
 username: string;
 profileImage?: string;
 onBoardingCompleted?: boolean;
}

interface AuthContextType {
 user: User | null;
 signUp: (email: string, password: string) => Promise<void>;
 updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
 const [user, setUser] = useState<User | null>(null);

 const fetchUserProfile = async (userId: string): Promise<User | null> => {
  try {
   const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
   if (error) {
    console.error("Error fetching user profile:", error);
    return null;
   }
   if (!data) {
    console.error("User profile not found");
    return null;
   }
   const authUser = await supabase.auth.getUser();
   if (!authUser.data.user) {
    console.error("No auth user found");
    return null;
   }
   return {
    id: data.id,
    name: data.name,
    username: data.username,
    email: authUser.data.user.email || "",
    profileImage: data.profile_image,
    onBoardingCompleted: data.on_boarding_completed,
   };
  } catch (error) {
   console.error("Error fetching user profile:", error);
   return null;
  }
 };

 const signIn = async (email: string, password: string) => {};

 const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
   email,
   password,
  });
  if (error) throw error;

  if (data.user) {
   const profile = await fetchUserProfile(data.user.id);
   setUser(profile);
  }
 };

 const updateUser = async (userData: Partial<User>) => {
  if (!user) return;
  try {
   // Map to DB column names (snake_case) for Supabase
   const updateData: Record<string, unknown> = {};
   if (userData.name !== undefined) updateData.name = userData.name;
   if (userData.username !== undefined) updateData.username = userData.username;
   if (userData.profileImage !== undefined)
    updateData.profile_image_url = userData.profileImage;
   if (userData.onBoardingCompleted !== undefined)
    updateData.onboarding_completed = userData.onBoardingCompleted;

   const { error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", user.id);
   if (error) throw error;
  } catch (error) {
   console.error("Error updating user:", error);
   throw error;
  }
 };

 return (
  <AuthContext.Provider value={{ user, signUp, updateUser }}>
   {children}
  </AuthContext.Provider>
 );
};

export const useAuth = () => {
 const context = useContext(AuthContext);
 if (!context) {
  throw new Error("useAuth must be used within an AuthProvider");
 }
 return context;
};
