// store our lat, lon, and filtered/sorted data globally so we can reduce the number of computations
// required to view more or less rows in the data table. 
// these values will only be calculated if the user enters in a new lat/lon or this is their first time
// getting values since opening the web page
var globalFilteredData = undefined;
var userLat = -999999.9;
var userLon = -999999.9;

// https://www.geodatasource.com/developers/javascript
function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
        //convert latitudes to radians
		var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        
        //calculate theta
        var theta = lon1-lon2;
        // convert theta to radians
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;

        //convert miles to knots
        if (unit=="K") { dist = dist * 1.609344 }
        //convert miles to nautical miles
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

function getClosestCarts(data, lat, lon){
    
  var filteredData = [];
    for (var i = 0; i < data.length; i++){
        // only consider food trucks that have been approved for a permit
        if (data[i].status == "APPROVED"){
            var latitude = data[i].latitude;
            var longitude = data[i].longitude;
            var cartdistance = distance(latitude, longitude, lat, lon, "M");
            // create a custom data item from the filtered data
            // this will be sorted and displayed according to the users inputs
            // check that the values are valid. if not set them to unknown
            var applicant = "Unknown";
            if (data[i].applicant)
              applicant = data[i].applicant;

            var address = "Unknown";
            if(data[i].address)
              address = data[i].address;

            var foodItems = "Unknown";
            if (data[i].fooditems)
              foodItems = data[i].fooditems;

            var schedule = "Unknown"
            if (data[i].schedule)
              schedule = data[i].schedule;

            var dataItem = [applicant, address, cartdistance, foodItems, 
            "<a href=\"" + schedule + "\"><i class=\"fa fa-calendar\"></i> Schedule </a>", 
            data[i].latitude, data[i].longitude];
          filteredData.length = filteredData.push(dataItem);
        }
    }
    // once all the 
    filteredData.sort(function(a, b){
        return a[2] - b[2];
    });
    return filteredData;
}

function getCarts(){

    var table = $('#FoodTrucks').DataTable();
    table.clear();

    $.ajax({
        url: "https://data.sfgov.org/resource/rqzj-sfat.json",
        type: "GET",
        dataType: "json",
        data: {
          "$limit" : 5000,
          "$$app_token" : "UPtMjDO7VjUrAlZE1uamwRyg4" // Replace this token with your personal App Token
        }
    }).done(function(data) {

      //get input values fom the form
      var lat = 37.7919; 
      if($("input[name=lat]").val()) {
        lat = $("input[name=lat]").val(); 
      }

      var lon = -122.4038; 
      if($("input[name=lon]").val()) {
        lon = $("input[name=lon]").val(); 
      }

      var num = 5;
      if($("input[name=num]").val()){
        num = $("input[name=num]").val(); 
      }

      // crop latitude to numbers between -90 and 90 if it is outside of the boundaries
      lat = Math.min(lat,90);
      lat = Math.max(lat,-90);

      // crop longitude to numbers between -180 and 180 if it is outside of the boundaries
      lon = Math.min(lon,180);
      lon = Math.max(lon,-180);

      // always return at least one food truck from our sorted list
      num = Math.max(num,1);

      // if we have not pre calculated our filtered data, or we have changed
      // location, then recalculate and sort the data based on the lat and
      // lon from the user input
      if (userLat != lat || userLon != lon || globalFilteredData == undefined){
        userLat = lat;
        userLon = lon;
        console.log("new data created");
        globalFilteredData = getClosestCarts(data, lat, lon);
      }

      // it is possible the user could want to display more carts than are available in
      // the dataset so we should pick the lower number of the 2.
      var numberOfCarts = globalFilteredData.length > num? num: globalFilteredData.length;

      // since the data is sorted, we simply need to add rows fom the beginning of our
      // data array until we have added the desired number of rows
      for (var i = 0; i < numberOfCarts; i++){
        var row = globalFilteredData[i];
        table.row.add(row.slice(0,length-3)).draw();
      }
      table.draw();
      $('#FoodTrucks').show();
    });
}