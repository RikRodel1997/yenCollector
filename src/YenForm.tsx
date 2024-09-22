import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, useColorScheme } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface YenFormProps {
    records: YenRecord[];
}

export const YenForm: React.FC<YenFormProps> = ({ records }) => {
    const [value, setValue] = useState("1");
    const [era, setEra] = useState("null");
    const isDarkMode = useColorScheme() === "dark";

    console.log("value:", value);
    console.log("era:", era);

    const data = [
        {
            label: "1 Yen Coin",
            value: records.filter(
                (record) => !record.inPossession && record.yenValue === 1
            ),
        },
        {
            label: "5 Yen Coin",
            value: records.filter(
                (record) => !record.inPossession && record.yenValue === 5
            ),
        },
        {
            label: "10 Yen Coin",
            value: records.filter(
                (record) => !record.inPossession && record.yenValue === 10
            ),
        },
        {
            label: "50 Yen Coin",
            value: records.filter(
                (record) => !record.inPossession && record.yenValue === 50
            ),
        },
        {
            label: "100 Yen Coin",
            value: records.filter(
                (record) => !record.inPossession && record.yenValue === 100
            ),
        },
    ];

    const eras = records
        .filter(
            (record) =>
                !record.inPossession && record.yenValue === parseInt(value)
        )
        .map((record) => ({ label: record.eraJp, value: record.eraJp }));

    return (
        <View>
            <Text
                style={[
                    styles.selectedTextStyle,
                    isDarkMode && styles.selectedTextStyleDark,
                ]}
            >
                Select a coin
            </Text>
            {renderDropdown(data, isDarkMode, value, (item: any) => {
                console.log("item:", item.value[0].yenValue);
                setValue(item.value[0].yenValue.toString());
            })}

            <Text
                style={[
                    styles.selectedTextStyle,
                    isDarkMode && styles.selectedTextStyleDark,
                ]}
            >
                Select an era
            </Text>
            {renderDropdown(eras, isDarkMode, era, (item: any) => {
                setEra(item.value);
            })}
            {/* <FlatList
                data={records}
                renderItem={({ item }) => {
                    if (item.yenValue !== parseInt(value)) {
                        return null;
                    }
                    return (
                        <Text>
                            {item.eraJp} {item.eraEn} {item.yenValue}{" "}
                            {item.inPossession} {item.condition}
                        </Text>
                    );
                }}
                keyExtractor={(item) => item.id.toString()} // Add keyExtractor for FlatList
            /> */}
        </View>
    );
};

const renderDropdown = (
    data: any,
    isDarkMode: boolean,
    value: string,
    onChangeExpression: any
) => {
    return (
        <>
            <Dropdown
                data={data}
                style={[styles.dropdown, isDarkMode && styles.dropdownDark]}
                placeholderStyle={[
                    styles.placeholderStyle,
                    isDarkMode && styles.placeholderStyleDark,
                ]}
                selectedTextStyle={[
                    styles.selectedTextStyle,
                    isDarkMode && styles.selectedTextStyleDark,
                ]}
                itemTextStyle={[
                    styles.itemTextStyle,
                    isDarkMode && styles.itemTextStyleDark,
                ]}
                itemContainerStyle={[
                    styles.itemContainerStyle,
                    isDarkMode && styles.itemContainerStyleDark,
                ]}
                activeColor={isDarkMode ? "#555" : "#ddd"} // Background color of the selected item
                iconStyle={styles.iconStyle}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                value={value}
                onChange={onChangeExpression}
            />
        </>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 20,
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
        color: "white", // Text color for dark mode
    },
    itemContainerStyle: {
        backgroundColor: "white", // Default item background for light mode
    },
    itemContainerStyleDark: {
        backgroundColor: "#333", // Dark mode background for dropdown items
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
});

export default YenForm;
