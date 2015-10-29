
// initialization
$(document).ready(function() {
    tracker9000.initialize();
});


// scope our code to avoid collisions in global
var tracker9000 = (function () {

    var $trackerTableBody;
    var $trackerInfo;
    var $trackerForm;

    var animationDuration = 400;
    var submitLocked = false;

    function initialize () {
        if(SeptaStations) {
            var $stationSelect = $("<select>");

            for(var i = 0; i < SeptaStations.length; i++) {
                // Use special codes instead of display name if they are present
                var val = SeptaStations[i].code ? SeptaStations[i].code : SeptaStations[i].name;

                $stationSelect.append("<option value='" + val + "'>" + SeptaStations[i].name + "</option>");
            }

            $("#startStation").replaceWith($stationSelect.clone().attr('id', 'startStation'));
            $("#endStation").replaceWith($stationSelect.attr('id', 'endStation'));
            $('#submit').on('click', getTrainData);
            $trackerTableBody = $('#trackerTableBody');
            $trackerInfo = $('#trackerInfo');

            // handle enter key
            $trackerForm = $('#trackerForm').on('submit', function(){
                if(!submitLocked) {
                    getTrainData();
                }

                return false;
            });
        }
    }

    /**
     * getTrainData sends call to SEPTA api
     * in the format of
     * http://www3.septa.org/hackathon/NextToArrive/?req1=Swarthmore&req2=30th+Street+Station
     *
     */
    function getTrainData() {

        submitLocked = true;
        var startStation = encodeURIComponent($("#startStation").val());
        var endStation = encodeURIComponent($('#endStation').val());

        var septaApi = "http://www3.septa.org/hackathon/NextToArrive/?req1=" + startStation +
            "&req2=" + endStation;

        removeCurrentRows(function() {
            $.ajax(septaApi,
                {dataType: 'jsonp',
                    contentType: "application/jsonp; charset=utf-8",
                    beforeSend: addHeaders,
                    success: processTrainData}).complete(completeApiCall).fail(ajaxFailure);
        });


    }

    /**
     * add special headers before sending to get around CORS issue
     *
     * @param jqXHR
     * @param settings
     */
    function addHeaders(jqXHR, settings) {
        jqXHR.setRequestHeader('Access-Control-Allow-Origin', 'www3.septa.org');
    }

    function completeApiCall() {
        submitLocked = false;
    }

    /**
     * Generic error handler for ajax calls
     *
     * @param jqXHR
     * @param textStatus
     * @param errorThrown
     */
    function ajaxFailure(jqXHR, textStatus, errorThrown){
        removeCurrentRows(function() {
            drawErrors("Unknown error encountered. Please try again.")
        });
    }

    /**
     * Try to avoid memory leaks by emptying the old rows and centralizing animation
     *
     * @param next
     */
    function removeCurrentRows(next) {
        $trackerTableBody.fadeOut(animationDuration, function() {
            $trackerTableBody.empty();
            next();
        });
    }

    /**
     * Template for error row
     *
     * @param strError
     */
    function drawErrors(strError) {
        var strRow = "<tr class='trackerInfo'><td colspan='5'>" + strError + "</td></tr>";
        $trackerTableBody.append(strRow);
        $trackerTableBody.fadeIn(animationDuration, function(){});
    }

    /**
     * inspects data object for various conditions and draws error as appropriate
     *
     * @param data
     * @param status
     * @param jqXHR
     * @returns {boolean} - whether we have drawn an error
     */
    function validateData(data, status, jqXHR) {
        var strError;

        if(!data || data.length === 0) {
            strError = "No data returned.<p/>Verify you are checking for a train during SEPTA operating hours."
        }
        else if (status !== 'success') {
            strError = "Error returned from SEPTA. Status code: " + status.toString();
        }


        if(strError) {
            drawErrors(strError);
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Handles responses from the web service call
     *
     * @param data
     * @param status
     * @param jqXHR
     */
    function processTrainData(data, status, jqXHR) {
        if(!validateData(data, status, jqXHR)) {
            var strRow;

            for(var i = 0; i < data.length; i++) {
                strRow = '<tr><td>' + data[i].orig_train +
                '</td><td>' + data[i].orig_line +
                '</td><td>' + data[i].orig_departure_time +
                '</td><td>' + data[i].orig_arrival_time +
                '</td><td' + (data[i].orig_delay.toLowerCase() !== 'on time' ? ' class="late"' : '') +
                '>' + data[i].orig_delay +
                '</td></tr>';

                var $row = $(strRow);
                $trackerTableBody.append($row);

            }

            $trackerTableBody.fadeIn(animationDuration, function(){});
        }

    }

    // external signature
    return {initialize: initialize};
})();
