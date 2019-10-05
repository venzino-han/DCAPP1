import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, AsyncStorage  }  from 'react-native';
import Timeset from './components/Timeset'

export default function Setting(props) {
    const [tempGoal, setTempGoal] = useState(props.dailyGoal);

    const saveDailyGoal = async (goal) =>{
        await AsyncStorage.setItem("dailyGoal",String(goal));
        props.dailyGoalHandler(goal);
    }

    return (
      <View style={styles.container}>
        <Text> Setting </Text>
        <Timeset
            tempGoal = {tempGoal}
            setTempGoal = {setTempGoal}
        />
        <Button
        onPress={()=>{
            saveDailyGoal(tempGoal);
            props.gotoPage('Home');
        }}
        title ="Save"
        buttonStyle={{width:120}}
        />
        <Button
        onPress={()=>{props.gotoPage('Home')}}
        title ="Cancel"
        buttonStyle={{width:120}}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  