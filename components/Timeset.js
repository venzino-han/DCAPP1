import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TimePicker from 'react-native-simple-time-picker';
import moment from 'moment';

export default function Timeset (props){
    const duration = moment.duration(props.tempGoal);
    const hour = duration.hours();
    const minutes = duration.minutes();
    const [selectedHours, setHours] = useState(hour);
    const [selectedMinutes, setMinutes] = useState(minutes);

    storeTempGoal = (newGoal)=>{
        props.setTempGoal(newGoal);
    }
    
    return (
      <View style={styles.container}>
        <Text style={{ fontSize : 20}}>
          {selectedHours} hr {selectedMinutes} min
        </Text>
        <TimePicker
          selectedHours={selectedHours}
          selectedMinutes={selectedMinutes}
          onChange={(hours, minutes) =>{
            setHours(hours);
            setMinutes(minutes);
            props.setTempGoal((hours*60*1000*60)+(minutes*60*1000));
          }}
        />
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 50,
    marginRight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
