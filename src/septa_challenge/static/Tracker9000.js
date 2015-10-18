$(document).ready(function() {
    if(SeptaStations) {
        var $stationSelect = $("<select>");

        for(var i = 0; i < SeptaStations.length; i++) {
            // strip off & from airport names
            // doing this as a replace to save time, as doing a search and then replace will
            // search the strings twice when it finds the match on the first and then again to find to replace
            SeptaStations[i].name = SeptaStations[i].name.replace(" & ", "-");

            $stationSelect.append("<option value='" + SeptaStations[i].name + "'/>");
        }

        $("#startStation").replaceWith($stationSelect);
        $("#endStation").replaceWith($stationSelect);
    }
})