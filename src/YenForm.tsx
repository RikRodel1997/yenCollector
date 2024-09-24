import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, useColorScheme, Alert } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Button } from "./components/Button";
import { SQLiteDatabase } from "react-native-sqlite-storage";

interface YenFormProps {
    records: YenRecord[];
    styles: any;
    db: SQLiteDatabase;
}

export const YenForm: React.FC<YenFormProps> = ({ records, styles, db }) => {
    const [currentValue, setValue] = useState("1");
    const [currentEra, setEra] = useState("null");
    const [currentCondition, setCondition] = useState("null");
    const isDarkMode = useColorScheme() === "dark";

    const erasData = records
        .filter(
            (record) =>
                !record.inPossession &&
                record.yenValue === parseInt(currentValue)
        )
        .map((record) => ({ label: record.eraJp, value: record.eraJp }));

    const conditions = [
        {
            label: "Bad",
            value: "Bad, to be replaced.",
        },
        {
            label: "Alright",
            value: "Alright, but could be better.",
        },
        {
            label: "Good",
            value: "Good, but not perfect.",
        },
        {
            label: "Perfect",
            value: "Perfect, no need to replace.",
        },
    ];

    return (
        <View>
            <Text
                style={[
                    thisStyles.selectedTextStyle,
                    isDarkMode && thisStyles.selectedTextStyleDark,
                ]}
            >
                Select a coin
            </Text>
            {renderDropdown(coins(), isDarkMode, currentValue, (item: any) => {
                console.log("item:", item.value[0].yenValue);
                setValue(item.value[0].yenValue.toString());
            })}

            <Text
                style={[
                    thisStyles.selectedTextStyle,
                    isDarkMode && thisStyles.selectedTextStyleDark,
                ]}
            >
                Select an era
            </Text>
            {renderDropdown(erasData, isDarkMode, currentEra, (item: any) => {
                setEra(item.value);
            })}

            <Text
                style={[
                    thisStyles.selectedTextStyle,
                    isDarkMode && thisStyles.selectedTextStyleDark,
                ]}
            >
                Select a condition
            </Text>
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
                        alert("Please select an era and condition.");
                        return;
                    }
                    // Add to collection
                    alert(
                        `Added ${currentValue} Yen coin from the ${currentEra} era to the collection.`
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
    dropdown: [thisStyles.dropdown, isDarkMode && thisStyles.dropdownDark],
    placeholderStyle: [
        thisStyles.placeholderStyle,
        isDarkMode && thisStyles.placeholderStyleDark,
    ],
    selectedTextStyle: [
        thisStyles.selectedTextStyle,
        isDarkMode && thisStyles.selectedTextStyleDark,
    ],
    itemTextStyle: [
        thisStyles.itemTextStyle,
        isDarkMode && thisStyles.itemTextStyleDark,
        { lineHeight: 16, fontSize: 16 },
    ],
    itemContainerStyle: [
        thisStyles.itemContainerStyle,
        isDarkMode && thisStyles.itemContainerStyleDark,
    ],
});

const thisStyles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 30,
    },
    dropdownDark: {
        backgroundColor: "#333",
        borderColor: "#555",
    },
    placeholderStyle: {
        fontSize: 16,
        color: "gray",
    },
    placeholderStyleDark: {
        color: "#ccc", // Lighter text for dark mode
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "black",
    },
    selectedTextStyleDark: {
        color: "white", // Text color for dark mode
    },
    itemTextStyle: {
        fontSize: 16,
        color: "black", // Default text color for light mode
    },
    itemTextStyleDark: {
        fontSize: 16,
        color: "white", // Text color for dark mode
        lineHeight: 16,
    },
    itemContainerStyle: {
        backgroundColor: "white", // Default item background for light mode
    },
    itemContainerStyleDark: {
        backgroundColor: "#333", // Dark mode background for dropdown items
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
