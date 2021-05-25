class Connection{
    static set(db){
        this._db = db;
    }
    static get db(){
        return this._db;
    }
}
module.exports = Connection