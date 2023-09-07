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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9751648351648352, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "jsURLs12_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs17_logiqids_Login"], "isController": false}, {"data": [0.9975, 500, 1500, "jsURLs13_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs19_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs26_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs4_logiqids_olympiad"], "isController": false}, {"data": [0.8475, 500, 1500, "jsURLs5_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs12_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs16_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs21_logiqids_olympiad"], "isController": false}, {"data": [0.0075, 500, 1500, "jsURLs4_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs27_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs18_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs17_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_olympiad"], "isController": false}, {"data": [0.9725, 500, 1500, "cssURL1_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs20_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_Login"], "isController": false}, {"data": [0.87, 500, 1500, "jsURLs3_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs14_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs22_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_HOME"], "isController": false}, {"data": [0.9925, 500, 1500, "jsURLs5_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs12_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs19_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs19_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs17_logiqids_olympiad"], "isController": false}, {"data": [0.9975, 500, 1500, "jsURLs8_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs5_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs18_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs18_logiqids_olympiad"], "isController": false}, {"data": [0.9975, 500, 1500, "jsURLs11_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs16_logiqids_olympiad"], "isController": false}, {"data": [0.585, 500, 1500, "jsURLs2_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs4_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs12_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs24_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL3_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_Login"], "isController": false}, {"data": [0.9575, 500, 1500, "jsURLs1_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs16_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs4_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs23_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_Login"], "isController": false}, {"data": [0.985, 500, 1500, "jsURLs7_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs15_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_olympiad"], "isController": false}, {"data": [0.9975, 500, 1500, "jsURLs10_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs14_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs15_logiqids_sign_up"], "isController": false}, {"data": [0.9975, 500, 1500, "jsURLs5_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs14_logiqids_Login"], "isController": false}, {"data": [0.535, 500, 1500, "logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs25_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs15_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_sign_up"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 18200, 0, 0.0, 95.72027472527411, 1, 5629, 4.0, 101.0, 292.0, 3535.7600000000384, 168.23345627316678, 31591.178258136675, 45.77205117717201], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["jsURLs12_logiqids_HOME", 200, 0, 0.0, 5.265000000000001, 2, 25, 4.0, 7.900000000000006, 11.899999999999977, 22.950000000000045, 22.93577981651376, 492.2993791212729, 5.3755733944954125], "isController": false}, {"data": ["jsURLs9_logiqids_HOME", 200, 0, 0.0, 6.985000000000002, 3, 121, 5.0, 8.0, 14.899999999999977, 75.60000000000036, 22.891152569531876, 427.05658227938653, 5.298049959940483], "isController": false}, {"data": ["jsURLs17_logiqids_Login", 200, 0, 0.0, 3.999999999999999, 2, 83, 3.0, 4.0, 6.0, 31.88000000000011, 22.750540325332725, 98.84820946138095, 5.421027186895689], "isController": false}, {"data": ["jsURLs13_logiqids_olympiad", 200, 0, 0.0, 27.170000000000016, 1, 705, 3.0, 82.80000000000001, 140.89999999999998, 288.1300000000008, 21.5610176800345, 536.5114989286869, 6.822040750323415], "isController": false}, {"data": ["jsURLs19_logiqids_olympiad", 200, 0, 0.0, 7.095, 1, 78, 3.0, 18.900000000000006, 32.94999999999999, 70.92000000000007, 21.70374389582203, 762.7491479584916, 6.867200217037439], "isController": false}, {"data": ["cssURL2_logiqids_HOME", 200, 0, 0.0, 124.07999999999994, 7, 403, 129.0, 236.70000000000002, 274.74999999999994, 400.9000000000001, 17.71793054571226, 791.8621579608877, 3.5643493090007086], "isController": false}, {"data": ["jsURLs26_logiqids_olympiad", 200, 0, 0.0, 4.365, 1, 74, 2.0, 4.0, 11.899999999999977, 62.88000000000011, 21.74149364061311, 466.670120393521, 6.942840254375476], "isController": false}, {"data": ["jsURLs4_logiqids_olympiad", 200, 0, 0.0, 59.45999999999998, 4, 401, 27.5, 137.70000000000002, 217.5499999999999, 298.95000000000005, 21.542438604049977, 18064.80371556576, 6.963424978457561], "isController": false}, {"data": ["jsURLs5_logiqids_Login", 200, 0, 0.0, 326.57499999999993, 73, 1169, 144.0, 760.1, 851.75, 1060.5800000000004, 22.296544035674472, 80783.85198926978, 5.247526477146042], "isController": false}, {"data": ["jsURLs12_logiqids_Login", 200, 0, 0.0, 3.495, 2, 27, 3.0, 4.0, 5.0, 24.970000000000027, 22.750540325332725, 144.20854336110796, 5.265505915140484], "isController": false}, {"data": ["jsURLs16_logiqids_sign_up", 200, 0, 0.0, 10.514999999999997, 1, 112, 3.0, 26.0, 57.449999999999875, 100.93000000000006, 21.985269869187643, 269.5687151327361, 6.956276794547653], "isController": false}, {"data": ["jsURLs21_logiqids_olympiad", 200, 0, 0.0, 5.529999999999999, 2, 69, 3.0, 8.0, 25.799999999999955, 60.87000000000012, 21.694326933506886, 1841.1753876166072, 5.021050276602669], "isController": false}, {"data": ["jsURLs4_logiqids_HOME", 200, 0, 0.0, 3947.025, 413, 5629, 4147.0, 4940.0, 5148.15, 5318.490000000001, 16.69449081803005, 13999.463624269616, 3.9616809265442403], "isController": false}, {"data": ["jsURLs3_logiqids_olympiad", 200, 0, 0.0, 22.240000000000002, 2, 211, 4.0, 55.900000000000006, 113.29999999999984, 205.99, 21.55636990730761, 1909.8455351368827, 6.841621308471653], "isController": false}, {"data": ["logiqids_Login", 200, 0, 0.0, 7.865000000000001, 2, 115, 4.0, 8.900000000000006, 15.899999999999977, 105.95000000000005, 22.74277916761428, 72.01276704997726, 3.864495678871958], "isController": false}, {"data": ["jsURLs27_logiqids_olympiad", 200, 0, 0.0, 3.695, 1, 65, 2.0, 3.9000000000000057, 6.0, 59.77000000000021, 21.74149364061311, 8.86878838732471, 6.857912544841831], "isController": false}, {"data": ["jsURLs18_logiqids_sign_up", 200, 0, 0.0, 11.305000000000001, 1, 96, 3.0, 37.900000000000006, 51.89999999999998, 86.98000000000002, 22.116554240849275, 474.72136165404186, 7.062610582771205], "isController": false}, {"data": ["jsURLs8_logiqids_Login", 200, 0, 0.0, 8.490000000000002, 2, 133, 3.0, 23.80000000000001, 36.89999999999998, 84.77000000000021, 22.49971875351558, 151.93033964028575, 5.185482056474294], "isController": false}, {"data": ["jsURLs17_logiqids_sign_up", 200, 0, 0.0, 10.11, 1, 98, 3.0, 26.80000000000001, 73.89999999999998, 96.95000000000005, 22.07261891623441, 294.83953378490236, 5.302601809954751], "isController": false}, {"data": ["jsURLs9_logiqids_olympiad", 200, 0, 0.0, 23.505, 1, 206, 3.0, 82.00000000000006, 153.4999999999999, 193.98000000000002, 21.500752526338424, 145.1796320683724, 6.781975650397764], "isController": false}, {"data": ["cssURL1_logiqids_HOME", 200, 0, 0.0, 191.805, 8, 554, 182.5, 360.30000000000007, 521.8999999999997, 545.99, 18.578727357176035, 1049.5782592603343, 3.737517417556897], "isController": false}, {"data": ["jsURLs20_logiqids_olympiad", 200, 0, 0.0, 4.529999999999999, 1, 54, 2.5, 8.0, 17.849999999999966, 52.81000000000017, 21.70374389582203, 331.72148416304935, 6.867200217037439], "isController": false}, {"data": ["jsURLs13_logiqids_HOME", 200, 0, 0.0, 4.119999999999999, 2, 28, 3.0, 6.0, 11.899999999999977, 26.970000000000027, 22.755717373990215, 9.277843753555581, 5.288926499032883], "isController": false}, {"data": ["jsURLs8_logiqids_HOME", 200, 0, 0.0, 9.334999999999997, 3, 191, 5.0, 10.900000000000006, 22.899999999999977, 188.4500000000005, 22.880677268047137, 349.70433874842695, 5.295625500514816], "isController": false}, {"data": ["jsURLs7_logiqids_Login", 200, 0, 0.0, 9.445, 2, 92, 3.0, 20.80000000000001, 59.64999999999992, 88.97000000000003, 22.497187851518557, 216.97889570444318, 5.206868672665917], "isController": false}, {"data": ["jsURLs10_logiqids_Login", 200, 0, 0.0, 5.254999999999998, 2, 33, 4.0, 8.900000000000006, 19.0, 29.99000000000001, 22.737608003638016, 795.2110911564916, 5.262512789904503], "isController": false}, {"data": ["jsURLs3_logiqids_HOME", 200, 0, 0.0, 345.70000000000016, 10, 1108, 312.0, 660.8, 761.6999999999999, 1034.1500000000008, 16.62510390689942, 1472.9556317539486, 3.847802369077307], "isController": false}, {"data": ["jsURLs14_logiqids_sign_up", 200, 0, 0.0, 21.315, 2, 105, 7.0, 64.80000000000001, 88.0, 103.99000000000001, 21.82214948172395, 766.9170673076924, 6.904664484451719], "isController": false}, {"data": ["jsURLs22_logiqids_olympiad", 200, 0, 0.0, 7.89, 1, 86, 3.0, 24.900000000000006, 36.89999999999998, 69.98000000000002, 21.70138888888889, 486.159536573622, 6.866455078125001], "isController": false}, {"data": ["jsURLs11_logiqids_HOME", 200, 0, 0.0, 9.135000000000002, 4, 47, 6.0, 19.0, 27.899999999999977, 46.98000000000002, 22.920009168003666, 876.948536521602, 5.461408434563373], "isController": false}, {"data": ["jsURLs5_logiqids_olympiad", 200, 0, 0.0, 164.6049999999999, 16, 552, 122.0, 367.5, 447.9, 527.8700000000001, 21.287919105907395, 77129.4547673297, 6.860364555614689], "isController": false}, {"data": ["jsURLs12_logiqids_olympiad", 200, 0, 0.0, 30.955000000000023, 1, 216, 3.0, 111.70000000000002, 151.24999999999983, 210.83000000000015, 21.563342318059302, 180.79525353773585, 6.82277628032345], "isController": false}, {"data": ["jsURLs19_logiqids_sign_up", 200, 0, 0.0, 19.659999999999997, 1, 256, 3.0, 45.30000000000004, 180.95, 255.84000000000015, 22.114108801415302, 9.0117152946705, 6.975446428571428], "isController": false}, {"data": ["logiqids_olympiad", 200, 0, 0.0, 17.8, 1, 279, 3.0, 19.0, 150.39999999999964, 268.7600000000002, 22.099447513812155, 84.33723238950276, 3.819924033149171], "isController": false}, {"data": ["jsURLs2_logiqids_sign_up", 200, 0, 0.0, 14.940000000000001, 4, 93, 6.0, 39.900000000000006, 62.94999999999999, 87.0, 22.665457842248415, 3130.271268344855, 7.304297937443336], "isController": false}, {"data": ["jsURLs19_logiqids_Login", 200, 0, 0.0, 6.119999999999999, 2, 73, 3.0, 10.0, 26.749999999999943, 69.98000000000002, 22.74277916761428, 9.26868194934046, 7.173747725722083], "isController": false}, {"data": ["jsURLs17_logiqids_olympiad", 200, 0, 0.0, 4.444999999999999, 1, 128, 2.0, 5.0, 8.949999999999989, 90.65000000000032, 21.630975556997623, 137.09718645224962, 6.844175859831278], "isController": false}, {"data": ["jsURLs8_logiqids_sign_up", 200, 0, 0.0, 36.64000000000005, 2, 510, 15.0, 81.80000000000001, 94.89999999999998, 430.5700000000004, 22.10677572676025, 149.2701741599425, 6.973133359124572], "isController": false}, {"data": ["jsURLs6_logiqids_Login", 200, 0, 0.0, 10.83, 4, 83, 6.0, 30.600000000000023, 36.94999999999999, 50.98000000000002, 22.487069934787495, 2701.7610625843263, 5.29236704519901], "isController": false}, {"data": ["jsURLs5_logiqids_sign_up", 200, 0, 0.0, 133.33999999999995, 21, 349, 112.5, 280.1, 301.0, 347.9200000000001, 22.36886254333967, 81045.87014875293, 7.208715468068448], "isController": false}, {"data": ["jsURLs18_logiqids_Login", 200, 0, 0.0, 3.7099999999999977, 2, 14, 3.0, 5.0, 7.0, 10.0, 22.74277916761428, 488.16609247071864, 7.2625867068455765], "isController": false}, {"data": ["logiqids_sign_up", 200, 0, 0.0, 5.825000000000002, 2, 75, 4.0, 8.0, 14.949999999999989, 65.96000000000004, 22.740193291642978, 68.52426360858442, 3.908470722001137], "isController": false}, {"data": ["jsURLs7_logiqids_HOME", 200, 0, 0.0, 35.89500000000002, 7, 301, 13.0, 109.0, 198.95, 299.62000000000035, 22.74277916761428, 1390.1451584532067, 5.263709631566977], "isController": false}, {"data": ["jsURLs18_logiqids_olympiad", 200, 0, 0.0, 6.655000000000002, 1, 70, 3.0, 13.0, 33.94999999999999, 69.98000000000002, 21.57962883038412, 627.4934586750107, 4.994503938282262], "isController": false}, {"data": ["jsURLs11_logiqids_sign_up", 200, 0, 0.0, 22.124999999999996, 1, 510, 6.0, 36.900000000000006, 88.04999999999978, 465.8200000000011, 21.879444262115744, 183.43884182529263, 6.922792911060059], "isController": false}, {"data": ["jsURLs16_logiqids_olympiad", 200, 0, 0.0, 6.3599999999999985, 1, 124, 3.0, 8.0, 15.949999999999989, 92.81000000000017, 21.605271686291456, 1320.6190669898456, 6.836042994490656], "isController": false}, {"data": ["jsURLs2_logiqids_HOME", 200, 0, 0.0, 684.6899999999999, 28, 1611, 659.0, 1050.7, 1127.75, 1595.2200000000007, 17.051752067524937, 2354.9818425483845, 4.029808594083042], "isController": false}, {"data": ["jsURLs4_logiqids_sign_up", 200, 0, 0.0, 28.434999999999988, 9, 197, 16.0, 66.0, 106.0, 172.74000000000024, 22.58610954263128, 18939.985795454544, 7.300783455674759], "isController": false}, {"data": ["jsURLs9_logiqids_Login", 200, 0, 0.0, 10.154999999999998, 2, 120, 3.0, 27.0, 46.0, 94.85000000000014, 22.696323195642304, 271.7607647951657, 5.252957614616433], "isController": false}, {"data": ["cssURL2_logiqids_sign_up", 200, 0, 0.0, 8.995000000000001, 2, 86, 4.0, 29.0, 34.94999999999999, 67.88000000000011, 22.732439190725167, 489.97952304501024, 4.573127415321664], "isController": false}, {"data": ["jsURLs1_logiqids_olympiad", 200, 0, 0.0, 16.195000000000007, 1, 243, 3.0, 41.80000000000001, 71.89999999999998, 233.51000000000045, 21.62162162162162, 159.00179476351352, 6.9045608108108105], "isController": false}, {"data": ["jsURLs7_logiqids_olympiad", 200, 0, 0.0, 16.25000000000001, 1, 83, 4.0, 58.80000000000001, 71.94999999999999, 82.0, 21.360674997329916, 1224.3147270172487, 6.842091210082239], "isController": false}, {"data": ["jsURLs12_logiqids_sign_up", 200, 0, 0.0, 32.160000000000004, 1, 358, 16.0, 81.9, 105.84999999999997, 347.1200000000008, 21.867483052700635, 130.5168413787448, 5.039771484802099], "isController": false}, {"data": ["jsURLs11_logiqids_olympiad", 200, 0, 0.0, 15.360000000000007, 1, 222, 3.0, 51.900000000000006, 85.94999999999999, 182.74000000000024, 21.563342318059302, 754.1356763814016, 6.82277628032345], "isController": false}, {"data": ["jsURLs1_logiqids_Login", 200, 0, 0.0, 9.235, 2, 93, 4.0, 25.900000000000006, 37.0, 81.0, 22.650056625141563, 166.56937906993204, 7.232977066817667], "isController": false}, {"data": ["jsURLs24_logiqids_olympiad", 200, 0, 0.0, 7.165, 1, 72, 3.0, 14.0, 45.94999999999999, 71.91000000000008, 21.750951604132684, 1131.785277324633, 5.034155791190864], "isController": false}, {"data": ["cssURL3_logiqids_Login", 200, 0, 0.0, 9.925, 2, 122, 3.0, 22.80000000000001, 49.799999999999955, 120.99000000000001, 22.711787417669772, 53.86209065551897, 4.568972859414036], "isController": false}, {"data": ["jsURLs11_logiqids_Login", 200, 0, 0.0, 4.415000000000001, 2, 53, 3.0, 5.0, 16.849999999999966, 32.92000000000007, 22.750540325332725, 190.74061895688772, 5.265505915140484], "isController": false}, {"data": ["jsURLs1_logiqids_HOME", 200, 0, 0.0, 94.56500000000001, 4, 962, 21.5, 287.30000000000007, 618.8499999999999, 748.7900000000002, 17.738359201773836, 130.4516006097561, 4.157427937915743], "isController": false}, {"data": ["jsURLs6_logiqids_HOME", 200, 0, 0.0, 25.99499999999998, 4, 282, 7.0, 94.70000000000013, 151.79999999999995, 226.0, 22.745365631752527, 565.9821066828728, 5.264308256567725], "isController": false}, {"data": ["jsURLs3_logiqids_sign_up", 200, 0, 0.0, 10.724999999999994, 2, 123, 5.0, 28.900000000000006, 39.94999999999999, 78.8900000000001, 22.665457842248415, 2008.119833869277, 7.193626756572983], "isController": false}, {"data": ["jsURLs16_logiqids_Login", 200, 0, 0.0, 5.01, 2, 87, 3.0, 4.0, 12.699999999999932, 60.88000000000011, 22.750540325332725, 432.65684542429756, 5.265505915140484], "isController": false}, {"data": ["cssURL1_logiqids_sign_up", 200, 0, 0.0, 5.7449999999999966, 3, 90, 4.0, 7.0, 16.94999999999999, 33.99000000000001, 22.740193291642978, 1284.6812375639568, 6.506715463331439], "isController": false}, {"data": ["jsURLs4_logiqids_Login", 200, 0, 0.0, 43.78499999999998, 19, 486, 29.5, 76.0, 97.94999999999999, 281.74000000000115, 22.55554302469832, 18914.348739532816, 7.290903067553851], "isController": false}, {"data": ["jsURLs10_logiqids_olympiad", 200, 0, 0.0, 25.524999999999988, 1, 280, 3.5, 72.80000000000001, 114.0, 211.93000000000006, 21.554046772281495, 258.08487242698567, 6.819835111542192], "isController": false}, {"data": ["jsURLs23_logiqids_olympiad", 200, 0, 0.0, 5.005, 1, 80, 2.0, 7.0, 24.549999999999898, 50.0, 21.699034392969512, 266.0531533104589, 6.865710100900509], "isController": false}, {"data": ["jsURLs13_logiqids_sign_up", 200, 0, 0.0, 19.92999999999999, 1, 141, 4.0, 71.9, 95.84999999999997, 120.96000000000004, 21.682567215958368, 137.43603219183652, 6.860499783174328], "isController": false}, {"data": ["jsURLs6_logiqids_olympiad", 200, 0, 0.0, 23.48999999999999, 2, 206, 5.5, 70.9, 100.64999999999992, 159.92000000000007, 21.374372127818745, 2568.063181308112, 6.867351982473015], "isController": false}, {"data": ["jsURLs2_logiqids_Login", 200, 0, 0.0, 18.60500000000001, 5, 119, 7.0, 57.10000000000005, 91.79999999999995, 117.97000000000003, 22.644927536231883, 3127.4389736894245, 7.297681725543478], "isController": false}, {"data": ["jsURLs7_logiqids_sign_up", 200, 0, 0.0, 75.64000000000003, 2, 545, 6.0, 404.2000000000001, 446.4999999999999, 535.9200000000001, 22.289089490694305, 214.97794163741221, 7.0524072216649945], "isController": false}, {"data": ["cssURL2_logiqids_Login", 200, 0, 0.0, 7.58, 2, 82, 4.0, 19.0, 26.0, 51.90000000000009, 22.729855665416522, 514.0758626690533, 4.572607682691215], "isController": false}, {"data": ["jsURLs15_logiqids_Login", 200, 0, 0.0, 7.18, 2, 84, 3.0, 8.800000000000011, 41.799999999999955, 76.92000000000007, 22.750540325332725, 278.9449525793425, 5.265505915140484], "isController": false}, {"data": ["jsURLs8_logiqids_olympiad", 200, 0, 0.0, 11.73, 1, 149, 3.0, 37.900000000000006, 50.94999999999999, 104.72000000000025, 21.360674997329916, 206.01609643677241, 6.758651073373919], "isController": false}, {"data": ["cssURL1_logiqids_Login", 200, 0, 0.0, 8.934999999999999, 3, 93, 6.0, 13.0, 22.899999999999977, 91.95000000000005, 22.740193291642978, 1284.6742422896532, 6.506715463331439], "isController": false}, {"data": ["jsURLs3_logiqids_Login", 200, 0, 0.0, 15.230000000000002, 4, 108, 5.0, 41.70000000000002, 85.0, 105.99000000000001, 22.660321776569226, 2007.6694345895648, 7.191996657602537], "isController": false}, {"data": ["jsURLs6_logiqids_sign_up", 200, 0, 0.0, 18.025000000000002, 2, 184, 4.0, 54.900000000000006, 70.84999999999997, 179.83000000000015, 22.331397945511387, 2683.0544380164138, 7.174833910227781], "isController": false}, {"data": ["jsURLs2_logiqids_olympiad", 200, 0, 0.0, 26.43999999999999, 2, 261, 6.0, 75.9, 117.0, 240.8900000000001, 21.551724137931036, 2976.4672641096445, 6.9453798491379315], "isController": false}, {"data": ["jsURLs10_logiqids_sign_up", 200, 0, 0.0, 21.659999999999993, 2, 518, 7.0, 50.900000000000006, 87.5499999999999, 414.97000000000276, 21.901007446342533, 765.9568302055957, 6.9296156373193165], "isController": false}, {"data": ["cssURL2_logiqids_olympiad", 200, 0, 0.0, 24.455, 1, 256, 3.0, 67.50000000000009, 222.99999999999955, 254.87000000000012, 21.75805047867711, 656.763566484443, 4.377107811140122], "isController": false}, {"data": ["jsURLs14_logiqids_olympiad", 200, 0, 0.0, 6.834999999999997, 1, 108, 3.0, 6.0, 22.749999999999943, 100.96000000000004, 21.736767742636673, 129.72923289588087, 6.856421856319965], "isController": false}, {"data": ["jsURLs15_logiqids_sign_up", 200, 0, 0.0, 10.915000000000003, 1, 103, 3.0, 32.80000000000001, 52.89999999999998, 100.85000000000014, 21.941854086670325, 491.53524410312673, 6.942539769610532], "isController": false}, {"data": ["jsURLs5_logiqids_HOME", 200, 0, 0.0, 57.87500000000001, 7, 864, 14.5, 171.4000000000001, 269.69999999999993, 477.7500000000002, 22.158209616662973, 1270.014337919621, 5.214969255484157], "isController": false}, {"data": ["jsURLs1_logiqids_sign_up", 200, 0, 0.0, 10.139999999999999, 2, 79, 3.0, 35.70000000000002, 53.799999999999955, 77.94000000000005, 22.673166307674865, 166.73002901456752, 7.240356818954767], "isController": false}, {"data": ["jsURLs10_logiqids_HOME", 200, 0, 0.0, 7.250000000000005, 3, 89, 4.0, 11.900000000000006, 26.94999999999999, 48.97000000000003, 23.108030040439054, 383.12087034228773, 5.348245233968805], "isController": false}, {"data": ["jsURLs14_logiqids_Login", 200, 0, 0.0, 4.119999999999999, 2, 39, 3.0, 4.0, 5.949999999999989, 36.98000000000002, 22.750540325332725, 509.66209226766006, 5.265505915140484], "isController": false}, {"data": ["logiqids_HOME", 200, 0, 0.0, 1468.3100000000006, 36, 3864, 558.5, 3700.0, 3723.9, 3745.9300000000003, 14.142271248762551, 34.00719046103804, 2.3340271885164756], "isController": false}, {"data": ["jsURLs13_logiqids_Login", 200, 0, 0.0, 4.144999999999999, 2, 55, 4.0, 5.0, 5.949999999999989, 19.90000000000009, 22.753128555176335, 799.6322614476679, 5.266104948805461], "isController": false}, {"data": ["cssURL1_logiqids_olympiad", 200, 0, 0.0, 15.02, 1, 185, 3.0, 29.80000000000001, 105.79999999999995, 178.8900000000001, 22.004620970403785, 1243.1236633911872, 6.296244086258114], "isController": false}, {"data": ["jsURLs25_logiqids_olympiad", 200, 0, 0.0, 6.814999999999998, 1, 75, 3.0, 14.0, 43.69999999999993, 71.99000000000001, 21.73913043478261, 1267.66845703125, 5.243716032608696], "isController": false}, {"data": ["jsURLs15_logiqids_olympiad", 200, 0, 0.0, 7.8199999999999985, 1, 147, 3.0, 8.0, 55.0, 123.5600000000004, 21.6076058772688, 284.1982565363008, 5.0009790946413135], "isController": false}, {"data": ["jsURLs9_logiqids_sign_up", 200, 0, 0.0, 25.859999999999996, 1, 455, 6.0, 61.30000000000004, 90.94999999999999, 438.7100000000012, 22.099447513812155, 264.62070528314916, 6.9924033149171265], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 18200, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
