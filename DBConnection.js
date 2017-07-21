var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: 'Oswald10',
    database: 'Infection_Rate_Simulator'
});

connection.connect();

function fetchDisease(diseaseName, diseaseList){
    connection.query('SELECT Name FROM DISEASE;', function(err, rows, feilds){
        if (err){
            console.log("error retrieving diseases");
            throw err;
        }
        for(var i in rows){
            diseaseList.push(i);
        }
    })
}

connection.end();