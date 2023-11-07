// import SQLite from 'react-native-sqlite-storage';
import * as SQLite from "expo-sqlite";
// import { dateStrToObj, formatDate, textToString } from "../config/Util";

class DatabaseSingleton {
  constructor() {
    this.dbInstance = null;
    this.initDatabase();
  }
  initDatabase() {
    this.dbInstance = SQLite.openDatabase("pixel.db");
    // Additional initialization code if needed
  }
  getDatabaseInstance() {
    return this.dbInstance;
  }

  /*************************************************************************************************/

  onExecQueryCommand = (query, values) => {
    return new Promise((resolve, reject) => {
      this.dbInstance.transaction((tx) => {
        console.log("query", query);
        console.log("values", values);
        // console.log("test", query.toUpperCase().indexOf("SELECT"));

        if (query && (query.toUpperCase().indexOf("INSERT") !== -1 || query.toUpperCase().indexOf("UPDATE") !== -1 || query.toUpperCase().indexOf("DELETE") !== -1 || query.toUpperCase().indexOf("SELECT") !== -1 || query.toUpperCase().indexOf("CREATE") !== -1 || query.toUpperCase().indexOf("DROP") !== -1)) {
          tx.executeSql(
            query,
            values,
            (txObj, resultSet) => {
              if (query.toUpperCase().indexOf("UPDATE") !== -1 || query.toUpperCase().indexOf("DELETE") !== -1) {
                if (resultSet.rowsAffected >= 0) {
                  resolve(resultSet.rowsAffected);
                } else {
                  if (query.toUpperCase().indexOf("UPDATE") !== -1) {
                    reject(-2);
                  } else {
                    reject(-3);
                  }
                }
              } else if (query.toUpperCase().indexOf("INSERT") !== -1) {
                if (resultSet.insertId > 0) {
                  resolve(resultSet.insertId);
                } else {
                  reject(-1);
                }
              } else if (query.toUpperCase().indexOf("SELECT") !== -1) {
                if (values === undefined || values.length === 0) {
                  console.log("resultSet.rows._array", resultSet.rows._array.length);
                  resolve(resultSet.rows._array);
                } else {
                  if (resultSet.rows.length >= 0) {
                    resolve(resultSet.rows._array);
                  } else {
                    reject(-4);
                  }
                }
              } else if (query.toUpperCase().indexOf("CREATE") !== -1 || query.toUpperCase().indexOf("DROP") !== -1) {
                resolve(0);
              } else {
                reject(-999);
              }
            },
            (txObj, error) => {
              reject(error);
            }
          );
        } else {
          reject(-9999);
        }
      });
    });
  };
}

const databaseSingleton = new DatabaseSingleton();
export default databaseSingleton;
