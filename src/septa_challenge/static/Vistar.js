$(document).ready(function() {

    if(SeptaStations) {
        var $stationSelect = $("<select>");

        for(var i = 0; i < SeptaStations.length; i++) {
            // strip off & from airport names
            // doing this as a replace to save time, as doing a search and then replace will
            // search the strings twice when it finds the match on the first and then again to find to replace
            SeptaStations[i].name = SeptaStations[i].name.replace(" & ", "-");

            $stationSelect.append("<option value='" + SeptaStations[i].name + "'>" + SeptaStations[i].name + "</option>");
        }

        $("#startStation").replaceWith($stationSelect.clone().attr('id', 'startStation'));
        $("#endStation").replaceWith($stationSelect.attr('id', 'endStation'));
        $('#submit').on('click', getTrainData);
    }
});

/**
 * getTrainData sends call to SEPTA api
 * in the format of
 * http://www3.septa.org/hackathon/NextToArrive/?req1=Swarthmore&req2=30th+Street+Station
 *
 */
function getTrainData() {

    var startStation = encodeURIComponent($("#startStation").val());
    var endStation = encodeURIComponent($('#endStation').val());

    var septaApi = "http://www3.septa.org/hackathon/NextToArrive/?req1=" + startStation +
            "&req2=" + endStation;

    $.ajax(septaApi,
        {dataType: 'jsonp', beforeSend: addHeaders, success: processTrainData, headers: {'Access-Control-Allow-Origin' : 'www3.septa.org'}});
}

/**
 * add special headers before sending to get around CORS issue
 *
 * @param jqXHR
 * @param settings
 */
function addHeaders(jqXHR, settings) {
    jqXHR.setRequestHeader('Access-Control-Allow-Origin', '*');
}

function processTrainData(data, status, jqXHR) {
    if(data) {
        alert('woo');
    }
}