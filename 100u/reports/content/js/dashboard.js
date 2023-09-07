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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9867582417582418, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "jsURLs12_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs17_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs19_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs26_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs4_logiqids_olympiad"], "isController": false}, {"data": [0.81, 500, 1500, "jsURLs5_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs12_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs16_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs21_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs4_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs27_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs18_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs17_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs20_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs14_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs22_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs5_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs12_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs19_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs19_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs17_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_Login"], "isController": false}, {"data": [0.985, 500, 1500, "jsURLs5_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs18_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs18_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs16_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs4_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs12_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs24_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL3_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs16_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs4_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs23_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs15_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs14_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs15_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs5_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs14_logiqids_Login"], "isController": false}, {"data": [0.0, 500, 1500, "logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs25_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs15_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_sign_up"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 9100, 0, 0.0, 70.59703296703292, 2, 5142, 4.0, 27.0, 105.94999999999891, 4472.949999999999, 92.86661904275947, 17438.65919832381, 25.266648701398104], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["jsURLs12_logiqids_HOME", 100, 0, 0.0, 4.440000000000003, 3, 12, 4.0, 6.0, 8.949999999999989, 11.97999999999999, 102.24948875255623, 2194.719373082822, 23.96472392638037], "isController": false}, {"data": ["jsURLs9_logiqids_HOME", 100, 0, 0.0, 5.459999999999997, 3, 17, 4.0, 10.0, 13.949999999999989, 16.989999999999995, 101.41987829614604, 1892.0650830375255, 23.47315542596349], "isController": false}, {"data": ["jsURLs17_logiqids_Login", 100, 0, 0.0, 6.81, 3, 66, 4.0, 6.900000000000006, 41.0, 65.99, 65.78947368421052, 285.86490028782896, 15.67639802631579], "isController": false}, {"data": ["jsURLs13_logiqids_olympiad", 100, 0, 0.0, 4.32, 3, 27, 4.0, 5.0, 5.0, 26.989999999999995, 47.415836889521096, 1179.881979018492, 15.002667140825036], "isController": false}, {"data": ["jsURLs19_logiqids_olympiad", 100, 0, 0.0, 4.500000000000001, 3, 41, 4.0, 5.0, 10.0, 40.75999999999988, 47.43833017077799, 1667.2006567243832, 15.009784155597723], "isController": false}, {"data": ["cssURL2_logiqids_HOME", 100, 0, 0.0, 29.080000000000002, 6, 87, 16.5, 76.0, 81.94999999999999, 86.97999999999999, 143.88489208633092, 6430.628934352519, 28.94559352517986], "isController": false}, {"data": ["jsURLs26_logiqids_olympiad", 100, 0, 0.0, 4.790000000000001, 3, 40, 4.0, 5.900000000000006, 10.0, 39.81999999999991, 46.79457182966776, 1004.3993295215255, 14.943188465138045], "isController": false}, {"data": ["jsURLs4_logiqids_olympiad", 100, 0, 0.0, 31.93000000000001, 6, 124, 16.0, 86.0, 97.84999999999997, 123.87999999999994, 49.140049140049136, 41207.26159398034, 15.884136977886977], "isController": false}, {"data": ["jsURLs5_logiqids_Login", 100, 0, 0.0, 369.19, 18, 748, 399.0, 666.9, 694.75, 747.6499999999999, 61.387354205033766, 222415.95028103897, 14.44760972989564], "isController": false}, {"data": ["jsURLs12_logiqids_Login", 100, 0, 0.0, 3.9800000000000004, 3, 11, 4.0, 5.0, 5.0, 10.97999999999999, 66.22516556291392, 419.7692466887417, 15.327504139072847], "isController": false}, {"data": ["jsURLs16_logiqids_sign_up", 100, 0, 0.0, 5.68, 3, 62, 4.0, 6.0, 11.849999999999966, 61.909999999999954, 50.787201625190455, 622.7205275520569, 16.069388014220415], "isController": false}, {"data": ["jsURLs21_logiqids_olympiad", 100, 0, 0.0, 4.01, 3, 10, 4.0, 5.0, 6.0, 9.989999999999995, 47.415836889521096, 4024.1742050438597, 10.974173186344238], "isController": false}, {"data": ["jsURLs4_logiqids_HOME", 100, 0, 0.0, 93.71999999999998, 9, 306, 87.0, 197.9, 219.79999999999995, 305.2399999999996, 100.6036217303823, 84362.9648987676, 23.87371101609658], "isController": false}, {"data": ["jsURLs3_logiqids_olympiad", 100, 0, 0.0, 5.919999999999997, 3, 42, 5.0, 7.900000000000006, 9.949999999999989, 41.91999999999996, 49.382716049382715, 4375.213638117284, 15.673225308641976], "isController": false}, {"data": ["logiqids_Login", 100, 0, 0.0, 5.33, 3, 29, 4.0, 9.0, 10.0, 28.909999999999954, 102.24948875255623, 323.77340554703477, 17.374424846625768], "isController": false}, {"data": ["jsURLs27_logiqids_olympiad", 100, 0, 0.0, 4.700000000000001, 3, 40, 4.0, 6.0, 12.899999999999977, 39.73999999999987, 46.81647940074907, 19.090973929073034, 14.767307467228463], "isController": false}, {"data": ["jsURLs18_logiqids_sign_up", 100, 0, 0.0, 4.22, 3, 11, 4.0, 6.0, 8.949999999999989, 11.0, 50.735667174023334, 1089.0014586504312, 16.201721841704718], "isController": false}, {"data": ["jsURLs8_logiqids_Login", 100, 0, 0.0, 4.09, 2, 14, 4.0, 5.0, 7.0, 13.95999999999998, 66.3129973474801, 447.7882284068302, 15.283073607427056], "isController": false}, {"data": ["jsURLs17_logiqids_sign_up", 100, 0, 0.0, 3.96, 2, 27, 4.0, 5.0, 5.0, 26.819999999999908, 50.787201625190455, 678.4143481780092, 12.200831640426612], "isController": false}, {"data": ["jsURLs9_logiqids_olympiad", 100, 0, 0.0, 3.71, 2, 22, 3.0, 4.0, 5.0, 21.87999999999994, 46.992481203007515, 317.3364624941259, 14.822823660714285], "isController": false}, {"data": ["cssURL1_logiqids_HOME", 100, 0, 0.0, 277.97, 9, 478, 319.5, 422.5, 441.6499999999999, 477.95, 168.63406408094437, 9526.75418950253, 33.92443086003373], "isController": false}, {"data": ["jsURLs20_logiqids_olympiad", 100, 0, 0.0, 3.7899999999999987, 3, 9, 4.0, 5.0, 6.0, 9.0, 47.43833017077799, 725.023070594165, 15.009784155597723], "isController": false}, {"data": ["jsURLs13_logiqids_HOME", 100, 0, 0.0, 7.379999999999999, 3, 37, 4.0, 22.80000000000001, 27.0, 36.969999999999985, 102.3541453428864, 41.731304375639716, 23.789342374616172], "isController": false}, {"data": ["jsURLs8_logiqids_HOME", 100, 0, 0.0, 8.76, 2, 80, 4.0, 20.0, 34.499999999999886, 79.91999999999996, 101.5228426395939, 1551.6437975888325, 23.496986040609137], "isController": false}, {"data": ["jsURLs7_logiqids_Login", 100, 0, 0.0, 3.930000000000002, 2, 15, 4.0, 5.0, 6.949999999999989, 14.949999999999974, 66.3129973474801, 639.5629559018568, 15.347832393899203], "isController": false}, {"data": ["jsURLs10_logiqids_Login", 100, 0, 0.0, 8.870000000000003, 3, 72, 4.0, 28.0, 43.94999999999999, 71.86999999999993, 66.26905235255136, 2317.6507362077537, 15.33766153081511], "isController": false}, {"data": ["jsURLs3_logiqids_HOME", 100, 0, 0.0, 11.630000000000003, 3, 54, 7.0, 24.900000000000006, 38.69999999999993, 53.97999999999999, 142.2475106685633, 12602.865509423898, 32.92251955903272], "isController": false}, {"data": ["jsURLs14_logiqids_sign_up", 100, 0, 0.0, 9.160000000000007, 3, 54, 5.0, 18.0, 29.899999999999977, 53.82999999999991, 50.63291139240506, 1779.4486748417721, 16.020569620253163], "isController": false}, {"data": ["jsURLs22_logiqids_olympiad", 100, 0, 0.0, 4.159999999999999, 3, 32, 4.0, 5.0, 6.0, 31.789999999999893, 46.772684752104766, 1047.7853316475678, 14.79916978484565], "isController": false}, {"data": ["jsURLs11_logiqids_HOME", 100, 0, 0.0, 4.65, 3, 21, 4.0, 6.0, 7.0, 20.89999999999995, 102.04081632653062, 3904.2071906887754, 24.314413265306122], "isController": false}, {"data": ["jsURLs5_logiqids_olympiad", 100, 0, 0.0, 73.33000000000001, 19, 194, 58.0, 139.50000000000003, 151.0, 193.91999999999996, 45.06534474988734, 163278.76040375733, 14.523011491662912], "isController": false}, {"data": ["jsURLs12_logiqids_olympiad", 100, 0, 0.0, 4.32, 3, 39, 4.0, 5.0, 5.949999999999989, 38.86999999999993, 47.415836889521096, 397.5215964319583, 15.002667140825036], "isController": false}, {"data": ["jsURLs19_logiqids_sign_up", 100, 0, 0.0, 3.6599999999999997, 3, 7, 3.5, 4.0, 5.949999999999989, 7.0, 50.76142131979695, 20.706595019035532, 16.01165926395939], "isController": false}, {"data": ["logiqids_olympiad", 100, 0, 0.0, 4.160000000000001, 3, 8, 4.0, 5.0, 6.0, 7.989999999999995, 50.735667174023334, 193.58580273338407, 8.769739345509892], "isController": false}, {"data": ["jsURLs2_logiqids_sign_up", 100, 0, 0.0, 7.379999999999998, 3, 38, 5.0, 14.900000000000006, 27.64999999999992, 37.949999999999974, 63.65372374283895, 8791.100165101847, 20.513407065563335], "isController": false}, {"data": ["jsURLs19_logiqids_Login", 100, 0, 0.0, 4.1, 2, 19, 4.0, 5.0, 6.949999999999989, 18.969999999999985, 65.06180871828236, 26.535560344827587, 20.522425992192584], "isController": false}, {"data": ["jsURLs17_logiqids_olympiad", 100, 0, 0.0, 3.659999999999999, 3, 7, 4.0, 4.0, 5.0, 6.989999999999995, 47.43833017077799, 300.7048112843928, 15.009784155597723], "isController": false}, {"data": ["jsURLs8_logiqids_sign_up", 100, 0, 0.0, 4.19, 2, 11, 4.0, 6.0, 8.0, 11.0, 51.59958720330237, 348.44435307017545, 16.276041666666668], "isController": false}, {"data": ["jsURLs6_logiqids_Login", 100, 0, 0.0, 20.190000000000005, 3, 310, 5.0, 67.70000000000002, 107.19999999999982, 308.46999999999923, 62.65664160401002, 7528.0229382048865, 14.746338502506266], "isController": false}, {"data": ["jsURLs5_logiqids_sign_up", 100, 0, 0.0, 189.71999999999997, 16, 536, 151.5, 415.9, 455.95, 535.7599999999999, 48.426150121065376, 175455.4914497579, 15.60608353510896], "isController": false}, {"data": ["jsURLs18_logiqids_Login", 100, 0, 0.0, 4.939999999999999, 2, 32, 4.0, 8.700000000000017, 13.949999999999989, 31.869999999999933, 65.14657980456026, 1398.3427066368079, 20.80364413680782], "isController": false}, {"data": ["logiqids_sign_up", 100, 0, 0.0, 4.140000000000001, 3, 10, 4.0, 5.0, 6.949999999999989, 9.97999999999999, 65.01950585175553, 195.91126361345903, 11.175227568270481], "isController": false}, {"data": ["jsURLs7_logiqids_HOME", 100, 0, 0.0, 5.179999999999997, 3, 22, 4.0, 9.0, 13.0, 21.95999999999998, 101.5228426395939, 6205.53418464467, 23.496986040609137], "isController": false}, {"data": ["jsURLs18_logiqids_olympiad", 100, 0, 0.0, 3.8800000000000017, 2, 8, 4.0, 5.0, 5.949999999999989, 7.989999999999995, 47.43833017077799, 1379.3718312677893, 10.97937915085389], "isController": false}, {"data": ["jsURLs11_logiqids_sign_up", 100, 0, 0.0, 3.94, 3, 9, 4.0, 5.0, 6.0, 9.0, 51.51983513652756, 431.935455306543, 16.301197836166924], "isController": false}, {"data": ["jsURLs16_logiqids_olympiad", 100, 0, 0.0, 5.319999999999999, 3, 40, 4.0, 7.0, 15.949999999999989, 39.87999999999994, 47.393364928909946, 2896.873611522512, 14.995556872037916], "isController": false}, {"data": ["jsURLs2_logiqids_HOME", 100, 0, 0.0, 7.9899999999999975, 4, 33, 6.0, 12.800000000000011, 24.0, 32.949999999999974, 143.47202295552367, 19814.621256276903, 33.90647417503587], "isController": false}, {"data": ["jsURLs4_logiqids_sign_up", 100, 0, 0.0, 67.77, 6, 264, 31.5, 196.0, 209.95, 263.77999999999986, 56.98005698005698, 47781.64229433761, 18.418358262108264], "isController": false}, {"data": ["jsURLs9_logiqids_Login", 100, 0, 0.0, 4.169999999999999, 3, 11, 4.0, 6.0, 9.0, 10.97999999999999, 66.26905235255136, 793.504597415507, 15.33766153081511], "isController": false}, {"data": ["cssURL2_logiqids_sign_up", 100, 0, 0.0, 5.1800000000000015, 3, 27, 4.0, 8.0, 14.799999999999955, 26.95999999999998, 64.76683937823833, 1395.9885038860102, 13.029266515544041], "isController": false}, {"data": ["jsURLs1_logiqids_olympiad", 100, 0, 0.0, 5.19, 3, 59, 4.0, 6.900000000000006, 16.799999999999955, 58.66999999999983, 49.800796812749, 366.24546734935257, 15.903184138446216], "isController": false}, {"data": ["jsURLs7_logiqids_olympiad", 100, 0, 0.0, 5.8400000000000025, 3, 48, 4.0, 6.0, 18.799999999999955, 47.95999999999998, 46.970408642555185, 2692.1777756575857, 15.04520901831846], "isController": false}, {"data": ["jsURLs12_logiqids_sign_up", 100, 0, 0.0, 7.409999999999999, 3, 51, 4.0, 25.30000000000004, 35.799999999999955, 50.95999999999998, 50.8130081300813, 303.2861725101626, 11.710810467479675], "isController": false}, {"data": ["jsURLs11_logiqids_olympiad", 100, 0, 0.0, 4.129999999999999, 2, 12, 4.0, 5.0, 7.949999999999989, 11.989999999999995, 47.415836889521096, 1658.3133297771456, 15.002667140825036], "isController": false}, {"data": ["jsURLs1_logiqids_Login", 100, 0, 0.0, 4.4300000000000015, 3, 15, 4.0, 6.0, 6.0, 14.989999999999995, 102.56410256410255, 754.2568108974359, 32.75240384615385], "isController": false}, {"data": ["jsURLs24_logiqids_olympiad", 100, 0, 0.0, 4.4300000000000015, 3, 25, 4.0, 5.0, 8.849999999999966, 24.989999999999995, 46.79457182966776, 2434.8783158341134, 10.830384300421152], "isController": false}, {"data": ["cssURL3_logiqids_Login", 100, 0, 0.0, 4.199999999999999, 3, 11, 4.0, 5.0, 8.0, 10.989999999999995, 102.6694045174538, 243.48891491273102, 20.65419661190965], "isController": false}, {"data": ["jsURLs11_logiqids_Login", 100, 0, 0.0, 9.960000000000003, 3, 67, 4.0, 35.0, 54.0, 66.91999999999996, 66.26905235255136, 555.5954636762757, 15.33766153081511], "isController": false}, {"data": ["jsURLs1_logiqids_HOME", 100, 0, 0.0, 5.35, 3, 23, 4.0, 7.0, 9.0, 22.989999999999995, 143.88489208633092, 1058.1300584532376, 33.723021582733814], "isController": false}, {"data": ["jsURLs6_logiqids_HOME", 100, 0, 0.0, 4.239999999999999, 3, 11, 4.0, 6.0, 6.949999999999989, 10.97999999999999, 101.5228426395939, 2526.223429568528, 23.496986040609137], "isController": false}, {"data": ["jsURLs3_logiqids_sign_up", 100, 0, 0.0, 9.639999999999999, 3, 64, 5.0, 21.900000000000006, 45.94999999999999, 63.97999999999999, 63.051702395964696, 5586.250911294136, 20.01152663934426], "isController": false}, {"data": ["jsURLs16_logiqids_Login", 100, 0, 0.0, 4.09, 2, 11, 4.0, 7.0, 7.0, 10.989999999999995, 66.3129973474801, 1261.0847614804377, 15.347832393899203], "isController": false}, {"data": ["cssURL1_logiqids_sign_up", 100, 0, 0.0, 5.459999999999998, 3, 36, 4.0, 9.900000000000006, 19.699999999999932, 35.889999999999944, 64.9772579597141, 3670.802621426251, 18.59212556855101], "isController": false}, {"data": ["jsURLs4_logiqids_Login", 100, 0, 0.0, 41.919999999999995, 8, 153, 18.5, 125.0, 140.0, 152.95, 101.01010101010101, 84703.82536300505, 32.65072601010101], "isController": false}, {"data": ["jsURLs10_logiqids_olympiad", 100, 0, 0.0, 3.89, 3, 17, 4.0, 5.0, 5.0, 16.93999999999997, 47.415836889521096, 567.737042140825, 15.002667140825036], "isController": false}, {"data": ["jsURLs23_logiqids_olympiad", 100, 0, 0.0, 4.519999999999999, 2, 31, 4.0, 5.0, 6.0, 30.889999999999944, 46.772684752104766, 573.5066541452292, 14.79916978484565], "isController": false}, {"data": ["jsURLs13_logiqids_sign_up", 100, 0, 0.0, 15.31, 3, 57, 12.0, 38.900000000000006, 49.849999999999966, 56.95999999999998, 50.65856129685917, 321.0793043946302, 16.028685410334347], "isController": false}, {"data": ["jsURLs6_logiqids_olympiad", 100, 0, 0.0, 10.889999999999999, 3, 72, 5.0, 31.0, 40.74999999999994, 71.76999999999988, 45.80852038479157, 5503.7456517693545, 14.717776568941824], "isController": false}, {"data": ["jsURLs2_logiqids_Login", 100, 0, 0.0, 10.910000000000004, 4, 52, 7.0, 23.0, 30.94999999999999, 51.91999999999996, 102.14504596527068, 14107.03883107763, 32.91783707865169], "isController": false}, {"data": ["jsURLs7_logiqids_sign_up", 100, 0, 0.0, 4.560000000000003, 3, 15, 4.0, 7.0, 8.949999999999989, 14.989999999999995, 51.70630816959669, 498.6871445191313, 16.360199069286452], "isController": false}, {"data": ["cssURL2_logiqids_Login", 100, 0, 0.0, 4.3999999999999995, 3, 11, 4.0, 6.0, 7.0, 11.0, 102.6694045174538, 2322.0430409394253, 20.65419661190965], "isController": false}, {"data": ["jsURLs15_logiqids_Login", 100, 0, 0.0, 4.15, 3, 11, 4.0, 5.0, 7.0, 10.989999999999995, 66.26905235255136, 812.5310636182903, 15.33766153081511], "isController": false}, {"data": ["jsURLs8_logiqids_olympiad", 100, 0, 0.0, 5.840000000000002, 2, 57, 4.0, 8.900000000000006, 22.899999999999977, 56.77999999999989, 47.014574518100616, 453.42756449811947, 14.875705218617773], "isController": false}, {"data": ["cssURL1_logiqids_Login", 100, 0, 0.0, 6.069999999999998, 3, 29, 5.0, 9.900000000000006, 19.749999999999943, 28.97999999999999, 102.45901639344262, 5788.284051613729, 29.316886526639344], "isController": false}, {"data": ["jsURLs3_logiqids_Login", 100, 0, 0.0, 5.670000000000002, 3, 16, 5.0, 9.900000000000006, 12.0, 16.0, 102.14504596527068, 9049.861545582227, 32.419081971399386], "isController": false}, {"data": ["jsURLs6_logiqids_sign_up", 100, 0, 0.0, 19.229999999999993, 3, 126, 7.0, 47.200000000000045, 82.74999999999994, 125.90999999999995, 50.9683995922528, 6123.705880479103, 16.375589322120284], "isController": false}, {"data": ["jsURLs2_logiqids_olympiad", 100, 0, 0.0, 6.070000000000001, 4, 25, 5.5, 8.900000000000006, 9.949999999999989, 24.869999999999933, 49.77600796416127, 6874.467241164759, 16.041096316575413], "isController": false}, {"data": ["jsURLs10_logiqids_sign_up", 100, 0, 0.0, 4.4, 3, 9, 4.0, 6.0, 8.0, 9.0, 51.57297576070139, 1803.690288164002, 16.318011861784424], "isController": false}, {"data": ["cssURL2_logiqids_olympiad", 100, 0, 0.0, 7.410000000000002, 3, 46, 4.0, 17.50000000000003, 37.849999999999966, 45.97999999999999, 49.72650422675286, 1500.9872459286423, 10.003574092491297], "isController": false}, {"data": ["jsURLs14_logiqids_olympiad", 100, 0, 0.0, 3.74, 3, 9, 4.0, 4.0, 5.0, 8.989999999999995, 47.415836889521096, 282.9739175853485, 14.956362612612613], "isController": false}, {"data": ["jsURLs15_logiqids_sign_up", 100, 0, 0.0, 5.1499999999999995, 3, 66, 4.0, 6.0, 10.0, 65.52999999999976, 50.65856129685917, 1134.8353794642858, 16.028685410334347], "isController": false}, {"data": ["jsURLs5_logiqids_HOME", 100, 0, 0.0, 6.82, 3, 53, 4.0, 9.900000000000006, 29.0, 52.989999999999995, 101.5228426395939, 5818.874920685279, 23.893559644670052], "isController": false}, {"data": ["jsURLs1_logiqids_sign_up", 100, 0, 0.0, 5.109999999999999, 2, 38, 4.0, 7.0, 9.949999999999989, 37.929999999999964, 63.69426751592356, 468.40789211783436, 20.339868630573246], "isController": false}, {"data": ["jsURLs10_logiqids_HOME", 100, 0, 0.0, 4.6899999999999995, 3, 34, 4.0, 6.900000000000006, 9.0, 33.86999999999993, 102.56410256410255, 1700.4707532051282, 23.73798076923077], "isController": false}, {"data": ["jsURLs14_logiqids_Login", 100, 0, 0.0, 4.409999999999998, 3, 11, 4.0, 6.0, 7.949999999999989, 10.97999999999999, 66.22516556291392, 1483.5665873344371, 15.327504139072847], "isController": false}, {"data": ["logiqids_HOME", 100, 0, 0.0, 4776.029999999999, 4333, 5142, 4804.5, 5035.7, 5047.95, 5141.4, 19.353590090961873, 46.5412261708922, 3.194098364621637], "isController": false}, {"data": ["jsURLs13_logiqids_Login", 100, 0, 0.0, 4.269999999999997, 3, 12, 4.0, 6.0, 7.0, 11.95999999999998, 66.18133686300463, 2325.8797464427535, 15.317360191925879], "isController": false}, {"data": ["cssURL1_logiqids_olympiad", 100, 0, 0.0, 4.599999999999997, 3, 30, 4.0, 6.0, 7.0, 29.809999999999903, 50.0751126690035, 2828.9362755070106, 14.328132824236354], "isController": false}, {"data": ["jsURLs25_logiqids_olympiad", 100, 0, 0.0, 4.170000000000001, 3, 16, 4.0, 5.0, 6.0, 15.95999999999998, 46.79457182966776, 2728.744114120262, 11.287362540945251], "isController": false}, {"data": ["jsURLs15_logiqids_olympiad", 100, 0, 0.0, 4.0299999999999985, 3, 10, 4.0, 6.0, 7.0, 9.989999999999995, 47.415836889521096, 623.6719861308677, 10.974173186344238], "isController": false}, {"data": ["jsURLs9_logiqids_sign_up", 100, 0, 0.0, 4.339999999999999, 3, 15, 4.0, 5.900000000000006, 7.0, 14.97999999999999, 51.59958720330237, 617.8385416666666, 16.326431888544892], "isController": false}]}, function(index, item){
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
