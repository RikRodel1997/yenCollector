import SQLite, { SQLiteDatabase } from "react-native-sqlite-storage";
import { CoinData } from "./data";

export class Database {
    private db: SQLiteDatabase | null = null;

    public async initDb(): Promise<void> {
        if (this.db) {
            console.log("Database already initialized");
            return;
        }

        try {
            this.db = await this.openDb();
            await this.createTable();
            console.log("Database initialized successfully");
        } catch (error) {
            console.error("Failed to initialize database:", error);
            throw error;
        }
    }

    private openDb(): Promise<SQLiteDatabase> {
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
    }

    private createTable(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error("Database not initialized"));
                return;
            }

            this.db.transaction(
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
    }

    fillData = async (data: CoinData[]): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error("Database not initialized"));
                return;
            }

            this.db.transaction(
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

    getData = async (): Promise<YenRecord[]> => {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error("Database not initialized"));
                return;
            }

            this.db.transaction(
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

    closeDb = async (): Promise<void> => {
        if (!this.db) {
            console.log("Database already closed");
            return;
        }

        return new Promise((resolve, reject) => {
            this.db!.close(
                () => {
                    console.log("Database closed successfully");
                    this.db = null;
                    resolve();
                },
                (error) => {
                    console.error("Error closing database:", error);
                    reject(error);
                }
            );
        });
    };

    updateRecord = (record: YenRecord): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error("Database not initialized"));
                return;
            }

            this.db.transaction(
                (tx) => {
                    tx.executeSql(
                        `UPDATE collection SET inPossession = ?, condition = ? WHERE id = ?;`,
                        [record.inPossession, record.condition, record.id]
                    );
                },
                (error) => {
                    console.error("Failed to update record:", error);
                    reject(error);
                },
                () => {
                    console.log("Record updated successfully");
                    resolve();
                }
            );
        });
    };
}
