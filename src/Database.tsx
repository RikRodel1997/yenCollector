import SQLite, { SQLiteDatabase } from "react-native-sqlite-storage";
import { CoinData } from "./YenData";

let db: SQLite.SQLiteDatabase | null = null;

export const initDb = async (): Promise<void> => {
    if (db) {
        console.log("Database already initialized");
        return;
    }

    try {
        db = await openDb();
        await createTable();
        console.log("Database initialized successfully");
    } catch (error) {
        console.error("Failed to initialize database:", error);
        throw error;
    }
};

export const openDb = (): Promise<SQLite.SQLiteDatabase> => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase(
            {
                name: "yen-collection.db",
                location: "default",
            },
            (dbObject) => {
                console.log("Database opened successfully");
                resolve(dbObject);
            },
            (error) => {
                console.error("Error opening database:", error);
                reject(error);
            }
        );
    });
};

export const createTable = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error("Database not initialized"));
            return;
        }

        db.transaction(
            (tx) => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS collection (
                        id TEXT PRIMARY KEY, 
                        eraJp TEXT, 
                        eraEn TEXT, 
                        yenValue INTEGER, 
                        inPossession BOOLEAN, 
                        condition TEXT
                    );`
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

export const fillData = async (data: CoinData[]): Promise<void> => {
    if (!db) {
        await initDb();
    }

    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error("Database not initialized"));
            return;
        }

        db.transaction(
            (tx) => {
                data.forEach((item) => {
                    tx.executeSql(
                        `INSERT OR REPLACE INTO collection (
                            id, 
                            eraJp, 
                            eraEn, 
                            yenValue, 
                            inPossession, 
                            condition
                        ) VALUES (?, ?, ?, ?, ?, ?);`,
                        [
                            `${item.eraEn}-${item.year}-${item.coin}`,
                            item.eraJp,
                            item.eraEn,
                            item.coin,
                            false,
                            "",
                        ]
                    );
                });
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

export const getData = async (): Promise<YenRecord[]> => {
    if (!db) {
        await initDb();
    }

    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error("Database not initialized"));
            return;
        }

        db.transaction(
            (tx) => {
                tx.executeSql(
                    "SELECT * FROM collection;",
                    [],
                    (_, resultSet) => {
                        const records: YenRecord[] = [];
                        for (let i = 0; i < resultSet.rows.length; i++) {
                            records.push(resultSet.rows.item(i));
                        }
                        resolve(records);
                    },
                    (_, error) => {
                        console.error("Error fetching data:", error);
                        reject(error);
                        return false;
                    }
                );
            },
            (error) => {
                console.error("Transaction error:", error);
                reject(error);
            }
        );
    });
};

export const closeDb = async (): Promise<void> => {
    if (!db) {
        console.log("Database already closed");
        return;
    }

    return new Promise((resolve, reject) => {
        db!.close(
            () => {
                console.log("Database closed successfully");
                db = null;
                resolve();
            },
            (error) => {
                console.error("Error closing database:", error);
                reject(error);
            }
        );
    });
};
