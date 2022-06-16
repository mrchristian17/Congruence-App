import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import colors from '../assets/colors/colors';

let congruenceDay = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0];

export default CongruenceScreen = () => {
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
  
    let today = moment();
    let day = today.clone().startOf('month');
    let customDatesStyles = [];
    let i = 0
  
    while(day.add(1, 'day').isSame(today, 'month')) {
      let circleColor = '';
      let textColor = colors.black;
      if(congruenceDay[i]) {
        circleColor = colors.primary;
        textColor = colors.white;
      }
      i+=1;
      customDatesStyles.push({
        date: day.clone(),
        // Random colors
        style: {backgroundColor: circleColor},
        textStyle: {color: textColor}, // sets the font color
        containerStyle: [], // extra styling for day container
        allowDisabled: true, // allow custom style to apply to disabled dates
      });
    }
  
    return ( 
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <CalendarPicker
            customDatesStyles={customDatesStyles}
            // startFromMonday={true}
            // allowRangeSelection={true}
            minDate={new Date(2021, 12, 1)}
            maxDate={new Date(2050, 6, 3)}
            weekdays={
              [
                'Sun',
                'Mon', 
                'Tue', 
                'Wed', 
                'Thur', 
                'Fri', 
                'Sat', 
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
            todayBackgroundColor={colors.secondary}
            selectedDayColor="transparent"
            // selectedDayTextColor="#fff"
            scaleFactor={375}
            textStyle={{
              fontFamily: 'ArialMT',
              color: colors.black,
            }}
            onDateChange={onDateChange}
          />
        </View>
      </SafeAreaView>
    );
  }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    }
});
