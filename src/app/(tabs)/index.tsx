import { Text, View, StyleSheet } from "react-native";
import { Button } from "@expo/ui/swift-ui";

export default function Index() {
 return (
  <View style={styles.container}>
   <Text>Edit src/app/index.tsx to edit this screen.</Text>
   <Button>
    <Text>Hello</Text>
   </Button>
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
 },
});
