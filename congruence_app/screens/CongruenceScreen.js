import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import { get, collectionGroup, collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

import colors from '../assets/colors/colors';
// const congruenceDay = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0];
import CommittedActionsScreen from '../screens/CommittedActionsScreen';

export default CongruenceScreen = ({ navigation }) => {

  const [markedDates, setMarkedDates] = useState();
  let [isLoading, setIsLoading] = useState(true);


  const initDB = async () => {
    // var date = new Date();
    // var spliceDate = new Date(date).toISOString().split('T')[0];
    var spliceDate = moment().format('YYYY-MM-DD');
    const docRef = doc(db, "congruenceDates", "dates");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("Does not exist")
      const newCongruenceDate = {
        date: spliceDate,
        userID: auth.currentUser.uid
      };
      const docRef = await addDoc(collection(db, "congruenceDates"), newCongruenceDate);
    }
    else {
      console.log("Does")
    }

  }

  let loadCongruenceDates = async () => {
    // const q = query(collection(db, "congruenceDates"), where("userID", "==", auth.currentUser.uid));

    const collectionSnapshot = collection(db, "congruenceDates/" +  auth.currentUser.uid + "/dates");
    const querySnapshot = await getDocs(collectionSnapshot)

    let markedDB = {}
    querySnapshot.forEach((docSnapshot) => {
      let currCongruenceDate = docSnapshot.data();
      
      markedDB[currCongruenceDate.date] = {
          selected: currCongruenceDate.completed ? true:false,
          selectedColor: colors.primary,
        };
      });

    setMarkedDates(markedDB);
    setIsLoading(false);
    // setIsRefreshing(false);
  };

  if (isLoading) {
    loadCongruenceDates();
    // initDB();
  }

  function handleOnDayPress() {
    return <Calendar></Calendar>
  }

  // const markedDates = () => {
  //   var daysOfYear = [];
  //   var date = new Date();
  //   // for (var i = 0; i < 30; i++) {
  //   //   //TODO: change to variable checking if all task for the day complete
  //   //   if (i) {
  //   //   daysOfYear.push(new Date(date).toISOString().split('T')[0]);
  //   //   }
  //   //   date.setDate(date.getDate() - 1);
  //   // }
  //   // let marked = {};

  //   daysOfYear.forEach(day => {
  //     marked[day] = {
  //       selected: true,
  //       selectedColor: colors.primary,
  //     };
  //   });
  //   return marked;
  // }

  const today = new Date();
  return (
    <View style={styles.container}>
      <Calendar
        // Cuts off date at T(ime)
        maxDate={today.toISOString().split('T')[0]}
        // onDayPress={day => {
        //   console.log('selected day', day.dateString);
        // }}
        theme={{
          arrowColor: colors.secondary,
          todayTextColor: colors.black,
          todayBackgroundColor: colors.background,
        }}
        markedDates={markedDates}
      />
      <CommittedActionsScreen />
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  }
});
