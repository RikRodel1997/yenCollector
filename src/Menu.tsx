import React, { useState } from "react";
import { View, Animated, Easing } from "react-native";
import { Button } from "./components/Button";
import { YenForm } from "./YenForm";
import { YenOverview } from "./YenOverview";

export const Menu = () => {
    const [view, setView] = useState<"form" | "overview">("form");

    return (
        <View style={{ flex: 1, marginTop: 30 }}>
            <View
                style={{ flexDirection: "row", alignSelf: "center", gap: 15 }}
            >
                <Button onPress={() => setView("form")} title="Form" />
                <Button onPress={() => setView("overview")} title="Overview" />
            </View>

            <View style={{ marginTop: 30, marginLeft: 15, marginRight: 15 }}>
                {view === "form" ? <YenForm /> : <YenOverview />}
            </View>
        </View>
    );
};
