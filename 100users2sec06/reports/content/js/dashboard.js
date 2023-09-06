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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9945604395604396, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "jsURLs12_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs17_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs19_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs26_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs4_logiqids_olympiad"], "isController": false}, {"data": [0.93, 500, 1500, "jsURLs5_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs12_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs16_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs21_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs4_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs27_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs18_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs17_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs20_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs14_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs22_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs5_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs12_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs19_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs19_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs17_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs5_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs18_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs18_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs16_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs4_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs12_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs24_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL3_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs16_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs4_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs23_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs15_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs14_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs15_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs5_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs14_logiqids_Login"], "isController": false}, {"data": [0.575, 500, 1500, "logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs25_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs15_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_sign_up"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 9100, 0, 0.0, 21.53846153846162, 1, 2429, 4.0, 13.0, 43.0, 281.96999999999935, 24.767633330157995, 4650.910318968333, 7.207103811425772], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["jsURLs12_logiqids_HOME", 100, 0, 0.0, 3.9799999999999995, 2, 43, 3.0, 5.0, 8.0, 43.0, 0.5427850299888729, 11.650567931242705, 0.1502730039080522], "isController": false}, {"data": ["jsURLs9_logiqids_HOME", 100, 0, 0.0, 3.1600000000000006, 2, 11, 3.0, 4.0, 5.0, 11.0, 0.542787976160752, 10.126086042410739, 0.1486836204229404], "isController": false}, {"data": ["jsURLs17_logiqids_Login", 100, 0, 0.0, 4.2799999999999985, 3, 15, 4.0, 5.900000000000006, 6.949999999999989, 14.97999999999999, 0.5430178761484827, 2.359455095136732, 0.15245863221942266], "isController": false}, {"data": ["jsURLs13_logiqids_olympiad", 100, 0, 0.0, 4.06, 3, 8, 4.0, 5.0, 6.0, 7.989999999999995, 0.5427378955880837, 13.50503609885428, 0.1717256622759171], "isController": false}, {"data": ["jsURLs19_logiqids_olympiad", 100, 0, 0.0, 4.11, 3, 7, 4.0, 5.0, 6.0, 7.0, 0.5427437869404991, 19.074173867632933, 0.17172752633664226], "isController": false}, {"data": ["cssURL2_logiqids_HOME", 100, 0, 0.0, 8.860000000000001, 2, 52, 5.0, 27.600000000000023, 35.89999999999998, 51.87999999999994, 0.5426996049146876, 24.254840583686992, 0.13223003068966266], "isController": false}, {"data": ["jsURLs26_logiqids_olympiad", 100, 0, 0.0, 7.409999999999996, 2, 21, 6.5, 15.0, 19.94999999999999, 21.0, 0.542740841248304, 11.649582343962008, 0.1733166553595658], "isController": false}, {"data": ["jsURLs4_logiqids_olympiad", 100, 0, 0.0, 28.3, 8, 166, 11.5, 87.20000000000016, 145.34999999999985, 165.99, 0.5428645878572048, 455.22885474572223, 0.17547673689524884], "isController": false}, {"data": ["jsURLs5_logiqids_Login", 100, 0, 0.0, 211.79999999999998, 12, 602, 101.0, 531.6, 547.0, 601.7499999999999, 0.5428380659765385, 1966.7869035312294, 0.15134791780888843], "isController": false}, {"data": ["jsURLs12_logiqids_Login", 100, 0, 0.0, 3.8699999999999988, 2, 9, 4.0, 5.0, 5.0, 8.969999999999985, 0.5431328991891026, 3.4426563679616766, 0.14877810373295242], "isController": false}, {"data": ["jsURLs16_logiqids_sign_up", 100, 0, 0.0, 4.33, 3, 22, 4.0, 5.0, 6.949999999999989, 21.969999999999985, 0.5429648050213385, 6.657453727521257, 0.1717974578387829], "isController": false}, {"data": ["jsURLs21_logiqids_olympiad", 100, 0, 0.0, 5.13, 3, 35, 4.0, 6.0, 6.0, 34.93999999999997, 0.5427467326646693, 46.06267668950274, 0.14893733581911336], "isController": false}, {"data": ["jsURLs4_logiqids_HOME", 100, 0, 0.0, 39.65, 5, 204, 18.0, 95.80000000000013, 179.0, 203.8099999999999, 0.5427644076812019, 455.14482035685404, 0.15212244629346186], "isController": false}, {"data": ["jsURLs3_logiqids_olympiad", 100, 0, 0.0, 5.1000000000000005, 4, 36, 5.0, 6.0, 7.0, 35.73999999999987, 0.5428999543964038, 48.09985440101848, 0.1723071144324524], "isController": false}, {"data": ["logiqids_Login", 100, 0, 0.0, 4.069999999999999, 2, 32, 3.0, 6.0, 8.0, 31.989999999999995, 0.5427938686004603, 1.718796010261518, 0.10071370608797603], "isController": false}, {"data": ["jsURLs27_logiqids_olympiad", 100, 0, 0.0, 2.7400000000000015, 1, 8, 2.0, 4.0, 5.0, 8.0, 0.5427467326646693, 0.2212858993041987, 0.1711984322760627], "isController": false}, {"data": ["jsURLs18_logiqids_sign_up", 100, 0, 0.0, 10.530000000000001, 2, 39, 7.5, 23.900000000000006, 29.899999999999977, 38.93999999999997, 0.5429412211833946, 11.653957600362686, 0.1733806438739942], "isController": false}, {"data": ["jsURLs8_logiqids_Login", 100, 0, 0.0, 2.6099999999999994, 1, 6, 2.5, 3.0, 4.0, 5.989999999999995, 0.5430267223450066, 3.666719003695297, 0.14821871962444272], "isController": false}, {"data": ["jsURLs17_logiqids_sign_up", 100, 0, 0.0, 8.110000000000001, 3, 29, 6.5, 13.0, 15.0, 28.97999999999999, 0.5429412211833946, 7.252522937569904, 0.15349754251229764], "isController": false}, {"data": ["jsURLs9_logiqids_olympiad", 100, 0, 0.0, 4.160000000000001, 3, 11, 4.0, 5.0, 6.949999999999989, 10.95999999999998, 0.5428498531591147, 3.665487608094977, 0.17123095954140044], "isController": false}, {"data": ["cssURL1_logiqids_HOME", 100, 0, 0.0, 79.76999999999998, 2, 248, 31.0, 226.50000000000003, 239.95, 247.98, 0.5424670315661565, 30.645906806537273, 0.1321733636481993], "isController": false}, {"data": ["jsURLs20_logiqids_olympiad", 100, 0, 0.0, 4.039999999999998, 3, 7, 4.0, 5.0, 6.0, 6.989999999999995, 0.5427437869404991, 8.295165653884146, 0.17172752633664226], "isController": false}, {"data": ["jsURLs13_logiqids_HOME", 100, 0, 0.0, 2.8300000000000005, 2, 7, 3.0, 4.0, 6.0, 7.0, 0.5427909223646143, 0.22126681125259862, 0.1486844274641351], "isController": false}, {"data": ["jsURLs8_logiqids_HOME", 100, 0, 0.0, 2.8299999999999996, 1, 6, 3.0, 4.0, 4.0, 6.0, 0.542787976160752, 8.295841031310724, 0.1486836204229404], "isController": false}, {"data": ["jsURLs7_logiqids_Login", 100, 0, 0.0, 2.9800000000000004, 2, 10, 3.0, 4.0, 5.949999999999989, 9.989999999999995, 0.5430237735808073, 5.2375120228857375, 0.14874821141544578], "isController": false}, {"data": ["jsURLs10_logiqids_Login", 100, 0, 0.0, 47.15000000000002, 3, 358, 8.0, 172.60000000000002, 211.1499999999998, 357.2999999999996, 0.5429913392881384, 18.99022594378682, 0.14873932682648713], "isController": false}, {"data": ["jsURLs3_logiqids_HOME", 100, 0, 0.0, 5.829999999999999, 2, 29, 4.0, 14.900000000000006, 18.899999999999977, 28.909999999999954, 0.5427585158811141, 48.08736033296878, 0.1489405692994073], "isController": false}, {"data": ["jsURLs14_logiqids_sign_up", 100, 0, 0.0, 4.199999999999998, 3, 10, 4.0, 5.0, 6.949999999999989, 9.989999999999995, 0.5429707013009578, 19.082222774430967, 0.17179932345850618], "isController": false}, {"data": ["jsURLs22_logiqids_olympiad", 100, 0, 0.0, 4.429999999999999, 3, 20, 4.0, 5.0, 6.949999999999989, 20.0, 0.5427526242089381, 12.158740047273753, 0.17173032250360928], "isController": false}, {"data": ["jsURLs11_logiqids_HOME", 100, 0, 0.0, 3.1199999999999997, 2, 7, 3.0, 4.900000000000006, 5.0, 7.0, 0.5427938686004603, 20.767924198497003, 0.1523957394752269], "isController": false}, {"data": ["jsURLs5_logiqids_olympiad", 100, 0, 0.0, 80.07000000000005, 17, 421, 50.0, 213.50000000000003, 232.89999999999998, 420.0299999999995, 0.5426966597020595, 1966.274455268228, 0.17489247822429654], "isController": false}, {"data": ["jsURLs12_logiqids_olympiad", 100, 0, 0.0, 3.7699999999999982, 3, 7, 4.0, 4.0, 5.0, 6.989999999999995, 0.5427378955880837, 4.550539244020385, 0.1717256622759171], "isController": false}, {"data": ["jsURLs19_logiqids_sign_up", 100, 0, 0.0, 4.710000000000003, 2, 17, 4.0, 8.0, 11.949999999999989, 17.0, 0.5429441690510964, 0.2212921664015289, 0.17126070957373452], "isController": false}, {"data": ["logiqids_olympiad", 100, 0, 0.0, 5.069999999999999, 3, 45, 4.0, 5.0, 8.949999999999989, 44.7999999999999, 0.5429677531451408, 2.0719946395508573, 0.10233669566114469], "isController": false}, {"data": ["jsURLs2_logiqids_sign_up", 100, 0, 0.0, 5.600000000000001, 4, 11, 5.0, 7.0, 9.0, 10.989999999999995, 0.5430267223450066, 74.99636002400179, 0.17499884606821503], "isController": false}, {"data": ["jsURLs19_logiqids_Login", 100, 0, 0.0, 3.8400000000000003, 3, 7, 4.0, 5.0, 6.0, 6.989999999999995, 0.5430178761484827, 0.22132220780208084, 0.17128395898042964], "isController": false}, {"data": ["jsURLs17_logiqids_olympiad", 100, 0, 0.0, 3.7900000000000005, 3, 7, 4.0, 4.0, 5.0, 6.97999999999999, 0.542740841248304, 3.440059998303935, 0.17172659430122117], "isController": false}, {"data": ["jsURLs8_logiqids_sign_up", 100, 0, 0.0, 3.880000000000001, 3, 8, 4.0, 5.0, 6.0, 7.97999999999999, 0.5429677531451408, 3.666432172468277, 0.17126814869714888], "isController": false}, {"data": ["jsURLs6_logiqids_Login", 100, 0, 0.0, 7.999999999999998, 2, 86, 3.0, 24.700000000000017, 50.29999999999984, 85.75999999999988, 0.542947116950809, 65.23341529855304, 0.1511132112607232], "isController": false}, {"data": ["jsURLs5_logiqids_sign_up", 100, 0, 0.0, 93.20999999999994, 17, 246, 67.5, 202.9, 234.64999999999992, 246.0, 0.5429353255440212, 1967.1391787560267, 0.17496939202102246], "isController": false}, {"data": ["jsURLs18_logiqids_Login", 100, 0, 0.0, 4.159999999999999, 3, 9, 4.0, 5.0, 6.949999999999989, 8.97999999999999, 0.5430178761484827, 11.655602960261952, 0.17340512255913465], "isController": false}, {"data": ["logiqids_sign_up", 100, 0, 0.0, 4.440000000000001, 3, 13, 4.0, 5.900000000000006, 9.949999999999989, 12.989999999999995, 0.5430208248486329, 1.6362956816268903, 0.10181640465911868], "isController": false}, {"data": ["jsURLs7_logiqids_HOME", 100, 0, 0.0, 3.2100000000000013, 2, 20, 3.0, 4.0, 5.0, 19.87999999999994, 0.5427850299888729, 33.17743282187152, 0.14868281339050668], "isController": false}, {"data": ["jsURLs18_logiqids_olympiad", 100, 0, 0.0, 4.08, 3, 7, 4.0, 5.0, 5.0, 6.989999999999995, 0.5427437869404991, 15.781743769640542, 0.14867151585625973], "isController": false}, {"data": ["jsURLs11_logiqids_sign_up", 100, 0, 0.0, 4.129999999999999, 3, 9, 4.0, 5.0, 6.0, 8.97999999999999, 0.5429648050213385, 4.5522932797246085, 0.1717974578387829], "isController": false}, {"data": ["jsURLs16_logiqids_olympiad", 100, 0, 0.0, 4.69, 3, 36, 4.0, 5.900000000000006, 6.0, 35.93999999999997, 0.542740841248304, 33.17484311397558, 0.17172659430122117], "isController": false}, {"data": ["jsURLs2_logiqids_HOME", 100, 0, 0.0, 8.780000000000003, 2, 54, 6.0, 18.0, 40.499999999999886, 53.91999999999996, 0.5427320043635653, 74.95561999838537, 0.15158335278123017], "isController": false}, {"data": ["jsURLs4_logiqids_sign_up", 100, 0, 0.0, 17.979999999999997, 7, 87, 11.0, 38.80000000000001, 73.69999999999993, 86.99, 0.5430119788442533, 455.3524521063435, 0.17552437988032019], "isController": false}, {"data": ["jsURLs9_logiqids_Login", 100, 0, 0.0, 7.840000000000001, 1, 39, 4.0, 15.800000000000011, 23.799999999999955, 38.909999999999954, 0.542997236144068, 6.501951778112324, 0.14874094212735456], "isController": false}, {"data": ["cssURL2_logiqids_sign_up", 100, 0, 0.0, 3.879999999999999, 3, 6, 4.0, 4.0, 5.0, 5.989999999999995, 0.5430267223450066, 11.704580396463811, 0.13230973361824136], "isController": false}, {"data": ["jsURLs1_logiqids_olympiad", 100, 0, 0.0, 3.9399999999999995, 3, 7, 4.0, 5.0, 6.0, 7.0, 0.5429087967512337, 3.992479186234004, 0.17337028958755218], "isController": false}, {"data": ["jsURLs7_logiqids_olympiad", 100, 0, 0.0, 3.930000000000001, 3, 10, 4.0, 4.900000000000006, 5.0, 9.949999999999974, 0.5428498531591147, 31.11386343526244, 0.17388159359002894], "isController": false}, {"data": ["jsURLs12_logiqids_sign_up", 100, 0, 0.0, 3.8800000000000003, 3, 9, 4.0, 5.0, 5.0, 8.95999999999998, 0.5429677531451408, 3.2406107725480933, 0.14820262402740902], "isController": false}, {"data": ["jsURLs11_logiqids_olympiad", 100, 0, 0.0, 5.439999999999999, 3, 45, 4.0, 6.0, 9.899999999999977, 44.89999999999995, 0.542740841248304, 18.981279681139757, 0.17172659430122117], "isController": false}, {"data": ["jsURLs1_logiqids_Login", 100, 0, 0.0, 3.2399999999999998, 2, 12, 3.0, 5.0, 5.0, 11.97999999999999, 0.5428056538636906, 3.9918320047034106, 0.17333735235686215], "isController": false}, {"data": ["jsURLs24_logiqids_olympiad", 100, 0, 0.0, 5.74, 3, 50, 4.0, 5.0, 7.0, 50.0, 0.5427526242089381, 28.241496762480594, 0.14867393661192102], "isController": false}, {"data": ["cssURL3_logiqids_Login", 100, 0, 0.0, 2.7600000000000007, 2, 9, 3.0, 4.0, 4.0, 8.969999999999985, 0.5428056538636906, 1.2872710293087912, 0.13199082794146383], "isController": false}, {"data": ["jsURLs11_logiqids_Login", 100, 0, 0.0, 4.400000000000003, 3, 15, 4.0, 5.900000000000006, 8.949999999999989, 14.989999999999995, 0.5431063510856695, 4.5534800218328755, 0.14877083152297882], "isController": false}, {"data": ["jsURLs1_logiqids_HOME", 100, 0, 0.0, 31.830000000000005, 2, 196, 3.0, 179.8, 185.95, 195.99, 0.542720222298203, 3.9911295347666575, 0.1502550615444732], "isController": false}, {"data": ["jsURLs6_logiqids_HOME", 100, 0, 0.0, 4.0900000000000025, 2, 37, 3.0, 4.900000000000006, 13.949999999999989, 36.89999999999995, 0.5427850299888729, 13.506320265218335, 0.14868281339050668], "isController": false}, {"data": ["jsURLs3_logiqids_sign_up", 100, 0, 0.0, 10.029999999999998, 3, 90, 5.0, 34.10000000000005, 55.24999999999983, 89.70999999999985, 0.5430355688297583, 48.11186956964431, 0.17235015612272603], "isController": false}, {"data": ["jsURLs16_logiqids_Login", 100, 0, 0.0, 6.710000000000001, 3, 49, 4.0, 12.700000000000017, 28.499999999999886, 49.0, 0.5430119788442533, 10.326581827832623, 0.14874498053302057], "isController": false}, {"data": ["cssURL1_logiqids_sign_up", 100, 0, 0.0, 9.200000000000003, 3, 76, 4.0, 9.900000000000006, 59.799999999999955, 75.94999999999997, 0.5430267223450066, 30.67748862359017, 0.15537776332723335], "isController": false}, {"data": ["jsURLs4_logiqids_Login", 100, 0, 0.0, 27.68000000000001, 4, 139, 8.0, 99.80000000000007, 122.89999999999998, 138.92999999999995, 0.5428616408535957, 455.22630396214356, 0.17547578429935562], "isController": false}, {"data": ["jsURLs10_logiqids_olympiad", 100, 0, 0.0, 4.339999999999997, 3, 15, 4.0, 5.900000000000006, 8.949999999999989, 14.969999999999985, 0.5428528000347426, 6.500259381853517, 0.17176201876099279], "isController": false}, {"data": ["jsURLs23_logiqids_olympiad", 100, 0, 0.0, 3.8200000000000007, 3, 6, 4.0, 5.0, 5.0, 6.0, 0.5427496784208156, 6.654704689899971, 0.17172939043783617], "isController": false}, {"data": ["jsURLs13_logiqids_sign_up", 100, 0, 0.0, 3.9, 3, 8, 4.0, 5.0, 5.0, 7.989999999999995, 0.5429707013009578, 3.441516922699976, 0.17179932345850618], "isController": false}, {"data": ["jsURLs6_logiqids_olympiad", 100, 0, 0.0, 5.230000000000002, 3, 48, 4.0, 6.0, 9.949999999999989, 47.71999999999986, 0.542720222298203, 65.20626590848651, 0.17437007142198124], "isController": false}, {"data": ["jsURLs2_logiqids_Login", 100, 0, 0.0, 4.250000000000001, 2, 18, 4.0, 6.0, 7.0, 17.969999999999985, 0.5428144931469671, 74.96693814459222, 0.17493045189306555], "isController": false}, {"data": ["jsURLs7_logiqids_sign_up", 100, 0, 0.0, 3.9399999999999995, 3, 11, 4.0, 5.0, 6.0, 10.989999999999995, 0.5429736494887903, 5.236917219594833, 0.17180025628356257], "isController": false}, {"data": ["cssURL2_logiqids_Login", 100, 0, 0.0, 15.979999999999993, 2, 159, 3.0, 59.00000000000006, 100.0, 158.63999999999982, 0.5427968148682903, 12.276309404022667, 0.1322537161226938], "isController": false}, {"data": ["jsURLs15_logiqids_Login", 100, 0, 0.0, 4.02, 3, 12, 4.0, 5.0, 5.949999999999989, 11.95999999999998, 0.5431387991201151, 6.659475735274149, 0.14877971987616434], "isController": false}, {"data": ["jsURLs8_logiqids_olympiad", 100, 0, 0.0, 4.03, 3, 10, 4.0, 5.0, 5.949999999999989, 9.97999999999999, 0.5428498531591147, 5.235871654009218, 0.17176108635112614], "isController": false}, {"data": ["cssURL1_logiqids_Login", 100, 0, 0.0, 3.38, 2, 13, 3.0, 4.900000000000006, 6.0, 12.97999999999999, 0.5427938686004603, 30.664371001983913, 0.15531113623040516], "isController": false}, {"data": ["jsURLs3_logiqids_Login", 100, 0, 0.0, 4.740000000000002, 2, 49, 3.0, 6.0, 11.749999999999943, 48.909999999999954, 0.5428616408535957, 48.09657122650088, 0.17229495437247908], "isController": false}, {"data": ["jsURLs6_logiqids_sign_up", 100, 0, 0.0, 5.1, 3, 34, 5.0, 6.0, 8.949999999999989, 33.76999999999988, 0.5429707013009578, 65.23636023662664, 0.17445054758595227], "isController": false}, {"data": ["jsURLs2_logiqids_olympiad", 100, 0, 0.0, 7.5200000000000005, 4, 78, 5.0, 7.900000000000006, 13.849999999999966, 77.89999999999995, 0.5429029018160102, 74.97925941257907, 0.17495894296805017], "isController": false}, {"data": ["jsURLs10_logiqids_sign_up", 100, 0, 0.0, 4.34, 3, 13, 4.0, 6.0, 9.0, 12.969999999999985, 0.5429677531451408, 18.989363940425577, 0.17179839064357968], "isController": false}, {"data": ["cssURL2_logiqids_olympiad", 100, 0, 0.0, 5.410000000000002, 3, 46, 4.0, 7.0, 10.899999999999977, 45.93999999999997, 0.54290584926762, 16.387719096441796, 0.13228028260963984], "isController": false}, {"data": ["jsURLs14_logiqids_olympiad", 100, 0, 0.0, 4.480000000000002, 2, 64, 4.0, 5.0, 5.0, 63.44999999999972, 0.5427437869404991, 3.239311169938507, 0.1711975031072082], "isController": false}, {"data": ["jsURLs15_logiqids_sign_up", 100, 0, 0.0, 3.8500000000000005, 3, 6, 4.0, 5.0, 5.0, 5.989999999999995, 0.5429677531451408, 12.16344801321312, 0.17179839064357968], "isController": false}, {"data": ["jsURLs5_logiqids_HOME", 100, 0, 0.0, 5.570000000000003, 2, 35, 3.0, 9.0, 31.94999999999999, 34.97999999999999, 0.5427791377410618, 31.109847429872936, 0.15080143035872273], "isController": false}, {"data": ["jsURLs1_logiqids_sign_up", 100, 0, 0.0, 4.29, 2, 9, 4.0, 6.0, 7.949999999999989, 9.0, 0.5430296711412311, 3.993368080444416, 0.17340888912420177], "isController": false}, {"data": ["jsURLs10_logiqids_HOME", 100, 0, 0.0, 3.0700000000000007, 2, 16, 3.0, 5.0, 5.949999999999989, 15.909999999999954, 0.542787976160752, 8.99923912151123, 0.1486836204229404], "isController": false}, {"data": ["jsURLs14_logiqids_Login", 100, 0, 0.0, 4.300000000000001, 3, 12, 4.0, 5.0, 6.949999999999989, 11.969999999999985, 0.5431328991891026, 12.167258964408502, 0.14877810373295242], "isController": false}, {"data": ["logiqids_HOME", 100, 0, 0.0, 908.3100000000004, 2, 2429, 435.0, 2336.3, 2395.5, 2428.95, 0.5353462351776012, 1.2874292757434622, 0.09671782569126583], "isController": false}, {"data": ["jsURLs13_logiqids_Login", 100, 0, 0.0, 4.480000000000002, 3, 11, 4.0, 5.0, 6.0, 10.97999999999999, 0.5431299492716627, 19.08770801877057, 0.1487772956745131], "isController": false}, {"data": ["cssURL1_logiqids_olympiad", 100, 0, 0.0, 4.84, 4, 9, 5.0, 6.0, 7.0, 8.989999999999995, 0.5429677531451408, 30.67415724617615, 0.15536089030422484], "isController": false}, {"data": ["jsURLs25_logiqids_olympiad", 100, 0, 0.0, 6.609999999999999, 3, 24, 5.0, 11.0, 13.0, 23.909999999999954, 0.542740841248304, 31.64872901119403, 0.15397091248303935], "isController": false}, {"data": ["jsURLs15_logiqids_olympiad", 100, 0, 0.0, 4.740000000000001, 3, 38, 4.0, 5.0, 6.0, 38.0, 0.5427496784208156, 7.138621151226342, 0.14867312968460816], "isController": false}, {"data": ["jsURLs9_logiqids_sign_up", 100, 0, 0.0, 4.0200000000000005, 3, 8, 4.0, 5.0, 6.899999999999977, 7.989999999999995, 0.5429677531451408, 6.501487392288772, 0.17179839064357968], "isController": false}]}, function(index, item){
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
