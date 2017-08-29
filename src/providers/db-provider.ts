import { Injectable } from '@angular/core';
import { Platform } from "ionic-angular";

const dB : string = 'dLac';
const win: any = window;

@Injectable()
export class Database {
	private _dbPromise: Promise<any>;
	 public list: Array<any>;

    constructor(public platform: Platform) {
        this._dbPromise = new Promise((resolve, reject) => {
            try {
                let _db: any;
                this.platform.ready().then(() => {
                    if (this.platform.is('cordova') && win.sqlitePlugin) {
                        //FOR MOBILE DEVICE
                        _db = win.sqlitePlugin.openDatabase({
                            name: dB,
                            location: 'default'
                        });
                    } else {
                        //FOR WEBSQL
                        console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
                        _db = win.openDatabase(dB, '1.0', 'database', 5 * 1024 * 1024);
                    }
                    resolve(_db);
                });
            } catch (err) {
                reject({ err: err });
            }
        });
        this._tryInit();
    }

    // Initialize the DB with our required tables
    _tryInit() {
        this.query(`CREATE TABLE IF NOT EXISTS Products (
                         id INTEGER NOT NULL,
                         name TEXT NOT NULL,
                         vote INTEGER NOT NULL,
                         products TEXT NOT NULL,
                         PRIMARY KEY(id)
                     )`).catch(err => {
                console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
            });
    }

    insertProducts(data: any): Promise<any> {
        for(var i = 0; i<data.categories.length;i++){
            this.query("INSERT INTO Products (id, name, vote, products) VALUES (?, ?, ?, ?);",[data.categories[i].id, data.categories[i].name, data.categories[i].vote, JSON.stringify(data.categories[i].products)]);
        }

        return new Promise((resolve, reject) => {
        console.log(reject);
        console.log(resolve);
            return resolve;
        });
    }

    getProducts(id: any): Promise<any> {
        return this.query('SELECT * FROM Products WHERE id='+id).then((data) => {
            console.log(data);
            if (data.res.rows.length > 0) {
            	
                console.log('Rows found.');
                if (this.platform.is('cordova') && win.sqlitePlugin) {
                	let result = [];
                    for (let i = 0; i < data.res.rows.length; i++) {
                        var row = data.res.rows.item(i);
                        result.push(row);
                    }

                    return result;
                }
                else {
                	return data.res.rows;
                }
            }
        });
    }

    query(query: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this._dbPromise.then(db => {
                    db.transaction((tx: any) => {
                        tx.executeSql(query, params,
                            (tx: any, res: any) => resolve({ tx: tx, res: res }),
                            (tx: any, err: any) => reject({ tx: tx, err: err }));
                    },
                        (err: any) => reject({ err: err }));
                });
            } catch (err) {
                reject({ err: err });
            }
        });
    }
}