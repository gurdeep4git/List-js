$(function(){
    loadData();
});

$('.search').on('keyup', function() {
  var searchString = $(this).val();
  listObj.search(searchString);
});

$(document).on("click",".js-popFilter",function(){
 	listObj.filter(function(item) {
 		if(item.values().population>27657146){
 			return item;
 		}
    });
});

var _li="";
var listObj;

var options = {
	listClass : "list-group",
	searchClass:"search",
    valueNames: [ 'countryname','population' ],
    page: 10,
    item: _li,
    pagination: true
};

function loadData(){
	$.ajax({
		url:'https://restcountries.eu/rest/v2/all',
		type:'GET',
		dataType:'json',
		success:function(response){
			
			$.each(response,function(i,item){
				_li = _li + "<li class='list-group-item'>"+
							"<span class='countryname'>"+item.name+"</span>"+
							"<br/><b>Population: </b><span class='population'>"+item.population+"</span></li>";
			});
			$(".list-group").append(_li);

			listObj = new List('country-list', options,response);

			//properties
			console.log(listObj.listContainer);
			console.log(listObj.list);
			console.log(listObj.items);
			console.log(listObj.visibleItems);
			console.log(listObj.matchingItems);
			console.log(listObj.searched);
			console.log(listObj.filtered);

			//methods
			console.log(listObj.size());

			//console.log(listObj.items._values.countryname);
			//listObj.search('India', ['countryname']);

			
		},
		error:function(){},
		complete:function(){}
	});
}

//listObj.on("searchComplete",funAfterSearch);

function sortAscending(){
	listObj.sort(
	'countryname',
	{ 
		order: "asc",
		alphabet: "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvXxYyZzÅåÄäÖö"
	});
}

function sortDescending(){
	listObj.sort('countryname', { order: "desc" });
}

/*function funAfterSearch(){
	console.log("funAfterSearch");
}*/

