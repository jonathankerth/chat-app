import React, { useState, useEffect } from "react";
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
import {
	collection,
	addDoc,
	query,
	onSnapshot,
	orderBy,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, db, isConnected }) => {
	const { uid, name, color } = route.params;
	const [messages, setMessages] = useState([]);

	const renderInputToolbar = (props) => {
		if (isConnected) {
			return <InputToolbar {...props} />;
		} else {
			return null;
		}
	};

	useEffect(() => {
		const loadMessages = async () => {
			if (isConnected) {
				const messagesCollection = collection(db, "messages");
				const q = query(messagesCollection, orderBy("createdAt", "desc"));
				const messageListener = onSnapshot(q, (querySnapshot) => {
					const messagesFirestore = querySnapshot.docs.map((doc) => {
						const data = doc.data();
						return {
							_id: data._id,
							text: data.text,
							createdAt: new Date(data.createdAt.seconds * 1000),
							user: data.user,
						};
					});
					setMessages(messagesFirestore);

					// Create an async function inside callback to handle async operations
					const setItem = async () => {
						await AsyncStorage.setItem(
							"messages",
							JSON.stringify(messagesFirestore)
						);
					};
					// Call the async function
					setItem();
				});
				return () => {
					if (isConnected) {
						unsubscribe(messageListener);
					}
				};
			} else {
				const cachedMessages =
					JSON.parse(await AsyncStorage.getItem("messages")) || [];
				setMessages(cachedMessages);
			}
		};
		loadMessages();
	}, [isConnected]);

	const onSend = async (newMessages) => {
		const messageToBeAdded = {
			...newMessages[0],
			_id: newMessages[0]._id || Math.random().toString(), // ensure _id is set
			createdAt: newMessages[0].createdAt || new Date(), // ensure createdAt is set
		};
		await addDoc(collection(db, "messages"), messageToBeAdded);

		if (isConnected) {
			const newMessageList = GiftedChat.append(messages, newMessages);
			await AsyncStorage.setItem("messages", JSON.stringify(newMessageList));
		}
	};

	return (
		<GiftedChat
			messages={messages}
			onSend={(newMessages) => onSend(newMessages)}
			renderInputToolbar={renderInputToolbar}
			user={{ _id: uid, name: name }}
			keyboardShouldPersistTaps="never"
		/>
	);
};

export default Chat;
