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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9624615384615385, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.994, 500, 1500, "jsURLs12_logiqids_HOME"], "isController": false}, {"data": [0.999, 500, 1500, "jsURLs9_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs17_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs19_logiqids_olympiad"], "isController": false}, {"data": [0.938, 500, 1500, "cssURL2_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs26_logiqids_olympiad"], "isController": false}, {"data": [0.996, 500, 1500, "jsURLs4_logiqids_olympiad"], "isController": false}, {"data": [0.357, 500, 1500, "jsURLs5_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs12_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs16_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs21_logiqids_olympiad"], "isController": false}, {"data": [0.331, 500, 1500, "jsURLs4_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs27_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs18_logiqids_sign_up"], "isController": false}, {"data": [0.997, 500, 1500, "jsURLs8_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs17_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_olympiad"], "isController": false}, {"data": [0.832, 500, 1500, "cssURL1_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs20_logiqids_olympiad"], "isController": false}, {"data": [0.997, 500, 1500, "jsURLs13_logiqids_HOME"], "isController": false}, {"data": [0.998, 500, 1500, "jsURLs8_logiqids_HOME"], "isController": false}, {"data": [0.997, 500, 1500, "jsURLs7_logiqids_Login"], "isController": false}, {"data": [0.997, 500, 1500, "jsURLs10_logiqids_Login"], "isController": false}, {"data": [0.806, 500, 1500, "jsURLs3_logiqids_HOME"], "isController": false}, {"data": [0.999, 500, 1500, "jsURLs14_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs22_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_HOME"], "isController": false}, {"data": [0.828, 500, 1500, "jsURLs5_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs12_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs19_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs19_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs17_logiqids_olympiad"], "isController": false}, {"data": [0.994, 500, 1500, "jsURLs8_logiqids_sign_up"], "isController": false}, {"data": [0.987, 500, 1500, "jsURLs6_logiqids_Login"], "isController": false}, {"data": [0.665, 500, 1500, "jsURLs5_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs18_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "logiqids_sign_up"], "isController": false}, {"data": [0.974, 500, 1500, "jsURLs7_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs18_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs16_logiqids_olympiad"], "isController": false}, {"data": [0.834, 500, 1500, "jsURLs2_logiqids_HOME"], "isController": false}, {"data": [0.982, 500, 1500, "jsURLs4_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs9_logiqids_Login"], "isController": false}, {"data": [0.999, 500, 1500, "cssURL2_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs7_logiqids_olympiad"], "isController": false}, {"data": [0.997, 500, 1500, "jsURLs12_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs11_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs24_logiqids_olympiad"], "isController": false}, {"data": [0.999, 500, 1500, "cssURL3_logiqids_Login"], "isController": false}, {"data": [0.998, 500, 1500, "jsURLs11_logiqids_Login"], "isController": false}, {"data": [0.95, 500, 1500, "jsURLs1_logiqids_HOME"], "isController": false}, {"data": [0.956, 500, 1500, "jsURLs6_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs3_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs16_logiqids_Login"], "isController": false}, {"data": [0.999, 500, 1500, "cssURL1_logiqids_sign_up"], "isController": false}, {"data": [0.878, 500, 1500, "jsURLs4_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs23_logiqids_olympiad"], "isController": false}, {"data": [0.999, 500, 1500, "jsURLs13_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs6_logiqids_olympiad"], "isController": false}, {"data": [0.99, 500, 1500, "jsURLs2_logiqids_Login"], "isController": false}, {"data": [0.997, 500, 1500, "jsURLs7_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs15_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs8_logiqids_olympiad"], "isController": false}, {"data": [0.995, 500, 1500, "cssURL1_logiqids_Login"], "isController": false}, {"data": [0.994, 500, 1500, "jsURLs3_logiqids_Login"], "isController": false}, {"data": [0.993, 500, 1500, "jsURLs6_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs2_logiqids_olympiad"], "isController": false}, {"data": [0.999, 500, 1500, "jsURLs10_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL2_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs14_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs15_logiqids_sign_up"], "isController": false}, {"data": [0.866, 500, 1500, "jsURLs5_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs1_logiqids_sign_up"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs10_logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs14_logiqids_Login"], "isController": false}, {"data": [0.476, 500, 1500, "logiqids_HOME"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs13_logiqids_Login"], "isController": false}, {"data": [1.0, 500, 1500, "cssURL1_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs25_logiqids_olympiad"], "isController": false}, {"data": [1.0, 500, 1500, "jsURLs15_logiqids_olympiad"], "isController": false}, {"data": [0.997, 500, 1500, "jsURLs9_logiqids_sign_up"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 45500, 0, 0.0, 152.88232967032852, 1, 11747, 4.0, 85.0, 135.0, 508.0, 352.98133465733656, 66283.4635426768, 96.03725722835954], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["jsURLs12_logiqids_HOME", 500, 0, 0.0, 35.546, 1, 1052, 4.0, 84.30000000000024, 150.4999999999999, 1046.99, 29.29458636044059, 628.793420069721, 6.865918678228263], "isController": false}, {"data": ["jsURLs9_logiqids_HOME", 500, 0, 0.0, 20.134000000000004, 1, 501, 4.0, 39.900000000000034, 65.0, 455.9200000000001, 29.925784055542255, 558.2907514364376, 6.926182442542495], "isController": false}, {"data": ["jsURLs17_logiqids_Login", 500, 0, 0.0, 14.705999999999996, 1, 135, 3.0, 56.7000000000001, 74.0, 127.99000000000001, 29.745969421143435, 129.2473409892022, 7.087906776131834], "isController": false}, {"data": ["jsURLs13_logiqids_olympiad", 500, 0, 0.0, 10.336000000000004, 1, 235, 3.0, 25.0, 44.89999999999998, 120.95000000000005, 27.78240817914097, 691.3233368755904, 8.790527587931322], "isController": false}, {"data": ["jsURLs19_logiqids_olympiad", 500, 0, 0.0, 8.914000000000003, 1, 222, 3.0, 13.0, 29.0, 195.61000000000035, 28.02219357731323, 984.816240087149, 8.866397186571765], "isController": false}, {"data": ["cssURL2_logiqids_HOME", 500, 0, 0.0, 193.83199999999997, 2, 1720, 74.0, 533.5000000000002, 687.1999999999998, 1218.92, 23.554906487021245, 1052.738331488199, 4.738584703443728], "isController": false}, {"data": ["jsURLs26_logiqids_olympiad", 500, 0, 0.0, 3.7999999999999945, 1, 68, 3.0, 5.0, 7.0, 46.8900000000001, 28.017482909335428, 601.3749141964586, 8.946989171242855], "isController": false}, {"data": ["jsURLs4_logiqids_olympiad", 500, 0, 0.0, 69.918, 7, 572, 37.5, 154.0, 249.04999999999978, 495.7800000000002, 27.86912658157293, 23370.153602432976, 9.008477439942032], "isController": false}, {"data": ["jsURLs5_logiqids_Login", 500, 0, 0.0, 1974.758, 28, 7871, 1734.5, 4286.600000000001, 5338.6, 6302.940000000002, 24.64268112370626, 89284.27108681925, 5.799693506653524], "isController": false}, {"data": ["jsURLs12_logiqids_Login", 500, 0, 0.0, 25.17000000000001, 1, 214, 6.5, 88.90000000000003, 116.94999999999999, 156.98000000000002, 26.57030502710171, 168.41629357530024, 6.149572550217876], "isController": false}, {"data": ["jsURLs16_logiqids_sign_up", 500, 0, 0.0, 38.23000000000002, 1, 175, 15.0, 113.0, 139.0, 167.99, 27.950136955671084, 342.7042172389457, 8.843598021130305], "isController": false}, {"data": ["jsURLs21_logiqids_olympiad", 500, 0, 0.0, 8.536000000000001, 2, 272, 3.0, 12.0, 24.94999999999999, 173.2400000000007, 28.019052956010086, 2377.9735219949566, 6.484878467357804], "isController": false}, {"data": ["jsURLs4_logiqids_HOME", 500, 0, 0.0, 2798.654, 7, 11747, 3305.0, 5684.200000000001, 6703.099999999999, 8069.980000000003, 23.8129256560461, 19968.75646483724, 5.650918881268753], "isController": false}, {"data": ["jsURLs3_logiqids_olympiad", 500, 0, 0.0, 23.96800000000001, 1, 138, 8.0, 76.0, 88.94999999999999, 112.99000000000001, 27.873787490244176, 2469.56852030257, 8.846661068681012], "isController": false}, {"data": ["logiqids_Login", 500, 0, 0.0, 33.51, 1, 418, 5.5, 105.60000000000014, 189.89999999999998, 365.99, 26.930949046644404, 85.27548256894323, 4.57615735753528], "isController": false}, {"data": ["jsURLs27_logiqids_olympiad", 500, 0, 0.0, 3.791999999999998, 1, 64, 2.0, 5.0, 8.949999999999989, 41.98000000000002, 28.017482909335428, 11.418547048358175, 8.837545878628264], "isController": false}, {"data": ["jsURLs18_logiqids_sign_up", 500, 0, 0.0, 34.310000000000045, 2, 168, 11.0, 93.0, 139.0, 162.97000000000003, 27.7623542476402, 595.9036971647695, 8.86551742087729], "isController": false}, {"data": ["jsURLs8_logiqids_Login", 500, 0, 0.0, 56.501999999999995, 1, 1047, 19.5, 153.90000000000003, 197.0, 288.5400000000004, 24.92770964203809, 168.31880904751222, 5.745058081563466], "isController": false}, {"data": ["jsURLs17_logiqids_sign_up", 500, 0, 0.0, 35.226000000000035, 1, 173, 11.0, 99.80000000000007, 138.0, 167.0, 27.79630865021125, 371.30097365257393, 6.6776288358905935], "isController": false}, {"data": ["jsURLs9_logiqids_olympiad", 500, 0, 0.0, 11.135999999999989, 1, 129, 3.0, 35.0, 57.0, 93.90000000000009, 27.665578487246165, 186.80452410017705, 8.726544776738782], "isController": false}, {"data": ["cssURL1_logiqids_HOME", 500, 0, 0.0, 379.08600000000007, 2, 4571, 273.0, 827.9000000000001, 1111.1499999999999, 1997.2300000000007, 23.544923714447165, 1330.1374471710774, 4.7365764503673], "isController": false}, {"data": ["jsURLs20_logiqids_olympiad", 500, 0, 0.0, 9.729999999999995, 1, 259, 3.0, 13.900000000000034, 41.5499999999999, 218.95000000000005, 28.020623178659495, 428.25740839007506, 8.86590030262273], "isController": false}, {"data": ["jsURLs13_logiqids_HOME", 500, 0, 0.0, 28.90799999999999, 1, 1053, 4.0, 62.80000000000007, 159.84999999999997, 250.94000000000005, 28.126230522585363, 11.470173450947854, 6.537151234741519], "isController": false}, {"data": ["jsURLs8_logiqids_HOME", 500, 0, 0.0, 30.555999999999983, 1, 958, 5.0, 58.900000000000034, 115.59999999999991, 474.7600000000002, 29.832935560859188, 455.9512627722255, 6.904693093675417], "isController": false}, {"data": ["jsURLs7_logiqids_Login", 500, 0, 0.0, 71.53999999999995, 1, 571, 35.0, 182.90000000000003, 216.0, 306.83000000000015, 24.92770964203809, 240.4248382814837, 5.7694015480107685], "isController": false}, {"data": ["jsURLs10_logiqids_Login", 500, 0, 0.0, 54.52599999999996, 1, 1053, 15.5, 129.80000000000007, 197.5999999999999, 261.8900000000001, 25.14964036014285, 879.5616633814949, 5.820766372415874], "isController": false}, {"data": ["jsURLs3_logiqids_HOME", 500, 0, 0.0, 430.23799999999994, 2, 5486, 266.5, 947.3000000000002, 1369.9, 2664.99, 23.865209297885542, 2114.4158728998614, 5.523490823827025], "isController": false}, {"data": ["jsURLs14_logiqids_sign_up", 500, 0, 0.0, 42.431999999999995, 1, 1007, 17.0, 113.90000000000003, 142.95, 170.98000000000002, 26.680896478121667, 937.6723836045892, 8.442002401280684], "isController": false}, {"data": ["jsURLs22_logiqids_olympiad", 500, 0, 0.0, 5.387999999999996, 1, 144, 3.0, 6.0, 16.94999999999999, 74.97000000000003, 28.02219357731323, 627.750279784089, 8.866397186571765], "isController": false}, {"data": ["jsURLs11_logiqids_HOME", 500, 0, 0.0, 17.586000000000002, 1, 444, 6.0, 42.900000000000034, 64.89999999999998, 130.0, 30.204180258547783, 1155.6499278875197, 7.19708982723209], "isController": false}, {"data": ["jsURLs5_logiqids_olympiad", 500, 0, 0.0, 400.9179999999994, 27, 1304, 352.5, 781.5000000000002, 869.6999999999999, 1048.7500000000002, 27.48611950964763, 99586.49076552279, 8.857831482601286], "isController": false}, {"data": ["jsURLs12_logiqids_olympiad", 500, 0, 0.0, 8.12399999999999, 1, 117, 3.0, 23.0, 40.0, 83.92000000000007, 27.756189630287555, 232.709520199567, 8.782231875208172], "isController": false}, {"data": ["jsURLs19_logiqids_sign_up", 500, 0, 0.0, 29.192000000000018, 1, 168, 10.0, 87.0, 103.0, 148.99, 27.720796141265176, 11.299148105283585, 8.74396206409048], "isController": false}, {"data": ["logiqids_olympiad", 500, 0, 0.0, 30.267999999999994, 1, 221, 11.0, 90.90000000000003, 119.89999999999998, 202.93000000000006, 27.71157789724547, 105.74851786357591, 4.789989538879344], "isController": false}, {"data": ["jsURLs2_logiqids_sign_up", 500, 0, 0.0, 42.30999999999995, 2, 379, 10.0, 133.80000000000007, 159.84999999999997, 351.95000000000005, 28.149983110010133, 3887.732644215882, 9.07177190068686], "isController": false}, {"data": ["jsURLs19_logiqids_Login", 500, 0, 0.0, 17.887999999999995, 1, 186, 4.0, 58.0, 86.94999999999999, 163.99, 29.491565412292083, 12.026165008994926, 9.3025152618851], "isController": false}, {"data": ["jsURLs17_logiqids_olympiad", 500, 0, 0.0, 9.578000000000007, 1, 243, 2.5, 12.0, 34.94999999999999, 228.87000000000012, 28.028476932563485, 177.6551069636751, 8.868385279443915], "isController": false}, {"data": ["jsURLs8_logiqids_sign_up", 500, 0, 0.0, 59.412000000000006, 1, 1097, 17.0, 139.0, 170.79999999999995, 1008.99, 26.51535238903325, 179.04698851885243, 8.363729318025136], "isController": false}, {"data": ["jsURLs6_logiqids_Login", 500, 0, 0.0, 121.01799999999972, 2, 839, 111.5, 242.0, 265.95, 614.7200000000003, 24.92770964203809, 2994.9874855107687, 5.86677541379998], "isController": false}, {"data": ["jsURLs5_logiqids_sign_up", 500, 0, 0.0, 726.3880000000004, 26, 2991, 533.0, 1801.5000000000002, 2017.4499999999998, 2675.99, 26.356017078699068, 95491.95585531865, 8.493638316377629], "isController": false}, {"data": ["jsURLs18_logiqids_Login", 500, 0, 0.0, 14.381999999999987, 1, 160, 3.0, 48.0, 73.0, 113.93000000000006, 29.7000297000297, 637.4984917953668, 9.484286828036828], "isController": false}, {"data": ["logiqids_sign_up", 500, 0, 0.0, 22.67600000000004, 1, 160, 5.0, 84.90000000000003, 101.89999999999998, 131.96000000000004, 29.72651605231867, 89.57551464030915, 5.109244946492271], "isController": false}, {"data": ["jsURLs7_logiqids_HOME", 500, 0, 0.0, 96.52799999999996, 2, 1415, 9.0, 346.5000000000005, 552.1499999999996, 1062.9, 29.04443799012489, 1775.3231193726401, 6.722199027011327], "isController": false}, {"data": ["jsURLs18_logiqids_olympiad", 500, 0, 0.0, 8.590000000000002, 1, 221, 3.0, 13.0, 44.94999999999999, 125.94000000000005, 28.023764152000897, 814.8648335038113, 6.485968851586145], "isController": false}, {"data": ["jsURLs11_logiqids_sign_up", 500, 0, 0.0, 50.54800000000003, 1, 350, 14.0, 123.0, 161.0, 348.9100000000001, 26.535052804755082, 222.4761536943427, 8.395856551504538], "isController": false}, {"data": ["jsURLs16_logiqids_olympiad", 500, 0, 0.0, 10.204, 1, 261, 3.0, 17.0, 31.849999999999966, 214.8800000000001, 27.918923446311908, 1706.5214024722209, 8.833721871684629], "isController": false}, {"data": ["jsURLs2_logiqids_HOME", 500, 0, 0.0, 388.0119999999999, 2, 3257, 194.5, 1093.0000000000007, 1498.9, 2004.0700000000008, 23.679848448969928, 3270.3708208767466, 5.596214184229221], "isController": false}, {"data": ["jsURLs4_logiqids_sign_up", 500, 0, 0.0, 133.53, 7, 1299, 58.5, 384.0, 441.95, 660.4600000000005, 27.833444667112005, 23340.232439705804, 8.996943539857494], "isController": false}, {"data": ["jsURLs9_logiqids_Login", 500, 0, 0.0, 50.80400000000002, 1, 295, 15.0, 157.0, 197.0, 237.99, 25.010004001600638, 299.4731584039866, 5.788448191776711], "isController": false}, {"data": ["cssURL2_logiqids_sign_up", 500, 0, 0.0, 34.85199999999999, 1, 999, 5.0, 87.0, 127.64999999999992, 348.99, 28.12464844189448, 606.1946625569525, 5.657888260771741], "isController": false}, {"data": ["jsURLs1_logiqids_olympiad", 500, 0, 0.0, 24.384, 1, 159, 9.0, 74.0, 87.0, 132.96000000000004, 27.625835681529367, 203.16767975785956, 8.821922136582131], "isController": false}, {"data": ["jsURLs7_logiqids_olympiad", 500, 0, 0.0, 17.299999999999983, 1, 146, 4.0, 51.0, 73.79999999999995, 98.98000000000002, 27.52546105147261, 1577.6515835741811, 8.816749243049822], "isController": false}, {"data": ["jsURLs12_logiqids_sign_up", 500, 0, 0.0, 57.44600000000002, 1, 1006, 25.0, 139.90000000000003, 166.95, 311.9200000000001, 26.700843746662393, 159.3579886421286, 6.153710082238599], "isController": false}, {"data": ["jsURLs11_logiqids_olympiad", 500, 0, 0.0, 11.816000000000006, 1, 242, 3.0, 32.900000000000034, 57.94999999999999, 103.99000000000001, 27.710042119264024, 969.1080657005099, 8.767630514298382], "isController": false}, {"data": ["jsURLs1_logiqids_Login", 500, 0, 0.0, 28.03199999999999, 1, 274, 7.0, 103.90000000000003, 151.95, 222.92000000000007, 25.321584118302443, 186.21502851843414, 8.086091803403221], "isController": false}, {"data": ["jsURLs24_logiqids_olympiad", 500, 0, 0.0, 5.021999999999995, 1, 84, 3.0, 6.0, 10.0, 72.95000000000005, 28.02219357731323, 1458.0916601573447, 6.485605349436754], "isController": false}, {"data": ["cssURL3_logiqids_Login", 500, 0, 0.0, 34.995999999999974, 1, 1053, 7.0, 105.90000000000003, 162.95, 239.98000000000002, 25.334414268342115, 60.08298801998885, 5.0965716203891365], "isController": false}, {"data": ["jsURLs11_logiqids_Login", 500, 0, 0.0, 41.64399999999999, 1, 1731, 11.5, 115.0, 142.89999999999998, 212.92000000000007, 26.553372278279344, 222.63483097118961, 6.145653544875199], "isController": false}, {"data": ["jsURLs1_logiqids_HOME", 500, 0, 0.0, 145.3160000000002, 1, 2886, 19.0, 425.50000000000085, 806.8, 2085.770000000003, 23.658559666887477, 173.98255255157565, 5.5449749219267535], "isController": false}, {"data": ["jsURLs6_logiqids_HOME", 500, 0, 0.0, 122.46800000000005, 1, 2458, 8.0, 464.0, 712.4499999999998, 1334.870000000001, 25.420712796786823, 632.5505474986019, 5.883504817225075], "isController": false}, {"data": ["jsURLs3_logiqids_sign_up", 500, 0, 0.0, 35.713999999999984, 2, 328, 11.0, 109.0, 123.94999999999999, 239.7800000000002, 28.115159694107064, 2490.94444751954, 8.92326845760234], "isController": false}, {"data": ["jsURLs16_logiqids_Login", 500, 0, 0.0, 10.978000000000002, 1, 150, 3.0, 32.0, 53.89999999999998, 92.0, 29.802706085712583, 566.7587019245098, 6.8976966233534], "isController": false}, {"data": ["cssURL1_logiqids_sign_up", 500, 0, 0.0, 28.368000000000006, 1, 1180, 5.0, 78.0, 101.84999999999997, 288.0000000000009, 28.110417720807334, 1588.0693896876933, 8.043312883004441], "isController": false}, {"data": ["jsURLs4_logiqids_Login", 500, 0, 0.0, 339.8219999999999, 8, 3041, 178.0, 857.7, 1297.55, 1926.9, 24.859543578779892, 20846.41453521976, 8.035653246656391], "isController": false}, {"data": ["jsURLs10_logiqids_olympiad", 500, 0, 0.0, 12.48800000000001, 1, 179, 3.0, 38.900000000000034, 57.94999999999999, 109.87000000000012, 27.679362267493357, 331.43338658727305, 8.75792321744907], "isController": false}, {"data": ["jsURLs23_logiqids_olympiad", 500, 0, 0.0, 5.726000000000003, 1, 218, 3.0, 6.0, 17.849999999999966, 74.98000000000002, 28.02219357731323, 343.5865736913636, 8.866397186571765], "isController": false}, {"data": ["jsURLs13_logiqids_sign_up", 500, 0, 0.0, 43.930000000000035, 1, 784, 16.0, 126.1000000000003, 147.95, 304.0, 26.7079750013354, 169.28599567330804, 8.450570215266278], "isController": false}, {"data": ["jsURLs6_logiqids_olympiad", 500, 0, 0.0, 18.858000000000025, 2, 145, 5.0, 58.0, 77.94999999999999, 122.87000000000012, 27.52697643690817, 3307.275734712205, 8.844116452873816], "isController": false}, {"data": ["jsURLs2_logiqids_Login", 500, 0, 0.0, 63.139999999999986, 3, 1057, 17.5, 171.90000000000003, 238.84999999999997, 691.7600000000002, 25.16862981979261, 3475.9889305219976, 8.110984219269103], "isController": false}, {"data": ["jsURLs7_logiqids_sign_up", 500, 0, 0.0, 46.664000000000044, 1, 1065, 17.0, 119.0, 147.64999999999992, 376.8800000000001, 26.488662852299218, 255.48910281243377, 8.381178480610298], "isController": false}, {"data": ["cssURL2_logiqids_Login", 500, 0, 0.0, 31.404, 1, 255, 5.0, 118.0, 160.0, 204.97000000000003, 25.35754133279237, 573.5090855278172, 5.101224135307841], "isController": false}, {"data": ["jsURLs15_logiqids_Login", 500, 0, 0.0, 16.557999999999993, 1, 150, 4.0, 51.0, 92.94999999999999, 139.97000000000003, 29.608574643216677, 363.0335095043524, 6.852765810978859], "isController": false}, {"data": ["jsURLs8_logiqids_olympiad", 500, 0, 0.0, 17.232, 1, 192, 4.0, 52.900000000000034, 76.0, 160.80000000000018, 27.636524430687597, 266.55330653741987, 8.744369058147248], "isController": false}, {"data": ["cssURL1_logiqids_Login", 500, 0, 0.0, 38.3, 2, 696, 6.0, 110.0, 164.69999999999993, 533.4200000000023, 26.331033756385274, 1487.5359068901732, 7.534172744746958], "isController": false}, {"data": ["jsURLs3_logiqids_Login", 500, 0, 0.0, 58.60800000000005, 2, 1057, 24.0, 136.90000000000003, 183.95, 586.7200000000003, 25.053865811494713, 2219.7318472998195, 7.951666395249787], "isController": false}, {"data": ["jsURLs6_logiqids_sign_up", 500, 0, 0.0, 69.776, 2, 1310, 23.0, 147.60000000000014, 326.95, 1035.8100000000002, 26.4648282432647, 3179.6718898864656, 8.502859855502038], "isController": false}, {"data": ["jsURLs2_logiqids_olympiad", 500, 0, 0.0, 30.61000000000004, 3, 164, 12.0, 85.90000000000003, 100.0, 133.95000000000005, 27.79321845469705, 3838.465217221373, 8.95679891606448], "isController": false}, {"data": ["jsURLs10_logiqids_sign_up", 500, 0, 0.0, 44.954000000000036, 1, 1015, 18.0, 108.0, 142.95, 328.8600000000001, 26.529421128030986, 927.8132896648007, 8.394074653791053], "isController": false}, {"data": ["cssURL2_logiqids_olympiad", 500, 0, 0.0, 24.599999999999998, 1, 144, 9.0, 73.90000000000003, 87.0, 136.98000000000002, 27.516372241483683, 830.5818035950141, 5.535520197017226], "isController": false}, {"data": ["jsURLs14_logiqids_olympiad", 500, 0, 0.0, 11.892000000000003, 1, 235, 3.0, 28.900000000000034, 59.0, 161.8900000000001, 27.883113986169977, 166.41677151879324, 8.795161931184476], "isController": false}, {"data": ["jsURLs15_logiqids_sign_up", 500, 0, 0.0, 37.534000000000034, 1, 311, 15.0, 108.0, 140.95, 169.98000000000002, 28.036335090277, 628.0613268546036, 8.870871649657957], "isController": false}, {"data": ["jsURLs5_logiqids_HOME", 500, 0, 0.0, 324.7720000000004, 2, 4916, 44.0, 1029.7, 1370.4499999999996, 2019.4200000000014, 24.775779198255783, 1420.0465281390912, 5.8310183464644965], "isController": false}, {"data": ["jsURLs1_logiqids_sign_up", 500, 0, 0.0, 27.517999999999986, 1, 351, 7.0, 80.0, 103.0, 303.8800000000001, 28.132560625668148, 206.88157598604624, 8.983737621673324], "isController": false}, {"data": ["jsURLs10_logiqids_HOME", 500, 0, 0.0, 14.555999999999997, 1, 476, 4.0, 33.80000000000007, 64.0, 131.69000000000028, 29.4811320754717, 488.7774197560436, 6.8232698260613205], "isController": false}, {"data": ["jsURLs14_logiqids_Login", 500, 0, 0.0, 16.668, 1, 147, 4.0, 64.0, 94.89999999999998, 121.94000000000005, 28.586130009719287, 640.3796171066549, 6.616125793265108], "isController": false}, {"data": ["logiqids_HOME", 500, 0, 0.0, 3205.599999999998, 19, 9504, 806.0, 8847.1, 9091.85, 9414.94, 16.38001638001638, 39.39243575962326, 2.7033425470925474], "isController": false}, {"data": ["jsURLs13_logiqids_Login", 500, 0, 0.0, 24.38599999999998, 1, 227, 5.0, 93.0, 117.0, 208.9000000000001, 27.763895829862847, 975.7382051161919, 6.4258235465600535], "isController": false}, {"data": ["cssURL1_logiqids_olympiad", 500, 0, 0.0, 28.004000000000005, 2, 172, 11.0, 77.0, 95.0, 137.0, 27.53910552985239, 1555.7839006389074, 7.879841718990968], "isController": false}, {"data": ["jsURLs25_logiqids_olympiad", 500, 0, 0.0, 4.513999999999995, 2, 85, 3.0, 6.0, 8.949999999999989, 60.97000000000003, 28.019052956010086, 1633.8823681353322, 6.758502031381339], "isController": false}, {"data": ["jsURLs15_logiqids_olympiad", 500, 0, 0.0, 11.161999999999994, 1, 238, 3.0, 18.900000000000034, 45.849999999999966, 215.98000000000002, 27.92048246593701, 367.23876026077727, 6.4620647894795615], "isController": false}, {"data": ["jsURLs9_logiqids_sign_up", 500, 0, 0.0, 53.34199999999996, 1, 1074, 19.0, 119.80000000000007, 283.04999999999865, 350.0, 26.519571443725468, 317.5510978273841, 8.390958152116262], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 45500, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
