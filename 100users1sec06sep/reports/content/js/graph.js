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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 100.0, "series": [{"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[0.0, 99.0], [100.0, 1.0]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[0.0, 79.0], [200.0, 4.0], [100.0, 17.0]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[0.0, 90.0], [100.0, 6.0], [200.0, 4.0]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[0.0, 98.0], [100.0, 2.0]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[0.0, 90.0], [100.0, 9.0], [200.0, 1.0]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[0.0, 86.0], [100.0, 9.0], [200.0, 5.0]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[0.0, 90.0], [600.0, 1.0], [700.0, 1.0], [800.0, 1.0], [400.0, 1.0], [900.0, 5.0], [500.0, 1.0]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[0.0, 100.0]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 900.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 9.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 9091.0, "series": [{"data": [[0.0, 9091.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 9.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 9.51086956521739, "minX": 1.69399758E12, "maxY": 10.0, "series": [{"data": [[1.69399866E12, 10.0], [1.69399896E12, 10.0], [1.69399806E12, 10.0], [1.69399836E12, 10.0], [1.69399794E12, 10.0], [1.69399824E12, 10.0], [1.69399926E12, 10.0], [1.69399764E12, 10.0], [1.69399914E12, 10.0], [1.69399944E12, 9.51086956521739], [1.69399854E12, 10.0], [1.69399884E12, 10.0], [1.69399842E12, 10.0], [1.69399872E12, 10.0], [1.69399782E12, 10.0], [1.69399812E12, 10.0], [1.6939977E12, 10.0], [1.693998E12, 10.0], [1.69399902E12, 10.0], [1.69399932E12, 10.0], [1.6939989E12, 10.0], [1.6939992E12, 10.0], [1.6939983E12, 10.0], [1.6939986E12, 10.0], [1.69399818E12, 10.0], [1.69399848E12, 10.0], [1.69399788E12, 10.0], [1.69399758E12, 10.0], [1.69399938E12, 10.0], [1.69399776E12, 10.0], [1.69399878E12, 10.0], [1.69399908E12, 10.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69399944E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 2.0, "minX": 1.0, "maxY": 80.74999999999997, "series": [{"data": [[10.0, 3.8099999999999996]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[10.0, 3.8099999999999996]], "isOverall": false, "label": "jsURLs12_logiqids_HOME-Aggregated", "isController": false}, {"data": [[10.0, 3.4000000000000004]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[10.0, 3.4000000000000004]], "isOverall": false, "label": "jsURLs9_logiqids_HOME-Aggregated", "isController": false}, {"data": [[10.0, 3.169999999999999]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[10.0, 3.169999999999999]], "isOverall": false, "label": "jsURLs17_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 3.500000000000001]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[10.0, 3.500000000000001]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 4.500000000000001]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[10.0, 4.500000000000001]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 4.179999999999997]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[10.0, 4.179999999999997]], "isOverall": false, "label": "cssURL2_logiqids_HOME-Aggregated", "isController": false}, {"data": [[10.0, 4.3400000000000025]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[10.0, 4.3400000000000025]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 11.340000000000002]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[10.0, 11.340000000000002]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 63.05000000000001]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[10.0, 63.05000000000001]], "isOverall": false, "label": "jsURLs5_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 3.3599999999999994]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[10.0, 3.3599999999999994]], "isOverall": false, "label": "jsURLs12_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 4.659999999999999]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[10.0, 4.659999999999999]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 5.090000000000002]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[10.0, 5.090000000000002]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 34.61999999999999]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[10.0, 34.61999999999999]], "isOverall": false, "label": "jsURLs4_logiqids_HOME-Aggregated", "isController": false}, {"data": [[10.0, 4.499999999999998]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[10.0, 4.499999999999998]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 3.6099999999999994]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[10.0, 3.6099999999999994]], "isOverall": false, "label": "logiqids_Login-Aggregated", "isController": false}, {"data": [[8.0, 2.0], [4.0, 3.0], [2.0, 2.0], [1.0, 2.0], [9.0, 3.0], [10.0, 4.549450549450549], [5.0, 2.0], [6.0, 3.0], [3.0, 2.0], [7.0, 2.0]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[9.55, 4.35]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 6.369999999999998]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[10.0, 6.369999999999998]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 4.71]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[10.0, 4.71]], "isOverall": false, "label": "jsURLs8_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 4.660000000000001]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[10.0, 4.660000000000001]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 3.440000000000001]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[10.0, 3.440000000000001]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 11.360000000000001]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[10.0, 11.360000000000001]], "isOverall": false, "label": "cssURL1_logiqids_HOME-Aggregated", "isController": false}, {"data": [[10.0, 3.999999999999997]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[10.0, 3.999999999999997]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 3.22]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[10.0, 3.22]], "isOverall": false, "label": "jsURLs13_logiqids_HOME-Aggregated", "isController": false}, {"data": [[10.0, 4.090000000000002]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[10.0, 4.090000000000002]], "isOverall": false, "label": "jsURLs8_logiqids_HOME-Aggregated", "isController": false}, {"data": [[10.0, 5.109999999999999]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[10.0, 5.109999999999999]], "isOverall": false, "label": "jsURLs7_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 5.839999999999999]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[10.0, 5.839999999999999]], "isOverall": false, "label": "jsURLs10_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 10.500000000000005]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[10.0, 10.500000000000005]], "isOverall": false, "label": "jsURLs3_logiqids_HOME-Aggregated", "isController": false}, {"data": [[10.0, 4.7200000000000015]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[10.0, 4.7200000000000015]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 4.300000000000004]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[10.0, 4.300000000000004]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 3.6100000000000003]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[10.0, 3.6100000000000003]], "isOverall": false, "label": "jsURLs11_logiqids_HOME-Aggregated", "isController": false}, {"data": [[10.0, 40.620000000000005]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[10.0, 40.620000000000005]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 3.5499999999999994]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[10.0, 3.5499999999999994]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 5.340000000000002]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[10.0, 5.340000000000002]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 3.9499999999999997]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[10.0, 3.9499999999999997]], "isOverall": false, "label": "logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 4.430000000000002]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[10.0, 4.430000000000002]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 3.1400000000000006]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[10.0, 3.1400000000000006]], "isOverall": false, "label": "jsURLs19_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 3.560000000000001]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[10.0, 3.560000000000001]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 3.4000000000000004]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[10.0, 3.4000000000000004]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 5.0299999999999985]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[10.0, 5.0299999999999985]], "isOverall": false, "label": "jsURLs6_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 50.50999999999999]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[10.0, 50.50999999999999]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 3.57]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[10.0, 3.57]], "isOverall": false, "label": "jsURLs18_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 3.75]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[10.0, 3.75]], "isOverall": false, "label": "logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 3.7199999999999998]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[10.0, 3.7199999999999998]], "isOverall": false, "label": "jsURLs7_logiqids_HOME-Aggregated", "isController": false}, {"data": [[10.0, 3.9900000000000007]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[10.0, 3.9900000000000007]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 3.8499999999999996]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[10.0, 3.8499999999999996]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 3.5799999999999987]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[10.0, 3.5799999999999987]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 7.179999999999996]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[10.0, 7.179999999999996]], "isOverall": false, "label": "jsURLs2_logiqids_HOME-Aggregated", "isController": false}, {"data": [[10.0, 11.070000000000006]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[10.0, 11.070000000000006]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 4.6]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[10.0, 4.6]], "isOverall": false, "label": "jsURLs9_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 3.5100000000000007]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[10.0, 3.5100000000000007]], "isOverall": false, "label": "cssURL2_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 3.569999999999998]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[10.0, 3.569999999999998]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 5.22]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[10.0, 5.22]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 4.15]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[10.0, 4.15]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 3.6300000000000012]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[10.0, 3.6300000000000012]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 3.4499999999999993]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[10.0, 3.4499999999999993]], "isOverall": false, "label": "jsURLs1_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 4.540000000000001]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[10.0, 4.540000000000001]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 3.2500000000000004]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[10.0, 3.2500000000000004]], "isOverall": false, "label": "cssURL3_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 6.57]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[10.0, 6.57]], "isOverall": false, "label": "jsURLs11_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 3.5299999999999985]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[10.0, 3.5299999999999985]], "isOverall": false, "label": "jsURLs1_logiqids_HOME-Aggregated", "isController": false}, {"data": [[10.0, 3.410000000000001]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[10.0, 3.410000000000001]], "isOverall": false, "label": "jsURLs6_logiqids_HOME-Aggregated", "isController": false}, {"data": [[10.0, 4.820000000000002]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[10.0, 4.820000000000002]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 3.2699999999999987]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[10.0, 3.2699999999999987]], "isOverall": false, "label": "jsURLs16_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 3.650000000000001]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[10.0, 3.650000000000001]], "isOverall": false, "label": "cssURL1_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 10.019999999999996]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[10.0, 10.019999999999996]], "isOverall": false, "label": "jsURLs4_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 3.7899999999999996]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[10.0, 3.7899999999999996]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 5.3100000000000005]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[10.0, 5.3100000000000005]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 3.970000000000001]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[10.0, 3.970000000000001]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 6.180000000000001]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[10.0, 6.180000000000001]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 4.690000000000001]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[10.0, 4.690000000000001]], "isOverall": false, "label": "jsURLs2_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 4.420000000000003]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[10.0, 4.420000000000003]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 3.57]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[10.0, 3.57]], "isOverall": false, "label": "cssURL2_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 3.3199999999999994]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[10.0, 3.3199999999999994]], "isOverall": false, "label": "jsURLs15_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 3.579999999999999]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[10.0, 3.579999999999999]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 3.5599999999999983]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[10.0, 3.5599999999999983]], "isOverall": false, "label": "cssURL1_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 4.840000000000001]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[10.0, 4.840000000000001]], "isOverall": false, "label": "jsURLs3_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 7.990000000000003]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[10.0, 7.990000000000003]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 4.509999999999999]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[10.0, 4.509999999999999]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 4.48]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[10.0, 4.48]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 3.8200000000000007]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[10.0, 3.8200000000000007]], "isOverall": false, "label": "cssURL2_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 3.5699999999999994]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[10.0, 3.5699999999999994]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 4.199999999999999]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[10.0, 4.199999999999999]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 7.01]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[10.0, 7.01]], "isOverall": false, "label": "jsURLs5_logiqids_HOME-Aggregated", "isController": false}, {"data": [[10.0, 3.19]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[10.0, 3.19]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up-Aggregated", "isController": false}, {"data": [[10.0, 3.630000000000001]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[10.0, 3.630000000000001]], "isOverall": false, "label": "jsURLs10_logiqids_HOME-Aggregated", "isController": false}, {"data": [[10.0, 3.3899999999999992]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[10.0, 3.3899999999999992]], "isOverall": false, "label": "jsURLs14_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 80.74999999999997]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[10.0, 80.74999999999997]], "isOverall": false, "label": "logiqids_HOME-Aggregated", "isController": false}, {"data": [[10.0, 4.11]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[10.0, 4.11]], "isOverall": false, "label": "jsURLs13_logiqids_Login-Aggregated", "isController": false}, {"data": [[10.0, 4.059999999999998]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[10.0, 4.059999999999998]], "isOverall": false, "label": "cssURL1_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 4.52]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[10.0, 4.52]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 3.739999999999999]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[10.0, 3.739999999999999]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad-Aggregated", "isController": false}, {"data": [[10.0, 3.3400000000000007]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}, {"data": [[10.0, 3.3400000000000007]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 136.83333333333334, "minX": 1.69399758E12, "maxY": 1676614.85, "series": [{"data": [[1.69399866E12, 920275.6833333333], [1.69399896E12, 1397373.8333333333], [1.69399806E12, 888737.1666666666], [1.69399836E12, 1086250.9666666666], [1.69399794E12, 934704.2166666667], [1.69399824E12, 890749.0333333333], [1.69399926E12, 328932.7166666667], [1.69399764E12, 1081603.45], [1.69399914E12, 1648613.1666666667], [1.69399944E12, 52564.433333333334], [1.69399854E12, 1095783.1666666667], [1.69399884E12, 922320.9666666667], [1.69399842E12, 892167.8333333334], [1.69399872E12, 1097075.35], [1.69399782E12, 1083723.6666666667], [1.69399812E12, 934910.3166666667], [1.6939977E12, 891185.6833333333], [1.693998E12, 1092283.6166666667], [1.69399902E12, 912219.7], [1.69399932E12, 1676614.85], [1.6939989E12, 592217.45], [1.6939992E12, 909397.9166666666], [1.6939983E12, 934945.05], [1.6939986E12, 891227.6666666666], [1.69399818E12, 1087716.7166666666], [1.69399848E12, 927272.8333333334], [1.69399788E12, 888306.6666666666], [1.69399758E12, 18934.666666666668], [1.69399938E12, 903838.3166666667], [1.69399776E12, 934704.4166666666], [1.69399878E12, 892802.6833333333], [1.69399908E12, 354308.3]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.69399866E12, 1592.1], [1.69399896E12, 1597.6333333333334], [1.69399806E12, 1598.0], [1.69399836E12, 1552.7666666666667], [1.69399794E12, 1596.3333333333333], [1.69399824E12, 1586.9666666666667], [1.69399926E12, 1562.5], [1.69399764E12, 1208.2333333333333], [1.69399914E12, 1593.65], [1.69399944E12, 498.96666666666664], [1.69399854E12, 1565.5], [1.69399884E12, 1586.7], [1.69399842E12, 1596.1666666666667], [1.69399872E12, 1554.45], [1.69399782E12, 1589.0], [1.69399812E12, 1570.75], [1.6939977E12, 1453.6], [1.693998E12, 1583.8333333333333], [1.69399902E12, 1591.95], [1.69399932E12, 1599.3333333333333], [1.6939989E12, 1553.0666666666666], [1.6939992E12, 1597.1666666666667], [1.6939983E12, 1597.6666666666667], [1.6939986E12, 1596.0], [1.69399818E12, 1557.85], [1.69399848E12, 1597.5], [1.69399788E12, 1578.8333333333333], [1.69399758E12, 136.83333333333334], [1.69399938E12, 1586.3666666666666], [1.69399776E12, 1509.1666666666667], [1.69399878E12, 1590.85], [1.69399908E12, 1562.7666666666667]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69399944E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 2.2000000000000006, "minX": 1.69399758E12, "maxY": 776.5, "series": [{"data": [[1.69399818E12, 3.3000000000000003], [1.693998E12, 3.1], [1.69399854E12, 3.1], [1.69399836E12, 2.8999999999999995], [1.6939989E12, 4.199999999999999], [1.69399872E12, 4.1], [1.69399782E12, 4.199999999999999], [1.69399926E12, 4.0], [1.69399764E12, 5.9], [1.69399908E12, 3.3000000000000003]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[1.69399818E12, 2.6999999999999997], [1.693998E12, 2.8], [1.69399854E12, 3.2], [1.69399836E12, 2.5], [1.6939989E12, 3.9], [1.69399872E12, 3.9], [1.69399782E12, 3.3000000000000003], [1.69399926E12, 4.0], [1.69399764E12, 5.199999999999999], [1.69399908E12, 2.5]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[1.6939977E12, 3.3000000000000003], [1.69399914E12, 3.8], [1.69399896E12, 2.5], [1.69399806E12, 4.3], [1.69399788E12, 2.5], [1.69399932E12, 2.5], [1.69399842E12, 2.5999999999999996], [1.69399824E12, 4.0], [1.69399878E12, 3.6999999999999997], [1.6939986E12, 2.5]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[1.69399866E12, 4.0], [1.69399848E12, 3.0], [1.69399902E12, 3.7999999999999994], [1.69399884E12, 3.3000000000000003], [1.69399794E12, 3.4000000000000004], [1.69399938E12, 3.7999999999999994], [1.69399776E12, 3.0], [1.6939992E12, 2.2000000000000006], [1.6939983E12, 4.6], [1.69399812E12, 3.8999999999999995]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 4.1], [1.69399848E12, 2.6999999999999997], [1.69399944E12, 2.8999999999999995], [1.69399902E12, 4.0], [1.69399884E12, 2.5999999999999996], [1.69399794E12, 4.6], [1.69399776E12, 3.0], [1.6939992E12, 12.4], [1.6939983E12, 4.6], [1.69399812E12, 4.1]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 2.6999999999999997], [1.693998E12, 3.0999999999999996], [1.69399854E12, 2.3000000000000003], [1.69399836E12, 2.6999999999999997], [1.69399758E12, 13.0], [1.6939989E12, 3.7999999999999994], [1.69399872E12, 4.2], [1.69399782E12, 2.9999999999999996], [1.69399926E12, 3.9], [1.69399908E12, 3.1000000000000005]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[1.69399944E12, 2.3000000000000003], [1.69399854E12, 3.2], [1.69399836E12, 3.375], [1.69399794E12, 13.5], [1.6939989E12, 4.0], [1.69399776E12, 3.2], [1.69399872E12, 4.5], [1.6939983E12, 3.0], [1.69399926E12, 3.7999999999999994], [1.69399812E12, 3.0], [1.69399908E12, 2.6]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 11.4], [1.69399848E12, 5.8999999999999995], [1.69399902E12, 11.100000000000001], [1.69399884E12, 22.9], [1.69399794E12, 13.600000000000001], [1.69399938E12, 13.1], [1.69399776E12, 7.7], [1.6939992E12, 6.600000000000001], [1.6939983E12, 10.600000000000001], [1.69399812E12, 10.499999999999998]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 41.7], [1.69399914E12, 40.0], [1.693998E12, 55.6], [1.69399896E12, 83.875], [1.69399854E12, 61.800000000000004], [1.69399836E12, 59.9], [1.69399932E12, 61.8], [1.6939989E12, 23.0], [1.69399872E12, 51.0], [1.69399782E12, 61.6], [1.69399764E12, 125.39999999999999]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[1.69399914E12, 4.1], [1.69399896E12, 2.3000000000000007], [1.69399806E12, 3.7999999999999994], [1.69399932E12, 2.5999999999999996], [1.69399842E12, 2.5999999999999996], [1.69399824E12, 3.9], [1.69399782E12, 3.1], [1.69399878E12, 4.400000000000001], [1.69399764E12, 3.900000000000001], [1.6939986E12, 2.9]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 2.6999999999999997], [1.69399866E12, 4.9], [1.69399806E12, 4.3], [1.69399902E12, 4.1], [1.69399788E12, 3.4000000000000004], [1.69399884E12, 2.9], [1.69399842E12, 5.6], [1.69399938E12, 4.1000000000000005], [1.69399824E12, 11.7], [1.6939992E12, 2.9]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 4.2], [1.69399848E12, 3.4000000000000004], [1.69399944E12, 2.5999999999999996], [1.69399902E12, 3.0], [1.69399884E12, 14.7], [1.69399794E12, 4.9], [1.69399776E12, 3.4000000000000004], [1.6939983E12, 4.3], [1.69399926E12, 4.9], [1.69399812E12, 5.2], [1.69399908E12, 3.3333333333333335]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 13.0], [1.693998E12, 31.5], [1.69399854E12, 13.399999999999999], [1.69399836E12, 22.4], [1.6939989E12, 24.799999999999997], [1.69399872E12, 15.100000000000001], [1.69399782E12, 15.899999999999999], [1.69399926E12, 17.5], [1.69399764E12, 185.7], [1.69399908E12, 6.9]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[1.69399866E12, 6.0], [1.69399848E12, 2.8999999999999995], [1.69399902E12, 4.7], [1.69399884E12, 3.7], [1.69399794E12, 4.9], [1.69399938E12, 5.0], [1.69399776E12, 4.5], [1.6939992E12, 3.1], [1.6939983E12, 5.0], [1.69399812E12, 5.2]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 2.8], [1.693998E12, 2.9], [1.69399854E12, 3.1000000000000005], [1.69399836E12, 2.8999999999999995], [1.6939989E12, 4.1], [1.69399872E12, 4.1], [1.69399782E12, 3.8], [1.69399926E12, 4.1], [1.69399764E12, 5.8], [1.69399908E12, 2.5]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[1.69399818E12, 2.8], [1.69399944E12, 2.4000000000000004], [1.69399854E12, 2.4000000000000004], [1.69399836E12, 3.0], [1.69399794E12, 2.5], [1.6939989E12, 4.0], [1.69399776E12, 15.5], [1.69399872E12, 3.9], [1.69399926E12, 3.9], [1.69399812E12, 3.0], [1.69399908E12, 3.0]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 2.7999999999999994], [1.69399866E12, 4.8999999999999995], [1.69399848E12, 3.4000000000000004], [1.69399806E12, 4.1], [1.69399902E12, 4.1], [1.69399788E12, 29.7], [1.69399884E12, 2.9], [1.69399938E12, 4.9], [1.69399824E12, 4.5], [1.6939992E12, 2.6999999999999997], [1.6939983E12, 4.125000000000001]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 12.8], [1.69399914E12, 3.6999999999999997], [1.693998E12, 2.6999999999999993], [1.69399896E12, 8.0], [1.69399836E12, 3.4000000000000004], [1.69399932E12, 2.8000000000000003], [1.69399782E12, 2.4000000000000004], [1.69399878E12, 4.300000000000001], [1.69399764E12, 4.1], [1.6939986E12, 2.9]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 2.5999999999999996], [1.69399866E12, 4.9], [1.69399848E12, 2.6999999999999993], [1.69399806E12, 14.5], [1.69399902E12, 3.5999999999999996], [1.69399788E12, 3.8999999999999995], [1.69399884E12, 2.8000000000000003], [1.69399938E12, 4.0], [1.69399824E12, 4.6], [1.6939992E12, 3.0000000000000004]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 3.6999999999999993], [1.69399848E12, 2.6], [1.69399902E12, 3.5999999999999996], [1.69399884E12, 3.0], [1.69399794E12, 3.9], [1.69399938E12, 3.5999999999999996], [1.69399776E12, 3.7], [1.6939992E12, 2.3000000000000003], [1.6939983E12, 4.0], [1.69399812E12, 4.0]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 2.7999999999999994], [1.693998E12, 3.1], [1.69399854E12, 2.5], [1.69399836E12, 2.9], [1.69399758E12, 83.7], [1.6939989E12, 4.0], [1.69399776E12, 2.7999999999999994], [1.69399872E12, 4.4], [1.69399926E12, 4.4], [1.69399908E12, 3.0]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[1.69399866E12, 4.1], [1.69399848E12, 2.8], [1.69399944E12, 2.5999999999999996], [1.69399902E12, 7.8], [1.69399884E12, 2.3000000000000007], [1.69399794E12, 4.1000000000000005], [1.69399776E12, 3.1], [1.6939983E12, 4.199999999999999], [1.69399926E12, 4.4], [1.69399812E12, 4.6000000000000005]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 2.5], [1.693998E12, 2.6999999999999997], [1.69399854E12, 2.5999999999999996], [1.69399836E12, 2.9], [1.6939989E12, 4.0], [1.69399872E12, 3.6999999999999997], [1.69399782E12, 2.8], [1.69399926E12, 4.1], [1.69399764E12, 4.3], [1.69399908E12, 2.5999999999999996]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[1.69399818E12, 3.1], [1.693998E12, 2.3000000000000003], [1.69399854E12, 2.9000000000000004], [1.69399836E12, 2.6999999999999997], [1.6939989E12, 3.5999999999999996], [1.69399872E12, 4.1], [1.69399782E12, 3.4000000000000004], [1.69399926E12, 3.7999999999999994], [1.69399764E12, 4.599999999999999], [1.69399908E12, 10.399999999999999]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[1.69399818E12, 2.6999999999999997], [1.69399914E12, 11.699999999999998], [1.693998E12, 2.9999999999999996], [1.69399896E12, 2.9], [1.69399854E12, 6.4], [1.69399836E12, 9.299999999999999], [1.69399932E12, 2.9000000000000004], [1.69399782E12, 2.6999999999999997], [1.69399878E12, 4.800000000000001], [1.69399764E12, 4.7]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[1.69399818E12, 4.0], [1.69399914E12, 4.3999999999999995], [1.693998E12, 7.100000000000001], [1.69399896E12, 3.1], [1.69399932E12, 5.7], [1.69399842E12, 4.8999999999999995], [1.69399824E12, 5.333333333333333], [1.69399782E12, 16.0], [1.69399878E12, 4.400000000000001], [1.69399764E12, 4.5], [1.6939986E12, 3.5]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[1.69399818E12, 2.7999999999999994], [1.693998E12, 3.3000000000000003], [1.69399854E12, 2.9], [1.69399836E12, 3.5], [1.6939989E12, 4.9], [1.69399872E12, 4.4], [1.69399782E12, 3.2], [1.69399926E12, 4.9], [1.69399764E12, 72.4], [1.69399908E12, 2.6999999999999997]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[1.6939977E12, 3.2], [1.69399806E12, 4.2], [1.69399902E12, 5.3], [1.69399788E12, 2.7999999999999994], [1.69399884E12, 3.0], [1.69399842E12, 2.6999999999999993], [1.69399938E12, 4.6000000000000005], [1.69399824E12, 4.3], [1.6939992E12, 3.6], [1.69399878E12, 3.5], [1.6939986E12, 13.200000000000003]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 10.8], [1.69399848E12, 2.6999999999999993], [1.69399944E12, 2.8], [1.69399884E12, 3.5], [1.69399794E12, 4.6], [1.6939989E12, 5.0], [1.69399776E12, 3.0000000000000004], [1.6939983E12, 4.000000000000001], [1.69399926E12, 4.199999999999999], [1.69399812E12, 3.7999999999999994], [1.69399908E12, 2.6999999999999997]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 2.8], [1.693998E12, 2.8], [1.69399854E12, 3.0], [1.69399836E12, 3.2], [1.6939989E12, 3.8999999999999995], [1.69399872E12, 4.0], [1.69399782E12, 2.9], [1.69399926E12, 4.800000000000001], [1.69399764E12, 6.0], [1.69399908E12, 2.6999999999999997]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[1.69399866E12, 36.4], [1.69399848E12, 43.4], [1.69399902E12, 41.3], [1.69399884E12, 24.8], [1.69399794E12, 47.9], [1.69399938E12, 45.7], [1.69399776E12, 36.0], [1.6939992E12, 44.5], [1.6939983E12, 53.4], [1.69399812E12, 32.800000000000004]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 3.6999999999999993], [1.69399848E12, 3.0], [1.69399902E12, 3.6999999999999993], [1.69399884E12, 2.8], [1.69399794E12, 3.5999999999999996], [1.69399938E12, 3.9], [1.69399776E12, 3.3000000000000003], [1.6939992E12, 2.8], [1.6939983E12, 4.800000000000001], [1.69399812E12, 3.8999999999999995]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 22.099999999999998], [1.69399866E12, 4.199999999999999], [1.69399848E12, 2.5999999999999996], [1.69399806E12, 3.5], [1.69399902E12, 3.7999999999999994], [1.69399788E12, 3.7999999999999994], [1.69399884E12, 2.5999999999999996], [1.69399938E12, 3.8], [1.6939992E12, 3.2], [1.6939983E12, 3.8]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[1.6939977E12, 3.4], [1.69399866E12, 4.4], [1.69399848E12, 3.0], [1.69399902E12, 4.2], [1.69399788E12, 4.8], [1.69399884E12, 3.1], [1.69399938E12, 3.7999999999999994], [1.6939992E12, 2.8999999999999995], [1.6939983E12, 4.4], [1.69399812E12, 5.5]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 4.500000000000001], [1.69399914E12, 5.1000000000000005], [1.69399896E12, 3.8], [1.69399806E12, 5.6000000000000005], [1.69399788E12, 4.800000000000001], [1.69399932E12, 3.1000000000000005], [1.69399842E12, 3.9], [1.69399824E12, 5.200000000000001], [1.69399878E12, 4.9], [1.6939986E12, 3.4000000000000004]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[1.6939977E12, 3.2], [1.69399914E12, 3.5999999999999996], [1.69399896E12, 2.5999999999999996], [1.69399806E12, 4.3], [1.69399788E12, 2.6999999999999997], [1.69399932E12, 2.5999999999999996], [1.69399842E12, 2.4000000000000004], [1.69399824E12, 3.8], [1.69399878E12, 3.5999999999999996], [1.6939986E12, 2.5999999999999996]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[1.69399866E12, 3.9999999999999996], [1.69399848E12, 2.5], [1.69399902E12, 3.5999999999999996], [1.69399884E12, 2.6999999999999997], [1.69399794E12, 3.9], [1.69399938E12, 4.4], [1.69399776E12, 2.5], [1.6939992E12, 2.8], [1.6939983E12, 4.4], [1.69399812E12, 4.800000000000001]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 3.2], [1.69399914E12, 3.6999999999999997], [1.69399896E12, 4.1], [1.69399806E12, 4.3], [1.69399788E12, 2.8], [1.69399932E12, 2.3000000000000003], [1.69399842E12, 2.4000000000000004], [1.69399824E12, 4.699999999999999], [1.69399878E12, 3.8], [1.6939986E12, 2.6999999999999997]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 6.7], [1.69399914E12, 5.600000000000001], [1.693998E12, 2.7999999999999994], [1.69399896E12, 2.9], [1.69399854E12, 8.200000000000001], [1.69399836E12, 3.3000000000000007], [1.69399932E12, 3.1000000000000005], [1.69399872E12, 4.714285714285714], [1.69399782E12, 5.1000000000000005], [1.69399878E12, 5.0], [1.69399764E12, 7.799999999999999]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 157.29999999999998], [1.69399914E12, 36.1], [1.69399896E12, 28.3], [1.69399806E12, 31.300000000000004], [1.69399788E12, 35.5], [1.69399932E12, 43.599999999999994], [1.69399842E12, 32.2], [1.69399824E12, 44.900000000000006], [1.69399878E12, 46.8], [1.6939986E12, 49.099999999999994]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[1.6939977E12, 3.4000000000000004], [1.69399914E12, 3.8999999999999995], [1.69399896E12, 3.5999999999999996], [1.69399806E12, 4.4], [1.69399788E12, 2.6999999999999997], [1.69399932E12, 3.2], [1.69399842E12, 2.6999999999999993], [1.69399824E12, 4.9], [1.69399878E12, 4.1], [1.6939986E12, 2.8]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 3.3000000000000003], [1.69399914E12, 4.399999999999999], [1.69399896E12, 3.0], [1.69399806E12, 4.300000000000001], [1.69399788E12, 3.2], [1.69399932E12, 4.3999999999999995], [1.69399842E12, 2.9], [1.69399824E12, 3.9], [1.69399878E12, 5.1], [1.6939986E12, 3.0]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 3.1999999999999997], [1.693998E12, 2.6999999999999993], [1.69399854E12, 3.1], [1.69399836E12, 2.8999999999999995], [1.6939989E12, 4.6], [1.69399872E12, 4.1], [1.69399782E12, 3.1999999999999997], [1.69399926E12, 4.1], [1.69399764E12, 6.6], [1.69399908E12, 2.6999999999999997]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[1.69399866E12, 4.2], [1.69399848E12, 2.5], [1.69399944E12, 8.5], [1.69399902E12, 3.5], [1.69399884E12, 2.5], [1.69399794E12, 4.3], [1.69399938E12, 8.75], [1.69399776E12, 3.1], [1.6939992E12, 2.5999999999999996], [1.6939983E12, 4.300000000000001], [1.69399812E12, 4.199999999999999]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 3.0], [1.69399914E12, 9.8], [1.69399896E12, 2.5], [1.69399806E12, 3.9], [1.69399788E12, 2.4000000000000004], [1.69399842E12, 2.5], [1.69399938E12, 4.3999999999999995], [1.69399824E12, 3.8], [1.69399878E12, 3.5999999999999996], [1.6939986E12, 2.5999999999999996]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 4.0], [1.69399848E12, 2.8999999999999995], [1.69399902E12, 4.0], [1.69399884E12, 3.3000000000000003], [1.69399794E12, 4.3999999999999995], [1.69399938E12, 3.6999999999999993], [1.69399776E12, 2.8000000000000003], [1.6939992E12, 2.5999999999999996], [1.6939983E12, 4.0], [1.69399812E12, 4.1000000000000005]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 3.3000000000000003], [1.693998E12, 3.3000000000000007], [1.69399854E12, 3.3000000000000003], [1.69399836E12, 3.2000000000000006], [1.6939989E12, 5.7], [1.69399872E12, 5.1], [1.69399782E12, 3.6999999999999993], [1.69399926E12, 5.400000000000001], [1.69399764E12, 35.7], [1.69399908E12, 3.1]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[1.6939977E12, 17.700000000000003], [1.69399914E12, 11.3], [1.69399896E12, 7.1], [1.69399806E12, 11.600000000000001], [1.69399788E12, 6.8], [1.69399932E12, 12.799999999999999], [1.69399842E12, 15.900000000000002], [1.69399824E12, 10.5], [1.69399878E12, 9.9], [1.6939986E12, 7.1]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 4.2], [1.69399914E12, 3.9], [1.693998E12, 14.799999999999999], [1.69399896E12, 2.8], [1.69399932E12, 2.5999999999999996], [1.69399842E12, 2.7999999999999994], [1.69399782E12, 3.3000000000000003], [1.69399878E12, 4.9], [1.69399764E12, 4.2], [1.6939986E12, 2.5]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 3.3000000000000003], [1.69399914E12, 4.0], [1.69399896E12, 2.8999999999999995], [1.69399806E12, 4.0], [1.69399788E12, 3.0000000000000004], [1.69399932E12, 3.5999999999999996], [1.69399842E12, 2.9999999999999996], [1.69399824E12, 3.8], [1.69399878E12, 4.8], [1.6939986E12, 2.6999999999999997]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 4.4], [1.69399848E12, 2.5999999999999996], [1.69399902E12, 3.9], [1.69399884E12, 3.2], [1.69399794E12, 4.1], [1.69399938E12, 3.8000000000000003], [1.69399776E12, 3.3000000000000003], [1.6939992E12, 2.6999999999999997], [1.6939983E12, 4.1], [1.69399812E12, 3.5999999999999996]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 4.3], [1.69399848E12, 3.0000000000000004], [1.69399902E12, 3.8999999999999995], [1.69399884E12, 3.1], [1.69399794E12, 4.6], [1.69399938E12, 4.3], [1.69399776E12, 4.2], [1.6939992E12, 13.4], [1.6939983E12, 7.1], [1.69399812E12, 4.3]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 3.5], [1.69399896E12, 11.200000000000001], [1.69399806E12, 4.0], [1.69399788E12, 2.6999999999999993], [1.69399842E12, 2.5999999999999996], [1.69399938E12, 3.6999999999999997], [1.69399824E12, 4.6], [1.6939992E12, 2.5999999999999996], [1.69399878E12, 3.8], [1.6939986E12, 2.8]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 3.9999999999999996], [1.69399848E12, 2.8], [1.69399902E12, 4.1], [1.69399884E12, 3.4], [1.69399794E12, 3.8], [1.69399938E12, 3.8999999999999995], [1.69399776E12, 3.1], [1.6939992E12, 2.6999999999999997], [1.6939983E12, 4.3999999999999995], [1.69399812E12, 4.1]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 2.5999999999999996], [1.693998E12, 3.2], [1.69399854E12, 3.2], [1.69399836E12, 2.5], [1.6939989E12, 4.0], [1.69399872E12, 3.8], [1.69399782E12, 2.4000000000000004], [1.69399926E12, 3.9999999999999996], [1.69399764E12, 5.3], [1.69399908E12, 3.4999999999999996]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[1.69399848E12, 2.9], [1.69399944E12, 3.3000000000000003], [1.69399794E12, 4.800000000000001], [1.6939989E12, 4.1], [1.69399776E12, 3.3000000000000003], [1.69399872E12, 4.5], [1.6939983E12, 10.0], [1.69399926E12, 4.1], [1.69399812E12, 4.3], [1.69399908E12, 4.1]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 2.6999999999999993], [1.693998E12, 2.5999999999999996], [1.69399854E12, 3.0], [1.69399836E12, 2.4000000000000004], [1.6939989E12, 4.3999999999999995], [1.69399872E12, 3.8999999999999995], [1.69399782E12, 3.0], [1.69399926E12, 3.6999999999999997], [1.69399764E12, 4.4], [1.69399908E12, 2.4000000000000004]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[1.69399914E12, 4.5], [1.693998E12, 3.9], [1.69399896E12, 2.4000000000000004], [1.69399932E12, 2.5], [1.69399842E12, 2.5999999999999996], [1.69399824E12, 4.400000000000001], [1.69399782E12, 3.3000000000000003], [1.69399878E12, 5.199999999999999], [1.69399764E12, 34.0], [1.6939986E12, 2.9]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[1.69399818E12, 2.5999999999999996], [1.693998E12, 2.8], [1.69399854E12, 2.3000000000000003], [1.69399836E12, 2.8999999999999995], [1.69399758E12, 7.5], [1.6939989E12, 3.5], [1.69399872E12, 3.9], [1.69399782E12, 3.0], [1.69399926E12, 4.3], [1.69399908E12, 2.5]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[1.69399818E12, 2.5], [1.693998E12, 2.9], [1.69399854E12, 2.8], [1.69399836E12, 2.4000000000000004], [1.6939989E12, 3.8999999999999995], [1.69399872E12, 4.400000000000001], [1.69399782E12, 2.9], [1.69399926E12, 4.5], [1.69399764E12, 5.3], [1.69399908E12, 2.5]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[1.6939977E12, 4.1], [1.69399914E12, 4.4], [1.69399896E12, 3.3], [1.69399806E12, 5.699999999999999], [1.69399788E12, 12.2], [1.69399932E12, 3.0], [1.69399842E12, 3.4000000000000004], [1.69399824E12, 4.6], [1.69399878E12, 4.300000000000001], [1.6939986E12, 3.2]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[1.6939977E12, 3.5], [1.69399914E12, 3.6999999999999997], [1.69399896E12, 2.9], [1.69399806E12, 3.8999999999999995], [1.69399788E12, 2.4000000000000004], [1.69399932E12, 2.7], [1.69399842E12, 3.2], [1.69399824E12, 3.8], [1.69399878E12, 4.2], [1.6939986E12, 2.4000000000000004]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 3.3000000000000003], [1.69399914E12, 4.6000000000000005], [1.69399896E12, 3.3000000000000003], [1.69399806E12, 4.7], [1.69399788E12, 3.3], [1.69399932E12, 3.1], [1.69399842E12, 2.8], [1.69399824E12, 4.0], [1.69399878E12, 4.1], [1.6939986E12, 3.3000000000000003]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 11.7], [1.69399914E12, 10.666666666666666], [1.693998E12, 8.399999999999999], [1.69399854E12, 7.1], [1.69399836E12, 7.300000000000001], [1.69399932E12, 9.100000000000001], [1.6939989E12, 17.1], [1.69399872E12, 9.3], [1.69399782E12, 5.7], [1.69399764E12, 14.0], [1.69399908E12, 9.0]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[1.69399866E12, 3.6999999999999993], [1.69399848E12, 3.2], [1.69399902E12, 4.0], [1.69399884E12, 2.9], [1.69399794E12, 4.400000000000001], [1.69399938E12, 3.9999999999999996], [1.69399776E12, 3.1], [1.6939992E12, 2.3000000000000007], [1.6939983E12, 4.0], [1.69399812E12, 6.3]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 3.666666666666666], [1.69399848E12, 19.9], [1.69399944E12, 3.0], [1.69399794E12, 4.6], [1.6939989E12, 4.2], [1.69399776E12, 2.6999999999999993], [1.69399872E12, 4.0], [1.6939983E12, 4.0], [1.69399926E12, 4.1], [1.69399812E12, 4.1], [1.69399908E12, 2.8]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 2.6999999999999997], [1.69399896E12, 4.5], [1.69399806E12, 3.9], [1.69399902E12, 3.5], [1.69399788E12, 2.4000000000000004], [1.69399842E12, 2.5], [1.69399938E12, 4.0], [1.69399824E12, 3.5999999999999996], [1.6939992E12, 2.5999999999999996], [1.69399878E12, 11.7], [1.6939986E12, 2.5999999999999996]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 13.299999999999999], [1.69399848E12, 6.8999999999999995], [1.69399902E12, 8.1], [1.69399884E12, 3.2], [1.69399794E12, 9.1], [1.69399938E12, 4.7], [1.69399776E12, 3.5], [1.6939992E12, 3.6999999999999997], [1.6939983E12, 4.6000000000000005], [1.69399812E12, 4.7]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 3.2], [1.693998E12, 3.900000000000001], [1.69399854E12, 3.2000000000000006], [1.69399836E12, 3.5], [1.6939989E12, 5.199999999999999], [1.69399872E12, 4.9], [1.69399782E12, 4.1], [1.69399926E12, 10.0], [1.69399764E12, 6.1], [1.69399908E12, 2.8]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 3.7], [1.69399914E12, 3.6999999999999997], [1.69399896E12, 2.9], [1.69399806E12, 14.4], [1.69399788E12, 2.5999999999999996], [1.69399932E12, 2.8999999999999995], [1.69399842E12, 3.1], [1.69399824E12, 4.499999999999999], [1.69399878E12, 3.6], [1.6939986E12, 2.8]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 2.9], [1.693998E12, 3.1], [1.69399854E12, 3.3999999999999995], [1.69399836E12, 2.9000000000000004], [1.6939989E12, 4.0], [1.69399872E12, 3.8], [1.69399782E12, 3.5], [1.69399926E12, 4.1], [1.69399764E12, 5.3999999999999995], [1.69399908E12, 2.5999999999999996]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 3.6], [1.69399914E12, 4.1], [1.69399896E12, 3.2], [1.69399806E12, 4.1000000000000005], [1.69399788E12, 2.4000000000000004], [1.69399932E12, 2.4000000000000004], [1.69399842E12, 3.3], [1.69399824E12, 3.8], [1.69399878E12, 3.8], [1.6939986E12, 2.5]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[1.69399866E12, 3.9], [1.69399848E12, 2.6], [1.69399902E12, 4.3], [1.69399884E12, 3.2], [1.69399794E12, 3.5], [1.69399938E12, 4.199999999999999], [1.69399776E12, 2.8999999999999995], [1.6939992E12, 2.8], [1.6939983E12, 4.2], [1.69399812E12, 4.200000000000001]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 2.5999999999999996], [1.693998E12, 3.0], [1.69399854E12, 2.6999999999999997], [1.69399836E12, 3.1000000000000005], [1.6939989E12, 4.0], [1.69399872E12, 3.9], [1.69399782E12, 2.8], [1.69399926E12, 4.199999999999999], [1.69399764E12, 6.699999999999999], [1.69399908E12, 2.5999999999999996]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[1.69399818E12, 2.7999999999999994], [1.693998E12, 2.9], [1.69399854E12, 3.2000000000000006], [1.69399836E12, 3.0000000000000004], [1.69399932E12, 2.9000000000000004], [1.6939989E12, 4.5], [1.69399872E12, 4.800000000000001], [1.69399782E12, 3.1], [1.69399764E12, 6.8], [1.69399908E12, 14.399999999999999]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 12.700000000000001], [1.69399914E12, 16.699999999999996], [1.69399896E12, 3.5], [1.69399806E12, 12.599999999999998], [1.69399788E12, 3.8], [1.69399932E12, 4.6000000000000005], [1.69399842E12, 9.0], [1.69399824E12, 5.4], [1.69399878E12, 4.6], [1.6939986E12, 7.0]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 5.4], [1.69399848E12, 3.2], [1.69399902E12, 5.1000000000000005], [1.69399884E12, 3.4], [1.69399794E12, 5.4], [1.69399938E12, 5.800000000000001], [1.69399776E12, 3.4000000000000004], [1.6939992E12, 3.1], [1.6939983E12, 5.0], [1.69399812E12, 5.300000000000001]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 3.3000000000000007], [1.69399914E12, 3.9999999999999996], [1.69399896E12, 2.9000000000000004], [1.69399806E12, 5.0], [1.69399788E12, 2.5999999999999996], [1.69399932E12, 13.4], [1.69399842E12, 2.8999999999999995], [1.69399824E12, 4.4], [1.69399878E12, 3.6999999999999997], [1.6939986E12, 2.6]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 4.3], [1.69399848E12, 2.9], [1.69399902E12, 3.9], [1.69399884E12, 2.6999999999999993], [1.69399794E12, 5.3], [1.69399938E12, 4.1], [1.69399776E12, 3.1], [1.6939992E12, 2.6999999999999997], [1.6939983E12, 4.3], [1.69399812E12, 4.9]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 3.9], [1.69399848E12, 3.0], [1.69399902E12, 4.7], [1.69399884E12, 2.8], [1.69399794E12, 4.0], [1.69399938E12, 3.5], [1.69399776E12, 3.1], [1.6939992E12, 2.5999999999999996], [1.6939983E12, 4.0], [1.69399812E12, 4.1]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 3.0000000000000004], [1.69399806E12, 4.3999999999999995], [1.69399902E12, 4.2], [1.69399788E12, 2.5], [1.69399884E12, 3.3], [1.69399842E12, 7.7], [1.69399938E12, 4.199999999999999], [1.69399824E12, 3.9999999999999996], [1.6939992E12, 4.4], [1.6939986E12, 4.300000000000001]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 6.6], [1.693998E12, 2.7999999999999994], [1.69399854E12, 2.6999999999999997], [1.69399836E12, 4.1], [1.6939989E12, 4.1], [1.69399872E12, 4.9], [1.69399782E12, 24.700000000000003], [1.69399926E12, 6.999999999999999], [1.69399764E12, 7.9], [1.69399908E12, 5.300000000000001]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[1.6939977E12, 3.5999999999999996], [1.69399914E12, 3.6999999999999997], [1.69399896E12, 2.6999999999999997], [1.69399806E12, 3.9], [1.69399788E12, 2.6999999999999997], [1.69399932E12, 2.6999999999999997], [1.69399842E12, 2.5999999999999996], [1.69399824E12, 3.8999999999999995], [1.69399878E12, 3.9], [1.6939986E12, 2.2000000000000006]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 2.5], [1.693998E12, 2.9], [1.69399854E12, 2.9000000000000004], [1.69399836E12, 3.7], [1.6939989E12, 3.8999999999999995], [1.69399872E12, 4.1], [1.69399782E12, 3.1], [1.69399926E12, 3.5999999999999996], [1.69399764E12, 7.1], [1.69399908E12, 2.5]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[1.6939977E12, 3.375], [1.69399914E12, 4.0], [1.69399896E12, 2.6999999999999997], [1.69399806E12, 3.8], [1.69399788E12, 3.4], [1.69399932E12, 2.5], [1.69399842E12, 2.8], [1.69399824E12, 4.4], [1.69399878E12, 3.5999999999999996], [1.69399764E12, 3.0], [1.6939986E12, 3.4000000000000004]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[1.69399818E12, 3.3000000000000003], [1.69399854E12, 2.6999999999999993], [1.69399836E12, 3.8000000000000003], [1.69399758E12, 776.5], [1.69399794E12, 2.5], [1.6939989E12, 3.8], [1.69399776E12, 3.3000000000000003], [1.69399872E12, 4.6], [1.69399926E12, 3.9999999999999996], [1.69399908E12, 3.0]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[1.69399914E12, 4.5], [1.69399896E12, 2.8], [1.69399806E12, 4.6], [1.69399788E12, 3.6999999999999997], [1.69399932E12, 6.9], [1.69399842E12, 3.1], [1.69399824E12, 4.1], [1.69399878E12, 4.199999999999999], [1.69399764E12, 3.9], [1.6939986E12, 3.3000000000000003]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 3.1], [1.69399866E12, 5.3999999999999995], [1.69399848E12, 2.5999999999999996], [1.69399902E12, 3.9], [1.69399884E12, 3.2], [1.69399794E12, 5.4], [1.69399938E12, 4.800000000000001], [1.6939992E12, 2.5999999999999996], [1.6939983E12, 5.0], [1.69399812E12, 4.599999999999999]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[1.69399944E12, 2.5999999999999996], [1.69399854E12, 3.6999999999999993], [1.69399794E12, 4.7], [1.6939989E12, 4.7], [1.69399776E12, 3.0], [1.69399872E12, 4.6000000000000005], [1.6939983E12, 4.1], [1.69399926E12, 3.9], [1.69399812E12, 11.399999999999999], [1.69399908E12, 2.5]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 4.4], [1.69399848E12, 2.4000000000000004], [1.69399902E12, 4.1], [1.69399884E12, 2.9000000000000004], [1.69399794E12, 5.4], [1.69399938E12, 4.1000000000000005], [1.69399776E12, 2.5999999999999996], [1.6939992E12, 2.8], [1.6939983E12, 4.2], [1.69399812E12, 4.5]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 2.6999999999999997], [1.69399914E12, 3.9999999999999996], [1.69399896E12, 2.6999999999999997], [1.69399806E12, 4.2], [1.69399788E12, 2.5], [1.69399932E12, 2.5999999999999996], [1.69399842E12, 2.5999999999999996], [1.69399824E12, 5.6000000000000005], [1.69399878E12, 3.9], [1.6939986E12, 2.5999999999999996]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69399944E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 2.0, "minX": 1.69399758E12, "maxY": 772.6, "series": [{"data": [[1.69399818E12, 3.3000000000000003], [1.693998E12, 3.1], [1.69399854E12, 3.1], [1.69399836E12, 2.7999999999999994], [1.6939989E12, 4.199999999999999], [1.69399872E12, 4.0], [1.69399782E12, 4.199999999999999], [1.69399926E12, 3.9], [1.69399764E12, 5.199999999999999], [1.69399908E12, 3.3000000000000003]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[1.69399818E12, 2.5], [1.693998E12, 2.8], [1.69399854E12, 3.2], [1.69399836E12, 2.5], [1.6939989E12, 3.9], [1.69399872E12, 3.7999999999999994], [1.69399782E12, 3.2], [1.69399926E12, 3.9], [1.69399764E12, 4.9], [1.69399908E12, 2.4000000000000004]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[1.6939977E12, 3.3000000000000003], [1.69399914E12, 3.6999999999999993], [1.69399896E12, 2.5], [1.69399806E12, 4.2], [1.69399788E12, 2.5], [1.69399932E12, 2.5], [1.69399842E12, 2.5999999999999996], [1.69399824E12, 4.0], [1.69399878E12, 3.6999999999999997], [1.6939986E12, 2.5]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[1.69399866E12, 4.0], [1.69399848E12, 3.0], [1.69399902E12, 3.7999999999999994], [1.69399884E12, 3.2], [1.69399794E12, 3.4000000000000004], [1.69399938E12, 3.7999999999999994], [1.69399776E12, 3.0], [1.6939992E12, 2.2000000000000006], [1.6939983E12, 4.5], [1.69399812E12, 3.8999999999999995]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 4.0], [1.69399848E12, 2.5999999999999996], [1.69399944E12, 2.8999999999999995], [1.69399902E12, 4.0], [1.69399884E12, 2.5999999999999996], [1.69399794E12, 4.6], [1.69399776E12, 2.9], [1.6939992E12, 12.2], [1.6939983E12, 4.6], [1.69399812E12, 3.9999999999999996]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 2.6999999999999997], [1.693998E12, 3.0], [1.69399854E12, 2.2], [1.69399836E12, 2.6999999999999997], [1.69399758E12, 7.1], [1.6939989E12, 3.6999999999999993], [1.69399872E12, 4.2], [1.69399782E12, 2.9999999999999996], [1.69399926E12, 3.9], [1.69399908E12, 3.0000000000000004]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[1.69399944E12, 2.3000000000000003], [1.69399854E12, 3.2], [1.69399836E12, 3.375], [1.69399794E12, 13.5], [1.6939989E12, 4.0], [1.69399776E12, 3.2], [1.69399872E12, 4.4], [1.6939983E12, 3.0], [1.69399926E12, 3.6999999999999997], [1.69399812E12, 2.9], [1.69399908E12, 2.6]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 4.9], [1.69399848E12, 2.7999999999999994], [1.69399902E12, 5.1], [1.69399884E12, 8.899999999999999], [1.69399794E12, 4.8], [1.69399938E12, 4.3999999999999995], [1.69399776E12, 3.9], [1.6939992E12, 2.5], [1.6939983E12, 4.5], [1.69399812E12, 4.1]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 7.5], [1.69399914E12, 11.299999999999999], [1.693998E12, 6.699999999999999], [1.69399896E12, 8.875], [1.69399854E12, 13.3], [1.69399836E12, 7.9], [1.69399932E12, 10.9], [1.6939989E12, 3.0], [1.69399872E12, 11.200000000000001], [1.69399782E12, 14.8], [1.69399764E12, 19.8]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[1.69399914E12, 4.1], [1.69399896E12, 2.3000000000000007], [1.69399806E12, 3.7999999999999994], [1.69399932E12, 2.5999999999999996], [1.69399842E12, 2.5999999999999996], [1.69399824E12, 3.9], [1.69399782E12, 3.1], [1.69399878E12, 4.400000000000001], [1.69399764E12, 3.900000000000001], [1.6939986E12, 2.9]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 2.6999999999999997], [1.69399866E12, 4.9], [1.69399806E12, 4.3], [1.69399902E12, 4.1], [1.69399788E12, 3.4000000000000004], [1.69399884E12, 2.8], [1.69399842E12, 5.6], [1.69399938E12, 4.1000000000000005], [1.69399824E12, 11.7], [1.6939992E12, 2.9]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 3.8], [1.69399848E12, 2.7999999999999994], [1.69399944E12, 2.3000000000000003], [1.69399902E12, 2.0], [1.69399884E12, 13.5], [1.69399794E12, 4.0], [1.69399776E12, 3.1], [1.6939983E12, 3.8], [1.69399926E12, 3.7999999999999994], [1.69399812E12, 4.7], [1.69399908E12, 2.888888888888889]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 5.0], [1.693998E12, 14.100000000000001], [1.69399854E12, 9.5], [1.69399836E12, 11.999999999999998], [1.6939989E12, 13.6], [1.69399872E12, 5.7], [1.69399782E12, 9.1], [1.69399926E12, 10.9], [1.69399764E12, 29.200000000000003], [1.69399908E12, 2.2000000000000006]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[1.69399866E12, 5.3999999999999995], [1.69399848E12, 2.7999999999999994], [1.69399902E12, 4.0], [1.69399884E12, 3.6], [1.69399794E12, 4.2], [1.69399938E12, 3.8], [1.69399776E12, 4.1], [1.6939992E12, 2.8], [1.6939983E12, 4.1000000000000005], [1.69399812E12, 4.6]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 2.8], [1.693998E12, 2.9], [1.69399854E12, 3.1000000000000005], [1.69399836E12, 2.8999999999999995], [1.6939989E12, 4.1], [1.69399872E12, 4.1], [1.69399782E12, 3.8], [1.69399926E12, 4.1], [1.69399764E12, 5.7], [1.69399908E12, 2.5]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[1.69399818E12, 2.8], [1.69399944E12, 2.4000000000000004], [1.69399854E12, 2.4000000000000004], [1.69399836E12, 3.0], [1.69399794E12, 2.5], [1.6939989E12, 4.0], [1.69399776E12, 15.5], [1.69399872E12, 3.8], [1.69399926E12, 3.9], [1.69399812E12, 3.0], [1.69399908E12, 3.0]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 2.7999999999999994], [1.69399866E12, 4.8999999999999995], [1.69399848E12, 3.4000000000000004], [1.69399806E12, 3.9999999999999996], [1.69399902E12, 4.1], [1.69399788E12, 29.400000000000006], [1.69399884E12, 2.9], [1.69399938E12, 4.9], [1.69399824E12, 4.5], [1.6939992E12, 2.5], [1.6939983E12, 4.125000000000001]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 12.8], [1.69399914E12, 3.5999999999999996], [1.693998E12, 2.6999999999999993], [1.69399896E12, 8.0], [1.69399836E12, 3.4000000000000004], [1.69399932E12, 2.8000000000000003], [1.69399782E12, 2.4000000000000004], [1.69399878E12, 4.199999999999999], [1.69399764E12, 4.1], [1.6939986E12, 2.9]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 2.5999999999999996], [1.69399866E12, 4.9], [1.69399848E12, 2.6999999999999993], [1.69399806E12, 14.399999999999999], [1.69399902E12, 3.5999999999999996], [1.69399788E12, 3.8999999999999995], [1.69399884E12, 2.8000000000000003], [1.69399938E12, 4.0], [1.69399824E12, 4.6], [1.6939992E12, 3.0000000000000004]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 3.6999999999999993], [1.69399848E12, 2.6], [1.69399902E12, 3.5999999999999996], [1.69399884E12, 3.0], [1.69399794E12, 3.8], [1.69399938E12, 3.5999999999999996], [1.69399776E12, 3.7], [1.6939992E12, 2.3000000000000003], [1.6939983E12, 3.9], [1.69399812E12, 3.8]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 2.5999999999999996], [1.693998E12, 2.7999999999999994], [1.69399854E12, 2.5], [1.69399836E12, 2.8], [1.69399758E12, 27.9], [1.6939989E12, 3.7999999999999994], [1.69399776E12, 2.6999999999999997], [1.69399872E12, 4.4], [1.69399926E12, 4.3], [1.69399908E12, 2.6999999999999997]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[1.69399866E12, 4.1], [1.69399848E12, 2.8], [1.69399944E12, 2.5999999999999996], [1.69399902E12, 7.8], [1.69399884E12, 2.3000000000000007], [1.69399794E12, 4.1000000000000005], [1.69399776E12, 3.1], [1.6939983E12, 4.199999999999999], [1.69399926E12, 4.4], [1.69399812E12, 4.6000000000000005]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 2.5], [1.693998E12, 2.6999999999999997], [1.69399854E12, 2.5999999999999996], [1.69399836E12, 2.9], [1.6939989E12, 4.0], [1.69399872E12, 3.6999999999999997], [1.69399782E12, 2.8], [1.69399926E12, 4.1], [1.69399764E12, 4.1], [1.69399908E12, 2.5999999999999996]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[1.69399818E12, 3.1], [1.693998E12, 2.3000000000000003], [1.69399854E12, 2.9000000000000004], [1.69399836E12, 2.6999999999999997], [1.6939989E12, 3.5999999999999996], [1.69399872E12, 4.1], [1.69399782E12, 3.4000000000000004], [1.69399926E12, 3.7999999999999994], [1.69399764E12, 4.5], [1.69399908E12, 10.399999999999999]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[1.69399818E12, 2.6999999999999997], [1.69399914E12, 11.699999999999998], [1.693998E12, 2.9999999999999996], [1.69399896E12, 2.9], [1.69399854E12, 6.4], [1.69399836E12, 9.299999999999999], [1.69399932E12, 2.9000000000000004], [1.69399782E12, 2.5999999999999996], [1.69399878E12, 4.800000000000001], [1.69399764E12, 4.6000000000000005]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[1.69399818E12, 3.75], [1.69399914E12, 4.3999999999999995], [1.693998E12, 5.8], [1.69399896E12, 3.1], [1.69399932E12, 5.7], [1.69399842E12, 4.8999999999999995], [1.69399824E12, 4.5], [1.69399782E12, 15.9], [1.69399878E12, 4.400000000000001], [1.69399764E12, 4.5], [1.6939986E12, 3.5]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[1.69399818E12, 2.6999999999999993], [1.693998E12, 2.8999999999999995], [1.69399854E12, 2.6999999999999997], [1.69399836E12, 3.1], [1.6939989E12, 3.9], [1.69399872E12, 3.9], [1.69399782E12, 2.8], [1.69399926E12, 4.1000000000000005], [1.69399764E12, 45.4], [1.69399908E12, 2.5]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[1.6939977E12, 3.1], [1.69399806E12, 4.1], [1.69399902E12, 4.3], [1.69399788E12, 2.7999999999999994], [1.69399884E12, 2.75], [1.69399842E12, 2.6999999999999993], [1.69399938E12, 4.200000000000001], [1.69399824E12, 4.199999999999999], [1.6939992E12, 3.4000000000000004], [1.69399878E12, 3.5], [1.6939986E12, 12.8]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 10.600000000000001], [1.69399848E12, 2.6999999999999993], [1.69399944E12, 2.8], [1.69399884E12, 3.5], [1.69399794E12, 4.6], [1.6939989E12, 5.0], [1.69399776E12, 3.0000000000000004], [1.6939983E12, 3.9], [1.69399926E12, 4.1], [1.69399812E12, 3.7999999999999994], [1.69399908E12, 2.6999999999999997]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 2.5999999999999996], [1.693998E12, 2.6999999999999997], [1.69399854E12, 2.5999999999999996], [1.69399836E12, 3.1], [1.6939989E12, 3.8999999999999995], [1.69399872E12, 4.0], [1.69399782E12, 2.7999999999999994], [1.69399926E12, 4.800000000000001], [1.69399764E12, 5.1], [1.69399908E12, 2.6999999999999997]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[1.69399866E12, 7.300000000000001], [1.69399848E12, 8.100000000000001], [1.69399902E12, 12.4], [1.69399884E12, 7.2], [1.69399794E12, 10.1], [1.69399938E12, 13.3], [1.69399776E12, 7.2], [1.6939992E12, 7.4], [1.6939983E12, 12.399999999999999], [1.69399812E12, 10.799999999999999]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 3.6999999999999993], [1.69399848E12, 3.0], [1.69399902E12, 3.6999999999999993], [1.69399884E12, 2.8], [1.69399794E12, 3.5999999999999996], [1.69399938E12, 3.9], [1.69399776E12, 3.3000000000000003], [1.6939992E12, 2.8], [1.6939983E12, 4.800000000000001], [1.69399812E12, 3.8999999999999995]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 22.099999999999998], [1.69399866E12, 4.199999999999999], [1.69399848E12, 2.5999999999999996], [1.69399806E12, 3.5], [1.69399902E12, 3.7999999999999994], [1.69399788E12, 3.7999999999999994], [1.69399884E12, 2.5999999999999996], [1.69399938E12, 3.8], [1.6939992E12, 3.2], [1.6939983E12, 3.8]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[1.6939977E12, 3.4], [1.69399866E12, 4.4], [1.69399848E12, 3.0], [1.69399902E12, 4.2], [1.69399788E12, 4.8], [1.69399884E12, 3.1], [1.69399938E12, 3.7999999999999994], [1.6939992E12, 2.8999999999999995], [1.6939983E12, 4.4], [1.69399812E12, 5.5]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 3.2000000000000006], [1.69399914E12, 3.8], [1.69399896E12, 3.2], [1.69399806E12, 4.299999999999999], [1.69399788E12, 3.3000000000000003], [1.69399932E12, 2.5], [1.69399842E12, 3.2], [1.69399824E12, 4.3], [1.69399878E12, 4.0], [1.6939986E12, 2.6999999999999997]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[1.6939977E12, 3.1], [1.69399914E12, 3.5999999999999996], [1.69399896E12, 2.5999999999999996], [1.69399806E12, 4.3], [1.69399788E12, 2.6999999999999997], [1.69399932E12, 2.5999999999999996], [1.69399842E12, 2.4000000000000004], [1.69399824E12, 3.8], [1.69399878E12, 3.5999999999999996], [1.6939986E12, 2.5]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[1.69399866E12, 3.9999999999999996], [1.69399848E12, 2.5], [1.69399902E12, 3.5999999999999996], [1.69399884E12, 2.6999999999999997], [1.69399794E12, 3.9], [1.69399938E12, 4.4], [1.69399776E12, 2.5], [1.6939992E12, 2.8], [1.6939983E12, 4.4], [1.69399812E12, 4.800000000000001]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 3.2], [1.69399914E12, 3.6999999999999997], [1.69399896E12, 4.1], [1.69399806E12, 4.2], [1.69399788E12, 2.8], [1.69399932E12, 2.3000000000000003], [1.69399842E12, 2.4000000000000004], [1.69399824E12, 4.699999999999999], [1.69399878E12, 3.8], [1.6939986E12, 2.6999999999999997]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 6.4], [1.69399914E12, 4.5], [1.693998E12, 2.5], [1.69399896E12, 2.8], [1.69399854E12, 7.6], [1.69399836E12, 3.0], [1.69399932E12, 2.6999999999999993], [1.69399872E12, 3.857142857142857], [1.69399782E12, 4.4], [1.69399878E12, 4.333333333333333], [1.69399764E12, 7.0]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 7.699999999999999], [1.69399914E12, 3.9], [1.69399896E12, 9.9], [1.69399806E12, 4.3999999999999995], [1.69399788E12, 10.7], [1.69399932E12, 7.699999999999999], [1.69399842E12, 3.3000000000000003], [1.69399824E12, 12.6], [1.69399878E12, 10.899999999999999], [1.6939986E12, 15.6]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[1.6939977E12, 3.3000000000000003], [1.69399914E12, 3.6999999999999993], [1.69399896E12, 3.5999999999999996], [1.69399806E12, 4.4], [1.69399788E12, 2.6999999999999997], [1.69399932E12, 3.2], [1.69399842E12, 2.6999999999999993], [1.69399824E12, 4.8], [1.69399878E12, 4.1], [1.6939986E12, 2.8]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 3.3000000000000003], [1.69399914E12, 4.399999999999999], [1.69399896E12, 3.0], [1.69399806E12, 4.300000000000001], [1.69399788E12, 3.2], [1.69399932E12, 4.3999999999999995], [1.69399842E12, 2.9], [1.69399824E12, 3.9], [1.69399878E12, 5.1], [1.6939986E12, 3.0]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 2.8], [1.693998E12, 2.5999999999999996], [1.69399854E12, 3.1], [1.69399836E12, 2.8999999999999995], [1.6939989E12, 4.3999999999999995], [1.69399872E12, 4.1], [1.69399782E12, 3.0], [1.69399926E12, 3.9999999999999996], [1.69399764E12, 5.200000000000001], [1.69399908E12, 2.5999999999999996]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[1.69399866E12, 4.2], [1.69399848E12, 2.5], [1.69399944E12, 8.5], [1.69399902E12, 3.5], [1.69399884E12, 2.5], [1.69399794E12, 4.3], [1.69399938E12, 8.625], [1.69399776E12, 3.1], [1.6939992E12, 2.5], [1.6939983E12, 4.300000000000001], [1.69399812E12, 4.199999999999999]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 3.0], [1.69399914E12, 9.8], [1.69399896E12, 2.5], [1.69399806E12, 3.9], [1.69399788E12, 2.4000000000000004], [1.69399842E12, 2.5], [1.69399938E12, 4.3999999999999995], [1.69399824E12, 3.8], [1.69399878E12, 3.5999999999999996], [1.6939986E12, 2.5999999999999996]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 4.0], [1.69399848E12, 2.6999999999999993], [1.69399902E12, 3.9], [1.69399884E12, 3.1000000000000005], [1.69399794E12, 3.8], [1.69399938E12, 3.6999999999999993], [1.69399776E12, 2.8000000000000003], [1.6939992E12, 2.5], [1.6939983E12, 3.8], [1.69399812E12, 4.000000000000001]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 2.5], [1.693998E12, 2.5999999999999996], [1.69399854E12, 2.6999999999999997], [1.69399836E12, 2.5999999999999996], [1.6939989E12, 4.5], [1.69399872E12, 3.8], [1.69399782E12, 3.1], [1.69399926E12, 3.9], [1.69399764E12, 9.2], [1.69399908E12, 2.5999999999999996]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[1.6939977E12, 3.5999999999999996], [1.69399914E12, 5.0], [1.69399896E12, 3.8999999999999995], [1.69399806E12, 4.0], [1.69399788E12, 3.2], [1.69399932E12, 2.9], [1.69399842E12, 8.0], [1.69399824E12, 4.1], [1.69399878E12, 4.199999999999999], [1.6939986E12, 2.9]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 4.1000000000000005], [1.69399914E12, 3.9], [1.693998E12, 14.5], [1.69399896E12, 2.6999999999999993], [1.69399932E12, 2.5999999999999996], [1.69399842E12, 2.7999999999999994], [1.69399782E12, 3.3000000000000003], [1.69399878E12, 4.9], [1.69399764E12, 4.2], [1.6939986E12, 2.5]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 2.9999999999999996], [1.69399914E12, 4.0], [1.69399896E12, 2.8999999999999995], [1.69399806E12, 4.0], [1.69399788E12, 3.0000000000000004], [1.69399932E12, 3.5999999999999996], [1.69399842E12, 2.9999999999999996], [1.69399824E12, 3.8], [1.69399878E12, 4.7], [1.6939986E12, 2.6999999999999997]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 4.4], [1.69399848E12, 2.5999999999999996], [1.69399902E12, 3.9], [1.69399884E12, 3.1], [1.69399794E12, 4.1], [1.69399938E12, 3.8000000000000003], [1.69399776E12, 3.3000000000000003], [1.6939992E12, 2.6999999999999997], [1.6939983E12, 4.1], [1.69399812E12, 3.5999999999999996]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 4.199999999999999], [1.69399848E12, 3.0000000000000004], [1.69399902E12, 3.8999999999999995], [1.69399884E12, 2.9], [1.69399794E12, 4.2], [1.69399938E12, 4.3], [1.69399776E12, 4.2], [1.6939992E12, 11.6], [1.6939983E12, 7.1], [1.69399812E12, 4.199999999999999]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 3.5], [1.69399896E12, 11.200000000000001], [1.69399806E12, 4.0], [1.69399788E12, 2.6999999999999993], [1.69399842E12, 2.5999999999999996], [1.69399938E12, 3.6999999999999997], [1.69399824E12, 4.6], [1.6939992E12, 2.5999999999999996], [1.69399878E12, 3.8], [1.6939986E12, 2.8]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 3.9999999999999996], [1.69399848E12, 2.8], [1.69399902E12, 3.9], [1.69399884E12, 3.3000000000000003], [1.69399794E12, 3.8], [1.69399938E12, 3.8999999999999995], [1.69399776E12, 2.9000000000000004], [1.6939992E12, 2.6999999999999997], [1.6939983E12, 4.3999999999999995], [1.69399812E12, 4.0]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 2.5999999999999996], [1.693998E12, 3.2], [1.69399854E12, 3.2], [1.69399836E12, 2.5], [1.6939989E12, 4.0], [1.69399872E12, 3.8], [1.69399782E12, 2.4000000000000004], [1.69399926E12, 3.9999999999999996], [1.69399764E12, 5.2], [1.69399908E12, 3.4999999999999996]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[1.69399848E12, 2.6999999999999997], [1.69399944E12, 3.2], [1.69399794E12, 4.3], [1.6939989E12, 4.0], [1.69399776E12, 2.9], [1.69399872E12, 3.8], [1.6939983E12, 9.8], [1.69399926E12, 3.9], [1.69399812E12, 4.3], [1.69399908E12, 3.8]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 2.6999999999999993], [1.693998E12, 2.5999999999999996], [1.69399854E12, 3.0], [1.69399836E12, 2.4000000000000004], [1.6939989E12, 4.3999999999999995], [1.69399872E12, 3.8999999999999995], [1.69399782E12, 2.9], [1.69399926E12, 3.6999999999999997], [1.69399764E12, 4.4], [1.69399908E12, 2.4000000000000004]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[1.69399914E12, 4.5], [1.693998E12, 3.9], [1.69399896E12, 2.4000000000000004], [1.69399932E12, 2.5], [1.69399842E12, 2.5999999999999996], [1.69399824E12, 4.400000000000001], [1.69399782E12, 3.3000000000000003], [1.69399878E12, 5.199999999999999], [1.69399764E12, 33.9], [1.6939986E12, 2.7999999999999994]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[1.69399818E12, 2.5999999999999996], [1.693998E12, 2.6999999999999997], [1.69399854E12, 2.3000000000000003], [1.69399836E12, 2.8999999999999995], [1.69399758E12, 7.5], [1.6939989E12, 3.5], [1.69399872E12, 3.8], [1.69399782E12, 3.0], [1.69399926E12, 4.3], [1.69399908E12, 2.5]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[1.69399818E12, 2.5], [1.693998E12, 2.9], [1.69399854E12, 2.8], [1.69399836E12, 2.4000000000000004], [1.6939989E12, 3.8], [1.69399872E12, 4.400000000000001], [1.69399782E12, 2.9], [1.69399926E12, 4.4], [1.69399764E12, 5.0], [1.69399908E12, 2.5]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[1.6939977E12, 3.4000000000000004], [1.69399914E12, 3.9], [1.69399896E12, 3.1], [1.69399806E12, 3.7999999999999994], [1.69399788E12, 11.0], [1.69399932E12, 2.8999999999999995], [1.69399842E12, 2.9], [1.69399824E12, 3.7999999999999994], [1.69399878E12, 4.1], [1.6939986E12, 3.2]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[1.6939977E12, 3.4000000000000004], [1.69399914E12, 3.5999999999999996], [1.69399896E12, 2.9], [1.69399806E12, 3.7999999999999994], [1.69399788E12, 2.4000000000000004], [1.69399932E12, 2.7], [1.69399842E12, 3.2], [1.69399824E12, 3.8], [1.69399878E12, 4.2], [1.6939986E12, 2.4000000000000004]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 2.9], [1.69399914E12, 4.3], [1.69399896E12, 2.9], [1.69399806E12, 4.5], [1.69399788E12, 3.2], [1.69399932E12, 3.1], [1.69399842E12, 2.6999999999999997], [1.69399824E12, 4.0], [1.69399878E12, 4.1], [1.6939986E12, 3.2]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 3.4000000000000004], [1.69399914E12, 3.9999999999999996], [1.693998E12, 2.5999999999999996], [1.69399854E12, 2.8999999999999995], [1.69399836E12, 3.1999999999999997], [1.69399932E12, 3.0], [1.6939989E12, 11.1], [1.69399872E12, 3.9], [1.69399782E12, 2.5999999999999996], [1.69399764E12, 5.0], [1.69399908E12, 4.0]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[1.69399866E12, 3.6999999999999993], [1.69399848E12, 3.2], [1.69399902E12, 4.0], [1.69399884E12, 2.9], [1.69399794E12, 4.2], [1.69399938E12, 3.9999999999999996], [1.69399776E12, 3.1], [1.6939992E12, 2.3000000000000007], [1.6939983E12, 3.9], [1.69399812E12, 6.3]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 3.666666666666666], [1.69399848E12, 19.7], [1.69399944E12, 3.0], [1.69399794E12, 4.6], [1.6939989E12, 4.1], [1.69399776E12, 2.6999999999999993], [1.69399872E12, 4.0], [1.6939983E12, 4.0], [1.69399926E12, 4.1], [1.69399812E12, 3.9999999999999996], [1.69399908E12, 2.8]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 2.6999999999999997], [1.69399896E12, 4.5], [1.69399806E12, 3.9], [1.69399902E12, 3.5], [1.69399788E12, 2.4000000000000004], [1.69399842E12, 2.5], [1.69399938E12, 4.0], [1.69399824E12, 3.5999999999999996], [1.6939992E12, 2.5999999999999996], [1.69399878E12, 11.7], [1.6939986E12, 2.5999999999999996]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 12.000000000000002], [1.69399848E12, 6.699999999999999], [1.69399902E12, 7.400000000000001], [1.69399884E12, 3.0], [1.69399794E12, 8.7], [1.69399938E12, 4.200000000000001], [1.69399776E12, 3.1], [1.6939992E12, 2.8], [1.6939983E12, 3.9999999999999996], [1.69399812E12, 3.9999999999999996]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 2.5999999999999996], [1.693998E12, 3.1000000000000005], [1.69399854E12, 2.5999999999999996], [1.69399836E12, 2.5999999999999996], [1.6939989E12, 4.400000000000001], [1.69399872E12, 3.8999999999999995], [1.69399782E12, 3.5], [1.69399926E12, 9.0], [1.69399764E12, 4.6], [1.69399908E12, 2.2000000000000006]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 3.7], [1.69399914E12, 3.6999999999999997], [1.69399896E12, 2.9], [1.69399806E12, 14.4], [1.69399788E12, 2.5999999999999996], [1.69399932E12, 2.8999999999999995], [1.69399842E12, 3.1], [1.69399824E12, 4.499999999999999], [1.69399878E12, 3.6], [1.6939986E12, 2.8]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 2.9], [1.693998E12, 3.1], [1.69399854E12, 3.3999999999999995], [1.69399836E12, 2.8], [1.6939989E12, 3.9], [1.69399872E12, 3.8], [1.69399782E12, 3.5], [1.69399926E12, 4.1], [1.69399764E12, 4.8], [1.69399908E12, 2.5999999999999996]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 3.5], [1.69399914E12, 4.1], [1.69399896E12, 3.2], [1.69399806E12, 4.1000000000000005], [1.69399788E12, 2.4000000000000004], [1.69399932E12, 2.4000000000000004], [1.69399842E12, 3.1999999999999997], [1.69399824E12, 3.8], [1.69399878E12, 3.8], [1.6939986E12, 2.5]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[1.69399866E12, 3.9], [1.69399848E12, 2.6], [1.69399902E12, 4.3], [1.69399884E12, 3.2], [1.69399794E12, 3.5], [1.69399938E12, 4.199999999999999], [1.69399776E12, 2.8999999999999995], [1.6939992E12, 2.8], [1.6939983E12, 4.2], [1.69399812E12, 4.200000000000001]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 2.5999999999999996], [1.693998E12, 2.9], [1.69399854E12, 2.5], [1.69399836E12, 3.0], [1.6939989E12, 3.8999999999999995], [1.69399872E12, 3.8], [1.69399782E12, 2.5999999999999996], [1.69399926E12, 3.9999999999999996], [1.69399764E12, 5.199999999999999], [1.69399908E12, 2.4000000000000004]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[1.69399818E12, 2.7999999999999994], [1.693998E12, 2.8000000000000003], [1.69399854E12, 3.0000000000000004], [1.69399836E12, 2.9000000000000004], [1.69399932E12, 2.5], [1.6939989E12, 3.6999999999999993], [1.69399872E12, 4.1], [1.69399782E12, 2.9], [1.69399764E12, 5.8], [1.69399908E12, 12.0]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 11.7], [1.69399914E12, 12.700000000000001], [1.69399896E12, 3.2], [1.69399806E12, 11.799999999999999], [1.69399788E12, 3.4000000000000004], [1.69399932E12, 4.3], [1.69399842E12, 8.7], [1.69399824E12, 3.7999999999999994], [1.69399878E12, 3.5], [1.6939986E12, 6.899999999999999]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 4.0], [1.69399848E12, 2.9000000000000004], [1.69399902E12, 4.0], [1.69399884E12, 2.9], [1.69399794E12, 4.0], [1.69399938E12, 3.9], [1.69399776E12, 3.1000000000000005], [1.6939992E12, 2.4000000000000004], [1.6939983E12, 3.9], [1.69399812E12, 4.1]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 3.2000000000000006], [1.69399914E12, 3.9], [1.69399896E12, 2.8], [1.69399806E12, 5.0], [1.69399788E12, 2.5999999999999996], [1.69399932E12, 13.0], [1.69399842E12, 2.7999999999999994], [1.69399824E12, 4.4], [1.69399878E12, 3.6999999999999997], [1.6939986E12, 2.6]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 4.2], [1.69399848E12, 2.9], [1.69399902E12, 3.9], [1.69399884E12, 2.6999999999999993], [1.69399794E12, 5.2], [1.69399938E12, 3.9], [1.69399776E12, 3.1], [1.6939992E12, 2.5], [1.6939983E12, 4.2], [1.69399812E12, 4.9]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 3.9], [1.69399848E12, 3.0], [1.69399902E12, 4.7], [1.69399884E12, 2.8], [1.69399794E12, 4.0], [1.69399938E12, 3.5], [1.69399776E12, 3.1], [1.6939992E12, 2.5999999999999996], [1.6939983E12, 4.0], [1.69399812E12, 4.1]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 2.9], [1.69399806E12, 4.299999999999999], [1.69399902E12, 4.2], [1.69399788E12, 2.4000000000000004], [1.69399884E12, 3.2], [1.69399842E12, 7.7], [1.69399938E12, 4.199999999999999], [1.69399824E12, 3.9999999999999996], [1.6939992E12, 4.4], [1.6939986E12, 4.300000000000001]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 6.4], [1.693998E12, 2.7999999999999994], [1.69399854E12, 2.5999999999999996], [1.69399836E12, 3.9], [1.6939989E12, 4.1], [1.69399872E12, 4.7], [1.69399782E12, 24.6], [1.69399926E12, 6.8999999999999995], [1.69399764E12, 6.0], [1.69399908E12, 5.100000000000001]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[1.6939977E12, 3.5], [1.69399914E12, 3.6999999999999997], [1.69399896E12, 2.6999999999999997], [1.69399806E12, 3.9], [1.69399788E12, 2.5999999999999996], [1.69399932E12, 2.5999999999999996], [1.69399842E12, 2.5999999999999996], [1.69399824E12, 3.8999999999999995], [1.69399878E12, 3.9], [1.6939986E12, 2.2000000000000006]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 2.5], [1.693998E12, 2.9], [1.69399854E12, 2.8], [1.69399836E12, 3.7], [1.6939989E12, 3.8999999999999995], [1.69399872E12, 4.1], [1.69399782E12, 3.1], [1.69399926E12, 3.5999999999999996], [1.69399764E12, 6.799999999999999], [1.69399908E12, 2.5]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[1.6939977E12, 3.125], [1.69399914E12, 4.0], [1.69399896E12, 2.6999999999999997], [1.69399806E12, 3.8], [1.69399788E12, 3.4], [1.69399932E12, 2.5], [1.69399842E12, 2.8], [1.69399824E12, 4.199999999999999], [1.69399878E12, 3.5999999999999996], [1.69399764E12, 3.0], [1.6939986E12, 3.4000000000000004]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[1.69399818E12, 3.3000000000000003], [1.69399854E12, 2.6999999999999993], [1.69399836E12, 3.8000000000000003], [1.69399758E12, 772.6], [1.69399794E12, 2.5], [1.6939989E12, 3.8], [1.69399776E12, 3.3000000000000003], [1.69399872E12, 4.6], [1.69399926E12, 3.9999999999999996], [1.69399908E12, 3.0]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[1.69399914E12, 4.3999999999999995], [1.69399896E12, 2.6999999999999997], [1.69399806E12, 4.6], [1.69399788E12, 3.5], [1.69399932E12, 6.799999999999999], [1.69399842E12, 2.9999999999999996], [1.69399824E12, 3.9999999999999996], [1.69399878E12, 4.199999999999999], [1.69399764E12, 3.6999999999999997], [1.6939986E12, 3.2]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 2.9000000000000004], [1.69399866E12, 4.6], [1.69399848E12, 2.5999999999999996], [1.69399902E12, 3.8], [1.69399884E12, 3.1], [1.69399794E12, 4.5], [1.69399938E12, 4.5], [1.6939992E12, 2.5], [1.6939983E12, 4.3], [1.69399812E12, 3.9]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[1.69399944E12, 2.5], [1.69399854E12, 3.6999999999999993], [1.69399794E12, 4.7], [1.6939989E12, 4.6000000000000005], [1.69399776E12, 3.0], [1.69399872E12, 3.9], [1.6939983E12, 3.9999999999999996], [1.69399926E12, 3.9], [1.69399812E12, 10.3], [1.69399908E12, 2.3000000000000007]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 4.4], [1.69399848E12, 2.4000000000000004], [1.69399902E12, 4.0], [1.69399884E12, 2.9000000000000004], [1.69399794E12, 5.4], [1.69399938E12, 3.9999999999999996], [1.69399776E12, 2.5999999999999996], [1.6939992E12, 2.8], [1.6939983E12, 4.2], [1.69399812E12, 4.5]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 2.6999999999999997], [1.69399914E12, 3.9999999999999996], [1.69399896E12, 2.6999999999999997], [1.69399806E12, 4.1], [1.69399788E12, 2.5], [1.69399932E12, 2.5999999999999996], [1.69399842E12, 2.5999999999999996], [1.69399824E12, 5.6000000000000005], [1.69399878E12, 3.9], [1.6939986E12, 2.5999999999999996]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69399944E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.69399758E12, "maxY": 733.0999999999999, "series": [{"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 0.0], [1.69399764E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_HOME", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 0.0], [1.69399764E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_HOME", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs17_logiqids_Login", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 0.0], [1.69399776E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399944E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399776E12, 0.0], [1.6939992E12, 6.800000000000001], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.69399758E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_HOME", "isController": false}, {"data": [[1.69399944E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.69399794E12, 9.0], [1.6939989E12, 0.0], [1.69399776E12, 0.0], [1.69399872E12, 0.0], [1.6939983E12, 0.0], [1.69399926E12, 0.0], [1.69399812E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 0.0], [1.69399776E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.69399914E12, 0.0], [1.693998E12, 0.0], [1.69399896E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.69399932E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 6.199999999999999], [1.69399782E12, 0.0], [1.69399764E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_Login", "isController": false}, {"data": [[1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399782E12, 0.0], [1.69399878E12, 0.0], [1.69399764E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399866E12, 0.0], [1.69399806E12, 0.0], [1.69399902E12, 0.0], [1.69399788E12, 0.0], [1.69399884E12, 0.0], [1.69399842E12, 0.0], [1.69399938E12, 0.0], [1.69399824E12, 7.5], [1.6939992E12, 0.0]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399944E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 7.1], [1.69399794E12, 0.0], [1.69399776E12, 0.0], [1.6939983E12, 0.0], [1.69399926E12, 0.0], [1.69399812E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 0.0], [1.69399764E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_HOME", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 0.0], [1.69399776E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 0.0], [1.69399764E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "logiqids_Login", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.69399944E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.69399794E12, 0.0], [1.6939989E12, 0.0], [1.69399776E12, 12.0], [1.69399872E12, 0.0], [1.69399926E12, 0.0], [1.69399812E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399806E12, 0.0], [1.69399902E12, 0.0], [1.69399788E12, 20.9], [1.69399884E12, 0.0], [1.69399938E12, 0.0], [1.69399824E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 8.2], [1.69399914E12, 0.0], [1.693998E12, 0.0], [1.69399896E12, 0.0], [1.69399836E12, 0.0], [1.69399932E12, 0.0], [1.69399782E12, 0.0], [1.69399878E12, 0.0], [1.69399764E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399806E12, 8.8], [1.69399902E12, 0.0], [1.69399788E12, 0.0], [1.69399884E12, 0.0], [1.69399938E12, 0.0], [1.69399824E12, 0.0], [1.6939992E12, 0.0]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 0.0], [1.69399776E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.69399758E12, 0.0], [1.6939989E12, 0.0], [1.69399776E12, 0.0], [1.69399872E12, 0.0], [1.69399926E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_HOME", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399944E12, 0.0], [1.69399902E12, 5.200000000000001], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399776E12, 0.0], [1.6939983E12, 0.0], [1.69399926E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 0.0], [1.69399764E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_HOME", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 0.0], [1.69399764E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_HOME", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.69399914E12, 0.0], [1.693998E12, 0.0], [1.69399896E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 6.3], [1.69399932E12, 0.0], [1.69399782E12, 0.0], [1.69399878E12, 0.0], [1.69399764E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_Login", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.69399914E12, 0.0], [1.693998E12, 0.0], [1.69399896E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399782E12, 11.2], [1.69399878E12, 0.0], [1.69399764E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_Login", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 0.0], [1.69399764E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_HOME", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399806E12, 0.0], [1.69399902E12, 0.0], [1.69399788E12, 0.0], [1.69399884E12, 0.0], [1.69399842E12, 0.0], [1.69399938E12, 0.0], [1.69399824E12, 0.0], [1.6939992E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 7.0]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 6.200000000000001], [1.69399848E12, 0.0], [1.69399944E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.6939989E12, 0.0], [1.69399776E12, 0.0], [1.6939983E12, 0.0], [1.69399926E12, 0.0], [1.69399812E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 0.0], [1.69399764E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_HOME", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 0.0], [1.69399776E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 0.0], [1.69399776E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 17.1], [1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399806E12, 0.0], [1.69399902E12, 0.0], [1.69399788E12, 0.0], [1.69399884E12, 0.0], [1.69399938E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399788E12, 0.0], [1.69399884E12, 0.0], [1.69399938E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs19_logiqids_Login", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 0.0], [1.69399776E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.69399914E12, 0.0], [1.693998E12, 0.0], [1.69399896E12, 0.0], [1.69399854E12, 4.9], [1.69399836E12, 0.0], [1.69399932E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399878E12, 0.0], [1.69399764E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs18_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 0.0], [1.69399764E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_HOME", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399944E12, 5.5], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 5.875], [1.69399776E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 6.6], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399842E12, 0.0], [1.69399938E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 0.0], [1.69399776E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 0.0], [1.69399764E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_HOME", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.69399914E12, 0.0], [1.693998E12, 9.9], [1.69399896E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399782E12, 0.0], [1.69399878E12, 0.0], [1.69399764E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 0.0], [1.69399776E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 0.0], [1.69399776E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399896E12, 7.1], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399842E12, 0.0], [1.69399938E12, 0.0], [1.69399824E12, 0.0], [1.6939992E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 0.0], [1.69399776E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 0.0], [1.69399764E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_Login", "isController": false}, {"data": [[1.69399848E12, 0.0], [1.69399944E12, 0.0], [1.69399794E12, 0.0], [1.6939989E12, 0.0], [1.69399776E12, 0.0], [1.69399872E12, 0.0], [1.6939983E12, 6.299999999999999], [1.69399926E12, 0.0], [1.69399812E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 0.0], [1.69399764E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "cssURL3_logiqids_Login", "isController": false}, {"data": [[1.69399914E12, 0.0], [1.693998E12, 0.0], [1.69399896E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399782E12, 0.0], [1.69399878E12, 0.0], [1.69399764E12, 27.6], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs11_logiqids_Login", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.69399758E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_HOME", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 0.0], [1.69399764E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_HOME", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs16_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.69399914E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.69399932E12, 0.0], [1.6939989E12, 6.3], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399764E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs4_logiqids_Login", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 0.0], [1.69399776E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 16.599999999999998], [1.69399944E12, 0.0], [1.69399794E12, 0.0], [1.6939989E12, 0.0], [1.69399776E12, 0.0], [1.69399872E12, 0.0], [1.6939983E12, 0.0], [1.69399926E12, 0.0], [1.69399812E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399902E12, 0.0], [1.69399788E12, 0.0], [1.69399842E12, 0.0], [1.69399938E12, 0.0], [1.69399824E12, 0.0], [1.6939992E12, 0.0], [1.69399878E12, 7.3999999999999995], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 0.0], [1.69399776E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 5.9], [1.69399764E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 0.0], [1.69399764E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs15_logiqids_Login", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 0.0], [1.69399776E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 0.0], [1.69399764E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_Login", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.69399932E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399764E12, 0.0], [1.69399908E12, 6.800000000000001]], "isOverall": false, "label": "jsURLs3_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 0.0], [1.69399776E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 6.8999999999999995], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 0.0], [1.69399776E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "cssURL2_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 0.0], [1.69399776E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399806E12, 0.0], [1.69399902E12, 0.0], [1.69399788E12, 0.0], [1.69399884E12, 0.0], [1.69399842E12, 5.0], [1.69399938E12, 0.0], [1.69399824E12, 0.0], [1.6939992E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 0.0], [1.69399764E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs5_logiqids_HOME", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.693998E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.6939989E12, 0.0], [1.69399872E12, 0.0], [1.69399782E12, 0.0], [1.69399926E12, 0.0], [1.69399764E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs10_logiqids_HOME", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.69399764E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs14_logiqids_Login", "isController": false}, {"data": [[1.69399818E12, 0.0], [1.69399854E12, 0.0], [1.69399836E12, 0.0], [1.69399758E12, 733.0999999999999], [1.69399794E12, 0.0], [1.6939989E12, 0.0], [1.69399776E12, 0.0], [1.69399872E12, 0.0], [1.69399926E12, 0.0], [1.69399908E12, 0.0]], "isOverall": false, "label": "logiqids_HOME", "isController": false}, {"data": [[1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.69399764E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs13_logiqids_Login", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "cssURL1_logiqids_olympiad", "isController": false}, {"data": [[1.69399944E12, 0.0], [1.69399854E12, 0.0], [1.69399794E12, 0.0], [1.6939989E12, 0.0], [1.69399776E12, 0.0], [1.69399872E12, 0.0], [1.6939983E12, 0.0], [1.69399926E12, 0.0], [1.69399812E12, 7.2], [1.69399908E12, 0.0]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad", "isController": false}, {"data": [[1.69399866E12, 0.0], [1.69399848E12, 0.0], [1.69399902E12, 0.0], [1.69399884E12, 0.0], [1.69399794E12, 0.0], [1.69399938E12, 0.0], [1.69399776E12, 0.0], [1.6939992E12, 0.0], [1.6939983E12, 0.0], [1.69399812E12, 0.0]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad", "isController": false}, {"data": [[1.6939977E12, 0.0], [1.69399914E12, 0.0], [1.69399896E12, 0.0], [1.69399806E12, 0.0], [1.69399788E12, 0.0], [1.69399932E12, 0.0], [1.69399842E12, 0.0], [1.69399824E12, 0.0], [1.69399878E12, 0.0], [1.6939986E12, 0.0]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69399944E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.69399758E12, "maxY": 909.0, "series": [{"data": [[1.69399866E12, 140.0], [1.69399896E12, 257.0], [1.69399806E12, 69.0], [1.69399836E12, 161.0], [1.69399794E12, 198.0], [1.69399824E12, 97.0], [1.69399926E12, 79.0], [1.69399764E12, 250.0], [1.69399914E12, 159.0], [1.69399944E12, 10.0], [1.69399854E12, 129.0], [1.69399884E12, 103.0], [1.69399842E12, 100.0], [1.69399872E12, 100.0], [1.69399782E12, 180.0], [1.69399812E12, 92.0], [1.6939977E12, 216.0], [1.693998E12, 109.0], [1.69399902E12, 115.0], [1.69399932E12, 176.0], [1.6939989E12, 82.0], [1.6939992E12, 142.0], [1.6939983E12, 236.0], [1.6939986E12, 160.0], [1.69399818E12, 148.0], [1.69399848E12, 135.0], [1.69399788E12, 72.0], [1.69399758E12, 909.0], [1.69399938E12, 96.0], [1.69399776E12, 116.0], [1.69399878E12, 153.0], [1.69399908E12, 54.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.69399866E12, 10.0], [1.69399896E12, 10.0], [1.69399806E12, 9.900000000000034], [1.69399836E12, 7.0], [1.69399794E12, 10.0], [1.69399824E12, 9.0], [1.69399926E12, 6.900000000000034], [1.69399764E12, 39.0], [1.69399914E12, 13.0], [1.69399944E12, 4.0], [1.69399854E12, 8.0], [1.69399884E12, 7.0], [1.69399842E12, 7.900000000000034], [1.69399872E12, 8.100000000000023], [1.69399782E12, 10.0], [1.69399812E12, 9.0], [1.6939977E12, 11.0], [1.693998E12, 11.900000000000034], [1.69399902E12, 8.0], [1.69399932E12, 15.900000000000034], [1.6939989E12, 7.0], [1.6939992E12, 7.0], [1.6939983E12, 9.0], [1.6939986E12, 6.900000000000034], [1.69399818E12, 9.0], [1.69399848E12, 6.0], [1.69399788E12, 7.900000000000034], [1.69399758E12, 908.0], [1.69399938E12, 8.0], [1.69399776E12, 7.0], [1.69399878E12, 8.0], [1.69399908E12, 5.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.69399866E12, 46.0], [1.69399896E12, 77.88000000000011], [1.69399806E12, 43.98000000000002], [1.69399836E12, 102.1099999999999], [1.69399794E12, 44.930000000000064], [1.69399824E12, 70.11999999999989], [1.69399926E12, 19.930000000000064], [1.69399764E12, 225.48999999999995], [1.69399914E12, 94.0], [1.69399944E12, 10.0], [1.69399854E12, 104.98000000000002], [1.69399884E12, 66.00999999999999], [1.69399842E12, 47.940000000000055], [1.69399872E12, 52.059999999999945], [1.69399782E12, 98.86000000000013], [1.69399812E12, 38.2000000000001], [1.6939977E12, 208.02999999999997], [1.693998E12, 93.82000000000016], [1.69399902E12, 43.0], [1.69399932E12, 90.99000000000001], [1.6939989E12, 31.359999999999673], [1.6939992E12, 47.88000000000011], [1.6939983E12, 41.98000000000002], [1.6939986E12, 70.73000000000025], [1.69399818E12, 58.0], [1.69399848E12, 44.97000000000003], [1.69399788E12, 60.99000000000001], [1.69399758E12, 909.0], [1.69399938E12, 70.24999999999977], [1.69399776E12, 53.75000000000023], [1.69399878E12, 47.0], [1.69399908E12, 28.90000000000009]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.69399866E12, 14.0], [1.69399896E12, 15.949999999999989], [1.69399806E12, 22.94999999999999], [1.69399836E12, 11.0], [1.69399794E12, 15.949999999999989], [1.69399824E12, 13.0], [1.69399926E12, 9.0], [1.69399764E12, 108.64999999999935], [1.69399914E12, 25.0], [1.69399944E12, 5.699999999999989], [1.69399854E12, 10.0], [1.69399884E12, 15.050000000000011], [1.69399842E12, 14.949999999999989], [1.69399872E12, 12.050000000000011], [1.69399782E12, 20.899999999999977], [1.69399812E12, 15.199999999999989], [1.6939977E12, 26.40000000000009], [1.693998E12, 17.899999999999977], [1.69399902E12, 11.0], [1.69399932E12, 26.0], [1.6939989E12, 12.100000000000023], [1.6939992E12, 13.899999999999977], [1.6939983E12, 13.899999999999977], [1.6939986E12, 13.0], [1.69399818E12, 15.0], [1.69399848E12, 18.899999999999977], [1.69399788E12, 21.899999999999977], [1.69399758E12, 909.0], [1.69399938E12, 14.050000000000011], [1.69399776E12, 15.0], [1.69399878E12, 13.0], [1.69399908E12, 9.949999999999989]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.69399866E12, 3.0], [1.69399896E12, 1.0], [1.69399806E12, 3.0], [1.69399836E12, 2.0], [1.69399794E12, 2.0], [1.69399824E12, 3.0], [1.69399926E12, 3.0], [1.69399764E12, 2.0], [1.69399914E12, 3.0], [1.69399944E12, 2.0], [1.69399854E12, 1.0], [1.69399884E12, 2.0], [1.69399842E12, 2.0], [1.69399872E12, 3.0], [1.69399782E12, 2.0], [1.69399812E12, 2.0], [1.6939977E12, 2.0], [1.693998E12, 2.0], [1.69399902E12, 3.0], [1.69399932E12, 2.0], [1.6939989E12, 3.0], [1.6939992E12, 2.0], [1.6939983E12, 2.0], [1.6939986E12, 2.0], [1.69399818E12, 2.0], [1.69399848E12, 2.0], [1.69399788E12, 1.0], [1.69399758E12, 5.0], [1.69399938E12, 3.0], [1.69399776E12, 2.0], [1.69399878E12, 3.0], [1.69399908E12, 2.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.69399866E12, 4.0], [1.69399896E12, 3.0], [1.69399806E12, 4.0], [1.69399836E12, 3.0], [1.69399794E12, 4.0], [1.69399824E12, 4.0], [1.69399926E12, 4.0], [1.69399764E12, 5.0], [1.69399914E12, 4.0], [1.69399944E12, 3.0], [1.69399854E12, 3.0], [1.69399884E12, 3.0], [1.69399842E12, 3.0], [1.69399872E12, 4.0], [1.69399782E12, 3.0], [1.69399812E12, 4.0], [1.6939977E12, 3.0], [1.693998E12, 3.0], [1.69399902E12, 4.0], [1.69399932E12, 3.0], [1.6939989E12, 4.0], [1.6939992E12, 3.0], [1.6939983E12, 4.0], [1.6939986E12, 3.0], [1.69399818E12, 3.0], [1.69399848E12, 3.0], [1.69399788E12, 3.0], [1.69399758E12, 49.0], [1.69399938E12, 4.0], [1.69399776E12, 3.0], [1.69399878E12, 4.0], [1.69399908E12, 3.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69399944E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 3.0, "minX": 1.0, "maxY": 4.0, "series": [{"data": [[8.0, 4.0], [2.0, 4.0], [4.0, 4.0], [1.0, 4.0], [9.0, 4.0], [10.0, 4.0], [5.0, 3.0], [3.0, 4.0], [6.0, 4.0], [7.0, 4.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 10.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 3.0, "minX": 1.0, "maxY": 4.0, "series": [{"data": [[8.0, 4.0], [2.0, 4.0], [4.0, 4.0], [1.0, 3.0], [9.0, 3.0], [10.0, 3.0], [5.0, 3.0], [3.0, 4.0], [6.0, 4.0], [7.0, 4.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 10.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.6666666666666666, "minX": 1.69399758E12, "maxY": 5.0, "series": [{"data": [[1.69399866E12, 4.983333333333333], [1.69399896E12, 4.966666666666667], [1.69399806E12, 5.0], [1.69399836E12, 4.966666666666667], [1.69399794E12, 5.0], [1.69399824E12, 4.966666666666667], [1.69399926E12, 5.0], [1.69399764E12, 4.866666666666666], [1.69399914E12, 4.983333333333333], [1.69399944E12, 1.5333333333333334], [1.69399854E12, 5.0], [1.69399884E12, 4.966666666666667], [1.69399842E12, 5.0], [1.69399872E12, 4.966666666666667], [1.69399782E12, 5.0], [1.69399812E12, 4.916666666666667], [1.6939977E12, 4.966666666666667], [1.693998E12, 5.0], [1.69399902E12, 4.983333333333333], [1.69399932E12, 5.0], [1.6939989E12, 5.0], [1.6939992E12, 5.0], [1.6939983E12, 5.0], [1.6939986E12, 5.0], [1.69399818E12, 4.983333333333333], [1.69399848E12, 5.0], [1.69399788E12, 5.0], [1.69399758E12, 0.6666666666666666], [1.69399938E12, 4.966666666666667], [1.69399776E12, 5.0], [1.69399878E12, 4.983333333333333], [1.69399908E12, 5.0]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69399944E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.6666666666666666, "minX": 1.69399758E12, "maxY": 5.0, "series": [{"data": [[1.69399866E12, 4.983333333333333], [1.69399896E12, 5.0], [1.69399806E12, 5.0], [1.69399836E12, 4.966666666666667], [1.69399794E12, 5.0], [1.69399824E12, 4.966666666666667], [1.69399926E12, 5.0], [1.69399764E12, 4.866666666666666], [1.69399914E12, 4.983333333333333], [1.69399944E12, 1.5333333333333334], [1.69399854E12, 5.0], [1.69399884E12, 4.966666666666667], [1.69399842E12, 5.0], [1.69399872E12, 4.966666666666667], [1.69399782E12, 5.0], [1.69399812E12, 4.916666666666667], [1.6939977E12, 4.966666666666667], [1.693998E12, 5.0], [1.69399902E12, 4.983333333333333], [1.69399932E12, 5.0], [1.6939989E12, 4.966666666666667], [1.6939992E12, 5.0], [1.6939983E12, 5.0], [1.6939986E12, 5.0], [1.69399818E12, 4.983333333333333], [1.69399848E12, 5.0], [1.69399788E12, 5.0], [1.69399758E12, 0.6666666666666666], [1.69399938E12, 4.966666666666667], [1.69399776E12, 5.0], [1.69399878E12, 4.983333333333333], [1.69399908E12, 5.0]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.69399944E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.69399758E12, "maxY": 0.16666666666666666, "series": [{"data": [[1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs12_logiqids_Login-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs9_logiqids_sign_up-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs11_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs6_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs4_logiqids_HOME-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs11_logiqids_HOME-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.69399758E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "cssURL1_logiqids_HOME-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs5_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "cssURL1_logiqids_Login-success", "isController": false}, {"data": [[1.69399848E12, 0.16666666666666666], [1.69399944E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs24_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs13_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.69399758E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "logiqids_HOME-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "logiqids_sign_up-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "cssURL2_logiqids_sign_up-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399896E12, 0.03333333333333333], [1.69399806E12, 0.16666666666666666], [1.69399902E12, 0.13333333333333333], [1.69399788E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs13_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs7_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs5_logiqids_HOME-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs15_logiqids_Login-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs12_logiqids_HOME-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs2_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399944E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs25_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs4_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs14_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.69399914E12, 0.15], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.016666666666666666]], "isOverall": false, "label": "jsURLs4_logiqids_Login-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs19_logiqids_Login-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs8_logiqids_Login-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "cssURL1_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs13_logiqids_Login-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs15_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "logiqids_Login-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs17_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs6_logiqids_HOME-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399944E12, 0.16666666666666666], [1.69399884E12, 0.06666666666666667], [1.69399794E12, 0.16666666666666666], [1.6939989E12, 0.1], [1.69399776E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs22_logiqids_olympiad-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399824E12, 0.03333333333333333], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.13333333333333333]], "isOverall": false, "label": "jsURLs18_logiqids_sign_up-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399884E12, 0.06666666666666667], [1.69399842E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.69399878E12, 0.1], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs14_logiqids_sign_up-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs18_logiqids_Login-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs16_logiqids_olympiad-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs15_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.69399758E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "cssURL2_logiqids_HOME-success", "isController": false}, {"data": [[1.6939977E12, 0.13333333333333333], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.69399764E12, 0.03333333333333333], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs14_logiqids_Login-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399866E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs16_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs3_logiqids_Login-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs7_logiqids_HOME-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs10_logiqids_HOME-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs7_logiqids_Login-success", "isController": false}, {"data": [[1.69399866E12, 0.15], [1.69399848E12, 0.16666666666666666], [1.69399944E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.69399872E12, 0.016666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs23_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs9_logiqids_HOME-success", "isController": false}, {"data": [[1.69399818E12, 0.06666666666666667], [1.69399914E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.1], [1.69399782E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs10_logiqids_Login-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399944E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs20_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs17_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs8_logiqids_HOME-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "cssURL3_logiqids_Login-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs10_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs1_logiqids_olympiad-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs8_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "cssURL2_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.69399758E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs1_logiqids_HOME-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs2_logiqids_Login-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs1_logiqids_sign_up-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "cssURL1_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs10_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399944E12, 0.03333333333333333], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.13333333333333333], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs18_logiqids_olympiad-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs19_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399944E12, 0.16666666666666666], [1.69399902E12, 0.016666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666], [1.69399908E12, 0.15]], "isOverall": false, "label": "jsURLs21_logiqids_olympiad-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs17_logiqids_Login-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs12_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399872E12, 0.11666666666666667], [1.69399782E12, 0.16666666666666666], [1.69399878E12, 0.05], [1.69399764E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs6_logiqids_Login-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs3_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs11_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399944E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs19_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399914E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs11_logiqids_Login-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs8_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399944E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.13333333333333333], [1.69399794E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.6939983E12, 0.03333333333333333], [1.69399926E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs26_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs13_logiqids_HOME-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs3_logiqids_HOME-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "cssURL2_logiqids_Login-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs4_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs3_logiqids_olympiad-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs6_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs1_logiqids_Login-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs7_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399818E12, 0.08333333333333333], [1.69399944E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399812E12, 0.08333333333333333], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs27_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399896E12, 0.13333333333333333], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.6939989E12, 0.03333333333333333], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs5_logiqids_Login-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "logiqids_olympiad-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs16_logiqids_Login-success", "isController": false}, {"data": [[1.6939977E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399806E12, 0.16666666666666666], [1.69399788E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399824E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs5_logiqids_sign_up-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399854E12, 0.16666666666666666], [1.69399836E12, 0.16666666666666666], [1.6939989E12, 0.16666666666666666], [1.69399872E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399926E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.69399908E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs2_logiqids_HOME-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs9_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs2_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399866E12, 0.16666666666666666], [1.69399848E12, 0.16666666666666666], [1.69399902E12, 0.16666666666666666], [1.69399884E12, 0.16666666666666666], [1.69399794E12, 0.16666666666666666], [1.69399938E12, 0.16666666666666666], [1.69399776E12, 0.16666666666666666], [1.6939992E12, 0.16666666666666666], [1.6939983E12, 0.16666666666666666], [1.69399812E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs12_logiqids_olympiad-success", "isController": false}, {"data": [[1.69399818E12, 0.16666666666666666], [1.69399914E12, 0.16666666666666666], [1.693998E12, 0.16666666666666666], [1.69399896E12, 0.16666666666666666], [1.69399932E12, 0.16666666666666666], [1.69399842E12, 0.16666666666666666], [1.69399782E12, 0.16666666666666666], [1.69399878E12, 0.16666666666666666], [1.69399764E12, 0.16666666666666666], [1.6939986E12, 0.16666666666666666]], "isOverall": false, "label": "jsURLs9_logiqids_Login-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69399944E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.6666666666666666, "minX": 1.69399758E12, "maxY": 5.0, "series": [{"data": [[1.69399866E12, 4.983333333333333], [1.69399896E12, 5.0], [1.69399806E12, 5.0], [1.69399836E12, 4.966666666666667], [1.69399794E12, 5.0], [1.69399824E12, 4.966666666666667], [1.69399926E12, 5.0], [1.69399764E12, 4.866666666666666], [1.69399914E12, 4.983333333333333], [1.69399944E12, 1.5333333333333334], [1.69399854E12, 5.0], [1.69399884E12, 4.966666666666667], [1.69399842E12, 5.0], [1.69399872E12, 4.966666666666667], [1.69399782E12, 5.0], [1.69399812E12, 4.916666666666667], [1.6939977E12, 4.966666666666667], [1.693998E12, 5.0], [1.69399902E12, 4.983333333333333], [1.69399932E12, 5.0], [1.6939989E12, 4.966666666666667], [1.6939992E12, 5.0], [1.6939983E12, 5.0], [1.6939986E12, 5.0], [1.69399818E12, 4.983333333333333], [1.69399848E12, 5.0], [1.69399788E12, 5.0], [1.69399758E12, 0.6666666666666666], [1.69399938E12, 4.966666666666667], [1.69399776E12, 5.0], [1.69399878E12, 4.983333333333333], [1.69399908E12, 5.0]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.69399944E12, "title": "Total Transactions Per Second"}},
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
