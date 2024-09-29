import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const getStyles = (isDarkMode: boolean) => {
    return {
        bg: {
            flex: 1, // Ensure the background covers the full area
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        },
        appTitle: {
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            marginVertical: 15,
            color: isDarkMode ? Colors.lighter : Colors.darker,
        } as StyleProp<TextStyle>,
        menu: {
            flexDirection: "row",
            alignSelf: "center",
            gap: 15,
        } as StyleProp<ViewStyle>,
        appBody: {
            marginTop: 30,
            marginLeft: 15,
            marginRight: 15,
            color: isDarkMode ? Colors.lighter : Colors.darker,
            fontSize: 16,
        } as StyleProp<ViewStyle>,
        button: {
            alignItems: "center",
            alignSelf: "center",
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 10,
            elevation: 3,
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: "#242e82",
            width: 150,
        },
        bodyText: {
            fontSize: 16,
            color: isDarkMode ? "white" : "black",
        },
        table: {
            flexDirection: "column",
            margin: 10,
        },
        tableRow: {
            flexDirection: "row",
        },
        hasCoin: {
            backgroundColor: "green",
        },
        missingCoin: {
            backgroundColor: "red",
        },
        tableCell: {
            paddingTop: 5,
            paddingBottom: 5,
            borderWidth: 1,
            borderColor: "#ddd",
            textAlign: "center",
            minWidth: 100,
        },
        tableHeader: {
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            fontWeight: "bold",
        },
        firstColumn: {
            fontWeight: "bold",
        },
    };
};
