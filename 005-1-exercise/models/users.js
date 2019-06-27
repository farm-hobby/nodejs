const path  = require('path');
const fs    = require('fs');

const filename = path.join(path.dirname(process.mainModule.filename), 'data', 'users.json');

module.exports = class UsersModel {

    constructor (name) {
        this.name = name;
    }

    static getUsersFromFile (cb) {
        fs.readFile(filename, (err, fileContent) => {
            if (!err) {
                return cb(JSON.parse(fileContent));
            }

            cb([]);
        });
    }

    save(user) {
        this.getUsersFromFile((fileContent) => {
            fileContent.push(user);
            fs.writeFile(filename, fileContent, (err) => {
                if (!err) throw err;
            });
        });
    }
}
