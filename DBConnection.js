//This js file connects to the mysql server via node.js

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Oswald10',
    database: 'Infection_Rate_Simulator'
});

var diseaseList = [];
var data;

function fetchDisease(diseaseName){
    connection.connect();
    
    connection.query('SELECT * from DISEASE where Name = "' + diseaseName + '";', function (err, rows, feilds){
        if (err){
            //console.log("error retrieving diseases");
            throw err;
        }

        else {
            //data gets retrieved in JSON format so parsing is necessary to separate vaues.
            res.json(rows);
            var i_rate = rows[1];
            var r_rate = rows[2];
            var d_rate = rows[3];
            diseaseList.push(i_rate);
            diseaseList.push(r_rate);
            diseaseList.push(d_rate);
        }
    })

    connection.end();
    return diseaseList;
}