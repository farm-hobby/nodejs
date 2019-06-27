const path  = require('path');
const fs    = require('fs');

const filename = path.join(path.dirname(process.mainModule.filename), 'data', 'users.json');

const store = {
    users: []
};

const readFile = (filename, callback) => {
    fs.readFile(filename, (err, fileContent) => {
        if (!err) return callback(JSON.parse(fileContent));
        callback([]);
    });
}

const writeFile = (filename, data, callback) => {
    fs.writeFile(filename, data, (err) => {
        if (err) throw err;
        callback();
    });
};

module.exports = class UserModel {
    constructor (name) {
        this.name = name;
    }

    static fetchAll(callback) {
        readFile(filename, (users) => {
            store.users = users;
            callback(users);
        });
    }

    save(callback) {
        store.users.push(this);
        writeFile(filename, JSON.stringify(store.users), callback);
    }
}
