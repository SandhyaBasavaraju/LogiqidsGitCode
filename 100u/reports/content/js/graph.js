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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 100.0, "series": [{"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[0.0, 96.0], [100.0, 4.0]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[0.0, 21.0], [300.0, 12.0], [600.0, 21.0], [700.0, 4.0], [100.0, 15.0], [200.0, 2.0], [400.0, 12.0], [500.0, 13.0]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[0.0, 55.0], [300.0, 1.0], [100.0, 37.0], [200.0, 7.0]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[0.0, 15.0], [300.0, 44.0], [100.0, 12.0], [200.0, 15.0], [400.0, 14.0]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[0.0, 70.0], [100.0, 30.0]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[0.0, 95.0], [300.0, 1.0], [100.0, 4.0]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[0.0, 32.0], [300.0, 11.0], [100.0, 30.0], [200.0, 16.0], [400.0, 8.0], [500.0, 3.0]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[0.0, 71.0], [100.0, 20.0], [200.0, 9.0]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[0.0, 82.0], [100.0, 18.0]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[0.0, 98.0], [100.0, 2.0]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[4300.0, 3.0], [4400.0, 13.0], [4600.0, 7.0], [4500.0, 14.0], [4800.0, 15.0], [4700.0, 13.0], [4900.0, 12.0], [5000.0, 22.0], [5100.0, 1.0]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 5100.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 41.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 8959.0, "series": [{"data": [[0.0, 8959.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 41.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 100.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 98.65624311825589, "minX": 1.69400016E12, "maxY": 100.0, "series": [{"data": [[1.69400022E12, 98.65624311825589], [1.69400016E12, 100.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69400022E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 3.0, "minX": 1.0, "maxY": 4776.029999999999, "series": [{"data": [[100.0, 4.440000000000003]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[100.0, 4.440000000000003]], "isOverall": false, "label": "jsURLs12_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 5.459999999999997]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[100.0, 5.459999999999997]], "isOverall": false, "label": "jsURLs9_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 6.81]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[100.0, 6.81]], "isOverall": false, "label": "jsURLs17_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 4.32]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[100.0, 4.32]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 4.500000000000001]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[100.0, 4.500000000000001]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 29.080000000000002]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[100.0, 29.080000000000002]], "isOverall": false, "label": "cssURL2_logiqids_HOME-Aggregated", "isController": false}, {"data": [[51.0, 4.0], [57.0, 4.0], [56.0, 3.5], [58.0, 3.285714285714286], [62.0, 4.5], [71.0, 13.0], [68.0, 4.0], [75.0, 40.0], [74.0, 19.0], [72.0, 4.0], [83.0, 3.3333333333333335], [87.0, 3.0], [86.0, 3.6666666666666665], [84.0, 3.333333333333334], [90.0, 4.5], [89.0, 5.0], [88.0, 3.0], [95.0, 3.0], [92.0, 3.3333333333333335], [98.0, 3.6], [96.0, 4.0], [100.0, 4.2272727272727275]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[88.38999999999999, 4.790000000000001]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 31.93000000000001]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[100.0, 31.93000000000001]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 369.19]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[100.0, 369.19]], "isOverall": false, "label": "jsURLs5_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 3.9800000000000004]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[100.0, 3.9800000000000004]], "isOverall": false, "label": "jsURLs12_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 5.68]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[100.0, 5.68]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 4.01]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[100.0, 4.01]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 93.71999999999998]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[100.0, 93.71999999999998]], "isOverall": false, "label": "jsURLs4_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 5.919999999999997]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[100.0, 5.919999999999997]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 5.33]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[100.0, 5.33]], "isOverall": false, "label": "logiqids_Login-Aggregated", "isController": false}, {"data": [[2.0, 3.0], [4.0, 3.5], [5.0, 6.0], [7.0, 4.0], [8.0, 3.0], [9.0, 3.0], [10.0, 4.0], [11.0, 4.0], [12.0, 4.0], [13.0, 3.0], [14.0, 4.0], [15.0, 3.0], [16.0, 5.0], [17.0, 4.0], [18.0, 3.0], [20.0, 4.0], [21.0, 3.0], [22.0, 3.0], [23.0, 4.0], [24.0, 3.0], [25.0, 11.0], [26.0, 11.0], [27.0, 3.0], [29.0, 4.0], [30.0, 5.0], [31.0, 4.0], [33.0, 4.0], [32.0, 4.0], [35.0, 4.0], [34.0, 4.0], [37.0, 3.0], [36.0, 3.0], [39.0, 7.0], [38.0, 3.0], [41.0, 3.0], [40.0, 4.0], [43.0, 4.0], [45.0, 4.0], [47.0, 3.5], [49.0, 3.0], [48.0, 3.0], [51.0, 3.0], [50.0, 4.0], [53.0, 4.0], [55.0, 3.5], [57.0, 4.0], [56.0, 3.0], [59.0, 3.0], [58.0, 4.0], [61.0, 6.0], [60.0, 4.0], [63.0, 4.0], [62.0, 3.0], [67.0, 13.0], [65.0, 3.0], [64.0, 3.0], [71.0, 11.0], [70.0, 14.0], [69.0, 14.0], [68.0, 3.0], [75.0, 40.0], [74.0, 6.0], [73.0, 3.0], [72.0, 4.0], [79.0, 4.0], [78.0, 4.0], [77.0, 3.0], [76.0, 3.0], [83.0, 4.0], [82.0, 4.5], [81.0, 5.0], [87.0, 4.0], [86.0, 4.0], [85.0, 3.0], [84.0, 4.0], [91.0, 3.0], [90.0, 4.0], [89.0, 3.0], [88.0, 3.0], [95.0, 4.0], [94.0, 3.0], [93.0, 3.0], [92.0, 3.0], [98.0, 3.0], [97.0, 3.0], [96.0, 3.0], [100.0, 5.0], [1.0, 3.0]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[50.62999999999999, 4.700000000000001]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 4.22]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[100.0, 4.22]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 4.09]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[100.0, 4.09]], "isOverall": false, "label": "jsURLs8_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 3.96]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[100.0, 3.96]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 3.71]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.71]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 277.97]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[100.0, 277.97]], "isOverall": false, "label": "cssURL1_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 3.7899999999999987]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.7899999999999987]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 7.379999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[100.0, 7.379999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 8.76]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[100.0, 8.76]], "isOverall": false, "label": "jsURLs8_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 3.930000000000002]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[100.0, 3.930000000000002]], "isOverall": false, "label": "jsURLs7_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 8.870000000000003]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[100.0, 8.870000000000003]], "isOverall": false, "label": "jsURLs10_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 11.630000000000003]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[100.0, 11.630000000000003]], "isOverall": false, "label": "jsURLs3_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 9.160000000000007]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[100.0, 9.160000000000007]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 4.159999999999999]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[100.0, 4.159999999999999]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 4.65]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[100.0, 4.65]], "isOverall": false, "label": "jsURLs11_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 73.33000000000001]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[100.0, 73.33000000000001]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 4.32]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[100.0, 4.32]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 3.6599999999999997]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[100.0, 3.6599999999999997]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 4.160000000000001]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[100.0, 4.160000000000001]], "isOverall": false, "label": "logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 7.379999999999998]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[100.0, 7.379999999999998]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 4.1]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[100.0, 4.1]], "isOverall": false, "label": "jsURLs19_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 3.659999999999999]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.659999999999999]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 4.19]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[100.0, 4.19]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 20.190000000000005]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[100.0, 20.190000000000005]], "isOverall": false, "label": "jsURLs6_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 189.71999999999997]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[100.0, 189.71999999999997]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 4.939999999999999]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[100.0, 4.939999999999999]], "isOverall": false, "label": "jsURLs18_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 4.140000000000001]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[100.0, 4.140000000000001]], "isOverall": false, "label": "logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 5.179999999999997]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[100.0, 5.179999999999997]], "isOverall": false, "label": "jsURLs7_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 3.8800000000000017]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.8800000000000017]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 3.94]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[100.0, 3.94]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 5.319999999999999]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[100.0, 5.319999999999999]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 7.9899999999999975]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[100.0, 7.9899999999999975]], "isOverall": false, "label": "jsURLs2_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 67.77]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[100.0, 67.77]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 4.169999999999999]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[100.0, 4.169999999999999]], "isOverall": false, "label": "jsURLs9_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 5.1800000000000015]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[100.0, 5.1800000000000015]], "isOverall": false, "label": "cssURL2_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 5.19]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[100.0, 5.19]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 5.8400000000000025]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[100.0, 5.8400000000000025]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 7.409999999999999]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[100.0, 7.409999999999999]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 4.129999999999999]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[100.0, 4.129999999999999]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 4.4300000000000015]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[100.0, 4.4300000000000015]], "isOverall": false, "label": "jsURLs1_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 4.4300000000000015]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[100.0, 4.4300000000000015]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 4.199999999999999]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[100.0, 4.199999999999999]], "isOverall": false, "label": "cssURL3_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 9.960000000000003]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[100.0, 9.960000000000003]], "isOverall": false, "label": "jsURLs11_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 5.35]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[100.0, 5.35]], "isOverall": false, "label": "jsURLs1_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 4.239999999999999]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[100.0, 4.239999999999999]], "isOverall": false, "label": "jsURLs6_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 9.639999999999999]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[100.0, 9.639999999999999]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 4.09]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[100.0, 4.09]], "isOverall": false, "label": "jsURLs16_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 5.459999999999998]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[100.0, 5.459999999999998]], "isOverall": false, "label": "cssURL1_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 41.919999999999995]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[100.0, 41.919999999999995]], "isOverall": false, "label": "jsURLs4_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 3.89]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.89]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 4.519999999999999]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[100.0, 4.519999999999999]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 15.31]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[100.0, 15.31]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 10.889999999999999]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[100.0, 10.889999999999999]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 10.910000000000004]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[100.0, 10.910000000000004]], "isOverall": false, "label": "jsURLs2_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 4.560000000000003]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[100.0, 4.560000000000003]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 4.3999999999999995]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[100.0, 4.3999999999999995]], "isOverall": false, "label": "cssURL2_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 4.15]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[100.0, 4.15]], "isOverall": false, "label": "jsURLs15_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 5.840000000000002]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[100.0, 5.840000000000002]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 6.069999999999998]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[100.0, 6.069999999999998]], "isOverall": false, "label": "cssURL1_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 5.670000000000002]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[100.0, 5.670000000000002]], "isOverall": false, "label": "jsURLs3_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 19.229999999999993]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[100.0, 19.229999999999993]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 6.070000000000001]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[100.0, 6.070000000000001]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 4.4]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[100.0, 4.4]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 7.410000000000002]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[100.0, 7.410000000000002]], "isOverall": false, "label": "cssURL2_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 3.74]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.74]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 5.1499999999999995]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[100.0, 5.1499999999999995]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 6.82]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[100.0, 6.82]], "isOverall": false, "label": "jsURLs5_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 5.109999999999999]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[100.0, 5.109999999999999]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 4.6899999999999995]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[100.0, 4.6899999999999995]], "isOverall": false, "label": "jsURLs10_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 4.409999999999998]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[100.0, 4.409999999999998]], "isOverall": false, "label": "jsURLs14_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 4776.029999999999]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[100.0, 4776.029999999999]], "isOverall": false, "label": "logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 4.269999999999997]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[100.0, 4.269999999999997]], "isOverall": false, "label": "jsURLs13_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 4.599999999999997]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[100.0, 4.599999999999997]], "isOverall": false, "label": "cssURL1_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[96.0, 4.0], [100.0, 4.171717171717172]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[99.96, 4.170000000000001]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 4.0299999999999985]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[100.0, 4.0299999999999985]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 4.339999999999999]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}, {"data": [[100.0, 4.339999999999999]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 19133.75, "minX": 1.69400016E12, "maxY": 1.6457385333333334E7, "series": [{"data": [[1.69400022E12, 1.6457385333333334E7], [1.69400016E12, 1.2706377266666668E7]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69400022E12, 23121.25], [1.69400016E12, 19133.75]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69400022E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 3.659999999999999, "minX": 1.69400016E12, "maxY": 4776.029999999999, "series": [{"data": [[1.69400016E12, 4.440000000000003]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 5.459999999999997]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 6.81]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 4.32]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 4.500000000000001]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 29.080000000000002]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 4.790000000000001]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 31.93000000000001]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 369.19]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 3.9800000000000004]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 5.68]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 4.01]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 93.71999999999998]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 5.919999999999997]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 5.33]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 4.700000000000001]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 4.22]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 4.09]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 3.96]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 3.71]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 277.97]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 3.7899999999999987]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 7.379999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 8.76]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 3.930000000000002]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 8.870000000000003]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 11.630000000000003]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 9.160000000000007]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 4.159999999999999]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 4.65]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 73.33000000000001]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 4.32]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 3.6599999999999997]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 4.160000000000001]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 7.379999999999998]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 4.1]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 3.659999999999999]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 4.19]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 20.190000000000005]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 194.61458333333331], [1.69400016E12, 72.25]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 4.939999999999999]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 4.140000000000001]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 5.179999999999997]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 3.8800000000000017]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 3.94]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 5.319999999999999]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 7.9899999999999975]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 123.5111111111111], [1.69400016E12, 22.163636363636364]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 4.169999999999999]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 5.1800000000000015]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 5.19]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 5.8400000000000025]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 7.409999999999999]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 4.129999999999999]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 4.4300000000000015]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 4.4300000000000015]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 4.199999999999999]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 9.960000000000003]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 5.35]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 4.239999999999999]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 9.639999999999999]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 4.09]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 5.459999999999998]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 41.919999999999995]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 3.89]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 4.519999999999999]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 15.31]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 10.889999999999999]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 10.910000000000004]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 4.560000000000003]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 4.3999999999999995]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 4.15]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 5.840000000000002]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 6.069999999999998]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 5.670000000000002]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 19.229999999999993]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 6.070000000000001]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 4.4]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 7.410000000000002]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 3.74]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 5.1499999999999995]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 6.82]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 5.109999999999999]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 4.6899999999999995]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 4.409999999999998]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 4776.029999999999]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 4.269999999999997]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 4.599999999999997]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 4.170000000000001]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 4.0299999999999985]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 4.339999999999999]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69400022E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 3.659999999999999, "minX": 1.69400016E12, "maxY": 4708.530000000001, "series": [{"data": [[1.69400016E12, 4.41]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 5.430000000000001]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 6.790000000000001]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 4.189999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 4.439999999999999]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 19.520000000000003]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 4.739999999999998]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 12.790000000000001]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 81.47999999999999]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 3.9800000000000004]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 5.67]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 3.69]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 27.939999999999998]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 5.150000000000002]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 5.32]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 4.700000000000001]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 4.159999999999999]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 4.059999999999999]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 3.940000000000001]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 3.71]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 148.33000000000004]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 3.78]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 7.36]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 8.74]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 3.91]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 8.77]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 9.919999999999995]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 8.399999999999991]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 4.130000000000001]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 4.5699999999999985]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 12.840000000000002]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 4.32]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 3.6599999999999997]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 4.15]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 5.969999999999998]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 4.079999999999999]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 3.659999999999999]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 4.19]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 12.470000000000002]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 37.677083333333336], [1.69400016E12, 13.0]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 4.939999999999999]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 4.13]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 5.0200000000000005]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 3.83]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 3.920000000000002]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 5.09]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 5.720000000000002]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 47.33333333333334], [1.69400016E12, 9.963636363636363]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 4.169999999999999]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 5.140000000000001]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 5.19]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 5.669999999999998]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 7.409999999999999]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 4.119999999999998]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 4.4300000000000015]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 4.249999999999999]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 4.1899999999999995]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 9.930000000000005]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 5.33]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 4.119999999999999]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 7.8999999999999995]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 4.049999999999999]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 5.360000000000001]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 16.550000000000004]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 3.89]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 4.510000000000001]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 15.31]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 9.709999999999994]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 8.63]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 4.560000000000003]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 4.380000000000001]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 4.140000000000001]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 5.83]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 5.829999999999997]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 4.96]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 16.759999999999998]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 4.570000000000001]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 4.35]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 7.2]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 3.7299999999999995]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 5.12]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 6.550000000000002]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 5.099999999999999]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 4.659999999999999]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 4.34]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 4708.530000000001]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 4.130000000000001]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 4.140000000000001]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 4.05]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 4.019999999999999]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 4.329999999999998]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69400022E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.69400016E12, "maxY": 4553.779999999998, "series": [{"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 3.569999999999999]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 0.0], [1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[1.69400022E12, 0.0], [1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 2.65]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 9.39]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 0.060000000000000026]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[1.69400016E12, 4553.779999999998]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[1.69400016E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[1.69400022E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69400022E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 2.0, "minX": 1.69400016E12, "maxY": 5142.0, "series": [{"data": [[1.69400022E12, 536.0], [1.69400016E12, 5142.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69400022E12, 17.0], [1.69400016E12, 45.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69400022E12, 208.15999999999985], [1.69400016E12, 4840.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69400022E12, 50.899999999999636], [1.69400016E12, 266.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69400022E12, 2.0], [1.69400016E12, 2.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69400022E12, 4.0], [1.69400016E12, 4.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69400022E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 4.0, "minX": 13.0, "maxY": 324.5, "series": [{"data": [[13.0, 4.0], [64.0, 4.0], [69.0, 11.0], [72.0, 11.0], [76.0, 324.5], [87.0, 12.0], [90.0, 35.5], [94.0, 40.5], [92.0, 4.0], [99.0, 4.0], [96.0, 6.0], [98.0, 4.0], [97.0, 4.0], [100.0, 4.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 100.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 4.0, "minX": 13.0, "maxY": 32.0, "series": [{"data": [[13.0, 4.0], [64.0, 4.0], [69.0, 5.0], [72.0, 8.0], [76.0, 32.0], [87.0, 5.0], [90.0, 5.0], [94.0, 9.0], [92.0, 4.0], [99.0, 4.0], [96.0, 4.0], [98.0, 4.0], [97.0, 4.0], [100.0, 4.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 100.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 75.46666666666667, "minX": 1.69400016E12, "maxY": 76.2, "series": [{"data": [[1.69400022E12, 75.46666666666667], [1.69400016E12, 76.2]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69400022E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 75.68333333333334, "minX": 1.69400016E12, "maxY": 75.98333333333333, "series": [{"data": [[1.69400022E12, 75.68333333333334], [1.69400016E12, 75.98333333333333]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69400022E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.06666666666666667, "minX": 1.69400016E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs12_logiqids_Login-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs4_logiqids_HOME-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs11_logiqids_HOME-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "cssURL1_logiqids_HOME-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "cssURL1_logiqids_Login-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "logiqids_HOME-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "logiqids_sign_up-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "cssURL2_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs5_logiqids_HOME-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs15_logiqids_Login-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs12_logiqids_HOME-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs4_logiqids_Login-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs19_logiqids_Login-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs8_logiqids_Login-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "cssURL1_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs13_logiqids_Login-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "logiqids_Login-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs6_logiqids_HOME-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs18_logiqids_Login-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "cssURL2_logiqids_HOME-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs14_logiqids_Login-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs3_logiqids_Login-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs7_logiqids_HOME-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs10_logiqids_HOME-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs7_logiqids_Login-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs9_logiqids_HOME-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs10_logiqids_Login-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs8_logiqids_HOME-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "cssURL3_logiqids_Login-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "cssURL2_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs1_logiqids_HOME-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs2_logiqids_Login-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "cssURL1_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs17_logiqids_Login-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs6_logiqids_Login-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs11_logiqids_Login-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs13_logiqids_HOME-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs3_logiqids_HOME-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "cssURL2_logiqids_Login-success", "isController": false}, {"data": [[1.69400022E12, 0.75], [1.69400016E12, 0.9166666666666666]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs1_logiqids_Login-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs5_logiqids_Login-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "logiqids_olympiad-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs16_logiqids_Login-success", "isController": false}, {"data": [[1.69400022E12, 1.6], [1.69400016E12, 0.06666666666666667]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs2_logiqids_HOME-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400022E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad-success", "isController": false}, {"data": [[1.69400016E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs9_logiqids_Login-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69400022E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 75.68333333333334, "minX": 1.69400016E12, "maxY": 75.98333333333333, "series": [{"data": [[1.69400022E12, 75.68333333333334], [1.69400016E12, 75.98333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69400022E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
