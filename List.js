import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Alert }  from 'react-native';
import moment from 'moment'

export default function Setting(props) {

  const pad = (n) => n < 10 ? '0'+n : n

  function toTime(raw) {
    const duration = moment.duration(raw)
    return ( pad(duration.hours())+':'+pad(duration.minutes()))
  }

  const resetRecodes=()=>{
    props.setResults([])
  }

  const resetConfirm=()=>{
    Alert.alert(
      'Recodes delete confirm',
      'All recodes will be Deleted!',
      [
        {text: 'Reset', style: 'destructive', onPress: resetRecodes },
        {text: 'Cancel', style: 'cancel',},
    ]
    )
  }

    return (
      <View style={styles.container}>
        <Text> Recodes </Text>
        <View style={styles.list}>
          <Text>Daily Focus Time : {toTime(props.dailyFin)}</Text>
          <Text>Monthly Focus Time : {toTime(props.monthlyFin)}</Text>
          <Text></Text>
            <ScrollView style ={styles.scroll}>
              { props.results.map(data => 
              <View  key={data.id} style={styles.scrollitem} >
                <Text style={styles.scrollText}> {data.day} // {data.time} // {toTime(data.runtime)}</Text>
              </View>)}
            </ScrollView>
        </View>
        <View style={styles.container}>
          <View style ={{flexDirection:"row"}}>
            <Button
            onPress={()=>{props.gotoPage('Home')}}
            title ="Back"
            />
            <Button
            onPress={()=>{
              // 확인 다이얼로그 호출
              resetConfirm();
              }}
            title ="Reset"
            />
          </View>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: 20
    },
    list: {
      flex: 4,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      margin: 5,
      color: 'white',
    },
    scroll: {
      flex: 1,
      backgroundColor: '#2D2926',
      width: '100%',
    },
    scrollText:{
      backgroundColor: '#2D2926',
      color: 'white',
    },
    scrollitem:{
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      margin: 0,
      padding: 5,
    }
  });
  