// https://www.geodatasource.com/developers/javascript
function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}
function getClosestCarts(data, lat, lon){
    var filteredData = [];
    for (var i = 0; i < data.length; i++){
        if (data[i].status == "APPROVED"){
            var latitude = data[i].latitude;
            var longitude = data[i].longitude;
            var dataItem = [data[i].applicant, data[i].fooditems, data[i].address, 
            "<a href=\"" + data[i].schedule + "\"><i class=\"fa fa-calendar\"></i> Schedule </a>", 
            data[i].latitude, data[i].longitude];
          filteredData.length = filteredData.push(dataItem);
        }
    }
    filteredData.sort(function(a, b){
        return distance(a[a.length-2], a[a.length-1], lat, lon) -
        distance(b[b.length-2], b[b.length-1], lat, lon);
    });
    return filteredData;
}

function getCarts(){

    var filteredData = [];
    var table = $('#FoodTrucks').DataTable();
    table.clear();

    $.ajax({
        url: "https://data.sfgov.org/resource/rqzj-sfat.json",
        type: "GET",
        dataType: "json",
        data: {
          "$limit" : 5000,
          "$$app_token" : "UPtMjDO7VjUrAlZE1uamwRyg4"
        }
    }).done(function(data) {

      var lat = 37.7919; 
      if($("input[name=lat]").val()) 
        lat = $("input[name=lat]").val(); 

      var lon = -122.4038; 
      if($("input[name=lon]").val()) 
        lon = $("input[name=lon]").val(); 

      var num = 5;
      if($("input[name=num]").val())
        num = $("input[name=num]").val(); 

      lat = Math.min(lat,90);
      lat = Math.max(lat,-90);

      lon = Math.min(lon,180);
      lon = Math.max(lon,-180);

      num = Math.max(num,1);

      console.log(lat);
      console.log(lon);
      console.log(num);

      var filteredData = getClosestCarts(data, lat, lon);

      var numberOfCarts = filteredData.length > num? num: filteredData.length;

      for (var i = 0; i < numberOfCarts; i++){
        var row = filteredData[i];
        table.row.add(row.slice(0,length-3)).draw();
      }
      table.draw();
      $('#FoodTrucks').show();
    });
}