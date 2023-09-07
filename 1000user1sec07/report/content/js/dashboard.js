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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8352967032967032, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.934, 500, 1500, "jsURLs12_logiqids_HOME"], "isController": false}, {"data": [0.9465, 500, 1500, "jsURLs9_logiqids_HOME"], "isController": false}, {"data": [0.9045, 500, 1500, "jsURLs17_logiqids_Login"], "isController": false}, {"data": [0.957, 500, 1500, "jsURLs13_logiqids_olympiad"], "isController": false}, {"data": [0.972, 500, 1500, "jsURLs19_logiqids_olympiad"], "isController": false}, {"data": [0.944, 500, 1500, "cssURL2_logiqids_HOME"], "isController": false}, {"data": [0.989, 500, 1500, "jsURLs26_logiqids_olympiad"], "isController": false}, {"data": [0.414, 500, 1500, "jsURLs4_logiqids_olympiad"], "isController": false}, {"data": [0.0125, 500, 1500, "jsURLs5_logiqids_Login"], "isController": false}, {"data": [0.8825, 500, 1500, "jsURLs12_logiqids_Login"], "isController": false}, {"data": [0.8565, 500, 1500, "jsURLs16_logiqids_sign_up"], "isController": false}, {"data": [0.9785, 500, 1500, "jsURLs21_logiqids_olympiad"], "isController": false}, {"data": [0.255, 500, 1500, "jsURLs4_logiqids_HOME"], "isController": false}, {"data": [0.8125, 500, 1500, "jsURLs3_logiqids_olympiad"], "isController": false}, {"data": [0.9375, 500, 1500, "logiqids_Login"], "isController": false}, {"data": [0.9925, 500, 1500, "jsURLs27_logiqids_olympiad"], "isController": false}, {"data": [0.8675, 500, 1500, "jsURLs18_logiqids_sign_up"], "isController": false}, {"data": [0.86, 500, 1500, "jsURLs8_logiqids_Login"], "isController": false}, {"data": [0.858, 500, 1500, "jsURLs17_logiqids_sign_up"], "isController": false}, {"data": [0.9195, 500, 1500, "jsURLs9_logiqids_olympiad"], "isController": false}, {"data": [0.9115, 500, 1500, "cssURL1_logiqids_HOME"], "isController": false}, {"data": [0.9755, 500, 1500, "jsURLs20_logiqids_olympiad"], "isController": false}, {"data": [0.952, 500, 1500, "jsURLs13_logiqids_HOME"], "isController": false}, {"data": [0.9495, 500, 1500, "jsURLs8_logiqids_HOME"], "isController": false}, {"data": [0.861, 500, 1500, "jsURLs7_logiqids_Login"], "isController": false}, {"data": [0.855, 500, 1500, "jsURLs10_logiqids_Login"], "isController": false}, {"data": [0.804, 500, 1500, "jsURLs3_logiqids_HOME"], "isController": false}, {"data": [0.843, 500, 1500, "jsURLs14_logiqids_sign_up"], "isController": false}, {"data": [0.9765, 500, 1500, "jsURLs22_logiqids_olympiad"], "isController": false}, {"data": [0.9355, 500, 1500, "jsURLs11_logiqids_HOME"], "isController": false}, {"data": [0.221, 500, 1500, "jsURLs5_logiqids_olympiad"], "isController": false}, {"data": [0.9485, 500, 1500, "jsURLs12_logiqids_olympiad"], "isController": false}, {"data": [0.881, 500, 1500, "jsURLs19_logiqids_sign_up"], "isController": false}, {"data": [0.846, 500, 1500, "logiqids_olympiad"], "isController": false}, {"data": [0.773, 500, 1500, "jsURLs2_logiqids_sign_up"], "isController": false}, {"data": [0.8795, 500, 1500, "jsURLs19_logiqids_Login"], "isController": false}, {"data": [0.9655, 500, 1500, "jsURLs17_logiqids_olympiad"], "isController": false}, {"data": [0.8525, 500, 1500, "jsURLs8_logiqids_sign_up"], "isController": false}, {"data": [0.6385, 500, 1500, "jsURLs6_logiqids_Login"], "isController": false}, {"data": [0.0285, 500, 1500, "jsURLs5_logiqids_sign_up"], "isController": false}, {"data": [0.876, 500, 1500, "jsURLs18_logiqids_Login"], "isController": false}, {"data": [0.8695, 500, 1500, "logiqids_sign_up"], "isController": false}, {"data": [0.921, 500, 1500, "jsURLs7_logiqids_HOME"], "isController": false}, {"data": [0.973, 500, 1500, "jsURLs18_logiqids_olympiad"], "isController": false}, {"data": [0.8365, 500, 1500, "jsURLs11_logiqids_sign_up"], "isController": false}, {"data": [0.95, 500, 1500, "jsURLs16_logiqids_olympiad"], "isController": false}, {"data": [0.7985, 500, 1500, "jsURLs2_logiqids_HOME"], "isController": false}, {"data": [0.259, 500, 1500, "jsURLs4_logiqids_sign_up"], "isController": false}, {"data": [0.8865, 500, 1500, "jsURLs9_logiqids_Login"], "isController": false}, {"data": [0.876, 500, 1500, "cssURL2_logiqids_sign_up"], "isController": false}, {"data": [0.8635, 500, 1500, "jsURLs1_logiqids_olympiad"], "isController": false}, {"data": [0.894, 500, 1500, "jsURLs7_logiqids_olympiad"], "isController": false}, {"data": [0.836, 500, 1500, "jsURLs12_logiqids_sign_up"], "isController": false}, {"data": [0.9335, 500, 1500, "jsURLs11_logiqids_olympiad"], "isController": false}, {"data": [0.9355, 500, 1500, "jsURLs1_logiqids_Login"], "isController": false}, {"data": [0.987, 500, 1500, "jsURLs24_logiqids_olympiad"], "isController": false}, {"data": [0.9535, 500, 1500, "cssURL3_logiqids_Login"], "isController": false}, {"data": [0.866, 500, 1500, "jsURLs11_logiqids_Login"], "isController": false}, {"data": [0.952, 500, 1500, "jsURLs1_logiqids_HOME"], "isController": false}, {"data": [0.9655, 500, 1500, "jsURLs6_logiqids_HOME"], "isController": false}, {"data": [0.8155, 500, 1500, "jsURLs3_logiqids_sign_up"], "isController": false}, {"data": [0.873, 500, 1500, "jsURLs16_logiqids_Login"], "isController": false}, {"data": [0.8505, 500, 1500, "cssURL1_logiqids_sign_up"], "isController": false}, {"data": [0.302, 500, 1500, "jsURLs4_logiqids_Login"], "isController": false}, {"data": [0.9405, 500, 1500, "jsURLs10_logiqids_olympiad"], "isController": false}, {"data": [0.9915, 500, 1500, "jsURLs23_logiqids_olympiad"], "isController": false}, {"data": [0.8595, 500, 1500, "jsURLs13_logiqids_sign_up"], "isController": false}, {"data": [0.7805, 500, 1500, "jsURLs6_logiqids_olympiad"], "isController": false}, {"data": [0.864, 500, 1500, "jsURLs2_logiqids_Login"], "isController": false}, {"data": [0.824, 500, 1500, "jsURLs7_logiqids_sign_up"], "isController": false}, {"data": [0.911, 500, 1500, "cssURL2_logiqids_Login"], "isController": false}, {"data": [0.8845, 500, 1500, "jsURLs15_logiqids_Login"], "isController": false}, {"data": [0.9155, 500, 1500, "jsURLs8_logiqids_olympiad"], "isController": false}, {"data": [0.9205, 500, 1500, "cssURL1_logiqids_Login"], "isController": false}, {"data": [0.86, 500, 1500, "jsURLs3_logiqids_Login"], "isController": false}, {"data": [0.5985, 500, 1500, "jsURLs6_logiqids_sign_up"], "isController": false}, {"data": [0.795, 500, 1500, "jsURLs2_logiqids_olympiad"], "isController": false}, {"data": [0.811, 500, 1500, "jsURLs10_logiqids_sign_up"], "isController": false}, {"data": [0.87, 500, 1500, "cssURL2_logiqids_olympiad"], "isController": false}, {"data": [0.9575, 500, 1500, "jsURLs14_logiqids_olympiad"], "isController": false}, {"data": [0.845, 500, 1500, "jsURLs15_logiqids_sign_up"], "isController": false}, {"data": [0.931, 500, 1500, "jsURLs5_logiqids_HOME"], "isController": false}, {"data": [0.8485, 500, 1500, "jsURLs1_logiqids_sign_up"], "isController": false}, {"data": [0.9565, 500, 1500, "jsURLs10_logiqids_HOME"], "isController": false}, {"data": [0.888, 500, 1500, "jsURLs14_logiqids_Login"], "isController": false}, {"data": [0.5735, 500, 1500, "logiqids_HOME"], "isController": false}, {"data": [0.8665, 500, 1500, "jsURLs13_logiqids_Login"], "isController": false}, {"data": [0.861, 500, 1500, "cssURL1_logiqids_olympiad"], "isController": false}, {"data": [0.987, 500, 1500, "jsURLs25_logiqids_olympiad"], "isController": false}, {"data": [0.958, 500, 1500, "jsURLs15_logiqids_olympiad"], "isController": false}, {"data": [0.849, 500, 1500, "jsURLs9_logiqids_sign_up"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 91000, 0, 0.0, 828.0469120879235, 1, 38487, 6.0, 225.0, 415.8000000000029, 2192.0, 320.2545143569043, 60137.96343423697, 87.13312051951617], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["jsURLs12_logiqids_HOME", 1000, 0, 0.0, 216.69099999999995, 2, 2845, 27.0, 451.0, 1871.949999999997, 2698.82, 9.754384595875846, 209.37177838586882, 2.2861838896584015], "isController": false}, {"data": ["jsURLs9_logiqids_HOME", 1000, 0, 0.0, 189.09000000000017, 2, 3030, 32.0, 425.0, 711.0999999999988, 2684.9300000000003, 10.124326732272305, 188.8782728468088, 2.343227964402867], "isController": false}, {"data": ["jsURLs17_logiqids_Login", 1000, 0, 0.0, 334.78800000000024, 2, 5184, 126.5, 646.8999999999995, 2114.499999999999, 2793.9700000000003, 6.331959298165632, 27.51316082899594, 1.5087871765160292], "isController": false}, {"data": ["jsURLs13_logiqids_olympiad", 1000, 0, 0.0, 138.57599999999994, 1, 2615, 18.0, 345.9, 591.8999999999999, 2055.96, 11.743429551166123, 292.21633333064216, 3.715694506423656], "isController": false}, {"data": ["jsURLs19_logiqids_olympiad", 1000, 0, 0.0, 97.18799999999992, 1, 2586, 8.0, 251.0, 486.0, 1933.1800000000007, 14.163704091894111, 497.77011566877474, 4.481484497825872], "isController": false}, {"data": ["cssURL2_logiqids_HOME", 1000, 0, 0.0, 166.80200000000028, 1, 3419, 39.0, 439.69999999999993, 753.0, 2080.96, 11.453835316755814, 511.9046287454041, 2.304189526612986], "isController": false}, {"data": ["jsURLs26_logiqids_olympiad", 1000, 0, 0.0, 40.87299999999998, 1, 2212, 4.0, 44.69999999999993, 131.89999999999986, 1050.97, 15.713387806411061, 337.2768821692332, 5.017849426461345], "isController": false}, {"data": ["jsURLs4_logiqids_olympiad", 1000, 0, 0.0, 2509.2779999999957, 8, 16584, 1085.0, 6525.6, 7837.399999999983, 11200.590000000004, 8.16106681465401, 6843.606790810944, 2.6380010895024197], "isController": false}, {"data": ["jsURLs5_logiqids_Login", 1000, 0, 0.0, 13205.432999999992, 332, 38487, 11731.0, 23323.7, 26111.199999999997, 31882.24, 6.966310920388999, 25240.030168208108, 1.639532159974364], "isController": false}, {"data": ["jsURLs12_logiqids_Login", 1000, 0, 0.0, 380.90899999999976, 2, 7589, 109.0, 760.9999999999998, 2202.7, 3127.1000000000017, 6.332721170286873, 40.139489315512, 1.465678630232411], "isController": false}, {"data": ["jsURLs16_logiqids_sign_up", 1000, 0, 0.0, 400.1790000000004, 1, 3628, 179.0, 1024.5999999999983, 2162.95, 2860.7700000000004, 7.286611579883123, 89.34347145788703, 2.3055294451973944], "isController": false}, {"data": ["jsURLs21_logiqids_olympiad", 1000, 0, 0.0, 84.39200000000005, 2, 2378, 9.0, 240.89999999999998, 350.89999999999986, 1091.5100000000004, 14.758187104296109, 1252.5213584403916, 3.415713226287283], "isController": false}, {"data": ["jsURLs4_logiqids_HOME", 1000, 0, 0.0, 2948.359999999994, 7, 10925, 2794.5, 5957.7, 6830.899999999997, 8477.96, 10.140033867713118, 8503.106860826134, 2.406277568217078], "isController": false}, {"data": ["jsURLs3_logiqids_olympiad", 1000, 0, 0.0, 470.31199999999916, 2, 3113, 230.0, 1903.6999999999985, 2395.0, 2766.95, 8.032902769744876, 711.7005551614412, 2.5495052736006683], "isController": false}, {"data": ["logiqids_Login", 1000, 0, 0.0, 201.11, 2, 3085, 27.0, 451.5999999999999, 844.8499999999984, 2536.4200000000005, 9.546812796547872, 30.229497921181515, 1.622212330663408], "isController": false}, {"data": ["jsURLs27_logiqids_olympiad", 1000, 0, 0.0, 31.256999999999916, 1, 2129, 3.0, 38.89999999999998, 110.89999999999986, 511.0, 16.235084016559785, 6.6212824194333955, 5.121027477879698], "isController": false}, {"data": ["jsURLs18_logiqids_sign_up", 1000, 0, 0.0, 377.2680000000003, 2, 3290, 164.0, 873.9, 2104.4499999999994, 2754.9700000000003, 7.417462189486488, 159.21140004830622, 2.3686622421504704], "isController": false}, {"data": ["jsURLs8_logiqids_Login", 1000, 0, 0.0, 459.15499999999946, 2, 7639, 169.0, 1209.2999999999993, 2425.9499999999957, 3596.8600000000038, 6.7145638890754045, 45.340663136624585, 1.547497146310347], "isController": false}, {"data": ["jsURLs17_logiqids_sign_up", 1000, 0, 0.0, 390.4139999999997, 1, 3410, 165.5, 829.8, 2165.499999999998, 2783.8500000000004, 7.399624099095766, 98.84381740595079, 1.7776440706812096], "isController": false}, {"data": ["jsURLs9_logiqids_olympiad", 1000, 0, 0.0, 233.63599999999997, 1, 3173, 33.0, 566.3999999999999, 1928.349999999995, 2678.83, 10.635695521308616, 71.81705623225169, 3.3548141146315267], "isController": false}, {"data": ["cssURL1_logiqids_HOME", 1000, 0, 0.0, 282.0820000000001, 2, 3374, 88.5, 740.8, 1392.0499999999947, 2743.3200000000015, 11.738466956215518, 663.1486305427574, 2.361449407207419], "isController": false}, {"data": ["jsURLs20_logiqids_olympiad", 1000, 0, 0.0, 86.58500000000006, 1, 2488, 6.5, 221.89999999999998, 355.0, 1904.95, 14.332807797047442, 219.0579174206321, 4.534989967034543], "isController": false}, {"data": ["jsURLs13_logiqids_HOME", 1000, 0, 0.0, 168.83300000000014, 2, 2969, 29.0, 322.9, 612.7999999999997, 2349.91, 9.69405560510295, 3.951217543090077, 2.2531105800922875], "isController": false}, {"data": ["jsURLs8_logiqids_HOME", 1000, 0, 0.0, 197.51199999999986, 2, 3448, 43.0, 417.5999999999999, 643.8499999999998, 2563.1800000000007, 10.118794649181389, 154.65191227827194, 2.3419475897031146], "isController": false}, {"data": ["jsURLs7_logiqids_Login", 1000, 0, 0.0, 461.2459999999998, 2, 5829, 140.5, 1141.5, 2550.8999999999996, 5546.100000000002, 6.7282978752035305, 64.89419646461587, 1.5572330043195672], "isController": false}, {"data": ["jsURLs10_logiqids_Login", 1000, 0, 0.0, 473.2940000000001, 2, 7572, 174.5, 1765.0, 2434.8999999999996, 5221.560000000001, 6.472240560237143, 226.35420635970448, 1.4979697390392606], "isController": false}, {"data": ["jsURLs3_logiqids_HOME", 1000, 0, 0.0, 452.7140000000001, 2, 4943, 262.0, 986.4999999999999, 1485.8999999999999, 2768.6600000000003, 11.108765927193149, 984.2159732424543, 2.57107180150857], "isController": false}, {"data": ["jsURLs14_logiqids_sign_up", 1000, 0, 0.0, 435.3950000000003, 2, 3659, 209.5, 1083.2999999999997, 2237.549999999998, 2974.92, 7.019317160826595, 246.68771173112154, 2.2209558204177897], "isController": false}, {"data": ["jsURLs22_logiqids_olympiad", 1000, 0, 0.0, 78.86700000000003, 1, 2505, 4.0, 186.69999999999993, 345.8499999999998, 2013.930000000001, 15.109848599317036, 338.4890576365175, 4.780850533377655], "isController": false}, {"data": ["jsURLs11_logiqids_HOME", 1000, 0, 0.0, 210.364, 3, 5174, 36.0, 475.9, 761.9499999999999, 2739.91, 9.717984101378011, 371.82149794221687, 2.315613399156479], "isController": false}, {"data": ["jsURLs5_logiqids_olympiad", 1000, 0, 0.0, 8558.707000000011, 27, 35385, 6228.0, 20731.699999999997, 24234.75, 30129.24, 8.711408460519896, 31562.789518215555, 2.8073874921597324], "isController": false}, {"data": ["jsURLs12_logiqids_olympiad", 1000, 0, 0.0, 160.75, 1, 2762, 19.0, 430.0999999999998, 613.5999999999995, 2412.4900000000025, 11.467363882390716, 96.14414816837531, 3.6283456034126877], "isController": false}, {"data": ["jsURLs19_logiqids_sign_up", 1000, 0, 0.0, 349.81700000000063, 1, 3145, 153.5, 718.1999999999998, 2067.6499999999996, 2755.0, 7.530007078206654, 3.0702500833007034, 2.375187779551513], "isController": false}, {"data": ["logiqids_olympiad", 1000, 0, 0.0, 415.89300000000026, 1, 3483, 197.0, 929.3999999999999, 2472.2999999999993, 2902.99, 7.540227111640602, 28.773300479935454, 1.30334003785194], "isController": false}, {"data": ["jsURLs2_logiqids_sign_up", 1000, 0, 0.0, 626.6619999999998, 4, 3137, 324.0, 2207.5, 2541.95, 3020.5600000000004, 6.5086793238783915, 898.8997878475635, 2.0975236102342474], "isController": false}, {"data": ["jsURLs19_logiqids_Login", 1000, 0, 0.0, 381.38100000000014, 2, 3099, 147.0, 762.1999999999998, 2236.95, 2808.86, 6.57786548265088, 2.682118226854136, 2.0748540536096036], "isController": false}, {"data": ["jsURLs17_logiqids_olympiad", 1000, 0, 0.0, 119.30999999999996, 1, 2749, 8.0, 278.9, 493.0, 2110.7700000000004, 13.35113484646195, 84.62601176568758, 4.224382510013351], "isController": false}, {"data": ["jsURLs8_logiqids_sign_up", 1000, 0, 0.0, 462.0479999999994, 1, 3752, 205.0, 1975.6, 2584.399999999998, 3098.92, 6.901073116869673, 46.59909186190953, 2.176803336668852], "isController": false}, {"data": ["jsURLs6_logiqids_Login", 1000, 0, 0.0, 976.9260000000006, 3, 8179, 501.5, 2735.8, 3219.049999999999, 5549.010000000002, 6.812406755182538, 818.4897221538616, 1.6033105742177653], "isController": false}, {"data": ["jsURLs5_logiqids_sign_up", 1000, 0, 0.0, 13621.97099999999, 563, 38181, 12575.5, 25283.0, 28357.349999999995, 32680.45, 6.533470971788472, 23671.7833080944, 2.1055131061427694], "isController": false}, {"data": ["jsURLs18_logiqids_Login", 1000, 0, 0.0, 404.6450000000005, 2, 5206, 171.5, 1147.1999999999987, 2238.95, 2765.9300000000003, 6.284170175328348, 134.88622092589392, 2.0067613743480175], "isController": false}, {"data": ["logiqids_sign_up", 1000, 0, 0.0, 402.17, 2, 3021, 157.5, 1190.099999999998, 2261.199999999999, 2867.6800000000003, 6.573584707212537, 19.807642274969762, 1.129834871552155], "isController": false}, {"data": ["jsURLs7_logiqids_HOME", 1000, 0, 0.0, 279.71699999999987, 3, 3302, 102.0, 507.4999999999999, 1878.1499999999987, 2655.96, 10.27189711667848, 627.8656787348618, 2.3773824381375], "isController": false}, {"data": ["jsURLs18_logiqids_olympiad", 1000, 0, 0.0, 102.39600000000006, 1, 2756, 8.0, 253.0, 398.49999999999795, 2004.91, 13.840447323257488, 402.44589087931826, 3.203306655871118], "isController": false}, {"data": ["jsURLs11_logiqids_sign_up", 1000, 0, 0.0, 460.32999999999976, 1, 3969, 188.5, 1995.6, 2398.0, 3098.95, 6.996529721258256, 58.66151521657758, 2.21374573211687], "isController": false}, {"data": ["jsURLs16_logiqids_olympiad", 1000, 0, 0.0, 160.5230000000003, 2, 3384, 13.5, 343.9, 631.6499999999995, 2241.5200000000004, 12.989205969839064, 793.9593164876862, 4.109865951394392], "isController": false}, {"data": ["jsURLs2_logiqids_HOME", 1000, 0, 0.0, 476.1280000000007, 3, 4320, 296.5, 1083.0, 1760.3999999999992, 2449.4800000000005, 11.394712853236097, 1573.7002905651777, 2.692891123518687], "isController": false}, {"data": ["jsURLs4_logiqids_sign_up", 1000, 0, 0.0, 3213.7939999999967, 21, 13930, 2934.0, 6932.8, 8836.649999999996, 11409.85, 6.508806415079603, 5458.075621041832, 2.103920823624364], "isController": false}, {"data": ["jsURLs9_logiqids_Login", 1000, 0, 0.0, 409.97599999999994, 2, 7540, 142.0, 810.3999999999996, 2226.199999999999, 5176.97, 6.649422497656079, 79.62080837029303, 1.5389776679145415], "isController": false}, {"data": ["cssURL2_logiqids_sign_up", 1000, 0, 0.0, 402.3360000000001, 2, 3079, 171.0, 1062.0999999999958, 2370.7499999999995, 2956.3000000000006, 6.525370641052412, 140.64869270316743, 1.3127210469304658], "isController": false}, {"data": ["jsURLs1_logiqids_olympiad", 1000, 0, 0.0, 376.6039999999998, 1, 3260, 156.5, 837.4999999999999, 2195.1499999999974, 2694.9700000000003, 7.9299625705766665, 58.31789726882177, 2.53232203181501], "isController": false}, {"data": ["jsURLs7_logiqids_olympiad", 1000, 0, 0.0, 289.8900000000002, 2, 4019, 71.0, 643.3999999999999, 1971.2499999999977, 2704.59, 10.228400175928483, 586.2490267037958, 3.2762844313520922], "isController": false}, {"data": ["jsURLs12_logiqids_sign_up", 1000, 0, 0.0, 443.71, 2, 3942, 173.0, 1182.3999999999994, 2392.8999999999987, 2972.96, 7.009034645658254, 41.83098654791026, 1.6153634534915506], "isController": false}, {"data": ["jsURLs11_logiqids_olympiad", 1000, 0, 0.0, 193.76100000000014, 2, 2983, 29.5, 522.0999999999998, 716.5499999999994, 2574.5300000000007, 11.193821010802038, 391.4814366219847, 3.5417949291990825], "isController": false}, {"data": ["jsURLs1_logiqids_Login", 1000, 0, 0.0, 231.61199999999985, 2, 5189, 59.0, 449.69999999999993, 1770.6499999999996, 2474.6500000000005, 8.866427273130292, 65.20337713902558, 2.8313688655406306], "isController": false}, {"data": ["jsURLs24_logiqids_olympiad", 1000, 0, 0.0, 57.196999999999925, 2, 2198, 5.0, 123.0, 288.0, 1060.95, 15.252970516007993, 793.6672139067051, 3.5302285276307557], "isController": false}, {"data": ["cssURL3_logiqids_Login", 1000, 0, 0.0, 191.50899999999987, 2, 3085, 55.0, 407.9, 599.7999999999997, 2225.6200000000003, 8.993210126354603, 21.32813553891812, 1.8091809433877424], "isController": false}, {"data": ["jsURLs11_logiqids_Login", 1000, 0, 0.0, 433.2879999999997, 1, 8124, 137.0, 1215.9999999999995, 2371.749999999998, 3113.98, 6.46145098343284, 54.17468542829727, 1.4954725420640458], "isController": false}, {"data": ["jsURLs1_logiqids_HOME", 1000, 0, 0.0, 160.20499999999987, 2, 2992, 23.0, 312.1999999999998, 741.3999999999965, 2182.5000000000005, 11.397050443345263, 83.81223947055001, 2.6711836976590457], "isController": false}, {"data": ["jsURLs6_logiqids_HOME", 1000, 0, 0.0, 155.0859999999999, 2, 2756, 46.5, 380.9, 495.59999999999945, 2097.8100000000004, 10.22526253361555, 254.4385627882246, 2.366589082487193], "isController": false}, {"data": ["jsURLs3_logiqids_sign_up", 1000, 0, 0.0, 514.761, 3, 3195, 256.0, 2033.8, 2376.95, 2909.4000000000005, 6.503345971502338, 576.1846086022196, 2.064050235095957], "isController": false}, {"data": ["jsURLs16_logiqids_Login", 1000, 0, 0.0, 404.8469999999997, 2, 5737, 148.0, 1787.9, 2234.7999999999997, 2794.9300000000003, 6.281683239840948, 119.4603221894964, 1.4538661404710005], "isController": false}, {"data": ["cssURL1_logiqids_sign_up", 1000, 0, 0.0, 477.7439999999999, 2, 3196, 226.0, 2009.6, 2439.499999999999, 2860.7200000000003, 6.579380222383051, 371.69366868297254, 1.8825765675373378], "isController": false}, {"data": ["jsURLs4_logiqids_Login", 1000, 0, 0.0, 2444.101000000003, 30, 12582, 1719.5, 5629.999999999999, 7125.049999999995, 9593.0, 8.077674922050438, 6773.678820538296, 2.6110453117174752], "isController": false}, {"data": ["jsURLs10_logiqids_olympiad", 1000, 0, 0.0, 188.74700000000013, 1, 2776, 28.0, 372.69999999999993, 748.6999999999996, 2476.4200000000005, 11.022563186843469, 131.9852803141155, 3.487607883337191], "isController": false}, {"data": ["jsURLs23_logiqids_olympiad", 1000, 0, 0.0, 45.873999999999945, 1, 1854, 4.0, 110.69999999999993, 241.94999999999993, 698.95, 15.249714067861229, 186.97796535455583, 4.825104841784216], "isController": false}, {"data": ["jsURLs13_logiqids_sign_up", 1000, 0, 0.0, 390.0349999999997, 1, 3574, 173.0, 820.8, 2133.7, 2779.96, 7.017740848865933, 44.48086070179163, 2.2204570654614866], "isController": false}, {"data": ["jsURLs6_logiqids_olympiad", 1000, 0, 0.0, 516.7150000000004, 2, 3682, 231.0, 2002.5999999999995, 2589.7499999999995, 3143.95, 10.176356253879735, 1222.6578400556648, 3.2695519604750323], "isController": false}, {"data": ["jsURLs2_logiqids_Login", 1000, 0, 0.0, 415.37999999999954, 3, 3195, 218.0, 886.5999999999997, 2091.8999999999996, 2750.9700000000003, 8.688323761696656, 1199.9255841675936, 2.799948087265524], "isController": false}, {"data": ["jsURLs7_logiqids_sign_up", 1000, 0, 0.0, 485.01500000000067, 1, 3751, 194.5, 1975.0, 2460.7, 2965.76, 6.88567710305793, 66.412396004758, 2.178671270889423], "isController": false}, {"data": ["cssURL2_logiqids_Login", 1000, 0, 0.0, 271.9740000000003, 2, 3097, 60.0, 523.1999999999998, 2031.8999999999999, 2362.7200000000003, 9.219648915769287, 208.51802643042853, 1.8547340592270247], "isController": false}, {"data": ["jsURLs15_logiqids_Login", 1000, 0, 0.0, 374.43900000000014, 2, 7611, 140.5, 733.9, 2205.5999999999995, 2827.84, 6.298696799632156, 77.22929948059371, 1.4578038491336143], "isController": false}, {"data": ["jsURLs8_logiqids_olympiad", 1000, 0, 0.0, 244.9340000000002, 1, 4868, 46.0, 566.5999999999999, 1896.0999999999988, 2665.95, 10.407018493271863, 100.37660804696688, 3.2928456951368004], "isController": false}, {"data": ["cssURL1_logiqids_Login", 1000, 0, 0.0, 265.6160000000002, 2, 5290, 76.5, 494.0, 1895.7499999999995, 2472.98, 9.36592675845275, 529.1150900446053, 2.6798989650650933], "isController": false}, {"data": ["jsURLs3_logiqids_Login", 1000, 0, 0.0, 433.15099999999967, 2, 3702, 212.0, 1860.3999999999996, 2137.499999999999, 2731.75, 8.231265639404715, 729.2753129424306, 2.612462239068879], "isController": false}, {"data": ["jsURLs6_logiqids_sign_up", 1000, 0, 0.0, 1095.0349999999985, 3, 6286, 557.0, 3016.0, 3372.499999999999, 5395.650000000006, 6.807351940095303, 817.8827274081007, 2.187127722940776], "isController": false}, {"data": ["jsURLs2_logiqids_olympiad", 1000, 0, 0.0, 494.4650000000003, 2, 3411, 279.5, 1900.5999999999985, 2219.1499999999974, 2689.92, 7.9300883411841205, 1095.2072234307345, 2.555594875576914], "isController": false}, {"data": ["jsURLs10_logiqids_sign_up", 1000, 0, 0.0, 517.3279999999997, 2, 6425, 204.5, 2067.7, 2494.5999999999995, 3110.010000000001, 6.90274038793401, 241.41110348933526, 2.184070200869745], "isController": false}, {"data": ["cssURL2_logiqids_olympiad", 1000, 0, 0.0, 357.0590000000004, 1, 3134, 156.5, 777.5999999999995, 2033.0, 2681.99, 7.7785297023156685, 234.79425819322256, 1.564821404958035], "isController": false}, {"data": ["jsURLs14_logiqids_olympiad", 1000, 0, 0.0, 138.70099999999988, 1, 2801, 13.0, 342.69999999999993, 601.6999999999996, 2460.130000000001, 12.00393729143159, 71.64255735256164, 3.7863981886058626], "isController": false}, {"data": ["jsURLs15_logiqids_sign_up", 1000, 0, 0.0, 426.2380000000002, 1, 3884, 186.0, 1044.3999999999999, 2362.95, 2856.82, 7.141938893570826, 159.99282932596165, 2.2597541030438943], "isController": false}, {"data": ["jsURLs5_logiqids_HOME", 1000, 0, 0.0, 245.95499999999979, 2, 2729, 97.0, 500.9, 912.6499999999982, 2513.3000000000006, 10.308959516715978, 590.8678303602724, 2.4262297300083504], "isController": false}, {"data": ["jsURLs1_logiqids_sign_up", 1000, 0, 0.0, 455.4410000000004, 2, 3269, 152.0, 2098.6, 2451.5999999999995, 3002.7700000000004, 6.438735432361084, 47.351233772374606, 2.0561196156074946], "isController": false}, {"data": ["jsURLs10_logiqids_HOME", 1000, 0, 0.0, 172.4260000000002, 2, 3101, 38.0, 416.69999999999993, 565.0, 2632.010000000001, 9.908445959335738, 164.2772249260582, 2.293263371447822], "isController": false}, {"data": ["jsURLs14_logiqids_Login", 1000, 0, 0.0, 365.1969999999998, 2, 5793, 155.0, 712.4999999999999, 2218.849999999997, 2798.98, 6.260603897851987, 140.2485445074157, 1.448987425577071], "isController": false}, {"data": ["logiqids_HOME", 1000, 0, 0.0, 1933.003000000003, 14, 7841, 573.5, 7124.499999999999, 7556.7, 7722.91, 10.81759373444971, 26.014062787342336, 1.785325528439454], "isController": false}, {"data": ["jsURLs13_logiqids_Login", 1000, 0, 0.0, 421.65200000000016, 2, 5699, 180.0, 1098.6999999999985, 2149.199999999999, 2859.8, 6.3157628809983954, 221.96204650848838, 1.461753713668574], "isController": false}, {"data": ["cssURL1_logiqids_olympiad", 1000, 0, 0.0, 379.4119999999998, 2, 3333, 189.5, 821.0999999999993, 2072.85, 2775.4000000000005, 7.632073023674691, 431.165140888068, 2.183786519469418], "isController": false}, {"data": ["jsURLs25_logiqids_olympiad", 1000, 0, 0.0, 51.92100000000013, 2, 2241, 5.0, 118.89999999999998, 250.94999999999993, 1084.7900000000002, 15.71289400081707, 916.2677371566732, 3.790121892775211], "isController": false}, {"data": ["jsURLs15_logiqids_olympiad", 1000, 0, 0.0, 131.3740000000002, 1, 2758, 10.0, 318.9, 575.8499999999998, 2097.9700000000003, 12.672183290459113, 166.67674418742794, 2.9329174217175877], "isController": false}, {"data": ["jsURLs9_logiqids_sign_up", 1000, 0, 0.0, 452.7839999999999, 2, 6162, 197.0, 1233.5999999999997, 2462.199999999999, 2906.83, 6.903979453757146, 82.66861405632957, 2.184462249040347], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 91000, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
