import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import backgroundImage from "../assets/bg-image.png"; // Adjust the path according to your project structure

const Start = () => {
	const [name, setName] = useState("");
	const [color, setColor] = useState("");
	const navigation = useNavigation();

	const onPress = () => {
		navigation.navigate("Chat", { name, color });
	};

	return (
		<ImageBackground style={styles.container} source={backgroundImage}>
			<View style={styles.whiteBox}>
				<TextInput
					style={styles.textInput}
					placeholder="Your Name"
					onChangeText={setName}
					value={name}
				/>
				<Text style={styles.colorText}>Choose Background Color:</Text>
				<View style={styles.colorSelection}>
					{["#090C08", "#474056", "#8A95A5", "#B9C6AE"].map((item) => (
						<TouchableOpacity
							key={item}
							onPress={() => setColor(item)}
							style={[
								styles.colorButton,
								{ backgroundColor: item },
								color === item ? styles.selectedColor : null,
							]}
						/>
					))}
				</View>
				<TouchableOpacity onPress={onPress} style={styles.button}>
					<Text style={styles.buttonText}>Start Chatting</Text>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	whiteBox: {
		backgroundColor: "#FFF",
		borderRadius: 10,
		padding: 20,
		width: "90%",
		alignItems: "center",
	},
	textInput: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 20,
		padding: 10,
		width: "100%",
	},
	button: {
		backgroundColor: "#7595f9",
		width: "100%",
		padding: 15,
		alignItems: "center",
		borderRadius: 5,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
	},
	colorText: {
		fontSize: 18,
		color: "#757083",
		fontWeight: "300",
		marginBottom: 10,
	},
	colorSelection: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 30,
	},
	colorButton: {
		width: 45,
		height: 45,
		borderRadius: 22.5,
	},
	selectedColor: {
		borderWidth: 2,
		borderColor: "#fff",
	},
});

export default Start;
