const CouchDB = require('core-lib').CouchDB;

class UserService {
    constructor(config) {
        this.config = config;
        this.couchDB = new CouchDB(config);
        this.user = this.couchDB.selectDb('employees');
    }

    async getAllUser() {
        try {
        let list = await this.couchDB.listAllObjects(this.user);
        return list;
        } catch (e) {
            throw e
        }
    }
}

module.exports = UserService;