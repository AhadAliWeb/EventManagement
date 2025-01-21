// import { useCallback, useEffect, useRef, useState } from "react";
// import {
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   FlatList,
//   Button,
//   Animated,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

// import Sidebar from "../components/Sidebar";
// import { useFocusEffect } from "@react-navigation/native";

// export default function Events({ navigation }) {
//   const [events, setEvents] = useState([]);
//   const [registeredEvents, setRegisteredEvents] = useState([]);
//   const [darkMode, setDarkMode] = useState(false);
//   const colorAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     axios
//       .get("http://192.168.60.166:5000/events")
//       .then((res) => {
//         setEvents(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     Animated.timing(colorAnim, {
//       toValue: 1,
//       duration: 500,
//       useNativeDriver: false,
//     });
//   }, [darkMode]);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   // const backColor = colorAnim.interpolate({
//   //   inputRange: [0, 1],
//   //   outputRange: ["rgba(255,255,255,1)", "rgba(47,7,227,1)"],
//   // });

//   const animatedStyles = {
//     backgroundColor: colorAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: ["white", "black"],
//     }),
//   };

//   useFocusEffect(
//     useCallback(() => {
//       const fetchRegisteredEvents = async () => {
//         const jsonEvents = await AsyncStorage.getItem("RegisteredEvents");
//         if (jsonEvents) {
//           setRegisteredEvents(JSON.parse(jsonEvents));
//         }
//       };

//       fetchRegisteredEvents();
//     }, [])
//   );

//   const registerEvent = async (event) => {
//     setRegisteredEvents(() => {
//       const updatedRegisteredEvents = [...registeredEvents, event];

//       AsyncStorage.setItem(
//         "RegisteredEvents",
//         JSON.stringify(updatedRegisteredEvents)
//       );

//       return updatedRegisteredEvents;
//     });

//     alert(`${event.name} has been registered`);
//   };

//   const renderEventItem = ({ item }) => (
//     <Animated.View style={[styles.card, animatedStyles]}>
//       <Text style={styles.eventName}>{item.name}</Text>
//       <Text style={styles.eventDetails}>📅 {item.dateTime}</Text>
//       <Text style={styles.eventDetails}>📍 {item.venue}</Text>
//       <Text style={styles.eventDescription}>{item.description}</Text>
//       <Button
//         style={styles.registerBtn}
//         title={
//           registeredEvents.some((event) => event.id === item.id)
//             ? "Registered"
//             : "Register Now"
//         }
//         color={
//           registeredEvents.some((event) => event.id === item.id)
//             ? "#CD1C18"
//             : "#000080"
//         }
//         onPress={() => registerEvent(item)}
//       />
//     </Animated.View>
//   );

//   return (
//     <Animated.View style={[styles.container, animatedStyles]}>
//       <SafeAreaView>
//         {/* <Sidebar setToggleSidebarHandler={goToSidebar} /> */}
//         <View>
//           <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
//         </View>
//         <Text style={styles.header}>Upcoming Events</Text>
//         <FlatList
//           data={events}
//           renderItem={renderEventItem}
//           keyExtractor={(item, index) => index}
//           contentContainerStyle={styles.list}
//         />
//       </SafeAreaView>
//     </Animated.View>
//   );
// }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#E8F9FF",
// //     // backgroundColor: "#0B192C",
// //     zIndex: 500,
// //   },
// //   header: {
// //     fontSize: 24,
// //     fontWeight: "bold",
// //     textAlign: "center",
// //     marginVertical: 16,
// //     color: "#37AFE1",
// //   },
// //   list: {
// //     paddingHorizontal: 16,
// //   },
// //   card: {
// //     backgroundColor: "#fff",
// //     // backgroundColor: "#09122C",
// //     borderRadius: 8,
// //     padding: 16,
// //     marginBottom: 12,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   eventName: {
// //     fontSize: 18,
// //     fontWeight: "bold",
// //     color: "#0F67B1",
// //     // color: "#d9d9d9",
// //     marginBottom: 8,
// //   },
// //   eventDetails: {
// //     fontSize: 14,
// //     color: "#666",
// //     // color: "#d9d9d9",
// //     marginBottom: 4,
// //   },
// //   eventDescription: {
// //     fontSize: 14,
// //     color: "#555",
// //     // color: "#d9d9d9",
// //     marginTop: 8,
// //     marginBottom: 15,
// //   },

