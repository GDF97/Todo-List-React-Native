import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Image,
} from "react-native";

import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState("");
  const [listOfTasks, setListOfTasks] = useState([]);
  const [id, setId] = useState(0);
  let data = new Date();
  let day = data.getDate();
  let mes = data.getMonth() + 1;
  let ano = data.getFullYear();
  let dataFormatada = day + "/" + (mes < 10 ? "0" + mes : mes) + "/" + ano;

  const AddTodo = () => {
    if (task == "") return;
    const taskObj = { text: task, id: id, isCompleted: false };
    setListOfTasks([...listOfTasks, taskObj]);
    setId(id + 1);
    setTask("");
  };

  const fnCompleteTodo = (index) => {
    const newListOfTaks = [...listOfTasks];
    newListOfTaks.map((task) =>
      task.id === index ? (task.isCompleted = !task.isCompleted) : task
    );
    setListOfTasks(newListOfTaks);
  };

  const fnDeleteTodo = (index) => {
    const newListOfTaks = listOfTasks.filter((task) => task.id !== index);
    return Alert.alert("Você tem Certeza?", "Deseja deletar essa tarefa?", [
      {
        text: "Sim",
        onPress: () => {
          setListOfTasks(newListOfTaks);
        },
      },
      {
        text: "Não",
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <View>
          <Text style={{ fontSize: 20, color: "#020205" }}>Hello,</Text>
          <Text style={{ fontSize: 32, color: "#05224d", fontWeight: 600 }}>
            Pedro Silva
          </Text>
        </View>
        <Image style={styles.profilePic} source={require("./assets/gdf.jpg")} />
      </View>
      <View style={styles.tasksDiv}>
        <View style={styles.headerDiv}>
          <Text
            style={{
              backgroundColor: "#05224d",
              color: "white",
              textAlign: "center",
              textAlignVertical: "center",
              minWidth: 100,
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 100,
              fontSize: 20,
            }}
          >
            {dataFormatada}
          </Text>
        </View>
        <ScrollView style={styles.tasksWrapper}>
          {listOfTasks.map((task) => (
            <Task
              key={task.id}
              taskName={task.text}
              isCompleted={task.isCompleted}
              index={task.id}
              fnCompleteTodo={fnCompleteTodo}
              fnDeleteTodo={fnDeleteTodo}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.inputBar}>
        <TextInput
          placeholder="Insira um Tarefa"
          value={task}
          style={{ flex: 1, padding: 10, fontSize: 24 }}
          onChangeText={(text) => setTask(text)}
        />
        <View style={{}}>
          <Button title="Adicionar" onPress={(task) => AddTodo(task)} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    position: "relative",
  },
  header: {
    paddingLeft: 25,
    paddingRight: 25,
    position: "relative",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 40,
  },
  profilePic: {
    width: 52,
    height: 52,
    borderRadius: 8,
    right: 0,
  },
  tasksDiv: {
    borderWidth: 1,
    borderColor: "black",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 75,
    position: "relative",
  },
  headerDiv: {
    paddingLeft: 25,
    width: "100%",
    display: "flex",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    top: -10,
  },
  headerButtons: {
    flexDirection: "row",
    gap: 10,
  },
  tasksWrapper: {
    gap: 40,
  },
  inputBar: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F6F9",
  },
});
