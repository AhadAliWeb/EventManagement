import { useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Animated,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Hamburger from "../assets/hamburger.png";
import nightModeImg from "../assets/night-mode.png";
import lightModeImg from "../assets/light-mode.png";
import close from "../assets/close.png";
import { useNavigation } from "@react-navigation/native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function Sidebar({ toggleDarkMode, darkMode }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const navigation = useNavigation();

  // const toggleDarkMode = () => setIsDarkMode((prevState) => !prevState);

  const toggleSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: isSidebarVisible ? -SCREEN_WIDTH : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Pressable onPress={toggleSidebar}>
          <View>
            <Image source={Hamburger} style={styles.hamburger} />
          </View>
        </Pressable>
        <Pressable onPress={toggleDarkMode}>
          <View>
            {darkMode ? (
              <Image source={lightModeImg} style={styles.toggleBtn} />
            ) : (
              <Image source={nightModeImg} style={styles.toggleBtn} />
            )}
          </View>
        </Pressable>
      </View>
      <Animated.View
        style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
      >
        <TouchableOpacity style={styles.closeButton} onPress={toggleSidebar}>
          {/* <Text style={styles.closeText}>X</Text> */}
          <Image source={close} style={styles.closeText} />
        </TouchableOpacity>
        <View style={styles.sideBtns}>
          <Button
            title="All Events"
            onPress={() => {
              toggleSidebar();
              navigation.navigate("Events");
            }}
          />
          <Button
            title="Registered Events"
            onPress={() => {
              toggleSidebar();
              navigation.navigate("RegisteredEvents");
            }}
          />
          <Button
            title="Your FeedBacks"
            onPress={() => {
              toggleSidebar();
              navigation.navigate("FeedbackList");
            }}
          />
        </View>
      </Animated.View>
      {/* <Image source={hamburger} style={styles.image} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    marginBottom: 20,
  },
  nav: {
    // flexDirection: "row",
    justifyContent: "space-between",
    // padding: 16,
    backgroundColor: "#f9f9f9",
  },
  hamburger: {
    // marginTop: 40,
    marginLeft: 20,
    width: 25,
    height: 25,
    alignSelf: "flex-start",
    color: "#000080",
  },
  toggleBtn: {
    // marginTop: 40,
    marginRight: 20,
    width: 25,
    height: 25,
    alignSelf: "flex-end",
    color: "#000",
  },
  sidebar: {
    // display: "none",
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "#E8F9FF",
    zIndex: 999,
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 20,
    zIndex: 1000,
  },
  closeText: {
    width: 20,
    height: 20,
  },
  sidebarText: {
    color: "white",
    fontSize: 24,
    marginTop: 100,
    textAlign: "center",
  },

  sideBtns: {
    flex: 1,
    marginTop: 70,
    gap: 20,
  },
});
