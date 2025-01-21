import { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import { useFocusEffect } from "@react-navigation/native";

export default function Events({ navigation }) {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://192.168.137.1:5000/events")
      .then((res) => {
        setEvents(res.data);
        setFilteredEvents(res.data); // Initialize filtered events
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

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredEvents(events);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = events.filter(
        (event) =>
          event.name.toLowerCase().includes(lowerCaseQuery) ||
          event.description.toLowerCase().includes(lowerCaseQuery) ||
          event.venue.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredEvents(filtered);
    }
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
        <TextInput
          style={[
            styles.searchBar,
            darkMode ? styles.darkInput : styles.lightInput,
          ]}
          placeholder="Search events..."
          placeholderTextColor={darkMode ? "#ccc" : "#999"}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredEvents}
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
  searchBar: {
    fontSize: 16,
    padding: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  lightInput: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    color: "#000",
  },
  darkInput: {
    backgroundColor: "#2C3E50",
    borderColor: "#555",
    color: "#fff",
  },
});
