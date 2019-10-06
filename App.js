import React, {useState, useEffect} from 'react';
import { StyleSheet, Text,Alert, View, AsyncStorage } from 'react-native';
import Home from './Home';
import Setting from './Setting';
import Stopwatch from './Stopwatch';
import List from './List';


export default function App() {
  const[dailyGoal,setDailyGoal] = useState(60*1000*180);
  const [page, setPage] = useState('Home');
  const [results, setResults] = useState([]);
  const [tempGoal, setTempgoal] = useState(10000);
  const [dailyFin, setDailyFin] = useState(0);
  const [monthlyFin, setMonthlyFin] = useState(0);
  const [success, setSuccess] = useState(0);

  const pad = (n) => n < 10 ? '0'+n : n

  // 초기화 , 로컬에 daily goal 존재 시, 호출 구현
  useEffect(()=>{
    AsyncStorage.getItem("dailyGoal").then(storedGoal =>{
      if ( typeof storedGoal !== 'object'){
        setDailyGoal(parseInt(storedGoal))
        console.log("we dont hav goal, init...")
      }else {
        console.log("we have goal" + storedGoal)
      }
    })
    },[])


  // clearAsyncStorage = async() => {
  //     try{
  //         AsyncStorage.clear();
  //         console.log('clear')
  //     }
  //     catch(error){
  //         alert('error');
  //     }
  // }
  // clearAsyncStorage();

  // 결과 리스트 불러 오기
  
  useEffect(()=>{
    //Daily 목표 달성 시,
    if (dailyFin > dailyGoal ){
      setSuccess(1)
      // Alert.alert(
      //   'Daily Goal Achived!',
      //   'Good Job!',
      //   [{text: 'Confirm', style: "cancel"},])
    }else{
      setSuccess(0)
    }
    
    },[dailyFin, dailyGoal])  

  useEffect( ()=>{
    //이전 결과 불러오기
    check= async ()=>{
      const storedResult= await AsyncStorage.getItem("results")
    if(storedResult != null){
      console.log("we have reult " + JSON.parse(storedResult))
      setResults(JSON.parse(storedResult))
    }else{
      console.log("we dont hav result, init...")
    }
    } 
    check();
    },[])  

  //결과 리스트 즉시 갱신 구현
  useEffect(()=>{
    // 새 결과 저장
    save = async()=>{
      await AsyncStorage.setItem("results", JSON.stringify(results))
      const savedResult = await AsyncStorage.getItem("results")
      console.log("sw results :    "+ JSON.stringify(savedResult))
    }
    save();
    //일일 total 결과 갱신
    const today = new Date();
    const date = pad(today.getFullYear())+ "-" +pad(today.getMonth()+1)+ "-" +pad(today.getDate());
    const todayResult = results.filter(item => {return item.day === date })
    const dailySum = todayResult.reduce((acc,item)=>{
      return acc + item.runtime
    },0)
    console.log(date)
    console.log("dailySum:     "+dailySum)
    setDailyFin(dailySum)

    //월간 total 결과 갱신
    const month =  String(pad(today.getFullYear())) + String(pad(today.getMonth()+1))
    console.log(month)

    const thisMonthResult = results.filter(item => {
      const itemMonth = item.day.split('-')[0]+item.day.split('-')[1]
      return  itemMonth === month })
    const monthlySum = thisMonthResult.reduce((acc,item)=>{
      return acc + item.runtime
    },0)
    console.log("monthlySum:     "+monthlySum)
    setMonthlyFin(monthlySum)

  },[results])
  

  const gotoPage=(page)=>{
    setPage(page);
  }

  const dailyGoalHandler= async(dailyGoal)=>{
    setDailyGoal(dailyGoal)
    await AsyncStorage.setItem("dailyGoal", String(dailyGoal));
  }

  //화면 이동 

  if(page === 'Home'){
    content = <Home 
    dailyGoal={dailyGoal}
    setDailyGoal={setDailyGoal}
    gotoPage={gotoPage} 
    setTempgoal={setTempgoal}
    dailyFin={dailyFin}
    success={success}
    setSuccess={setSuccess}
    />;
  }

  if(page === 'Setting'){
    content = <Setting 
    gotoPage={gotoPage} 
    dailyGoal={dailyGoal} 
    dailyGoalHandler={dailyGoalHandler}
    />;
  }

  if(page === 'StopWatch'){
    content = <Stopwatch 
    gotoPage={gotoPage}
    tempGoal ={tempGoal}
    results = {results}
    setResults = {setResults}
    dailyFin={dailyFin}
    dailyGoal={dailyGoal}
    />;
  }

  if(page === 'List'){
    content = <List
    gotoPage={gotoPage}
    results = {results}
    setResults = {setResults}
    dailyFin = {dailyFin}
    monthlyFin = {monthlyFin}
    />;
  }

  return (
    <View style={styles.container}>
      {content}
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
