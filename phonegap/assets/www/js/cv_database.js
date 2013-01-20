function CV_database()
{
    this.db = null;
    this.db_initialized = false;
    this.username = null;
    this.password = null;
    this.credentials_set = false;
    this.init();
}

CV_database.prototype.create_tables = function(tx)
{
    tx.executeSql('CREATE TABLE IF NOT EXISTS SETTINGS (id unique, username, password)');
    tx.executeSql('INSERT INTO SETTINGS (id, username, password) VALUES (1, "u", "p")');
    tx.executeSql('SELECT * FROM SETTINGS WHERE id=1', [], good, bad);
};

CV_database.prototype.create_tables_failure = function(err)
{
	// alert("create_tables - Error processing SQL: "+err.code);
	console.log('in CV_database.prototype.create_tables_failure');
	// this.db.transaction(this.get_credentials, this.get_credentials_failure, this.get_credentials_success);
};

CV_database.prototype.create_tables_success = function()
{
	alert("success creating db!");
	console.log('in CV_database.prototype.create_tables_success');
	this.db.transaction(this.get_credentials, this.get_credentials_failure, this.get_credentials_success);
};

CV_database.prototype.get_credentials = function(tx)
{
	console.log('in CV_database.prototype.get_credentials');
	//tx.executeSql('SELECT * FROM SETTINGS WHERE id=1', [], this.get_credentials_success, this.get_credentials_failure);
	tx.executeSql('SELECT * FROM SETTINGS WHERE id=1', [], good, bad);
	console.log('leaving CV_database.prototype.get_credentials');
};

CV_database.prototype.get_credentials_failure = function(errcode)
{
	console.log('in CV_database.prototype.get_credentials_failure');
	alert("Error processing SQL: "+err.code);
};

function good(tx, results)
{
	console.log('in good');
	console.log('username: ' + results.rows.item(0).username + ", password: " + results.rows.item(0).password);
	console.log(results);
}
function bad()
{
	console.log('in bad');
}

CV_database.prototype.get_credentials_success = function(tx, results)
{
	console.log('in CV_database.prototype.get_credentials_success');
	console.log(results);
};
 
CV_database.prototype.init = function()
{
	this.db = openDatabase('phonegap_test', '1.0', 'phonegap test database', 1024 * 1024);
	this.db.transaction(this.create_tables, this.create_tables_failure, this.create_tables_success);
	//this.db.transaction(this.get_credentials, this.get_credentials_success);
};


CV_database.prototype.set_credentials = function(username, password)
{
	
};

//var db = new CV_database();