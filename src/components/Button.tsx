import React from "react";
import { Text, Pressable } from "react-native";

export const Button = (props: { onPress: any; title: string; styles: any }) => {
    const { onPress, title, styles } = props;
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.bodyText}>{title}</Text>
        </Pressable>
    );
};
