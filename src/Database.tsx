import SQLite from "react-native-sqlite-storage";
import { CoinData } from "./YenData";

export const openDb = (): Promise<SQLite.SQLiteDatabase> => {
    return new Promise((resolve, reject) => {
        const db = SQLite.openDatabase(
            {
                name: "yen-collection.db",
                location: "default",
            },
            () => {
                console.log("Database opened successfully");
                resolve(db);
            },
            (error) => {
                console.error("Error opening database:", error);
                reject(error);
            }
        );
    });
};

export const closeDb = (db: SQLite.SQLiteDatabase): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.close(
            () => {
                console.log("Database closed successfully");
                resolve();
            },
            (error) => {
                console.error("Error closing database:", error);
                reject(error);
            }
        );
    });
};

export const createTable = (db: SQLite.SQLiteDatabase): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS collection (id TEXT PRIMARY KEY, era_jp TEXT, era_en TEXT, yen_value INTEGER, in_possession BOOLEAN, condition TEXT);"
                );
            },
            (error) => {
                console.error("Failed to create table:", error);
                reject(error);
            },
            () => {
                console.log("Table created successfully");
                resolve();
            }
        );
    });
};

export const fillData = (
    db: SQLite.SQLiteDatabase,
    data: CoinData[]
): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                for (const item of data) {
                    tx.executeSql(
                        "INSERT INTO collection (id, era_jp, era_en, yen_value, in_possession, condition) VALUES (?, ?, ?, ?, ?, ?);",
                        [
                            `${item.eraEn}-${item.year}-${item.coin}`,
                            item.eraJp,
                            item.eraEn,
                            item.coin,
                            false,
                            "",
                        ]
                    );
                }
            },
            (error) => {
                console.error("Failed to insert data:", error);
                reject(error);
            },
            () => {
                console.log("Data inserted successfully");
                resolve();
            }
        );
    });
};
