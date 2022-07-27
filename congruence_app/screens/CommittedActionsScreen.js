import React, { useEffect, useState, useContext } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { auth, db } from "../firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";

import Task from '../components/Task';
import IconButton from '../components/CustomButton/IconButton'
import colors from '../assets/colors/colors';

import { CongruenceContext } from '../App';

export default CommittedActionsScreen = (props) => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  let toDoPath = "todos/" + auth.currentUser.uid + "/tasks/";
  let congruencePath = "congruenceDates/" + auth.currentUser.uid + "/dates"
  let currentDate = props.currentDate;
  let dailyTasksPath = "/dailyTasks"

  const { setCompletedDate } = useContext(CongruenceContext);

  console.log("render CommittedAction component")
  useEffect(() => {
    const loadToDoList = async () => {

      console.log(currentDate + " loading")

      const collectionSnapshot = collection(db, toDoPath + currentDate + dailyTasksPath);
      const querySnapshot = await getDocs(collectionSnapshot);
      let taskDB = [];
      querySnapshot.forEach((doc) => {
        let currTask = doc.data();
        currTask.id = doc.id;
        taskDB.push(currTask);
      });

      setTaskItems(taskDB);
    }
    loadToDoList();
  }, [props]);

  const handleAddTask = async () => {
    Keyboard.dismiss();

    const newTask = {
      task: task,
      completed: false,
      // userID: auth.currentUser.uid
    };

    const docRef = await addDoc(collection(db, toDoPath + currentDate + dailyTasksPath), newTask);

    newTask.id = docRef.id;
    setTaskItems([...taskItems, newTask]);
    setTask(null);
  }

  const completeTask = async (index) => {
    if (taskItems[index].completed) {
      taskItems[index].completed = false;
    }
    else {
      taskItems[index].completed = true;
    }
    let itemsCopy = [...taskItems];
    setTaskItems(itemsCopy);

    let tasksCompleted = false;
    console.log(checkAllTasksComplete())
    if(await checkAllTasksComplete()) {
      tasksCompleted = true
      console.log("----all tasks completed---")
    }
    setCompletedDate({date: currentDate.slice(), completionStatus: tasksCompleted});
    const toDoRef = doc(db, toDoPath + currentDate + dailyTasksPath, taskItems[index].id);
    setDoc(toDoRef, { completed: taskItems[index].completed }, { merge: true });
  }

  const deleteTask = async (index) => {
    await deleteDoc(doc(db, toDoPath + currentDate + dailyTasksPath, taskItems[index].id));
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }

  const checkAllTasksComplete = async () => {
    var tasksCompleted = true;
    console.log("task items: " + taskItems)
  
    taskItems.forEach(task => {
      console.log(task.task + " : " + task.completed)
      if (!task.completed) {
        tasksCompleted = false;
        return;
      }
    });

    // console.log(tasksCompleted)
    const collectionSnapshot = query(collection(db, congruencePath), where("date", "==", currentDate))
    const querySnapshot = await getDocs(collectionSnapshot)
    if (querySnapshot.empty) {
      const newCongruenceDate = {
        date: currentDate,
        completed: tasksCompleted,
      };
      await addDoc(collection(db, congruencePath), newCongruenceDate);
    }
    else {
      
      querySnapshot.forEach((docSnapshot) => {
        const congruenceDateRef = doc(db, congruencePath, docSnapshot.id)
        setDoc(congruenceDateRef, { completed: tasksCompleted }, { merge: true });
      });
    }
    return tasksCompleted;
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.temp}> */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

        {/* Today's Task */}
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            {/* This is where the tasks will go */}
            {

              taskItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task
                      text={item.task}
                      completed={item.completed}
                      deleteButton={<IconButton icon="delete" onPress={() => deleteTask(index)} />}
                      editButton={<IconButton icon="edit" onPress={() => { }} />}
                    />
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
      </ScrollView>
      {/* Add Task */}
      <View style={styles.writeTaskContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          // keyboardVerticalOffset={useHeaderHeight() + 100}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder={'Add Action'}
            value={task}
            onChangeText={text => setTask(text)}
          />

          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
    // flex: 1,
  },
  items: {
    // marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    borderRadius: 60,
    borderColor: colors.secondary,
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: colors.white,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  addText: {},
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 3,
  },
  writeTaskContainer: {
    paddingTop: 80,
  }
});