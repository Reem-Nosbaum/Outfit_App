import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/home';
import SavedSets from './screens/savedSets'
import Outfit from './screens/outfit'


const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home}/> 
      <Stack.Screen name='SavedSets' component={SavedSets}/>
      <Stack.Screen name='Outfit' component={Outfit}/>
    </Stack.Navigator>
    </NavigationContainer>
    );
}
