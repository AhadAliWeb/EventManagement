import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Sidebar from "../components/Sidebar";

export default function RegisteredEvents({ navigation }) {
  const [events, setEvents] = useState([]);

  const getRegisteredEvents = async () => {
    const jsonEvents = await AsyncStorage.getItem("RegisteredEvents");
    const events = jsonEvents ? JSON.parse(jsonEvents) : [];

    console.log(jsonEvents);

    setEvents(events);
  };

  useEffect(() => {
    getRegisteredEvents();
  }, []);

  const registerEvent = async (name, id) => {
    const jsonEvents = await AsyncStorage.getItem("RegisteredEvents");
    const events = jsonEvents ? JSON.parse(jsonEvents) : [];

    events.push(id);

    alert(`${name} has been registered`);
  };

  const renderEventItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.eventName}>{item.name}</Text>
      <Text style={styles.eventDetails}>📅 {item.dateTime}</Text>
      <Text style={styles.eventDetails}>📍 {item.venue}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
      <Button
        style={styles.registerBtn}
        title="Give Feedback"
        color="#000080"
        onPress={() =>
          navigation.navigate("FeedBack", { name: item.name, id: item.id })
        }
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <Sidebar setToggleSidebarHandler={goToSidebar} /> */}
      <View>
        <Sidebar />
      </View>
      <Text style={styles.header}>Registered Events</Text>
      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={(item, index) => index}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    zIndex: 500,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#333",
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  eventDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 8,
    marginBottom: 15,
  },

  darkView: {
    // width: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    alignSelf: "flex-end",
  },
});
