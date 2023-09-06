/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9995054945054945, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "jsURLs12_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs17_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs19_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs26_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs4_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs5_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs12_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs16_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs21_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs4_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs27_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs18_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs17_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs20_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs14_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs22_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs5_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs12_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs19_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs19_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs17_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs5_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs18_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs18_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs16_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs4_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs12_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs24_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL3_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs16_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs4_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs23_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs15_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs14_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs15_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs5_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs14_logiqids_Login"], "isController": false}, {"data": [0.955, 500, 1500, "logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs25_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs15_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_sign_up"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 9100, 0, 0.0, 7.322857142857123, 1, 909, 4.0, 9.0, 17.0, 86.0, 4.98445507307978, 935.9898519695581, 1.5258421315583928], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["jsURLs12_logiqids_HOME", 100, 0, 0.0, 3.8099999999999996, 2, 12, 3.0, 5.0, 7.0, 11.97999999999999, 0.06082836061485307, 1.3056332384410907, 0.01890787810908958], "isController": false}, {"data": ["jsURLs9_logiqids_HOME", 100, 0, 0.0, 3.4000000000000004, 2, 6, 3.0, 5.0, 5.0, 6.0, 0.06082813861029601, 1.1348035760558548, 0.0187296016638929], "isController": false}, {"data": ["jsURLs17_logiqids_Login", 100, 0, 0.0, 3.169999999999999, 2, 6, 3.0, 4.0, 5.0, 5.989999999999995, 0.060832171945783935, 0.2643330149656268, 0.01914668849426383], "isController": false}, {"data": ["jsURLs13_logiqids_olympiad", 100, 0, 0.0, 3.500000000000001, 2, 6, 4.0, 4.0, 5.0, 6.0, 0.06083280104632418, 1.5137084103248473, 0.01924787845606351], "isController": false}, {"data": ["jsURLs19_logiqids_olympiad", 100, 0, 0.0, 4.500000000000001, 2, 18, 4.0, 9.600000000000023, 12.0, 17.95999999999998, 0.06083272703382056, 2.13789965580843, 0.019247855038044787], "isController": false}, {"data": ["cssURL2_logiqids_HOME", 100, 0, 0.0, 4.179999999999997, 2, 21, 3.0, 5.900000000000006, 14.849999999999966, 20.969999999999985, 0.060822145099742236, 2.7183079750604877, 0.016886460792828826], "isController": false}, {"data": ["jsURLs26_logiqids_olympiad", 100, 0, 0.0, 4.3400000000000025, 2, 16, 3.0, 9.900000000000006, 13.949999999999989, 16.0, 0.06083272703382056, 1.3057311187001628, 0.019426075918026683], "isController": false}, {"data": ["jsURLs4_logiqids_olympiad", 100, 0, 0.0, 11.340000000000002, 5, 103, 9.0, 15.900000000000006, 21.0, 102.62999999999981, 0.0608334671669611, 51.01299996460252, 0.019663943000257932], "isController": false}, {"data": ["jsURLs5_logiqids_Login", 100, 0, 0.0, 63.05000000000001, 13, 257, 37.0, 159.70000000000007, 191.64999999999992, 256.92999999999995, 0.06082839761577012, 220.39076345588785, 0.01907421726017948], "isController": false}, {"data": ["jsURLs12_logiqids_Login", 100, 0, 0.0, 3.3599999999999994, 2, 9, 3.0, 4.0, 5.949999999999989, 8.97999999999999, 0.06083180189272068, 0.3855708515220421, 0.018730729625756674], "isController": false}, {"data": ["jsURLs16_logiqids_sign_up", 100, 0, 0.0, 4.659999999999999, 2, 21, 4.0, 10.0, 11.949999999999989, 20.949999999999974, 0.060832504997390284, 0.7458896807084311, 0.01924778478433052], "isController": false}, {"data": ["jsURLs21_logiqids_olympiad", 100, 0, 0.0, 5.090000000000002, 2, 22, 4.0, 10.900000000000006, 14.0, 21.949999999999974, 0.06083276404004986, 5.1628541094205005, 0.018784492177210708], "isController": false}, {"data": ["jsURLs4_logiqids_HOME", 100, 0, 0.0, 34.61999999999999, 5, 232, 10.0, 100.3000000000001, 196.95, 231.92999999999995, 0.06082491972631219, 51.005817504408284, 0.01913846595294706], "isController": false}, {"data": ["jsURLs3_logiqids_olympiad", 100, 0, 0.0, 4.499999999999998, 2, 16, 4.0, 6.0, 8.0, 15.949999999999974, 0.06083372621781516, 5.38974279215397, 0.019307579121865162], "isController": false}, {"data": ["logiqids_Login", 100, 0, 0.0, 3.6099999999999994, 2, 9, 3.0, 5.0, 6.0, 9.0, 0.0608284346167322, 0.19260515943740997, 0.012046881386985633], "isController": false}, {"data": ["jsURLs27_logiqids_olympiad", 100, 0, 0.0, 4.35, 2, 29, 3.0, 8.700000000000017, 14.949999999999989, 28.889999999999944, 0.06083276404004986, 0.024810737864928146, 0.019188459750914162], "isController": false}, {"data": ["jsURLs18_logiqids_sign_up", 100, 0, 0.0, 6.369999999999998, 2, 72, 4.0, 13.500000000000028, 22.94999999999999, 71.75999999999988, 0.06083243098560705, 1.3057372396371956, 0.019425981379192877], "isController": false}, {"data": ["jsURLs8_logiqids_Login", 100, 0, 0.0, 4.71, 1, 55, 3.0, 12.0, 13.0, 54.58999999999979, 0.06083046973897037, 0.41075418262706115, 0.0186709146864828], "isController": false}, {"data": ["jsURLs17_logiqids_sign_up", 100, 0, 0.0, 4.660000000000001, 2, 22, 4.0, 10.900000000000006, 14.899999999999977, 21.95999999999998, 0.06083246799147615, 0.8125863250741092, 0.019265595087534882], "isController": false}, {"data": ["jsURLs9_logiqids_olympiad", 100, 0, 0.0, 3.440000000000001, 2, 14, 3.0, 4.900000000000006, 5.0, 13.929999999999964, 0.06083291206541728, 0.4107581987937442, 0.01918850644250955], "isController": false}, {"data": ["cssURL1_logiqids_HOME", 100, 0, 0.0, 11.360000000000001, 2, 98, 3.0, 69.9000000000004, 83.89999999999998, 97.89999999999995, 0.06081929674647173, 3.435912521324766, 0.01688566998537296], "isController": false}, {"data": ["jsURLs20_logiqids_olympiad", 100, 0, 0.0, 3.999999999999997, 2, 8, 4.0, 7.0, 8.0, 8.0, 0.06083276404004986, 0.9297533514670733, 0.019247866747047024], "isController": false}, {"data": ["jsURLs13_logiqids_HOME", 100, 0, 0.0, 3.22, 2, 5, 3.0, 4.0, 5.0, 5.0, 0.06082839761577012, 0.02480895701196312, 0.018682159228671585], "isController": false}, {"data": ["jsURLs8_logiqids_HOME", 100, 0, 0.0, 4.090000000000002, 1, 54, 3.0, 5.0, 5.0, 53.74999999999987, 0.060828101609694055, 0.9296696174885658, 0.01872959027103177], "isController": false}, {"data": ["jsURLs7_logiqids_Login", 100, 0, 0.0, 5.109999999999999, 2, 48, 3.0, 9.0, 11.0, 47.929999999999964, 0.060830395732139435, 0.5867145132579847, 0.018730296654632387], "isController": false}, {"data": ["jsURLs10_logiqids_Login", 100, 0, 0.0, 5.839999999999999, 2, 24, 4.0, 13.800000000000011, 18.0, 23.97999999999999, 0.060830617753172465, 2.1274338282639125, 0.018730365017163356], "isController": false}, {"data": ["jsURLs3_logiqids_HOME", 100, 0, 0.0, 10.500000000000005, 2, 102, 3.0, 10.800000000000011, 94.74999999999994, 102.0, 0.06082488272962609, 5.38898006707768, 0.01878205851475368], "isController": false}, {"data": ["jsURLs14_logiqids_sign_up", 100, 0, 0.0, 4.7200000000000015, 2, 19, 4.0, 11.700000000000017, 12.949999999999989, 18.949999999999974, 0.060832504997390284, 2.137908486469026, 0.01924778478433052], "isController": false}, {"data": ["jsURLs22_logiqids_olympiad", 100, 0, 0.0, 4.300000000000004, 2, 13, 4.0, 9.800000000000011, 10.949999999999989, 12.989999999999995, 0.06083276404004986, 1.3627626293000399, 0.019247866747047024], "isController": false}, {"data": ["jsURLs11_logiqids_HOME", 100, 0, 0.0, 3.6100000000000003, 2, 10, 3.0, 5.0, 7.0, 10.0, 0.06082824961237198, 2.327371993791869, 0.019145453955144033], "isController": false}, {"data": ["jsURLs5_logiqids_olympiad", 100, 0, 0.0, 40.620000000000005, 14, 236, 24.5, 102.30000000000004, 134.34999999999985, 235.6199999999998, 0.06083231996826986, 220.4049581163774, 0.019604165614774467], "isController": false}, {"data": ["jsURLs12_logiqids_olympiad", 100, 0, 0.0, 3.5499999999999994, 2, 8, 3.5, 4.900000000000006, 5.949999999999989, 7.989999999999995, 0.06083283805264352, 0.5100518613251582, 0.01924789016509424], "isController": false}, {"data": ["jsURLs19_logiqids_sign_up", 100, 0, 0.0, 5.340000000000002, 2, 45, 4.0, 9.700000000000017, 23.849999999999966, 44.889999999999944, 0.06083243098560705, 0.024789809693343715, 0.01918835469565535], "isController": false}, {"data": ["logiqids_olympiad", 100, 0, 0.0, 3.9499999999999997, 2, 18, 4.0, 5.0, 6.0, 17.89999999999995, 0.06083394826316036, 0.23214983199944764, 0.012226197805232816], "isController": false}, {"data": ["jsURLs2_logiqids_sign_up", 100, 0, 0.0, 4.430000000000002, 2, 13, 4.0, 6.0, 7.0, 12.949999999999974, 0.06083246799147615, 8.401440865480252, 0.01960421331756556], "isController": false}, {"data": ["jsURLs19_logiqids_Login", 100, 0, 0.0, 3.1400000000000006, 2, 8, 3.0, 4.0, 5.0, 7.969999999999985, 0.06083220895133788, 0.024806353019345858, 0.019188284659455213], "isController": false}, {"data": ["jsURLs17_logiqids_olympiad", 100, 0, 0.0, 3.560000000000001, 2, 9, 3.0, 5.0, 6.0, 8.989999999999995, 0.06083287505900789, 0.3855693365886019, 0.019247901874139214], "isController": false}, {"data": ["jsURLs8_logiqids_sign_up", 100, 0, 0.0, 3.4000000000000004, 2, 12, 3.0, 4.0, 7.899999999999977, 11.95999999999998, 0.0608331711115437, 0.4107682649695226, 0.019188588153348257], "isController": false}, {"data": ["jsURLs6_logiqids_Login", 100, 0, 0.0, 5.0299999999999985, 2, 36, 4.0, 8.0, 9.0, 35.949999999999974, 0.060829285651283954, 7.308450361592085, 0.019021032485880003], "isController": false}, {"data": ["jsURLs5_logiqids_sign_up", 100, 0, 0.0, 50.50999999999999, 13, 216, 27.0, 120.80000000000001, 198.94999999999953, 215.95, 0.06083002570068586, 220.39666226124214, 0.01960342625119759], "isController": false}, {"data": ["jsURLs18_logiqids_Login", 100, 0, 0.0, 3.57, 2, 11, 3.0, 5.0, 5.0, 10.97999999999999, 0.060832171945783935, 1.3057192041311736, 0.019425898658468114], "isController": false}, {"data": ["logiqids_sign_up", 100, 0, 0.0, 3.75, 2, 12, 4.0, 5.0, 6.949999999999989, 11.969999999999985, 0.06083220895133788, 0.18329445553195942, 0.012166441790267577], "isController": false}, {"data": ["jsURLs7_logiqids_HOME", 100, 0, 0.0, 3.7199999999999998, 2, 8, 3.0, 6.0, 7.0, 8.0, 0.06082799060815825, 3.718089541083225, 0.01872955609253154], "isController": false}, {"data": ["jsURLs18_logiqids_olympiad", 100, 0, 0.0, 3.9900000000000007, 2, 10, 4.0, 7.0, 9.0, 10.0, 0.06083272703382056, 1.7688844127619152, 0.018731014486097288], "isController": false}, {"data": ["jsURLs11_logiqids_sign_up", 100, 0, 0.0, 3.8499999999999996, 2, 13, 3.0, 6.900000000000006, 9.949999999999989, 13.0, 0.0608323569740039, 0.5100353523440532, 0.01924773794880592], "isController": false}, {"data": ["jsURLs16_logiqids_olympiad", 100, 0, 0.0, 3.5799999999999987, 2, 9, 4.0, 4.0, 5.0, 8.969999999999985, 0.06083291206541728, 3.7183945219278316, 0.019247913583198436], "isController": false}, {"data": ["jsURLs2_logiqids_HOME", 100, 0, 0.0, 7.179999999999996, 2, 46, 4.0, 27.800000000000125, 33.89999999999998, 46.0, 0.06082295896396604, 8.400123436393782, 0.019078451581275288], "isController": false}, {"data": ["jsURLs4_logiqids_sign_up", 100, 0, 0.0, 11.070000000000006, 4, 75, 9.0, 19.900000000000006, 26.0, 74.50999999999975, 0.06083202392401837, 51.011777825974484, 0.01966347648325203], "isController": false}, {"data": ["jsURLs9_logiqids_Login", 100, 0, 0.0, 4.6, 2, 24, 3.5, 11.900000000000006, 14.899999999999977, 23.91999999999996, 0.06083050674245337, 0.7283960122637343, 0.018730330835835494], "isController": false}, {"data": ["cssURL2_logiqids_sign_up", 100, 0, 0.0, 3.5100000000000007, 2, 11, 3.0, 4.0, 5.0, 10.95999999999998, 0.06083243098560705, 1.311190177957673, 0.01688931653242977], "isController": false}, {"data": ["jsURLs1_logiqids_olympiad", 100, 0, 0.0, 3.569999999999998, 2, 9, 4.0, 5.0, 5.0, 8.97999999999999, 0.06083383724028514, 0.44735980100795586, 0.01942643044684887], "isController": false}, {"data": ["jsURLs7_logiqids_olympiad", 100, 0, 0.0, 5.22, 2, 48, 4.0, 6.0, 16.59999999999991, 47.87999999999994, 0.06083291206541728, 3.4866817222420945, 0.019485542145953973], "isController": false}, {"data": ["jsURLs12_logiqids_sign_up", 100, 0, 0.0, 4.15, 2, 15, 3.0, 9.900000000000006, 10.0, 14.97999999999999, 0.06083231996826986, 0.36306736498874903, 0.018671482584010954], "isController": false}, {"data": ["jsURLs11_logiqids_olympiad", 100, 0, 0.0, 3.6300000000000012, 2, 8, 4.0, 4.0, 5.0, 7.989999999999995, 0.06083287505900789, 2.127504456198201, 0.019247901874139214], "isController": false}, {"data": ["jsURLs1_logiqids_Login", 100, 0, 0.0, 3.4499999999999993, 2, 8, 3.0, 5.0, 6.0, 7.989999999999995, 0.06082880462882872, 0.4473269504147916, 0.019424823353151356], "isController": false}, {"data": ["jsURLs24_logiqids_olympiad", 100, 0, 0.0, 4.540000000000001, 2, 14, 4.0, 8.0, 9.0, 13.97999999999999, 0.06083265302149704, 3.1653433362619188, 0.01873099169695119], "isController": false}, {"data": ["cssURL3_logiqids_Login", 100, 0, 0.0, 3.2500000000000004, 2, 9, 3.0, 5.0, 5.0, 8.969999999999985, 0.0608287676274165, 0.14426872872133673, 0.016834836665634605], "isController": false}, {"data": ["jsURLs11_logiqids_Login", 100, 0, 0.0, 6.57, 2, 40, 4.0, 22.700000000000074, 35.89999999999998, 39.989999999999995, 0.060830728764296745, 0.5100258593328938, 0.01873039919861598], "isController": false}, {"data": ["jsURLs1_logiqids_HOME", 100, 0, 0.0, 3.5299999999999985, 2, 11, 3.0, 5.900000000000006, 7.0, 10.97999999999999, 0.06082292196966518, 0.4473003213883197, 0.018906187561469168], "isController": false}, {"data": ["jsURLs6_logiqids_HOME", 100, 0, 0.0, 3.410000000000001, 2, 8, 3.0, 5.0, 6.0, 7.989999999999995, 0.06082795360773634, 1.5135919492074421, 0.018729544699725847], "isController": false}, {"data": ["jsURLs3_logiqids_sign_up", 100, 0, 0.0, 4.820000000000002, 2, 48, 4.0, 5.0, 6.949999999999989, 47.989999999999995, 0.060832542003349435, 5.389654507090641, 0.01930720327254743], "isController": false}, {"data": ["jsURLs16_logiqids_Login", 100, 0, 0.0, 3.2699999999999987, 2, 8, 3.0, 4.0, 5.0, 7.989999999999995, 0.06083206092939222, 1.1568446096330611, 0.01873080938577868], "isController": false}, {"data": ["cssURL1_logiqids_sign_up", 100, 0, 0.0, 3.650000000000001, 1, 7, 4.0, 5.0, 6.0, 7.0, 0.06083231996826986, 3.436644094010571, 0.017406122803420965], "isController": false}, {"data": ["jsURLs4_logiqids_Login", 100, 0, 0.0, 10.019999999999996, 4, 31, 9.0, 17.0, 20.0, 30.97999999999999, 0.060828915633335465, 51.00917428358745, 0.019662471752572304], "isController": false}, {"data": ["jsURLs10_logiqids_olympiad", 100, 0, 0.0, 3.7899999999999996, 2, 31, 3.0, 5.0, 6.0, 30.779999999999887, 0.06083287505900789, 0.7284326879294801, 0.019247901874139214], "isController": false}, {"data": ["jsURLs23_logiqids_olympiad", 100, 0, 0.0, 5.3100000000000005, 2, 45, 4.0, 7.900000000000006, 16.899999999999977, 44.91999999999996, 0.060832616015402824, 0.7458868834614367, 0.019247819911123547], "isController": false}, {"data": ["jsURLs13_logiqids_sign_up", 100, 0, 0.0, 3.970000000000001, 2, 21, 3.0, 6.900000000000006, 9.949999999999989, 20.97999999999999, 0.060832504997390284, 0.3855711495457637, 0.01924778478433052], "isController": false}, {"data": ["jsURLs6_logiqids_olympiad", 100, 0, 0.0, 6.180000000000001, 2, 47, 4.0, 6.0, 40.2499999999996, 46.989999999999995, 0.06083291206541728, 7.308902698023296, 0.019544949286642858], "isController": false}, {"data": ["jsURLs2_logiqids_Login", 100, 0, 0.0, 4.690000000000001, 2, 13, 4.0, 7.900000000000006, 9.949999999999989, 12.989999999999995, 0.06082861962221777, 8.400917691920379, 0.019602973120441274], "isController": false}, {"data": ["jsURLs7_logiqids_sign_up", 100, 0, 0.0, 4.420000000000003, 2, 44, 3.0, 5.0, 7.899999999999977, 43.97999999999999, 0.0608330230849156, 0.5867398543064305, 0.019247948710461576], "isController": false}, {"data": ["cssURL2_logiqids_Login", 100, 0, 0.0, 3.57, 2, 9, 3.0, 5.0, 6.0, 8.989999999999995, 0.060828693624727107, 1.3757359511569922, 0.016888278903818277], "isController": false}, {"data": ["jsURLs15_logiqids_Login", 100, 0, 0.0, 3.3199999999999994, 2, 9, 3.0, 4.900000000000006, 5.0, 8.97999999999999, 0.06083206092939222, 0.7458800773859856, 0.01873080938577868], "isController": false}, {"data": ["jsURLs8_logiqids_olympiad", 100, 0, 0.0, 3.579999999999999, 2, 7, 4.0, 5.0, 6.0, 6.989999999999995, 0.06083291206541728, 0.5867471005133081, 0.019247913583198436], "isController": false}, {"data": ["cssURL1_logiqids_Login", 100, 0, 0.0, 3.5599999999999983, 2, 7, 3.0, 6.0, 7.0, 7.0, 0.060828545619888506, 3.4364350252286395, 0.017405042838503252], "isController": false}, {"data": ["jsURLs3_logiqids_Login", 100, 0, 0.0, 4.840000000000001, 2, 19, 4.0, 12.0, 13.0, 18.989999999999995, 0.06082880462882872, 5.389315065949069, 0.019306017094110676], "isController": false}, {"data": ["jsURLs6_logiqids_sign_up", 100, 0, 0.0, 7.990000000000003, 2, 73, 4.0, 12.500000000000028, 47.799999999999955, 72.86999999999993, 0.0608330230849156, 7.308899402672942, 0.01954498495599339], "isController": false}, {"data": ["jsURLs2_logiqids_olympiad", 100, 0, 0.0, 4.509999999999999, 2, 8, 5.0, 6.0, 7.0, 7.989999999999995, 0.06083376322526012, 8.401636381654908, 0.01960463072689047], "isController": false}, {"data": ["jsURLs10_logiqids_sign_up", 100, 0, 0.0, 4.48, 2, 17, 4.0, 9.600000000000023, 12.949999999999989, 17.0, 0.06083231996826986, 2.1274975184215474, 0.019247726239960385], "isController": false}, {"data": ["cssURL2_logiqids_olympiad", 100, 0, 0.0, 3.8200000000000007, 2, 13, 4.0, 5.0, 6.949999999999989, 12.949999999999974, 0.06083394826316036, 1.8362887685246978, 0.016889737784391103], "isController": false}, {"data": ["jsURLs14_logiqids_olympiad", 100, 0, 0.0, 3.5699999999999994, 2, 11, 4.0, 4.0, 5.0, 10.95999999999998, 0.06083280104632418, 0.3630785532058886, 0.01918847142379171], "isController": false}, {"data": ["jsURLs15_logiqids_sign_up", 100, 0, 0.0, 4.199999999999999, 2, 10, 4.0, 7.0, 8.0, 9.989999999999995, 0.060832504997390284, 1.3627526678095068, 0.01924778478433052], "isController": false}, {"data": ["jsURLs5_logiqids_HOME", 100, 0, 0.0, 7.01, 2, 82, 3.0, 11.800000000000011, 30.94999999999999, 81.99, 0.0608278426067407, 3.4864119533705926, 0.018967119281574518], "isController": false}, {"data": ["jsURLs1_logiqids_sign_up", 100, 0, 0.0, 3.19, 2, 6, 3.0, 4.0, 5.0, 5.989999999999995, 0.06083243098560705, 0.4473660935617997, 0.019425981379192877], "isController": false}, {"data": ["jsURLs10_logiqids_HOME", 100, 0, 0.0, 3.630000000000001, 2, 19, 3.0, 5.0, 6.0, 18.93999999999997, 0.06082821261163498, 1.008498499672136, 0.018729624449656746], "isController": false}, {"data": ["jsURLs14_logiqids_Login", 100, 0, 0.0, 3.3899999999999992, 2, 8, 3.0, 4.900000000000006, 5.0, 7.989999999999995, 0.06083206092939222, 1.3627468783647734, 0.01873080938577868], "isController": false}, {"data": ["logiqids_HOME", 100, 0, 0.0, 80.74999999999997, 2, 909, 3.0, 410.30000000000257, 904.5999999999992, 909.0, 0.06078469392779143, 0.1461658192773794, 0.011741418416911275], "isController": false}, {"data": ["jsURLs13_logiqids_Login", 100, 0, 0.0, 4.11, 2, 42, 4.0, 5.900000000000006, 6.0, 41.659999999999826, 0.06083202392401837, 2.137887421100865, 0.018730797991448233], "isController": false}, {"data": ["cssURL1_logiqids_olympiad", 100, 0, 0.0, 4.059999999999998, 2, 9, 4.0, 5.900000000000006, 7.0, 9.0, 0.06083394826316036, 3.4367194481646095, 0.017406588712017564], "isController": false}, {"data": ["jsURLs25_logiqids_olympiad", 100, 0, 0.0, 4.52, 2, 16, 4.0, 9.0, 10.949999999999989, 16.0, 0.06083272703382056, 3.5473380986396585, 0.01932508408603694], "isController": false}, {"data": ["jsURLs15_logiqids_olympiad", 100, 0, 0.0, 3.739999999999999, 2, 11, 4.0, 5.0, 6.0, 11.0, 0.06083287505900789, 0.8001121121371928, 0.018731060064555848], "isController": false}, {"data": ["jsURLs9_logiqids_sign_up", 100, 0, 0.0, 3.3400000000000007, 2, 17, 3.0, 4.900000000000006, 5.0, 16.889999999999944, 0.0608331711115437, 0.728427915923995, 0.019247995547011877], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 9100, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
