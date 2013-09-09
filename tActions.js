var ls;
var interval;
var curList;
var lastAdded;
//value code

function checkComplete( e , elem){
	e.completed = !e.completed;
	
	if(e.head && e.completed){
		for(var i = 0; i < e.parentNode.items.length; i++){
			e.parentNode.items[i].completed = true;
		}
	}
	e.display(elem);
}

function init(){
	ls = new List("ls", "Groceries", new tDate(4, 12, 1993));
	ls.add("Milk", new tDate(4,13,1993), null, null, null, 3);
	
	var ls2 = new SubList("ls2");
	ls2.add("Figs");
	ls2.add("Grapenuts");
	ls.addList(ls2);
	
	var e = document.getElementById("lc");
	
	ls.display(e);
	curList = ls;
}

function deleteComplete( elem ){
	window.clearInterval(interval);
	while(elem.firstChild){
		elem.removeChild(elem.firstChild);
	}

}

function addNew (e){
	var event = e || window.event;
	var key = event.keyCode;

	if(key == 13){
		//we need to perform some regex for this
		var text = document.getElementById("txtInput").value;
		
		var val, priority, date;

		var ind = text.indexOf("!");
		
		if(ind > -1){
			val = text.substring(0, ind);
			priority = text.substring(ind, text.lastIndexOf("!")+1);
			console.log(priority);
		}else if(text.lastIndexOf(" ") > -1){
			val = text.substring(0, text.lastIndexOf(" "));
		}else{
			val = text;
		}
		
		ind = text.indexOf("/");
		if(ind > -1){
			date = text.substring(text.lastIndexOf(" "));
			//the date needs to be further split
			date = date.split("/");
			if(date.length > 2){
				date = new tDate(date[0], date[1], date[2]);
			}
		}
		
		curList.add(val, date, null, null, null, priority.length);
		curList.display(document.getElementById("lc"));
		document.getElementById("txtInput").value = "";
	}
	

}

init();