// //   darkView: {
// //     // width: "20%",
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginTop: 25,
// //     alignSelf: "flex-end",
// //   },
// // });

// // Change this dynamically based on your dark mode toggle logic.

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: "#0B192C",
//     backgroundColor: "#E8F9FF",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginVertical: 16,
//     color: darkMode ? "#37AFE1" : "#0F67B1",
//   },
//   list: {
//     paddingHorizontal: 16,
//   },
//   card: {
//     backgroundColor: darkMode ? "#1A2D42" : "#fff",
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: darkMode ? "#000" : "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   eventName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: darkMode ? "#61DAFB" : "#0F67B1",
//     marginBottom: 8,
//   },
//   eventDetails: {
//     fontSize: 14,
//     color: darkMode ? "#A3B6CC" : "#666",
//     marginBottom: 4,
//   },
//   eventDescription: {
//     fontSize: 14,
//     color: darkMode ? "#9BAEC5" : "#555",
//     marginTop: 8,
//     marginBottom: 15,
//   },
//   registerBtn: {
//     borderRadius: 5,
//   },
//   darkView: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 25,
//     alignSelf: "flex-end",
//     backgroundColor: darkMode ? "#112240" : "#E8F9FF",
//     padding: 10,
//     borderRadius: 8,
//   },
// });

import { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import { useFocusEffect } from "@react-navigation/native";

export default function Events({ navigation }) {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios
      .get("http://192.168.60.166:5000/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchRegisteredEvents = async () => {
        const jsonEvents = await AsyncStorage.getItem("RegisteredEvents");
        if (jsonEvents) {
          setRegisteredEvents(JSON.parse(jsonEvents));
        }
      };

      fetchRegisteredEvents();
    }, [])
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const registerEvent = async (event) => {
    setRegisteredEvents(() => {
      const updatedRegisteredEvents = [...registeredEvents, event];

      AsyncStorage.setItem(
        "RegisteredEvents",
        JSON.stringify(updatedRegisteredEvents)
      );

      return updatedRegisteredEvents;
    });

    alert(`${event.name} has been registered`);
  };

  const renderEventItem = ({ item }) => (
    <View style={[styles.card, darkMode ? styles.darkCard : styles.lightCard]}>
      <Text
        style={[
          styles.eventName,
          darkMode ? styles.darkText : styles.lightText,
        ]}
      >
        {item.name}
      </Text>
      <Text
        style={[
          styles.eventDetails,
          darkMode ? styles.darkText : styles.lightText,
        ]}
      >
        📅 {item.dateTime}
      </Text>
      <Text
        style={[
          styles.eventDetails,
          darkMode ? styles.darkText : styles.lightText,
        ]}
      >
        📍 {item.venue}
      </Text>
      <Text
        style={[
          styles.eventDescription,
          darkMode ? styles.darkText : styles.lightText,
        ]}
      >
        {item.description}
      </Text>
      <Button
        style={styles.registerBtn}
        title={
          registeredEvents.some((event) => event.id === item.id)
            ? "Registered"
            : "Register Now"
        }
        color={
          registeredEvents.some((event) => event.id === item.id)
            ? "#CD1C18"
            : "#000080"
        }
        onPress={() => registerEvent(item)}
      />
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        darkMode ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      <SafeAreaView>
        <View>
          <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        </View>
        <Text
          style={[styles.header, darkMode ? styles.darkText : styles.lightText]}
        >
          Upcoming Events
        </Text>
        <FlatList
          data={events}
          renderItem={renderEventItem}
          keyExtractor={(item, index) => index}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightBackground: {
    backgroundColor: "#E8F9FF",
  },
  darkBackground: {
    backgroundColor: "#1A2D42",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lightCard: {
    backgroundColor: "#fff",
  },
  darkCard: {
    backgroundColor: "#1A2D42",
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  eventDetails: {
    fontSize: 14,
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 15,
  },
  registerBtn: {
    borderRadius: 5,
  },
  lightText: {
    color: "#0F67B1",
  },
  darkText: {
    color: "#61DAFB",
  },
});
