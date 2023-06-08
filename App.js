import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
	getFirestore,
	enableNetwork,
	disableNetwork,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useNetInfo } from "@react-native-community/netinfo";
import Start from "./components/Start";
import Chat from "./components/Chat";

const Stack = createNativeStackNavigator();

const App = () => {
	const firebaseConfig = {
		apiKey: "AIzaSyDX9ZHfrZ9Zc6NVVhq6tzwbiZyjRWUi9PY",
		authDomain: "chat-app-302d6.firebaseapp.com",
		projectId: "chat-app-302d6",
		storageBucket: "chat-app-302d6.appspot.com",
		messagingSenderId: "687695530303",
		appId: "1:687695530303:web:269d13023b8d73dab36b8a",
		measurementId: "G-LGPW5YFW7T",
	};

	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);
	const connectionStatus = useNetInfo();

	useEffect(() => {
		if (connectionStatus.isConnected === false) {
			disableNetwork(db);
		} else if (connectionStatus.isConnected === true) {
			enableNetwork(db);
		}
	}, [connectionStatus.isConnected]);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Start">
				<Stack.Screen
					name="Start"
					component={Start}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="Chat">
					{(props) => <Chat {...props} db={db} />}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
