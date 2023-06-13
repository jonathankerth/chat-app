// import the screens
import Start from "./components/Start.js";
import Chat from "./components/Chat.js";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import functions for initializing firestore
import { initializeApp } from "firebase/app";
import {
	getFirestore,
	disableNetwork,
	enableNetwork,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { Alert, LogBox } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";

// Create the navigator
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
	const connectionStatus = useNetInfo();

	const firebaseConfig = {
		apiKey: "AIzaSyDX9ZHfrZ9Zc6NVVhq6tzwbiZyjRWUi9PY",
		authDomain: "chat-app-302d6.firebaseapp.com",
		projectId: "chat-app-302d6",
		storageBucket: "chat-app-302d6.appspot.com",
		messagingSenderId: "687695530303",
		appId: "1:687695530303:web:269d13023b8d73dab36b8a",
		measurementId: "G-LGPW5YFW7T",
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);

	// Initialize Firestore Database handler
	const db = getFirestore(app);

	// Initialize Firebase Storage handler
	const storage = getStorage(app);

	useEffect(() => {
		if (connectionStatus.isConnected === false) {
			Alert.alert("Connection Lost!!");
			disableNetwork(db);
		} else if (connectionStatus.isConnected === true) {
			enableNetwork(db);
		}
	}, [connectionStatus.isConnected]);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Start">
				<Stack.Screen name="Start" component={Start} />
				<Stack.Screen name="Chat">
					{(props) => (
						<Chat
							db={db}
							storage={storage}
							isConnected={connectionStatus.isConnected}
							{...props}
						/>
					)}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
