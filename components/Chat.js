import { useState, useEffect } from "react";
import { GiftedChat, InputToolbar, Bubble } from "react-native-gifted-chat";
import {
	collection,
	addDoc,
	onSnapshot,
	query,
	orderBy,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Platform, KeyboardAvoidingView, StyleSheet } from "react-native";

import MapView from "react-native-maps";

import CustomActions from "./CustomActions";

const Chat = ({ db, storage, route, navigation, isConnected }) => {
	const { name, userID, color } = route.params;
	const [messages, setMessages] = useState([]);

	let unsubMessages;

	useEffect(() => {
		navigation.setOptions({ title: name });

		if (isConnected === true) {
			if (unsubMessages) unsubMessages();
			unsubMessages = null;

			const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
			unsubMessages = onSnapshot(q, (docs) => {
				let newMessages = [];
				docs.forEach((doc) => {
					let data = doc.data();
					if (data.createdAt && data.createdAt.toMillis) {
						newMessages.push({
							id: doc.id,
							...data,
							createdAt: new Date(data.createdAt.toMillis()),
						});
					} else {
						// handle the case where createdAt is not a Timestamp
						console.log("createdAt is not a Timestamp: ", data.createdAt);
					}
				});
				cacheMessages(newMessages);
				setMessages(newMessages);
			});
		} else loadCachedMessages();

		return () => {
			if (unsubMessages) unsubMessages();
		};
	}, [isConnected]);

	const loadCachedMessages = async () => {
		const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
		setMessages(JSON.parse(cachedMessages));
	};

	const cacheMessages = async (messagesToCache) => {
		try {
			await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
		} catch (error) {
			console.log(error.message);
		}
	};

	const onSend = async (newMessages) => {
		try {
			await addDoc(collection(db, "messages"), newMessages[0]);
			if (isConnected) {
				const newMessageList = GiftedChat.append(messages, newMessages);
				await AsyncStorage.setItem("messages", JSON.stringify(newMessageList));
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const renderInputToolbar = (props) => {
		if (isConnected === true) return <InputToolbar {...props} />;
		else return null;
	};

	const renderBubble = (props) => {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: "#000",
					},
					left: {
						backgroundColor: "#FFF",
					},
				}}
			/>
		);
	};

	const renderCustomActions = (props) => {
		if (isConnected)
			return <CustomActions userID={userID} storage={storage} {...props} />;
		else return null;
	};

	const renderCustomView = (props) => {
		const { currentMessage } = props;
		if (currentMessage.location) {
			return (
				<MapView
					style={{
						width: 150,
						height: 100,
						borderRadius: 13,
						margin: 3,
					}}
					region={{
						latitude: currentMessage.location.latitude,
						longitude: currentMessage.location.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				/>
			);
		}
		return null;
	};

	return (
		<View style={[{ flex: 1 }, { backgroundColor: color }]}>
			<GiftedChat
				messages={messages}
				onSend={(newMessages) => onSend(newMessages)}
				renderBubble={renderBubble}
				renderInputToolbar={renderInputToolbar}
				renderActions={renderCustomActions}
				renderCustomView={renderCustomView}
				user={{ _id: userID, name: name }}
				keyboardShouldPersistTaps="never"
			/>
		</View>
	);
};
const styles = StyleSheet.create({});

export default Chat;
