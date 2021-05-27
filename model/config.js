class Config {
    static set(){
        Config.port = 4000;
        Config.dbURL = 'mongodb+srv://giorgi:giorgi@bogcluster.dzhv7.mongodb.net/' + 
        'myFirstDatabase?retryWrites=true&w=majority',
        Config.dataBaseName = "Bog";
        Config.collectionName = "people";
    }
}

module.exports = Config;