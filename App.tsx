import React, { useEffect, startTransition, useState } from "react";
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import {
    openDb,
    createTable,
    fillData,
    getData,
    closeDb,
    initDb,
} from "./src/Database";
import { generateData } from "./src/YenData";
import { Button } from "./src/components/Button";
import { YenForm } from "./src/YenForm";
import { YenOverview } from "./src/YenOverview";

const App = (): React.JSX.Element => {
    const coins = [1, 5, 10, 50, 100, 500];
    const [records, setRecords] = useState<YenRecord[]>([]);
    const [db, setDb] = useState<any>(null);
    const isDarkMode = useColorScheme() === "dark";
    const [view, setView] = useState<"form" | "overview">("form");

    const fetchRecords = async () => {
        try {
            await openDb();
            setRecords(await getData());
        } catch (error) {
            console.error("Failed to fetch records:", error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const styles = StyleSheet.create({
        bg: {
            flex: 1, // Ensure the background covers the full area
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        },
    });

    return (
        <SafeAreaView style={styles.bg}>
            <StatusBar
                barStyle={isDarkMode ? "light-content" : "dark-content"}
                backgroundColor={styles.bg.backgroundColor}
            />
            <View style={styles.bg}>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginTop: 20,
                        marginBottom: 20,
                    }}
                >
                    Yen Collection
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignSelf: "center",
                        gap: 15,
                    }}
                >
                    <Button onPress={() => setView("form")} title="Form" />
                    <Button
                        onPress={() => setView("overview")}
                        title="Overview"
                    />
                </View>

                <View
                    style={{
                        marginTop: 30,
                        marginLeft: 15,
                        marginRight: 15,
                    }}
                >
                    {view === "form" ? (
                        <YenForm records={records} />
                    ) : (
                        <YenOverview records={records} />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default App;
