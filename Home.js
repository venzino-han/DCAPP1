import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, AsyncStorage  }  from 'react-native';
import moment from 'moment';
import BasicButton from './components/BasicButton'; 


export default function Home(props) {

    function Timer({interval, style}){
        const pad = (n) => n < 10 ? '0'+n : n
        const duration = moment.duration(interval)
        return <Text style = {style}>{pad(duration.hours())}:{pad(duration.minutes())}</Text>
      }

    function toTime(raw) {
        const pad = (n) => n < 10 ? '0'+n : n
        const duration = moment.duration(raw)
        return ( pad(duration.hours())+':'+pad(duration.minutes()))
    }


    return (
      <View style={styles.screen}>
        <View style={{flex:1, padding: 40}}>
            <Button
            color='#211f1e'
            onPress={()=>{ props.gotoPage('Setting')} } 
            title = {"  Daily Goal  " + toTime(props.dailyGoal) }
            />
            <Button
            color='#211f1e'
            onPress={()=>{ props.gotoPage('List')} } 
            title = "Recodes"
            />
        </View>
        <View style ={{flex:2, alignItems: 'center'}}>
            <Text style ={{ color: 'white'}}> Today Focus Time</Text>
            <Timer  interval={props.dailyFin} style={styles.timer} />
            <View style={styles.screen}>
                { props.success == 1 &&(<Text style={{fontSize: 20, color:'#FFF'}}>Daily Goal Achived!</Text>)}
            </View>
        </View>
        <View style={styles.basicview}>
                <Text style ={{ color: 'white'}}>Select Focus Time</Text>
                <View style={styles.btngroup} >
                    <BasicButton
                    title={'60'} 
                    background={'#004B8D'}
                    color ={'white'}
                    onPress={()=>{
                        props.gotoPage('StopWatch');
                        props.setTempgoal(60000*60);
                        }}/>
                    <BasicButton
                    title={'45'}
                    background={'#004B8D'}
                    color ={'white'} 
                    onPress={()=>{
                        props.gotoPage('StopWatch');
                        props.setTempgoal(45000*60);
                        }}/>
                    <BasicButton
                    title={'30'} 
                    background={'#004B8D'}
                    color ={'white'}
                    onPress={()=>{
                        props.gotoPage('StopWatch');
                        props.setTempgoal(30000*60);
                    }}/>
                </View>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#2D2926',
        width: '100%'
    },
    basicview:{
        flex: 2,
        padding: 10,
        alignItems: 'center',
        
    },
    btngroup:{
        flex: 1,
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    timer: {
        color: 'white',
        alignSelf: "center",
        fontSize: 80,
      },
  });
  