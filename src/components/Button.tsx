import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export const Button = (props: { onPress: any; title: string }) => {
    const { onPress, title } = props;
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#242e82",
        width: 150,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
});
