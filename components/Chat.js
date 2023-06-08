import { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
	const [messages, setMessages] = useState([]);
	const { name } = route.params;

	useEffect(() => {
		navigation.setOptions({ title: name });
		setMessages([
			{
				_id: 1,
				text: "Hello developer",
				createdAt: new Date(),
				user: {
					_id: 2,
					name: "React Native",
					avatar: "https://placeimg.com/140/140/any",
				},
			},
			{
				_id: 2,
				text: "This is a system message",
				createdAt: new Date(),
				system: true,
			},
		]);
	}, []);

	const onSend = (newMessages) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, newMessages)
		);
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

	return (
		<View style={styles.container}>
			<GiftedChat
				messages={messages}
				renderBubble={renderBubble}
				onSend={(messages) => onSend(messages)}
				user={{
					_id: 1,
					name,
				}}
			/>
			{Platform.OS === "android" ? (
				<KeyboardAvoidingView behavior="height" />
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default Chat;
