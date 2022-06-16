import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Task from '../components/Task';

export default CommittedActionsScreen = () => {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);
      
  
    const handleAddTask = () => {
      Keyboard.dismiss();
      const newTask = {task: task, completed: false};
      setTaskItems([...taskItems, newTask]);
      setTask(null);
    }
  
    const completeTask = (index) => {
      if (taskItems[index].completed) {
        taskItems[index].completed = false;
      } 
      else {
        taskItems[index].completed = true;
      }
      let itemsCopy = [...taskItems];
      setTaskItems(itemsCopy);
    }
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1
          }}
          keyboardShouldPersistTaps='handled'
        >
  
          {/* Today's Task */}
          <View style={styles.tasksWrapper}>
            {/* <Text style={styles.sectionTitle}>Committed Actions</Text> */}
  
            <View style={styles.items}>
              {/* This is where the tasks will go */}
              {
                taskItems.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                      <Task text={item.task} completed={item.completed}/>
                    </TouchableOpacity>
                )})
              }
            </View>
          </View>
          </ScrollView>
        {/* Add Task */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height" }
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
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E5E5E5',
    },
    tasksWrapper: {
      paddingTop: 20,
      paddingHorizontal: 20,
  
    },
    // sectionTitle: {
    //   fontSize: 24,
    //   fontWeight: 'bold',
    // },
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
      backgroundColor: '#FFF',
      borderRadius: 60,
      borderColor: '#C0C0C0',
      borderWidth: 1,
      width: 250,
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,
    },
    addText: {},
  });
  