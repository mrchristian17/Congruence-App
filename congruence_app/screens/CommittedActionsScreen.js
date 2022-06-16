import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../assets/colors/colors';

import Task from '../components/Task';
import IconButton from '../components/CustomButton/IconButton'
import Icon from 'react-native-vector-icons/MaterialIcons';

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

    const deleteTask = (index) => {
      let itemsCopy = [...taskItems];
      itemsCopy.splice(index, 1);
      setTaskItems(itemsCopy)
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
                      <Task 
                        text={item.task} 
                        completed={item.completed}
                        deleteButton = {<IconButton icon="delete" onPress={()=>deleteTask(index)}/>}
                      />
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
      backgroundColor: colors.background,
    },
    tasksWrapper: {
      paddingTop: 20,
      paddingHorizontal: 20,
  
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
  });
  