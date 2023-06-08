import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
	collection,
	addDoc,
	query,
	onSnapshot,
	orderBy,
} from "firebase/firestore";

const Chat = ({ route, db }) => {
	const { uid, name, color } = route.params;
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const messagesCollection = collection(db, "messages");
		const q = query(messagesCollection, orderBy("createdAt", "desc"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const messagesFirestore = querySnapshot.docs.map((doc) => {
				const data = doc.data();
				return {
					_id: data._id,
					text: data.text,
					createdAt: new Date(data.createdAt.seconds * 1000), // convert to JS date object
					user: data.user,
				};
			});
			setMessages(messagesFirestore);
		});

		return unsubscribe; // clean up function
	}, []);

	const onSend = (newMessages) => {
		addDoc(collection(db, "messages"), newMessages[0]);
	};

	return (
		<GiftedChat
			messages={messages}
			onSend={(newMessages) => onSend(newMessages)}
			user={{
				_id: uid,
				name: name,
			}}
		/>
	);
};

export default Chat;
