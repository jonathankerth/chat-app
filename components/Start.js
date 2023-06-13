import { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	Alert,
	ImageBackground,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
	const auth = getAuth();
	const [name, setName] = useState("");
	const [color, setColor] = useState("");

	const loginUser = () => {
		signInAnonymously(auth)
			.then((result) => {
				navigation.navigate("Chat", { userID: result.user.uid, name, color });
				Alert.alert("Successfully Signed In");
			})
			.catch((error) => {
				Alert.alert("Unable to Login, try later again.");
			});
	};

	return (
		<ImageBackground
			source={require("../assets/bg-image.png")}
			style={styles.backgroundImage}
		>
			<View style={styles.container}>
				<Text style={styles.title}>Weclome!</Text>
				<TextInput
					style={styles.nameInput}
					onChangeText={setName}
					value={name}
					placeholder="Type here ..."
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
				<TouchableOpacity style={styles.button} onPress={loginUser}>
					<Text style={styles.buttonText}>Go to Chat</Text>
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
		width: "100%",
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
