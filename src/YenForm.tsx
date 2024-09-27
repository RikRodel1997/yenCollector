import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, useColorScheme, Alert } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Button } from "./components/Button";
import { Database } from "./database";

interface YenFormProps {
    records: YenRecord[];
    styles: any;
    db: Database;
}

export const YenForm: React.FC<YenFormProps> = ({ records, styles, db }) => {
    const [currentValue, setValue] = useState("1");
    const [currentEra, setEra] = useState("null");
    const [currentCondition, setCondition] = useState("null");
    const isDarkMode = useColorScheme() === "dark";

    const coinsData = coins();
    const erasData = records
        .filter(
            (record) =>
                !record.inPossession &&
                record.yenValue === parseInt(currentValue)
        )
        .map((record) => ({ label: record.eraJp, value: record.eraJp }));

    const conditions = [
        {
            label: "Bad, to be replaced.",
            value: "Bad",
        },
        {
            label: "Alright, but could be better.",
            value: "Alright",
        },
        {
            label: "Good, a keeper.",
            value: "Good",
        },
        {
            label: "Perfect, no need to replace.",
            value: "Perfect",
        },
    ];

    return (
        <View>
            <Text style={styles.bodyText}>Select a coin</Text>
            {renderDropdown(
                coinsData,
                isDarkMode,
                currentValue,
                (coin: any) => {
                    console.log("coin:", coin);
                    setValue(coin.value.toString());
                }
            )}

            <Text style={styles.bodyText}>Select an era</Text>
            {renderDropdown(erasData, isDarkMode, currentEra, (era: any) => {
                console.log("currentValue:", currentValue);
                console.log("era:", era);
                setEra(era.value);
            })}

            <Text style={styles.bodyText}>Select a condition</Text>
            {renderDropdown(
                conditions,
                isDarkMode,
                currentCondition,
                (item: any) => {
                    setCondition(item.value);
                }
            )}

            <Button
                title="Add to collection"
                onPress={() => {
                    if (currentEra === "null" || currentCondition === "null") {
                        Alert.alert(
                            "Select all fields",
                            "Please select an era and condition."
                        );
                        return;
                    }
                    const record = records.find(
                        (record) =>
                            !record.inPossession &&
                            record.eraJp === currentEra &&
                            record.yenValue === parseInt(currentValue)
                    );
                    if (!record) {
                        Alert.alert("Error", "Record not found.");
                        return;
                    }
                    record.condition = currentCondition;
                    record.inPossession = true;
                    console.log("record:", record);
                    // Add to collection
                    db.updateRecord(record);
                    Alert.alert(
                        "Added to collection",
                        `Added ¥${record.yenValue} ${record.eraJp} to your collection.`
                    );
                }}
                styles={{
                    ...styles,
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
                        width: 420,
                    },
                }}
            />
        </View>
    );
};

const renderDropdown = (
    data: any[],
    isDarkMode: boolean,
    value: string,
    onChangeExpression: any
) => {
    const dropdownStyles = getDropdownStyles(isDarkMode);
    return (
        <Dropdown
            data={data}
            style={dropdownStyles.dropdown}
            placeholderStyle={dropdownStyles.placeholderStyle}
            selectedTextStyle={dropdownStyles.selectedTextStyle}
            itemTextStyle={dropdownStyles.itemTextStyle}
            itemContainerStyle={dropdownStyles.itemContainerStyle}
            activeColor={isDarkMode ? "#555" : "#ddd"}
            search={false}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={value}
            onChange={onChangeExpression}
        />
    );
};

const getDropdownStyles = (isDarkMode: boolean) => ({
    dropdown: {
        height: 50,
        borderColor: isDarkMode ? "#555" : "gray",
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 30,
        backgroundColor: isDarkMode ? "#333" : "white",
    },
    placeholderStyle: {
        fontSize: 16,
        color: isDarkMode ? "#ccc" : "gray",
    },
    selectedTextStyle: {
        color: isDarkMode ? "white" : "black",
    },
    itemTextStyle: {
        fontSize: 16,
        color: isDarkMode ? "white" : "black",
        lineHeight: 18,
    },
    itemContainerStyle: {
        backgroundColor: isDarkMode ? "#333" : "white",
    },
});

const coins = () => {
    return [
        {
            label: "1 Yen Coin",
            value: 1,
        },
        {
            label: "5 Yen Coin",
            value: 5,
        },
        {
            label: "10 Yen Coin",
            value: 10,
        },
        {
            label: "50 Yen Coin",
            value: 50,
        },
        {
            label: "100 Yen Coin",
            value: 100,
        },
        {
            label: "500 Yen Coin",
            value: 500,
        },
    ];
};

export default YenForm;
