import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    StatusBar,
    Text,
    useColorScheme,
    View,
} from "react-native";
import { Database } from "./src/database";
import { Button } from "./src/components/Button";
import { Form } from "./src/Form";
import { Overview } from "./src/Overview";
import { getStyles } from "./styleSheet";

const App = (): React.JSX.Element => {
    const [records, setRecords] = useState<YenRecord[]>([]);
    const [db, setDb] = useState<any>(null);
    const isDarkMode = useColorScheme() === "dark";
    const [view, setView] = useState<"form" | "overview">("form");
    const styles = getStyles(isDarkMode);

    const fetchRecords = async () => {
        try {
            const database = new Database();
            await database.initDb();
            const records = await database.getData();
            setDb(database);
            setRecords(records);
        } catch (error) {
            console.error("Failed to fetch records:", error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <SafeAreaView style={styles.bg}>
            <StatusBar backgroundColor={styles.bg.backgroundColor} />
            <Text style={styles.appTitle}>Yen Collection</Text>
            <View style={styles.menu}>
                <Button
                    onPress={() => setView("form")}
                    title="Form"
                    styles={styles}
                />
                <Button
                    onPress={() => setView("overview")}
                    title="Overview"
                    styles={styles}
                />
            </View>

            <View style={styles.appBody}>
                {view === "form" ? (
                    <Form records={records} styles={styles} db={db} />
                ) : (
                    <Overview records={records} styles={styles} />
                )}
            </View>
        </SafeAreaView>
    );
};

export default App;
