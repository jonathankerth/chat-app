import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Start = ({ db }) => {
	const [name, setName] = useState("");
	const [color, setColor] = useState("");
	const navigation = useNavigation();
	const auth = getAuth();

	const handlePress = () => {
		signInAnonymously(auth)
			.then((userCredential) => {
				const user = userCredential.user;
				navigation.navigate("Chat", { uid: user.uid, name, color, db });
			})
			.catch((error) => {
				console.error("Failed to sign in anonymously:", error);
			});
	};

	return (
		<ImageBackground
			source={require("../assets/bg-image.png")}
			style={styles.backgroundImage}
		>
			<View style={styles.container}>
				<Text style={styles.title}>Chat Away!</Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.nameInput}
						placeholder="Your Name"
						onChangeText={setName}
						value={name}
					/>
					<Text style={styles.colorText}>Choose Background Color:</Text>
					<View style={styles.colorOptions}>
						<TouchableOpacity
							style={[styles.colorButton, styles.colorOption1]}
							onPress={() => setColor("#090C08")}
						/>
						<TouchableOpacity
							style={[styles.colorButton, styles.colorOption2]}
							onPress={() => setColor("#474056")}
						/>
						<TouchableOpacity
							style={[styles.colorButton, styles.colorOption3]}
							onPress={() => setColor("#8A95A5")}
						/>
						<TouchableOpacity
							style={[styles.colorButton, styles.colorOption4]}
							onPress={() => setColor("#B9C6AE")}
						/>
					</View>
				</View>
				<TouchableOpacity style={styles.button} onPress={handlePress}>
					<Text style={styles.buttonText}>Start Chatting</Text>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 45,
		fontWeight: "600",
		color: "#FFFFFF",
	},
	inputContainer: {
		width: "100%",
		marginTop: 50,
	},
	nameInput: {
		backgroundColor: "#FFFFFF",
		opacity: 0.5,
		height: 50,
		fontSize: 16,
		fontWeight: "300",
		borderRadius: 5,
		paddingLeft: 15,
		marginBottom: 20,
	},
	colorText: {
		fontSize: 16,
		fontWeight: "300",
		color: "#FFFFFF",
	},
	colorOptions: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	colorButton: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	colorOption1: {
		backgroundColor: "#090C08",
	},
	colorOption2: {
		backgroundColor: "#474056",
	},
	colorOption3: {
		backgroundColor: "#8A95A5",
	},
	colorOption4: {
		backgroundColor: "#B9C6AE",
	},
	button: {
		backgroundColor: "#757083",
		justifyContent: "center",
		alignItems: "center",
		height: 50,
		borderRadius: 5,
	},
	buttonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
	},
});

export default Start;
