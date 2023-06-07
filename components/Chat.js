import React, { useLayoutEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const Chat = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const { name, color } = route.params;

	const [input, setInput] = useState("");

	useLayoutEffect(() => {
		navigation.setOptions({
			title: name, // This will set the user's name in the navigation bar
		});
	}, [navigation, name]);

	return (
		<View style={[styles.container, { backgroundColor: color }]}>
			<FlatList
				// The data prop would usually contain your array of messages
				data={[]}
				// The renderItem prop would usually render your message component
				renderItem={() => null}
			/>
			<View style={styles.footer}>
				<TextInput
					value={input}
					onChangeText={setInput}
					placeholder="Type a message..."
					style={styles.input}
				/>
				<TouchableOpacity
					onPress={() => {
						// Here you would usually send the message
						setInput("");
					}}
				>
					<Text style={styles.send}>Send</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	name: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#000",
		marginBottom: 10,
	},
	footer: {
		flexDirection: "row",
		width: "100%",
		padding: 20,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-between",
	},
	input: {
		flex: 1,
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginRight: 10,
		paddingHorizontal: 10,
		borderRadius: 20,
	},
	send: {
		color: "blue",
		fontSize: 18,
	},
});

export default Chat;
