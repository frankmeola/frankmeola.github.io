//helper to get querystring value
var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

var toInt = function(num){
	console.log(num);
	if(typeof num === 'undefined' || num === null) return 0;
	return parseInt(num, 10);
};

var ensureBetween = function(numberInQuestion, min, max){
	if(numberInQuestion < min) return min;
	if(max < numberInQuestion) return max;
	return numberInQuestion;
};

var navigation = function(pagingData){

	var totalItems = function(pageInfo){
		return pageInfo.TotalPages*pageInfo.ItemsPerPage;
	};

	var seen = function(pageInfo, t){
		var previousItems = pageInfo.CurrentPage * pageInfo.ItemsPerPage;
		return {ItemCount: previousItems, Percentage:previousItems/t};
	};
	
	var remaining = function(pageInfo, t){
		var remainingItems = (pageInfo.TotalPages - pageInfo.CurrentPage) * pageInfo.ItemsPerPage;
		return {ItemCount: remainingItems, Percentage:remainingItems/t};
	};
	
	var total = totalItems(pagingData);
	
	return {
					Previous : seen(pagingData, total),
					Next : remaining(pagingData, total)
	};
};