class Config {
    static set(config){
        this.port = config.port;
        this.dbURL = config.dbURL;
        this.dataBaseName = config.dataBaseName;
        this.collectionName = config.collectionName;
    }
}

module.exports = Config;