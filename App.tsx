import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { openDb, createTable, fillData } from "./src/Database";
import { generateData } from "./src/YenData";
import { Menu } from "./src/Menu";
import SQLite from "react-native-sqlite-storage";

const App = (): React.JSX.Element => {
    const coins = [1, 5, 10, 50, 100, 500];
    const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
    const isDarkMode = useColorScheme() === "dark";

    useEffect(() => {
        async function initializeDb() {
            try {
                // const database = await openDb();
                // await createTable(database);
                // for (const coin of coins) {
                //     await fillData(database, generateData(coin));
                // }
                // setDb(database);
            } catch (error) {
                console.error("Failed to open database:", error);
            }
        }

        initializeDb();
    }, []);

    const backgroundStyle = {
        flex: 1, // Ensure the background covers the full area
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? "light-content" : "dark-content"}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}
            >
                <View style={backgroundStyle}>
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginTop: 20,
                        }}
                    >
                        Yen Collection
                    </Text>
                </View>
                <Menu />
            </ScrollView>
        </SafeAreaView>
    );
};

export default App;
