import Dexie from "dexie";

const cointrolDB = new Dexie('cointrolDB');

cointrolDB.version(1).stores({
    transactions: '++id, category, wallet, type', // {description, category, wallet, type, date}
    categories: '++id, &name, type', // {name, color, type}
    wallets: '++id, &name', // {name, color}
});

cointrolDB.version(2).stores({
    transactions: '++id, category, wallet, type, date', // {description, category, wallet, type, date}
    categories: '++id, &name, type', // {name, color, type}
    wallets: '++id, &name', // {name, color}
});

cointrolDB.version(2.5).stores({
    transactions: '++id, category, wallet, type, date', // {description, category, wallet, type, date}
    categories: '++id, &name, type', // {name, color, type}
    wallets: '++id, &name', // {name, value}
    plans: '++id, name', // {name, values:{title, value}}
});

export {cointrolDB};