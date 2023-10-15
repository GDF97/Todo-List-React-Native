import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useState } from "react";

export default function Task({
  taskName,
  index,
  isCompleted,
  fnCompleteTodo,
  fnDeleteTodo,
}) {
  return (
    <TouchableOpacity
      style={styles.task}
      onPress={() => fnCompleteTodo(index)}
      onLongPress={() => fnDeleteTodo(index)}
    >
      <Text
        style={{
          fontSize: 20,
          color: "#fff",
        }}
      >
        {taskName}
      </Text>
      <View
        style={{
          width: 30,
          height: 30,
          borderWidth: 1,
          borderColor: "#fff",
          borderRadius: 4,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isCompleted ? "white" : "transparent",
        }}
      >
        <Image
          source={require("../assets/checkmark.png")}
          style={{
            width: 20,
            height: 20,
            display: isCompleted ? "flex" : "none",
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    backgroundColor: "blue",
    padding: 16,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
});
