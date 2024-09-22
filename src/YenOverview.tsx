import React, { useState, useEffect } from "react";
import { Text, FlatList } from "react-native";
import { openDb, getData } from "./Database";

interface YenOverviewProps {
    records: YenRecord[];
}

export const YenOverview: React.FC<YenOverviewProps> = ({ records }) => {
    return (
        <>
            <Text>Overview</Text>
            <Text>
                You've collected{" "}
                {records.filter((record) => record.inPossession).length} coins
            </Text>
            <FlatList
                data={records}
                renderItem={({ item }) => (
                    <Text>
                        {item.eraJp} {item.eraEn} {item.yenValue}{" "}
                        {item.inPossession} {item.condition}
                    </Text>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </>
    );
};
