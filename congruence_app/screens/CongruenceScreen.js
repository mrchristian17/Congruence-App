import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

import colors from '../assets/colors/colors';
import CommittedActionsScreen from '../screens/CommittedActionsScreen';

export default CongruenceScreen = ({ navigation }) => {

  const [markedDates, setMarkedDates] = useState();
  const [currentDate, setCurrentDate] = useState({ date: moment().format('YYYY-MM-DD') });
  const [completedDate, setCompletedDate] = useState();

  useEffect(() => {
    const loadCongruenceDates = async () => {
      const collectionSnapshot = collection(db, "congruenceDates/" + auth.currentUser.uid + "/dates");
      const querySnapshot = await getDocs(collectionSnapshot)

      let markedDB = {}
      querySnapshot.forEach((doc) => {
        let currCongruenceDate = doc.data();

        markedDB[currCongruenceDate.date] = {
          selected: currCongruenceDate.completed ? true : false,
          selectedColor: colors.primary,
        };
      });
      setMarkedDates(markedDB);
    }
    loadCongruenceDates();
  },[])

  useEffect(() => {
    console.log("update completion status")
    if(completedDate) {
      if(markedDates[completedDate]) {
        markedDates[completedDate].selected = !markedDates[completedDate].selected;
        setMarkedDates({...markedDates})
      }
      else {
        let newMarkedDate = {}
        newMarkedDate[completedDate] = {
          selected: currCongruenceDate.completed ? true : false,
          selectedColor: colors.primary,
        };
        setMarkedDates({...markedDates, newMarkedDate})
      }
    }
    
  }, [completedDate]);

  const onDayPress = useCallback((day) => {
    setCurrentDate({ ...currentDate, date: day.dateString })
  }, []);

  const marked = useMemo(() => {
    return {
      ...markedDates, 
      [currentDate.date]: {
        // selected: true,
        // disableTouchEvent: true,
        // selectedColor: colors.primary,
        // selectedTextColor: 'white'
        customStyles: {
          container: {
            backgroundColor: 'white',
            elevation: 4,
            borderColor: 'black',
            borderWidth: 2
          },
          text: {
            marginTop: 4,
            // fontSize: 11,
            color: 'black'
          }
        }
        
      }
      
    };
  }, [currentDate]);

  return (
    <View style={styles.container}>
      <Calendar
        // Cuts off date at T(ime)
        // maxDate={today.toISOString().split('T')[0]}
        // onDayPress={day => {
        //   setCurrentDate({ ...currentDate, date: day.dateString })
        // }}
        markingType='custom'
        onDayPress={onDayPress}
        theme={{
          arrowColor: colors.secondary,
          todayTextColor: colors.black,
          todayBackgroundColor: colors.background,
          
        }}
        markedDates={marked}
      />
      <CommittedActionsScreen currentDate={currentDate.date} onTaskCompletion={setCompletedDate}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  }
});