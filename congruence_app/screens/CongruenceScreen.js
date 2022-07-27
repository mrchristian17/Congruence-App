import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

import colors from '../assets/colors/colors';
import CommittedActionsScreen from './CommittedActionsScreen';
import moment from 'moment';
import { CongruenceContext } from '../App';

// import CongruenceContextProvider from '../CongruenceContext';


export default CongruenceScreen = ({ navigation }) => {
  const { completedDate } = useContext(CongruenceContext);

  const today = moment().format('YYYY-MM-DD');
  const [markedDates, setMarkedDates] = useState();
  const [currentDate, setCurrentDate] = useState({ date: today });
  // const [completedDate, setCompletedDate] = useState();
  // const [isLoading, setIsLoading] = useState(true);

  // initial load of marked dates from the database
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

  // listener that waits for marked dates component to update

  useEffect(() => {
    if(completedDate) {
      if(markedDates[completedDate.date]) {
        markedDates[completedDate.date].selected = completedDate.completionStatus;
        setMarkedDates({...markedDates})
        
      }
      else {
        markedDates[completedDate.date] = {
          selected: completedDate.completionStatus,
          selectedColor: colors.primary,
        };
        setMarkedDates({...markedDates})
      }
    }
    
  }, [completedDate]);

  const onDayPress = useCallback((day) => {
    setCurrentDate({ ...currentDate, date: day.dateString })
  }, []);

  const marked = useMemo(() => {
    console.log("rerendering marked dates")
    //checks to see if markedDates state has been populated
    //if not then method is not run
    if(isEmpty(markedDates)) {
      return;
    }
    console.log("updating marked dates---"+ currentDate.date)
    let currBackgroundColor = 'white';
    let currTextColor = 'black'

    // check if current date is in marked date list and sets color accordingly
    if(markedDates.hasOwnProperty(currentDate.date) && markedDates[currentDate.date].selected == true) {
      currBackgroundColor = colors.primary;
      currTextColor = 'white'
    }
    else if(currentDate.date == today) {
      currBackgroundColor = colors.background
    }
    console.log(markedDates)
    return {
      ...markedDates, 
      [currentDate.date]: {
        customStyles: {
          container: {
            backgroundColor: currBackgroundColor,
            elevation: 4,
            borderColor: 'black',
            borderWidth: 2
          },
          text: {
            marginTop: 4,
            // fontSize: 11,
            color: currTextColor
          }
        } 
      }
    };
  }, [currentDate, markedDates]);

  function isEmpty(ob){
    for(var i in ob){ return false;}
   return true;
 }

  return (
    <View style={styles.container}>
      {/* <CongruenceContextProvider> */}
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
      <CommittedActionsScreen currentDate={currentDate.date} />
      {/* </CongruenceContextProvider> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  }
});