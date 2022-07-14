import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

import colors from '../assets/colors/colors';
import CommittedActionsScreen from '../screens/CommittedActionsScreen';

export default CongruenceScreen = ({ navigation }) => {

  const [markedDates, setMarkedDates] = useState();
  let [currentDate, setCurrentDate] = useState({ date: moment().format('YYYY-MM-DD') });
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

  const today = new Date();
  return (
    <View style={styles.container}>
      <Calendar
        // Cuts off date at T(ime)
        // maxDate={today.toISOString().split('T')[0]}
        onDayPress={day => {
          setCurrentDate({ ...currentDate, date: day.dateString })
        }}
        theme={{
          arrowColor: colors.secondary,
          todayTextColor: colors.black,
          todayBackgroundColor: colors.background,
        }}
        markedDates={markedDates}
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