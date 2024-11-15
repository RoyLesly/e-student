import SQLite from 'react-native-sqlite-storage';

// SQLite.DEBUG(true);
SQLite.enablePromise(true);

export function openDatabase() {
    try {
        const db = SQLite.openDatabase({ name: 'e-student', location: 'default' });
        console.log('Database opened successfully:', db);
        return db;
    } catch (error) {
        console.error('Failed to open database:', error);
        throw error;
    }
}    

// export const db = SQLite.openDatabase({ name: 'school.db', location: 'default' });
