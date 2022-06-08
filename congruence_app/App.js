import React, {useState} from 'react';
import { SafeAreaView, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CalendarPicker from 'react-native-calendar-picker';
import Task from './components/Task';

const CommittedActionsScreen = () => {
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

const CongruenceScreen = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date, type) => {
    //function to handle the date change
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }
  };

  return ( 
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* <Text style={styles.titleStyle}>
          React Native Calendar Picker
        </Text> */}
        <CalendarPicker
          startFromMonday={true}
          // allowRangeSelection={true}
          minDate={new Date(2018, 1, 1)}
          maxDate={new Date(2050, 6, 3)}
          weekdays={
            [
              'Mon', 
              'Tue', 
              'Wed', 
              'Thur', 
              'Fri', 
              'Sat', 
              'Sun'
            ]}
          months={[
            'January',
            'Febraury',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]}
          previousTitle="Previous"
          nextTitle="Next"
          todayBackgroundColor="#C0C0C0"
          selectedDayColor="#008000"
          // selectedDayTextColor="#000000"
          scaleFactor={375}
          textStyle={{
            fontFamily: 'Cochin',
            color: '#000000',
          }}
          onDateChange={onDateChange}
        />
        {/* <View style={styles.textStyle}>
          <Text style={styles.textStyle}>
            Selected Start Date :
          </Text>
          <Text style={styles.textStyle}>
            {selectedStartDate ? selectedStartDate.toString() : ''}
          </Text>
          <Text style={styles.textStyle}>
            Selected End Date :
          </Text>
          <Text style={styles.textStyle}>
            {selectedEndDate ? selectedEndDate.toString() : ''}
          </Text>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  // const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Committed Actions" component={CommittedActionsScreen} />
        <Tab.Screen name="Congruence" component={CongruenceScreen} />
      </Tab.Navigator>
    </NavigationContainer>
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
