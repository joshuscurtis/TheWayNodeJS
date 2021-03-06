var net = new brain.NeuralNetwork();
//train r=rain, t=temp
net.train([{
    input: {
      t: 17,
      r: 0.0
    },
    output: {
      sixty: 1
    }
  },
  {
    input: {
      t: 13,
      r: 0.1
    },
    output: {
      forty: 1
    }
  },
  {
    input: {
      t: 13,
      r: 0.1
    },
    output: {
      sixty: 1
    }
  }
  ]);

	var output = net.run({
  t: 15,
  r: 0.2
}); // { white: 0.99, black: 0.002 }

console.log(output)
	
	
	var timeToClose = []
	var date = []
	var key = []
	var ids = []
	for (var i = 0; i < data.length; i++) {
		timeToClose.push((parseInt(data[i].timetoclose)/1000)/60)
		thisDate = (data[i].date).substring(0, 16)
		date.push(thisDate)
		key.push(i)
		ids.push(data[i].order_id)
	}
	
	
var obj = {};
function createDateTimeObj() {

	for(var i=0;i<key.length;i++) {
	    obj[key[i]] = {
	        date: date[i].substring(0, 10),
	        time: timeToClose[i],
			id: ids[i]
	    }
	}
	return obj
}

function createArray() {
	array = []
	for (var i = 0; i < ids.length; i++) {
		array.push([ids[i], date[i], Math.round(timeToClose[i])]);
	}
return array
}


function numOfOrders(day) {
	num = 0
	allDays = []
	for (var i = 0; i < date.length; i++) {
		allDays.push(date[i].substring(0,10))		
	}
	
	var count = 0;
	for(var i = 0; i < allDays.length; ++i){
		if(allDays[i] == day)
    		count++;
	}
	return count
}

function calcDiff(day) {
	num = numOfOrders(day);
	mins = 480;
	diff = 1/(mins/num)*100;
	
	return Math.round(diff)
}

function avgTimePerDay(thisDate) {
var total = 0.0
var count = 0

	for (var i = 0; i < key.length; i++) {
		if (obj[i].date == thisDate) {
			total = total + obj[i].time;
			count = count + 1; 
		}
	}
return total/count;
}

createDateTimeObj()
today = new Date();
todayDate = today.getFullYear() +"-0"+ (today.getMonth()+1)+"-0"+today.getDate()
last5Days = []
for (var i = 0; i < 5; i++) {
	last5Days[i] = today.getFullYear() +"-0"+ (today.getMonth()+1)+"-0"+(today.getDate() -i)
	}



	// var sla = document.getElementById("sla");
	// sla.innerHTML = "<div class='card bg-light mb-3'><div class='card-body'> <ul><li><strong>Today</strong>: "+Math.round(avgTimePerDay(last5Days[0]))+" minutes (Difficulty: "+calcDiff(last5Days[0])+")</li><li><strong>Yesterday</strong>: "+Math.round(avgTimePerDay(last5Days[1]))+" minutes (Difficulty: "+calcDiff(last5Days[1])+")</li><li><strong>"+last5Days[2]+"</strong> : "+Math.round(avgTimePerDay(last5Days[2]))+" minutes (Difficulty: "+calcDiff(last5Days[2])+")</li><li><strong>"+last5Days[3]+"</strong> :  "+Math.round(avgTimePerDay(last5Days[3]))+" minutes (Difficulty: "+calcDiff(last5Days[3])+" )</li><li><strong>"+last5Days[4]+"</strong> : "+Math.round(avgTimePerDay(last5Days[4]))+" minutes (Difficulty:  "+calcDiff(last5Days[4])+")</li></ul></div></div>";

	
setPG(last5Days[0], Math.round(avgTimePerDay(last5Days[0])), calcDiff(last5Days[0]));
updatePG(last5Days[0], Math.round(avgTimePerDay(last5Days[0])));
updateDiff(last5Days[0], calcDiff(last5Days[0]));
	
function createLabel(array1, array2){
var array3 = []
	for (var i = 0; i < array1.length; i++) {
		array3[i] = array1[i] +" ID: "+ array2[i] 
	}
	return array3
}	
	

	var settings = {
		"url": "/getStats",
		"method": "GET",
		"timeout": 0,
		"headers": {
			"Prefer": "resolution=merge-duplicates",
			"Content-Type": "application/x-www-form-urlencoded"
		}
	};

	


var dates = []
var diffs = []
var times = []
var temp = []
var day

	$.ajax(settings).done(function(response) {
		day = response
		//console.log(response);
		for (var i = 0; i < day.length; i++) {
			dates.push(day[i].date)
			diffs.push(day[i].diff)
			times.push(day[i].avgtime)
			temp.push(day[i].temp)
		}
		console.log("dates: " + dates)
		l5D = createL5Data();
		$(document).ready(function() {
		    $('#daytable').DataTable( {
		        data: l5D,
				columns: [
		            { title: "Date" },
		            { title: "Difficulty" },
					{ title: "Avg Time" },
		            { title: "Temp" }
		        ]
		    });
		});
		
		var thisone = document.getElementById('myChart');		
	var day = new Chart(thisone, {
	    type: 'line',
	    data: {
	        labels: dates,
	        datasets: [{
	            label: "avg time",
	            data: times,
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1
	        },
			{
	            label: "difficulty",
	            data: diffs,
	            backgroundColor: [
	                'rgba(32, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(23, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true
	                }
	            }]
	        }
	    }
	});
	day.height = 500;
	});

	var ctx = document.getElementById('day');		
	var myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: createLabel(date,ids),
	        datasets: [{
	            label: 'time to close',
	            data: timeToClose,
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true
	                }
	            }] 
	        }
	    }
	});

	
function setPG(date, avgtime, diff) {
	var settings = {
		"url": "/setStats",
		"method": "POST",
		"timeout": 0,
		"headers": {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		"data": {
			"date": date,
			"avgtime": avgtime,
			"diff": diff
		}
	};
	$.ajax(settings).done(function(response) {

	}).fail(function(data) {
		console.log("fail ")
	});
}	
	
function updatePG(date, avgtime) {
	var settings = {
		"url": "/updateAvg",
		"method": "POST",
		"timeout": 0,
		"headers": {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		"data": {
			"date": date,
			"val": avgtime
		}
	};
	$.ajax(settings).done(function(response) {}).fail(function(data) {
		console.log("fail ")
	});
}

function updateDiff(date, diff) {
	var settings = {
		"url": "/updateDiff",
		"method": "POST",
		"timeout": 0,
		"headers": {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		"data": {
			"date": date,
			"val": diff
		}
	};
	$.ajax(settings).done(function(response) {}).fail(function(data) {
		console.log("fail ")
	});

}


function createL5Data() {
	array = []
	for (var i = 0; i < dates.length; i++) {
		array.push([dates[i], diffs[i], times[i], temp[i]]); 
	}
return array
}






var test = createArray()
test.data = [obj]

console.log(test);

$(document).ready(function() {
    $('#example').DataTable( {
        data: test,
		columns: [
            { title: "Order ID" },
            { title: "Time" },
            { title: "Time to Close" }
        ]
    } );
} );


