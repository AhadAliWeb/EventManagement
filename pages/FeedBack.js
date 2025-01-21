import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import StarRating from "react-native-star-rating-widget";
import Sidebar from "../components/Sidebar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FeedBack({ navigation, route }) {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  const handleSubmit = async () => {
    if (comments.trim()) {
      const jsonFeedbacks = await AsyncStorage.getItem("FeedbackList");
      const feedbacks = jsonFeedbacks ? JSON.parse(jsonFeedbacks) : [];

      feedbacks.push({
        name: route.params.name,
        rating,
        comments,
        id: route.params.id,
      });
      await AsyncStorage.setItem("FeedbackList", JSON.stringify(feedbacks));

      Alert.alert(
        "Feedback Submitted",
        `Your feedback for ${route.params.name} has been submitted.`
      );
      setComments(""); // Clear the input field after submission
      setRating(0); // Reset rating
      navigation.goBack(); // Navigate back to the previous screen
    } else {
      Alert.alert("Error", "Please enter your comments before submitting.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Sidebar />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Feedback</Text>
        <Text style={styles.eventName}>Event Name: {route.params.name}</Text>
        <Text style={styles.ratingLabel}>Your Rating:</Text>
        <StarRating
          rating={rating}
          onChange={(number) => setRating(number)}
          starSize={30}
          color="#FFD700"
          emptyColor="#E0E0E0"
          style={styles.starRating}
        />
        <TextInput
          style={styles.input}
          placeholder="Write your comments here..."
          value={comments}
          onChangeText={setComments}
          multiline
        />
        <Button
          title="Submit Feedback"
          color="#0066CC"
          onPress={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  eventName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#555",
  },
  starRating: {
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    height: 120,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top",
  },
});
