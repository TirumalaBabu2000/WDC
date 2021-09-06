console.log("Successful");
(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        const cols = [{
                id: "Date_of_report",
                dataType: tableau.dataTypeEnum.date,
              },
              {
                id: "Municipality_code",
                dataType: tableau.dataTypeEnum.string,
              },
              {
                id: "Municipality_name",
                dataType: tableau.dataTypeEnum.string,
              },
              {
                id: "Province",
                dataType: tableau.dataTypeEnum.string,
              },
              {
                id: "Total_reported",
                dataType: tableau.dataTypeEnum.int,
              },
              {
                id: "Hospital_admission",
                dataType: tableau.dataTypeEnum.int,
              },
              {
                id: "Deceased",
                dataType: tableau.dataTypeEnum.int,
              },
        ];
    
        var tableSchema = {
            id: "covid",
            alias: "Dutch Covid cases and news",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
        $.getJSON("https://data.rivm.nl/covid-19/COVID-19_aantallen_gemeente_cumulatief.json", function(resp) {
            for (i = 0, len = resp.length; i < len; i++) {
                tableData.push({
                  Date_of_report: resp[i].Date_of_report,
                  Municipality_code: resp[i].Municipality_code,
                  Municipality_name: resp[i].Municipality_name,
                  Province: resp[i].Province,
                  Total_reported: resp[i].Total_reported,
                  Hospital_admission: resp[i].Hospital_admission,
                  Deceased: resp[i].Deceased,
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);
})();
$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Covid Data Feed";
        tableau.submit();
    });
});
