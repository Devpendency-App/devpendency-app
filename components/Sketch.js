import React, { useRef, useState, useEffect } from 'react';
import { Animated, Dimensions, View, StyleSheet, PanResponder, Button, TouchableOpacity, FlatList } from 'react-native';
import { Paragraph, Text, Card, DefaultTheme, Provider as PaperProvider, IconButton } from 'react-native-paper';
import Svg, { Polyline } from 'react-native-svg';
import {Picker} from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage'

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

let { width, height } = Dimensions.get('window');
width *= .95
height *= .95

const examplePath = [
  [
    { x: 90, y: 300 },
    { x: 90, y: 45 },
    { x: 400, y: 45 },
    { x: 400, y: 300},
    { x: 90, y: 300 },
  ],
  [
    { x: 200, y: 290 },
    { x: 200, y: 220 },
    { x: 300, y: 220 },
    { x: 300, y: 290 },
    { x: 200, y: 290 }
  ]
];


const setObjValue = async (drawing) => {
  const storedKey = new Date();  
  let existingDrawings
  try {
    existingDrawings = await AsyncStorage.getItem('Napkins')
  } catch(e) {
    console.log(e)
  }
  existingDrawings = JSON.parse(existingDrawings)
  try {
    await AsyncStorage.setItem('Napkins', JSON.stringify({...existingDrawings, [storedKey]: drawing }))
  } catch(e) {
    console.log(e)
  }
};

const getObj = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('Napkins')
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch(e) {
    console.log(e)
  }
}

export default function Sketch() {

  const [color, setColor] = useState('black')
  const [strokeWidth, setStrokeWidth] = useState(5)
  
  const Sketch = ({ navigation }) => {
    const [path, setPath] = useState(examplePath);
    
    let pathRef = useRef([[]]).current;
  
    const updatePath = points => {
      setPath(points);
    }
  
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: () => {
        },
        onPanResponderStart: () => {
        },
        onPanResponderMove: (event, gestureState) => { 

          const point = {
            x: gestureState.moveX - (width - (width * .95)),
            y: gestureState.moveY - (height - (height * .95)),
          };
  
  
          pathRef[pathRef.length-1].push(point);
  
          updatePath([...pathRef]);
        },
        onPanResponderRelease: () => {

          pathRef.push([]);
          updatePath([...pathRef]);

        }
      })
    ).current;
  
  
    
    
    const uberPoints = path.map(points => {
      return points.map(p => `${p.x},${p.y}`).join(' ');
    });

    return (
      <>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Picker
          selectedValue={color}
          style={styles.dropdown}
          onValueChange={(itemValue) => setColor(itemValue)}>
          <Picker.Item label="Black" value="black" />
          <Picker.Item label="Red" value="red" />
          <Picker.Item label="Green" value="green" />
          <Picker.Item label="Blue" value="blue" />
          <Picker.Item label="Yellow" value="yellow" />
        </Picker>
        <Picker
          selectedValue={strokeWidth}
          style={styles.dropdown}
          onValueChange={(itemValue) => setStrokeWidth(itemValue)}>
          <Picker.Item label="Size: 1" value="1" />
          <Picker.Item label="Size: 2" value="2" />
          <Picker.Item label="Size: 3" value="3" />
          <Picker.Item label="Size: 4" value="4" />
          <Picker.Item label="Size: 5" value="5" />
          <Picker.Item label="Size: 6" value="6" />
          <Picker.Item label="Size: 7" value="7" />
          <Picker.Item label="Size: 8" value="8" />
          <Picker.Item label="Size: 9" value="9" />
          <Picker.Item label="Size: 10" value="10" />
        </Picker>
        <TouchableOpacity
          style={{ height: 50, width: 50 }}
          onPress={() => {
            while (pathRef.length > 1) {
              pathRef.pop();
            }
            while(pathRef[0].length){
              pathRef[0].pop()
            }
            updatePath(examplePath);
          }}>
          <Text style={{ lineHeight: 50, textAlign: 'center' }}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 50, width: 50 }}
          onPress={async () => {
            await setObjValue(path)
            // console.log(testStorageSet())
            while (pathRef.length > 1) {
              pathRef.pop();
            }
            while(pathRef[0].length){
              pathRef[0].pop()
            }
            updatePath(examplePath);
          }}
        >
          <Text style={{ lineHeight: 50, textAlign: 'center' }}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 50, width: 50 }}
            onPress={() => navigation.navigate('Saved Napkins')}
        >
          <Text style={{ lineHeight: 50, textAlign: 'center' }}>Get</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container} {...panResponder.panHandlers}>
        <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
          {uberPoints.map((points, index) => (
            <Polyline
              key={index}
              points={points}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
            />
          ))}
        </Svg>
      </View>

    </>
    )
  }


    const savedNapkinRef = useRef('')
  
      const ViewDrawing = () => {
        const uberPoints = savedNapkinRef.current.map(points => {
          return points.map(p => `${p.x},${p.y}`).join(' ');
        });
        return (
          <View style={styles.container}>
            <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
              {uberPoints.map((points, index) => (
                <Polyline
                  key={index}
                  points={points}
                  fill="none"
                  stroke={color}
                  strokeWidth={strokeWidth}
                />
          ))}
        </Svg>
      </View>
        )
  
      }
  
  const SavedNapkins =  ({navigation}) => {

    const [ savedNapkins, setSavedNapkins ] = useState({})
    const [ coordsArrays, setCoordsArrays ] = useState([])
    
    useEffect(() => {
      const getSavedObj = async () => {
        let list = await getObj();
        setSavedNapkins(list)
        setCoordsArrays(Object.entries(list))
      }
      getSavedObj();
    }, [])
    console.log(savedNapkins)
    const deleteNapkin = async (date) => {
      let napkins = savedNapkins
      delete napkins[date]
      await AsyncStorage.setItem('Napkins', JSON.stringify(napkins))
      setSavedNapkins(napkins)
      setCoordsArrays(Object.entries(napkins))
    }
    
    const renderItem = ({ item }) => {

      const  renderDrawing = (coords) => {
        navigation.navigate('View Drawing')
        savedNapkinRef.current = coords
      }


      return (

        <Card>

          <Text>{item[0]}</Text>
          <IconButton 
            title='View'
            icon='arrow-expand'
            onPress={() => renderDrawing(item[1])}/>
          <IconButton
            title='Delete'
            icon='delete'
            onPress={async () => await deleteNapkin(item[0])}/>

        </Card>



      )
    }

    
    return (
      <>
      <FlatList
      keyExtractor={(value, index) => index.toString()}
      data={coordsArrays}
      renderItem={renderItem}
       />
      </>
    )
  }



  return (
    <>
    <Stack.Navigator>

      <Stack.Screen 
        name='Dev Napkin'
        component={Sketch} />

      <Stack.Screen 
        name='Saved Napkins'
        component={SavedNapkins} />

      <Stack.Screen 
        name='View Drawing'
        component={ViewDrawing} />

    </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    height: 50, 
    width: 110,
    color: 'white',
  }
});