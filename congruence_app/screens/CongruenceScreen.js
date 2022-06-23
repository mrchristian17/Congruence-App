import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import colors from '../assets/colors/colors';
// const congruenceDay = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0];

const markedDates = () => {
  // console.log('global', global.congruenceDay);
  var daysOfYear = [];
  var date = new Date();
  for (var i = 0; i < 30; i++) {
    //TODO: change to variable checking if all task for the day complete
    if (i) {
      //global.congruenceDay[i]
      daysOfYear.push(new Date(date).toISOString().split('T')[0]);
    }
    date.setDate(date.getDate() - 1);
  }
  let marked = {};

  daysOfYear.forEach(day => {
    marked[day] = {
      selected: true,
      selectedColor: colors.primary,
    };
  });
  // console.log(marked)
  return marked;
}

export default CongruenceScreen = () => {
  const today = new Date();
  return (
    <Calendar
      // Cuts off date at T(ime)
      maxDate={today.toISOString().split('T')[0]}
      // onDayPress={day => {
      //   console.log('selected day', day);
      // }}
      theme={{
        arrowColor: colors.secondary,
        todayTextColor: colors.black,
        todayBackgroundColor: colors.background,
      }}
      markedDates={markedDates()}
    ></Calendar>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  }
});
