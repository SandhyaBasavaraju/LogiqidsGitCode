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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 100.0, "series": [{"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[0.0, 56.0], [100.0, 44.0]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[0.0, 91.0], [100.0, 7.0], [200.0, 2.0]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[0.0, 9.0], [600.0, 24.0], [700.0, 23.0], [100.0, 21.0], [200.0, 3.0], [800.0, 9.0], [900.0, 2.0], [500.0, 9.0]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[0.0, 42.0], [100.0, 37.0], [200.0, 21.0]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[0.0, 1.0], [300.0, 41.0], [200.0, 26.0], [400.0, 31.0], [100.0, 1.0]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[0.0, 94.0], [200.0, 1.0], [100.0, 5.0]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[0.0, 26.0], [300.0, 17.0], [100.0, 16.0], [200.0, 31.0], [400.0, 10.0]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[0.0, 94.0], [200.0, 3.0], [100.0, 3.0]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[0.0, 22.0], [300.0, 19.0], [100.0, 33.0], [200.0, 24.0], [400.0, 2.0]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[0.0, 76.0], [100.0, 24.0]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[0.0, 74.0], [100.0, 17.0], [200.0, 9.0]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[0.0, 73.0], [600.0, 12.0], [700.0, 4.0], [400.0, 1.0], [500.0, 10.0]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[0.0, 68.0], [100.0, 32.0]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[0.0, 53.0], [600.0, 1.0], [300.0, 7.0], [400.0, 8.0], [200.0, 9.0], [100.0, 6.0], [500.0, 16.0]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[0.0, 99.0], [100.0, 1.0]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[0.0, 99.0], [100.0, 1.0]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[4300.0, 17.0], [4200.0, 7.0], [4400.0, 9.0], [4500.0, 7.0], [4600.0, 14.0], [4800.0, 17.0], [4700.0, 29.0]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 4800.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 100.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 8890.0, "series": [{"data": [[0.0, 8890.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 110.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 100.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 99.03322894919981, "minX": 1.69407714E12, "maxY": 100.0, "series": [{"data": [[1.69407714E12, 100.0], [1.6940772E12, 99.03322894919981]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6940772E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 2.0, "minX": 1.0, "maxY": 4603.96, "series": [{"data": [[100.0, 7.209999999999999]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[100.0, 7.209999999999999]], "isOverall": false, "label": "jsURLs12_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 5.580000000000003]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[100.0, 5.580000000000003]], "isOverall": false, "label": "jsURLs9_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 5.85]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[100.0, 5.85]], "isOverall": false, "label": "jsURLs17_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 3.8499999999999996]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.8499999999999996]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 3.5899999999999994]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.5899999999999994]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 91.42999999999998]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[100.0, 91.42999999999998]], "isOverall": false, "label": "cssURL2_logiqids_HOME-Aggregated", "isController": false}, {"data": [[83.0, 5.0], [82.0, 5.0], [85.0, 7.0], [84.0, 3.0], [91.0, 3.1363636363636367], [90.0, 2.9999999999999996], [88.0, 3.333333333333333], [95.0, 5.8999999999999995], [93.0, 2.75], [99.0, 3.0], [98.0, 3.0], [96.0, 3.5384615384615383], [100.0, 3.9000000000000004]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[93.62999999999998, 3.6799999999999997]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 37.480000000000004]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[100.0, 37.480000000000004]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 519.64]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[100.0, 519.64]], "isOverall": false, "label": "jsURLs5_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 3.73]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[100.0, 3.73]], "isOverall": false, "label": "jsURLs12_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 3.3000000000000003]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[100.0, 3.3000000000000003]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 4.93]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[100.0, 4.93]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 113.40999999999998]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[100.0, 113.40999999999998]], "isOverall": false, "label": "jsURLs4_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 6.100000000000002]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[100.0, 6.100000000000002]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 4.1000000000000005]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[100.0, 4.1000000000000005]], "isOverall": false, "label": "logiqids_Login-Aggregated", "isController": false}, {"data": [[2.0, 4.0], [3.0, 3.0], [5.0, 3.0], [6.0, 3.0], [8.0, 3.0], [10.0, 2.5], [12.0, 3.0], [14.0, 2.5], [15.0, 3.0], [16.0, 3.0], [17.0, 3.0], [18.0, 3.0], [19.0, 3.0], [20.0, 3.0], [22.0, 3.0], [23.0, 2.0], [24.0, 3.0], [25.0, 4.0], [26.0, 4.0], [27.0, 3.0], [28.0, 3.0], [29.0, 4.0], [33.0, 8.0], [32.0, 3.6666666666666665], [35.0, 6.0], [37.0, 9.0], [36.0, 3.0], [38.0, 5.0], [41.0, 4.0], [43.0, 5.0], [42.0, 2.0], [45.0, 8.0], [44.0, 4.0], [47.0, 6.0], [49.0, 3.0], [48.0, 3.0], [51.0, 4.0], [50.0, 5.0], [55.0, 4.0], [54.0, 4.0], [57.0, 2.0], [56.0, 3.0], [59.0, 3.0], [58.0, 3.0], [61.0, 2.0], [60.0, 3.0], [63.0, 3.0], [67.0, 7.0], [64.0, 4.0], [71.0, 3.0], [69.0, 3.0], [68.0, 6.0], [75.0, 3.0], [74.0, 3.0], [73.0, 3.5], [79.0, 9.0], [78.0, 4.0], [77.0, 5.0], [83.0, 5.0], [82.0, 4.0], [81.0, 7.0], [80.0, 8.0], [86.0, 8.0], [85.0, 3.0], [84.0, 3.0], [91.0, 3.0], [90.0, 3.0], [88.0, 4.0], [95.0, 2.5], [93.0, 3.0], [99.0, 3.0], [98.0, 3.0], [97.0, 3.0], [96.0, 4.0], [100.0, 4.0], [1.0, 3.0]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[50.8, 3.8899999999999992]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 5.140000000000002]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[100.0, 5.140000000000002]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 3.4600000000000004]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[100.0, 3.4600000000000004]], "isOverall": false, "label": "jsURLs8_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 3.669999999999999]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[100.0, 3.669999999999999]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 3.21]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.21]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 346.36999999999995]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[100.0, 346.36999999999995]], "isOverall": false, "label": "cssURL1_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 10.019999999999998]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[100.0, 10.019999999999998]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 3.919999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[100.0, 3.919999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 3.89]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[100.0, 3.89]], "isOverall": false, "label": "jsURLs8_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 3.3299999999999996]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[100.0, 3.3299999999999996]], "isOverall": false, "label": "jsURLs7_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 3.840000000000001]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[100.0, 3.840000000000001]], "isOverall": false, "label": "jsURLs10_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 18.21000000000001]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[100.0, 18.21000000000001]], "isOverall": false, "label": "jsURLs3_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 14.030000000000001]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[100.0, 14.030000000000001]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 3.4199999999999995]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.4199999999999995]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 6.120000000000002]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[100.0, 6.120000000000002]], "isOverall": false, "label": "jsURLs11_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 214.82999999999998]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[100.0, 214.82999999999998]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 3.1500000000000004]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.1500000000000004]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 4.080000000000001]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[100.0, 4.080000000000001]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 3.8700000000000006]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.8700000000000006]], "isOverall": false, "label": "logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 10.620000000000003]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[100.0, 10.620000000000003]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 3.930000000000001]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[100.0, 3.930000000000001]], "isOverall": false, "label": "jsURLs19_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 3.459999999999999]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.459999999999999]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 3.1299999999999994]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[100.0, 3.1299999999999994]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 16.26]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[100.0, 16.26]], "isOverall": false, "label": "jsURLs6_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 195.28000000000003]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[100.0, 195.28000000000003]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 5.300000000000001]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[100.0, 5.300000000000001]], "isOverall": false, "label": "jsURLs18_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 4.04]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[100.0, 4.04]], "isOverall": false, "label": "logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 5.65]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[100.0, 5.65]], "isOverall": false, "label": "jsURLs7_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 3.4100000000000006]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.4100000000000006]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 4.320000000000001]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[100.0, 4.320000000000001]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 3.61]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.61]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 71.78000000000002]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[100.0, 71.78000000000002]], "isOverall": false, "label": "jsURLs2_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 61.83]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[100.0, 61.83]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 3.9200000000000017]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[100.0, 3.9200000000000017]], "isOverall": false, "label": "jsURLs9_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 4.740000000000002]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[100.0, 4.740000000000002]], "isOverall": false, "label": "cssURL2_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 4.29]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[100.0, 4.29]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 4.2200000000000015]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[100.0, 4.2200000000000015]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 169.89000000000001]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[100.0, 169.89000000000001]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 3.75]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.75]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 3.599999999999999]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[100.0, 3.599999999999999]], "isOverall": false, "label": "jsURLs1_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 4.890000000000001]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[100.0, 4.890000000000001]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 5.620000000000003]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[100.0, 5.620000000000003]], "isOverall": false, "label": "cssURL3_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 3.65]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[100.0, 3.65]], "isOverall": false, "label": "jsURLs11_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 11.91]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[100.0, 11.91]], "isOverall": false, "label": "jsURLs1_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 5.73]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[100.0, 5.73]], "isOverall": false, "label": "jsURLs6_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 11.139999999999995]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[100.0, 11.139999999999995]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 4.240000000000004]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[100.0, 4.240000000000004]], "isOverall": false, "label": "jsURLs16_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 3.9700000000000006]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[100.0, 3.9700000000000006]], "isOverall": false, "label": "cssURL1_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 62.64]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[100.0, 62.64]], "isOverall": false, "label": "jsURLs4_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 3.120000000000001]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.120000000000001]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 3.2000000000000006]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.2000000000000006]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 196.29000000000002]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[100.0, 196.29000000000002]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 8.559999999999997]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[100.0, 8.559999999999997]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 7.419999999999997]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[100.0, 7.419999999999997]], "isOverall": false, "label": "jsURLs2_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 3.2899999999999987]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[100.0, 3.2899999999999987]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 3.749999999999999]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[100.0, 3.749999999999999]], "isOverall": false, "label": "cssURL2_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 6.410000000000002]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[100.0, 6.410000000000002]], "isOverall": false, "label": "jsURLs15_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 4.710000000000002]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[100.0, 4.710000000000002]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 4.049999999999999]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[100.0, 4.049999999999999]], "isOverall": false, "label": "cssURL1_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 7.509999999999998]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[100.0, 7.509999999999998]], "isOverall": false, "label": "jsURLs3_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 9.840000000000002]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[100.0, 9.840000000000002]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 9.419999999999998]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[100.0, 9.419999999999998]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 5.269999999999999]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[100.0, 5.269999999999999]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 3.7200000000000006]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.7200000000000006]], "isOverall": false, "label": "cssURL2_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 3.3399999999999994]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.3399999999999994]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 3.350000000000001]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[100.0, 3.350000000000001]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 5.079999999999998]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[100.0, 5.079999999999998]], "isOverall": false, "label": "jsURLs5_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 3.5799999999999996]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[100.0, 3.5799999999999996]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[100.0, 3.520000000000002]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[100.0, 3.520000000000002]], "isOverall": false, "label": "jsURLs10_logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 7.57]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[100.0, 7.57]], "isOverall": false, "label": "jsURLs14_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 4603.96]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[100.0, 4603.96]], "isOverall": false, "label": "logiqids_HOME-Aggregated", "isController": false}, {"data": [[100.0, 4.129999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[100.0, 4.129999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_Login-Aggregated", "isController": false}, {"data": [[100.0, 4.630000000000002]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[100.0, 4.630000000000002]], "isOverall": false, "label": "cssURL1_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 3.9599999999999995]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[100.0, 3.9599999999999995]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 4.01]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[100.0, 4.01]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[100.0, 3.25]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}, {"data": [[100.0, 3.25]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 13577.066666666668, "minX": 1.69407714E12, "maxY": 1.814631905E7, "series": [{"data": [[1.69407714E12, 1.1017443666666666E7], [1.6940772E12, 1.814631905E7]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69407714E12, 13577.066666666668], [1.6940772E12, 28677.933333333334]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6940772E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 3.120000000000001, "minX": 1.69407714E12, "maxY": 4603.96, "series": [{"data": [[1.69407714E12, 7.209999999999999]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[1.69407714E12, 5.580000000000003]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 5.85]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 3.8499999999999996]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 3.5899999999999994]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 91.42999999999998]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 3.6799999999999997]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 37.480000000000004]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 519.64]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 3.73]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 3.3000000000000003]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 4.93]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 113.40999999999998]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 6.100000000000002]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 4.1000000000000005]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 3.8899999999999992]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 5.140000000000002]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 3.4600000000000004]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 3.669999999999999]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 3.21]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 346.36999999999995]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 10.019999999999998]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 3.919999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[1.69407714E12, 3.89]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[1.69407714E12, 3.3299999999999996]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 3.840000000000001]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 18.21000000000001]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 14.030000000000001]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 3.4199999999999995]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 6.120000000000002]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 214.82999999999998]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 3.1500000000000004]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 4.080000000000001]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 3.8700000000000006]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 10.620000000000003]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 3.930000000000001]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 3.459999999999999]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 3.1299999999999994]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 16.26]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 195.28000000000003]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 5.300000000000001]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 4.04]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 5.65]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 3.4100000000000006]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 4.320000000000001]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 3.61]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 71.78000000000002]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 61.83]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 3.9200000000000017]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 4.740000000000002]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 4.29]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 4.2200000000000015]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 169.89000000000001]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 3.75]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 3.599999999999999]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 4.890000000000001]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 5.620000000000003]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 3.65]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 11.91]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[1.69407714E12, 5.73]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 11.139999999999995]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 4.240000000000004]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 3.9700000000000006]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 62.64]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 3.120000000000001]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 3.2000000000000006]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 196.29000000000002]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 8.559999999999997]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 7.419999999999997]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 3.2899999999999987]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 3.749999999999999]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 4.0], [1.6940772E12, 6.434343434343437]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 4.710000000000002]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 4.049999999999999]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 7.509999999999998]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 9.840000000000002]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 9.419999999999998]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 5.269999999999999]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 3.7200000000000006]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 3.3399999999999994]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 3.350000000000001]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 5.079999999999998]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 3.5799999999999996]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 3.520000000000002]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[1.69407714E12, 3.529411764705882], [1.6940772E12, 11.775510204081636]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 4603.96]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[1.69407714E12, 4.129999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 4.630000000000002]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 3.9599999999999995]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 4.01]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 3.25]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6940772E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 3.120000000000001, "minX": 1.69407714E12, "maxY": 4514.960000000001, "series": [{"data": [[1.69407714E12, 7.129999999999997]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[1.69407714E12, 5.509999999999997]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 5.829999999999998]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 3.789999999999999]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 3.5500000000000003]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 72.55999999999999]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 3.6300000000000003]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 12.81]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 130.71]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 3.72]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 3.2900000000000005]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 4.4]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 37.50999999999999]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 5.230000000000002]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 4.1000000000000005]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 3.8899999999999992]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 5.130000000000002]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 3.45]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 3.6599999999999997]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 3.200000000000001]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 80.92]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 10.019999999999998]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 3.9099999999999993]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[1.69407714E12, 3.8700000000000006]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[1.69407714E12, 3.289999999999999]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 3.7899999999999987]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 14.929999999999998]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 13.520000000000007]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 3.3800000000000012]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 6.000000000000002]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 31.299999999999983]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 3.1300000000000012]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 4.080000000000001]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 3.8700000000000006]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 7.899999999999999]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 3.930000000000001]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 3.4499999999999993]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 3.1299999999999994]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 15.690000000000007]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 36.660000000000004]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 5.290000000000001]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 4.019999999999999]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 5.42]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 3.3400000000000003]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 4.320000000000001]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 3.4299999999999997]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 32.599999999999994]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 14.129999999999994]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 3.8900000000000006]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 4.69]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 4.2799999999999985]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 4.089999999999999]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 169.88]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 3.6300000000000012]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 3.599999999999999]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 4.75]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 5.61]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 3.65]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 11.869999999999997]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[1.69407714E12, 5.700000000000001]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 9.02]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 4.200000000000001]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 3.8099999999999996]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 23.560000000000002]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 3.120000000000001]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 3.2000000000000006]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 196.27999999999994]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 6.549999999999999]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 6.370000000000003]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 3.2899999999999987]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 3.72]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 4.0], [1.6940772E12, 6.414141414141414]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 4.700000000000001]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 3.710000000000001]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 6.269999999999999]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 9.030000000000001]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 7.150000000000003]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 5.1899999999999995]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 3.5600000000000014]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 3.3300000000000005]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 3.3000000000000003]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 4.74]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 3.5499999999999994]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 3.4900000000000007]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[1.69407714E12, 3.490196078431373], [1.6940772E12, 11.775510204081636]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 4514.960000000001]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[1.69407714E12, 4.040000000000001]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 4.080000000000001]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 3.799999999999999]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 4.01]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 3.25]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6940772E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69407714E12, "maxY": 4462.84, "series": [{"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 9.190000000000003]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 147.17]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 177.34999999999982]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 0.0], [1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[1.69407714E12, 0.0], [1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[1.69407714E12, 4462.84]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[1.69407714E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[1.6940772E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6940772E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 2.0, "minX": 1.69407714E12, "maxY": 4846.0, "series": [{"data": [[1.69407714E12, 4846.0], [1.6940772E12, 759.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69407714E12, 160.0], [1.6940772E12, 18.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69407714E12, 4748.469999999999], [1.6940772E12, 415.18000000000393]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69407714E12, 488.6999999999962], [1.6940772E12, 84.55000000000018]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69407714E12, 2.0], [1.6940772E12, 2.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69407714E12, 4.0], [1.6940772E12, 3.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6940772E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 3.0, "minX": 38.0, "maxY": 553.0, "series": [{"data": [[38.0, 3.0], [45.0, 3.0], [55.0, 553.0], [69.0, 34.0], [85.0, 10.0], [86.0, 71.5], [88.0, 110.0], [91.0, 3.0], [95.0, 4.0], [97.0, 3.0], [96.0, 4.0], [99.0, 4.0], [98.0, 4.0], [100.0, 4.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 100.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 3.0, "minX": 38.0, "maxY": 36.0, "series": [{"data": [[38.0, 3.0], [45.0, 3.0], [55.0, 36.0], [69.0, 15.0], [85.0, 7.0], [86.0, 24.0], [88.0, 20.0], [91.0, 3.0], [95.0, 4.0], [97.0, 3.0], [96.0, 4.0], [99.0, 4.0], [98.0, 3.0], [100.0, 3.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 100.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 55.86666666666667, "minX": 1.69407714E12, "maxY": 95.8, "series": [{"data": [[1.69407714E12, 55.86666666666667], [1.6940772E12, 95.8]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6940772E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 55.86666666666667, "minX": 1.69407714E12, "maxY": 95.8, "series": [{"data": [[1.69407714E12, 55.86666666666667], [1.6940772E12, 95.8]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6940772E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69407714E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs12_logiqids_Login-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs4_logiqids_HOME-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs11_logiqids_HOME-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "cssURL1_logiqids_HOME-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "cssURL1_logiqids_Login-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "logiqids_HOME-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "logiqids_sign_up-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "cssURL2_logiqids_sign_up-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs5_logiqids_HOME-success", "isController": false}, {"data": [[1.69407714E12, 0.016666666666666666], [1.6940772E12, 1.65]], "isOverall": false, "label": "jsURLs15_logiqids_Login-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs12_logiqids_HOME-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs4_logiqids_Login-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs19_logiqids_Login-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs8_logiqids_Login-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "cssURL1_logiqids_olympiad-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs13_logiqids_Login-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "logiqids_Login-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs6_logiqids_HOME-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs18_logiqids_Login-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "cssURL2_logiqids_HOME-success", "isController": false}, {"data": [[1.69407714E12, 0.85], [1.6940772E12, 0.8166666666666667]], "isOverall": false, "label": "jsURLs14_logiqids_Login-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs3_logiqids_Login-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs7_logiqids_HOME-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs10_logiqids_HOME-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs7_logiqids_Login-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs9_logiqids_HOME-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs10_logiqids_Login-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs8_logiqids_HOME-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "cssURL3_logiqids_Login-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "cssURL2_logiqids_olympiad-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs1_logiqids_HOME-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs2_logiqids_Login-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "cssURL1_logiqids_sign_up-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs17_logiqids_Login-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs6_logiqids_Login-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs11_logiqids_Login-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs13_logiqids_HOME-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs3_logiqids_HOME-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "cssURL2_logiqids_Login-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs1_logiqids_Login-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs5_logiqids_Login-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "logiqids_olympiad-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs16_logiqids_Login-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs2_logiqids_HOME-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad-success", "isController": false}, {"data": [[1.6940772E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad-success", "isController": false}, {"data": [[1.69407714E12, 1.6666666666666667]], "isOverall": false, "label": "jsURLs9_logiqids_Login-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6940772E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 55.86666666666667, "minX": 1.69407714E12, "maxY": 95.8, "series": [{"data": [[1.69407714E12, 55.86666666666667], [1.6940772E12, 95.8]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6940772E12, "title": "Total Transactions Per Second"}},
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
