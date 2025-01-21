import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Sidebar from "../components/Sidebar";
import StarRating from "react-native-star-rating-widget";

export default function FeedbackList({ navigation }) {
  const [feedbackList, setFeedbackList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchFeedback = async () => {
        const jsonFeedback = await AsyncStorage.getItem("FeedbackList");
        if (jsonFeedback) {
          setFeedbackList(JSON.parse(jsonFeedback));
        }
      };

      fetchFeedback();
    }, [])
  );

  console.log(feedbackList);

  const renderFeedbackItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.feedbackTitle}>{item.name}</Text>
      <Text style={styles.feedbackDetails}>Comments: {item.comments}</Text>
      <StarRating rating={item.rating} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Sidebar />
      </View>
      <Text style={styles.header}>User Feedback</Text>
      <FlatList
        data={feedbackList}
        renderItem={renderFeedbackItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F9FF",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#37AFE1",
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
  feedbackTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F67B1",
    marginBottom: 8,
  },
  feedbackDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  feedbackContent: {
    fontSize: 14,
    color: "#555",
  },
});
