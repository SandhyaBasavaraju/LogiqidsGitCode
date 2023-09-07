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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9829670329670329, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "jsURLs12_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs17_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs19_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs26_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs4_logiqids_olympiad"], "isController": false}, {"data": [0.665, 500, 1500, "jsURLs5_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs12_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs16_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs21_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs4_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs27_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs18_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs17_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs20_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs14_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs22_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs5_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs12_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs19_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs19_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs17_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs5_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs18_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs18_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs16_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs4_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_olympiad"], "isController": false}, {"data": [0.87, 500, 1500, "jsURLs12_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs24_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL3_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs16_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs4_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs23_logiqids_olympiad"], "isController": false}, {"data": [0.915, 500, 1500, "jsURLs13_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs15_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs14_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs15_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs5_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs14_logiqids_Login"], "isController": false}, {"data": [0.0, 500, 1500, "logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs25_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs15_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_sign_up"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 9100, 0, 0.0, 78.02296703296702, 2, 4846, 4.0, 45.0, 218.9499999999989, 4317.969999999999, 92.49471458773785, 17368.822386563745, 25.165462943669702], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["jsURLs12_logiqids_HOME", 100, 0, 0.0, 7.209999999999999, 2, 47, 3.0, 25.0, 28.0, 46.93999999999997, 176.99115044247787, 3799.0009679203545, 41.482300884955755], "isController": false}, {"data": ["jsURLs9_logiqids_HOME", 100, 0, 0.0, 5.580000000000003, 2, 18, 4.0, 11.0, 15.0, 17.989999999999995, 177.3049645390071, 3307.759169991135, 41.03640292553192], "isController": false}, {"data": ["jsURLs17_logiqids_Login", 100, 0, 0.0, 5.85, 2, 33, 3.0, 14.0, 20.94999999999999, 32.93999999999997, 79.11392405063292, 343.7724053105222, 18.851364715189874], "isController": false}, {"data": ["jsURLs13_logiqids_olympiad", 100, 0, 0.0, 3.8499999999999996, 2, 9, 3.0, 5.0, 7.0, 9.0, 50.55611729019211, 1258.009984833165, 15.996271486349848], "isController": false}, {"data": ["jsURLs19_logiqids_olympiad", 100, 0, 0.0, 3.5899999999999994, 2, 13, 3.0, 4.0, 5.0, 12.97999999999999, 50.70993914807302, 1782.1626798618154, 16.04494168356998], "isController": false}, {"data": ["cssURL2_logiqids_HOME", 100, 0, 0.0, 91.42999999999998, 7, 195, 86.0, 160.9, 175.89999999999998, 194.93999999999997, 387.59689922480624, 17322.818253391473, 77.97359496124031], "isController": false}, {"data": ["jsURLs26_logiqids_olympiad", 100, 0, 0.0, 3.6799999999999997, 2, 14, 3.0, 4.0, 6.949999999999989, 13.989999999999995, 50.15045135406219, 1076.4402582748244, 16.014841399197593], "isController": false}, {"data": ["jsURLs4_logiqids_olympiad", 100, 0, 0.0, 37.480000000000004, 5, 247, 17.0, 94.00000000000006, 123.94999999999999, 246.82999999999993, 48.732943469785575, 40865.866380360625, 15.75254325048733], "isController": false}, {"data": ["jsURLs5_logiqids_Login", 100, 0, 0.0, 519.64, 20, 921, 651.5, 810.8, 841.1499999999999, 920.8199999999999, 70.6713780918728, 256053.41072217314, 16.63261925795053], "isController": false}, {"data": ["jsURLs12_logiqids_Login", 100, 0, 0.0, 3.73, 2, 9, 3.0, 5.0, 6.949999999999989, 9.0, 80.77544426494346, 511.9798503130049, 18.695097940226173], "isController": false}, {"data": ["jsURLs16_logiqids_sign_up", 100, 0, 0.0, 3.3000000000000003, 2, 7, 3.0, 4.0, 4.0, 6.989999999999995, 53.59056806002144, 657.07531568194, 16.956390675241156], "isController": false}, {"data": ["jsURLs21_logiqids_olympiad", 100, 0, 0.0, 4.93, 2, 49, 4.0, 5.0, 12.699999999999932, 48.89999999999995, 50.25125628140704, 4264.819213253769, 11.630417713567839], "isController": false}, {"data": ["jsURLs4_logiqids_HOME", 100, 0, 0.0, 113.40999999999998, 8, 251, 120.5, 225.8, 236.69999999999993, 250.88999999999993, 172.71157167530225, 144830.37497301382, 40.985265544041454], "isController": false}, {"data": ["jsURLs3_logiqids_olympiad", 100, 0, 0.0, 6.100000000000002, 3, 31, 4.0, 9.0, 15.949999999999989, 30.97999999999999, 53.99568034557235, 4783.928164653077, 17.137300890928724], "isController": false}, {"data": ["logiqids_Login", 100, 0, 0.0, 4.1000000000000005, 2, 10, 4.0, 6.900000000000006, 8.0, 9.989999999999995, 175.7469244288225, 556.50332271529, 29.863246924428825], "isController": false}, {"data": ["jsURLs27_logiqids_olympiad", 100, 0, 0.0, 3.8899999999999992, 2, 9, 3.0, 6.0, 8.0, 9.0, 50.15045135406219, 20.45051169132397, 15.818941198595788], "isController": false}, {"data": ["jsURLs18_logiqids_sign_up", 100, 0, 0.0, 5.140000000000002, 2, 25, 3.0, 10.800000000000011, 19.749999999999943, 24.989999999999995, 53.56186395286556, 1149.6708874531334, 17.104228039635778], "isController": false}, {"data": ["jsURLs8_logiqids_Login", 100, 0, 0.0, 3.4600000000000004, 2, 8, 3.0, 4.900000000000006, 6.0, 8.0, 80.77544426494346, 545.3817586328756, 18.616215670436187], "isController": false}, {"data": ["jsURLs17_logiqids_sign_up", 100, 0, 0.0, 3.669999999999999, 2, 11, 3.0, 5.0, 8.0, 11.0, 53.61930294906166, 716.2491621983914, 12.881199731903486], "isController": false}, {"data": ["jsURLs9_logiqids_olympiad", 100, 0, 0.0, 3.21, 2, 7, 3.0, 4.0, 4.0, 7.0, 50.377833753148614, 340.1630392002519, 15.890664357682619], "isController": false}, {"data": ["cssURL1_logiqids_HOME", 100, 0, 0.0, 346.36999999999995, 98, 474, 356.5, 433.20000000000005, 449.84999999999997, 473.88999999999993, 199.203187250996, 11253.7156063247, 40.07407868525896], "isController": false}, {"data": ["jsURLs20_logiqids_olympiad", 100, 0, 0.0, 10.019999999999998, 2, 69, 3.0, 35.0, 43.0, 68.95999999999998, 50.27652086475616, 768.400519262192, 15.907805429864252], "isController": false}, {"data": ["jsURLs13_logiqids_HOME", 100, 0, 0.0, 3.919999999999999, 2, 12, 3.0, 7.0, 8.0, 11.969999999999985, 176.67844522968198, 72.03442469081273, 41.06393551236749], "isController": false}, {"data": ["jsURLs8_logiqids_HOME", 100, 0, 0.0, 3.89, 2, 9, 3.0, 6.0, 8.0, 9.0, 176.99115044247787, 2705.0781250000005, 40.96377212389381], "isController": false}, {"data": ["jsURLs7_logiqids_Login", 100, 0, 0.0, 3.3299999999999996, 2, 7, 3.0, 4.0, 5.0, 7.0, 80.84074373484236, 779.7602882477768, 18.710211196443005], "isController": false}, {"data": ["jsURLs10_logiqids_Login", 100, 0, 0.0, 3.840000000000001, 2, 12, 3.0, 5.900000000000006, 7.0, 11.989999999999995, 80.77544426494346, 2824.94367805937, 18.695097940226173], "isController": false}, {"data": ["jsURLs3_logiqids_HOME", 100, 0, 0.0, 18.21000000000001, 3, 63, 14.5, 36.70000000000002, 52.0, 62.929999999999964, 271.73913043478257, 24075.582753057064, 62.89274796195652], "isController": false}, {"data": ["jsURLs14_logiqids_sign_up", 100, 0, 0.0, 14.030000000000001, 3, 215, 4.0, 7.900000000000006, 123.84999999999974, 214.2499999999996, 48.12319538017324, 1691.2304875481234, 15.226479788257942], "isController": false}, {"data": ["jsURLs22_logiqids_olympiad", 100, 0, 0.0, 3.4199999999999995, 2, 11, 3.0, 4.0, 5.949999999999989, 10.95999999999998, 50.27652086475616, 1126.2701695261437, 15.907805429864252], "isController": false}, {"data": ["jsURLs11_logiqids_HOME", 100, 0, 0.0, 6.120000000000002, 2, 32, 4.0, 9.900000000000006, 27.0, 31.989999999999995, 176.99115044247787, 6771.89919800885, 42.173672566371685], "isController": false}, {"data": ["jsURLs5_logiqids_olympiad", 100, 0, 0.0, 214.82999999999998, 14, 475, 232.5, 399.20000000000005, 453.49999999999966, 474.99, 48.56726566294318, 175966.77837770153, 15.65156022340942], "isController": false}, {"data": ["jsURLs12_logiqids_olympiad", 100, 0, 0.0, 3.1500000000000004, 2, 6, 3.0, 4.0, 4.949999999999989, 6.0, 50.58168942842691, 424.0943704160344, 16.004362670713203], "isController": false}, {"data": ["jsURLs19_logiqids_sign_up", 100, 0, 0.0, 4.080000000000001, 2, 31, 3.0, 6.0, 8.0, 30.949999999999974, 53.61930294906166, 21.843058813672922, 16.913119973190348], "isController": false}, {"data": ["logiqids_olympiad", 100, 0, 0.0, 3.8700000000000006, 2, 11, 3.0, 5.0, 7.949999999999989, 10.989999999999995, 53.96654074473827, 205.95033813410686, 9.328200890447922], "isController": false}, {"data": ["jsURLs2_logiqids_sign_up", 100, 0, 0.0, 10.620000000000003, 3, 42, 4.5, 34.0, 38.0, 41.989999999999995, 79.87220447284345, 11030.98869933107, 25.74006589456869], "isController": false}, {"data": ["jsURLs19_logiqids_Login", 100, 0, 0.0, 3.930000000000001, 2, 9, 3.0, 6.900000000000006, 7.949999999999989, 8.989999999999995, 79.05138339920948, 32.225018527667984, 24.93515316205534], "isController": false}, {"data": ["jsURLs17_logiqids_olympiad", 100, 0, 0.0, 3.459999999999999, 2, 9, 3.0, 4.900000000000006, 7.949999999999989, 9.0, 50.65856129685917, 321.1035453077508, 16.028685410334347], "isController": false}, {"data": ["jsURLs8_logiqids_sign_up", 100, 0, 0.0, 3.1299999999999994, 2, 6, 3.0, 4.0, 4.949999999999989, 5.989999999999995, 66.44518272425249, 448.65811877076413, 20.958783222591364], "isController": false}, {"data": ["jsURLs6_logiqids_Login", 100, 0, 0.0, 16.26, 2, 297, 4.0, 6.900000000000006, 167.6999999999997, 296.4999999999998, 71.83908045977012, 8631.22348127694, 16.907439834770116], "isController": false}, {"data": ["jsURLs5_logiqids_sign_up", 100, 0, 0.0, 195.28000000000003, 19, 404, 184.0, 366.1, 380.0, 403.99, 61.95786864931846, 224483.00030978932, 19.966891263940518], "isController": false}, {"data": ["jsURLs18_logiqids_Login", 100, 0, 0.0, 5.300000000000001, 3, 26, 4.0, 10.900000000000006, 16.94999999999999, 25.969999999999985, 79.11392405063292, 1698.1347965288767, 25.263919106012658], "isController": false}, {"data": ["logiqids_sign_up", 100, 0, 0.0, 4.04, 2, 10, 4.0, 5.900000000000006, 6.949999999999989, 10.0, 79.05138339920948, 238.18552371541503, 13.58695652173913], "isController": false}, {"data": ["jsURLs7_logiqids_HOME", 100, 0, 0.0, 5.65, 2, 36, 4.0, 13.800000000000011, 18.94999999999999, 35.989999999999995, 177.3049645390071, 10837.679382757093, 41.03640292553192], "isController": false}, {"data": ["jsURLs18_logiqids_olympiad", 100, 0, 0.0, 3.4100000000000006, 2, 7, 3.0, 4.0, 5.0, 6.989999999999995, 50.68423720223011, 1473.7674425050684, 11.730629118094273], "isController": false}, {"data": ["jsURLs11_logiqids_sign_up", 100, 0, 0.0, 4.320000000000001, 2, 25, 3.0, 7.900000000000006, 15.949999999999989, 24.929999999999964, 65.91957811470006, 552.683519075478, 20.85736651285432], "isController": false}, {"data": ["jsURLs16_logiqids_olympiad", 100, 0, 0.0, 3.61, 2, 7, 3.0, 5.0, 5.0, 6.989999999999995, 50.65856129685917, 3096.4694346821175, 16.028685410334347], "isController": false}, {"data": ["jsURLs2_logiqids_HOME", 100, 0, 0.0, 71.78000000000002, 7, 192, 61.5, 153.8, 167.64999999999992, 191.8099999999999, 291.5451895043732, 40264.69683855685, 68.90032798833819], "isController": false}, {"data": ["jsURLs4_logiqids_sign_up", 100, 0, 0.0, 61.83, 5, 287, 27.5, 195.50000000000014, 228.4999999999999, 286.5599999999998, 68.72852233676977, 57633.540727018895, 22.21595790378007], "isController": false}, {"data": ["jsURLs9_logiqids_Login", 100, 0, 0.0, 3.9200000000000017, 2, 12, 3.0, 6.900000000000006, 8.0, 11.97999999999999, 80.84074373484236, 968.041064571544, 18.710211196443005], "isController": false}, {"data": ["cssURL2_logiqids_sign_up", 100, 0, 0.0, 4.740000000000002, 2, 34, 3.0, 7.0, 11.949999999999989, 33.89999999999995, 79.55449482895784, 1714.7171154037392, 16.004126889419254], "isController": false}, {"data": ["jsURLs1_logiqids_olympiad", 100, 0, 0.0, 4.29, 2, 31, 4.0, 6.900000000000006, 7.949999999999989, 30.779999999999887, 54.08328826392644, 397.7361073553272, 17.2707375608437], "isController": false}, {"data": ["jsURLs7_logiqids_olympiad", 100, 0, 0.0, 4.2200000000000015, 2, 37, 3.0, 7.900000000000006, 10.899999999999977, 36.75999999999988, 50.35246727089628, 2885.99788362286, 16.128524672708963], "isController": false}, {"data": ["jsURLs12_logiqids_sign_up", 100, 0, 0.0, 169.89000000000001, 2, 759, 3.0, 645.0, 688.95, 758.8699999999999, 48.146364949446316, 287.35010682474723, 11.096232546942707], "isController": false}, {"data": ["jsURLs11_logiqids_olympiad", 100, 0, 0.0, 3.75, 2, 16, 3.0, 5.0, 6.0, 15.969999999999985, 50.530570995452244, 1767.2025999557857, 15.988188479029812], "isController": false}, {"data": ["jsURLs1_logiqids_Login", 100, 0, 0.0, 3.599999999999999, 2, 15, 3.0, 5.0, 5.949999999999989, 14.95999999999998, 175.7469244288225, 1292.4435687609844, 56.12230887521969], "isController": false}, {"data": ["jsURLs24_logiqids_olympiad", 100, 0, 0.0, 4.890000000000001, 2, 51, 3.0, 6.0, 16.0, 50.74999999999987, 50.22601707684581, 2613.4279060459567, 11.624576217980913], "isController": false}, {"data": ["cssURL3_logiqids_Login", 100, 0, 0.0, 5.620000000000003, 2, 40, 3.0, 13.500000000000028, 24.0, 39.93999999999997, 175.43859649122805, 416.06702302631584, 35.293311403508774], "isController": false}, {"data": ["jsURLs11_logiqids_Login", 100, 0, 0.0, 3.65, 2, 11, 3.0, 5.900000000000006, 7.0, 10.989999999999995, 80.84074373484236, 677.8077948160873, 18.710211196443005], "isController": false}, {"data": ["jsURLs1_logiqids_HOME", 100, 0, 0.0, 11.91, 3, 44, 7.0, 29.900000000000006, 32.0, 43.929999999999964, 361.01083032490976, 2654.875056407942, 84.61191335740071], "isController": false}, {"data": ["jsURLs6_logiqids_HOME", 100, 0, 0.0, 5.73, 2, 47, 4.0, 10.0, 15.899999999999977, 46.969999999999985, 177.3049645390071, 4411.93276263298, 41.03640292553192], "isController": false}, {"data": ["jsURLs3_logiqids_sign_up", 100, 0, 0.0, 11.139999999999995, 3, 46, 5.0, 30.900000000000006, 35.94999999999999, 45.989999999999995, 79.74481658692186, 7065.237334280303, 25.309634170653908], "isController": false}, {"data": ["jsURLs16_logiqids_Login", 100, 0, 0.0, 4.240000000000004, 2, 14, 4.0, 6.900000000000006, 9.0, 14.0, 79.05138339920948, 1503.31645256917, 18.29607213438735], "isController": false}, {"data": ["cssURL1_logiqids_sign_up", 100, 0, 0.0, 3.9700000000000006, 2, 9, 4.0, 5.0, 7.0, 8.989999999999995, 79.42811755361399, 4487.200748361795, 22.72699066719619], "isController": false}, {"data": ["jsURLs4_logiqids_Login", 100, 0, 0.0, 62.64, 5, 150, 55.0, 128.9, 136.0, 149.91999999999996, 147.71048744460856, 123865.26899464549, 47.74626107828656], "isController": false}, {"data": ["jsURLs10_logiqids_olympiad", 100, 0, 0.0, 3.120000000000001, 2, 6, 3.0, 4.0, 4.0, 6.0, 50.47955577990914, 604.4586659199899, 15.972046945986875], "isController": false}, {"data": ["jsURLs23_logiqids_olympiad", 100, 0, 0.0, 3.2000000000000006, 2, 5, 3.0, 4.0, 4.949999999999989, 5.0, 50.22601707684581, 615.8499380022602, 15.891825715720742], "isController": false}, {"data": ["jsURLs13_logiqids_sign_up", 100, 0, 0.0, 196.29000000000002, 2, 675, 87.5, 521.6, 543.55, 673.8399999999995, 48.12319538017324, 305.0362051852743, 15.226479788257942], "isController": false}, {"data": ["jsURLs6_logiqids_olympiad", 100, 0, 0.0, 8.559999999999997, 2, 168, 3.0, 20.900000000000006, 30.94999999999999, 167.11999999999955, 49.77600796416127, 5980.429862493778, 15.99248693379791], "isController": false}, {"data": ["jsURLs2_logiqids_Login", 100, 0, 0.0, 7.419999999999997, 3, 39, 4.0, 17.0, 27.0, 38.989999999999995, 171.23287671232876, 23648.614752782534, 55.18247003424658], "isController": false}, {"data": ["jsURLs7_logiqids_sign_up", 100, 0, 0.0, 3.2899999999999987, 2, 19, 3.0, 4.0, 5.949999999999989, 18.91999999999996, 66.44518272425249, 640.874169435216, 21.023671096345517], "isController": false}, {"data": ["cssURL2_logiqids_Login", 100, 0, 0.0, 3.749999999999999, 2, 12, 3.0, 5.0, 6.949999999999989, 11.989999999999995, 175.7469244288225, 3974.815328427065, 35.35533831282953], "isController": false}, {"data": ["jsURLs15_logiqids_Login", 100, 0, 0.0, 6.410000000000002, 2, 35, 4.0, 13.0, 26.749999999999943, 34.97999999999999, 79.05138339920948, 969.2726346343874, 18.29607213438735], "isController": false}, {"data": ["jsURLs8_logiqids_olympiad", 100, 0, 0.0, 4.710000000000002, 2, 37, 3.0, 7.0, 12.849999999999966, 36.969999999999985, 50.377833753148614, 485.90552188287154, 15.939861460957179], "isController": false}, {"data": ["cssURL1_logiqids_Login", 100, 0, 0.0, 4.049999999999999, 2, 30, 3.0, 5.900000000000006, 7.0, 29.829999999999913, 176.67844522968198, 9981.21066143993, 50.553500441696116], "isController": false}, {"data": ["jsURLs3_logiqids_Login", 100, 0, 0.0, 7.509999999999998, 3, 38, 4.0, 19.600000000000023, 30.94999999999999, 37.969999999999985, 170.06802721088434, 15067.711654974491, 53.97666879251701], "isController": false}, {"data": ["jsURLs6_logiqids_sign_up", 100, 0, 0.0, 9.840000000000002, 2, 105, 3.0, 25.400000000000034, 50.19999999999982, 104.88999999999994, 66.05019815059445, 7935.726835989101, 21.221206241743726], "isController": false}, {"data": ["jsURLs2_logiqids_olympiad", 100, 0, 0.0, 9.419999999999998, 3, 50, 5.0, 30.80000000000001, 36.74999999999994, 49.929999999999964, 54.02485143165856, 7461.259327728255, 17.41035251215559], "isController": false}, {"data": ["jsURLs10_logiqids_sign_up", 100, 0, 0.0, 5.269999999999999, 2, 32, 3.5, 8.0, 20.899999999999977, 31.989999999999995, 65.87615283267458, 2303.887207674572, 20.843626482213438], "isController": false}, {"data": ["cssURL2_logiqids_olympiad", 100, 0, 0.0, 3.7200000000000006, 2, 9, 4.0, 5.0, 6.0, 9.0, 54.08328826392644, 1632.4961338899404, 10.880036506219579], "isController": false}, {"data": ["jsURLs14_logiqids_olympiad", 100, 0, 0.0, 3.3399999999999994, 2, 8, 3.0, 5.0, 5.949999999999989, 8.0, 50.58168942842691, 301.87438748735457, 15.954966489630753], "isController": false}, {"data": ["jsURLs15_logiqids_sign_up", 100, 0, 0.0, 3.350000000000001, 2, 9, 3.0, 4.0, 4.0, 8.97999999999999, 53.61930294906166, 1201.18653652815, 16.965482573726543], "isController": false}, {"data": ["jsURLs5_logiqids_HOME", 100, 0, 0.0, 5.079999999999998, 3, 21, 4.0, 9.700000000000017, 15.949999999999989, 20.969999999999985, 176.99115044247787, 10144.410259955754, 41.65514380530974], "isController": false}, {"data": ["jsURLs1_logiqids_sign_up", 100, 0, 0.0, 3.5799999999999996, 2, 10, 3.0, 5.0, 5.949999999999989, 9.989999999999995, 79.80845969672785, 586.9226356743816, 25.485709297685556], "isController": false}, {"data": ["jsURLs10_logiqids_HOME", 100, 0, 0.0, 3.520000000000002, 2, 6, 3.0, 4.900000000000006, 5.0, 6.0, 177.3049645390071, 2939.643589317376, 41.03640292553192], "isController": false}, {"data": ["jsURLs14_logiqids_Login", 100, 0, 0.0, 7.57, 2, 43, 4.0, 27.100000000000108, 34.89999999999998, 42.989999999999995, 79.11392405063292, 1772.293283969541, 18.310546875], "isController": false}, {"data": ["logiqids_HOME", 100, 0, 0.0, 4603.96, 4228, 4846, 4668.0, 4825.0, 4829.9, 4845.96, 20.631318341242007, 49.613888100887145, 3.4049734371776355], "isController": false}, {"data": ["jsURLs13_logiqids_Login", 100, 0, 0.0, 4.129999999999999, 2, 9, 4.0, 5.900000000000006, 7.0, 8.989999999999995, 80.71025020177562, 2836.4900184120256, 18.680009079903147], "isController": false}, {"data": ["cssURL1_logiqids_olympiad", 100, 0, 0.0, 4.630000000000002, 2, 28, 4.0, 5.0, 6.949999999999989, 27.87999999999994, 54.054054054054056, 3053.7109375, 15.466638513513512], "isController": false}, {"data": ["jsURLs25_logiqids_olympiad", 100, 0, 0.0, 3.9599999999999995, 2, 34, 3.5, 4.0, 5.0, 33.76999999999988, 50.22601707684581, 2928.842878892516, 12.115064665996986], "isController": false}, {"data": ["jsURLs15_logiqids_olympiad", 100, 0, 0.0, 4.01, 2, 33, 3.0, 4.900000000000006, 7.949999999999989, 32.969999999999985, 50.607287449392715, 665.63952982667, 11.712819458502024], "isController": false}, {"data": ["jsURLs9_logiqids_sign_up", 100, 0, 0.0, 3.25, 2, 8, 3.0, 4.0, 4.949999999999989, 7.989999999999995, 66.5335994677312, 796.6904732202263, 21.051646706586826], "isController": false}]}, function(index, item){
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
