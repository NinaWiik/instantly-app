import { NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";
import { useColorScheme, View } from "react-native";

const tabColors = {
 light: {
  background: "#FDF6F9",
  indicator: "#E91E8C",
  label: "#E91E8C",
  labelUnselected: "#6E6E73",
 },
 dark: {
  background: "#1C181A",
  indicator: "#FF80AB",
  label: "#FF80AB",
  labelUnselected: "#757575",
 },
};

export default function AppTabs() {
 const scheme = useColorScheme();
 const colors = tabColors[scheme === "dark" ? "dark" : "light"];

 return (
  <View className="flex-1 bg-[#FDF6F9] dark:bg-[#1C181A]">
   <NativeTabs
    backgroundColor={colors.background}
    indicatorColor={colors.indicator}
    labelStyle={{
     color: colors.labelUnselected,
     selected: { color: colors.label },
    }}
    tintColor={colors.label}
   >
    <NativeTabs.Trigger name="index">
     <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
     <NativeTabs.Trigger.Icon  sf="house.fill" md="home" />
    </NativeTabs.Trigger>

    <NativeTabs.Trigger name="profile">
     <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
     <NativeTabs.Trigger.Icon sf="person.fill" md="person" />
    </NativeTabs.Trigger>
   </NativeTabs>
  </View>
 );
}
