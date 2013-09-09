

//=============================LIST CLASS=============================//

function List( id, name, date ){
	this.id = id || "list";
	this.name = name || this.id;
	this.date = date || new Date();
	this.items = new Array();
}

List.prototype.add = function( val, date, reminder, recur, notes, priority){
	var id = this.id + this.items.length;
	var em = new Element( id, val, date, reminder, recur, notes, priority);
	this.items[this.items.length] = em;
}

List.prototype.addElement = function( el ){
	this.items[this.items.length] = el;
}

List.prototype.addList = function( ls ){
	this.items[this.items.length] = ls;
}

List.prototype.display = function( elem ){
	//first, find the container we're building into
	if(!this.container){
		this.container = document.createElement("div");
		this.container.setAttribute("class", "listContentContainer");
		this.container.setAttribute("id", this.id);
		elem.appendChild(this.container);
	}
	
	//Display the title
	if(!this.nDiv){
		this.nDiv = document.createElement("div");
		this.nDiv.setAttribute("class", "listTitle");
		this.nDiv.innerHTML = this.name;
		this.container.appendChild(this.nDiv);
	}
	
	if(!this.spacer){
		this.spacer = document.createElement("div");
		this.spacer.setAttribute("class", "spacer");
		this.container.appendChild(this.spacer);
	}
	
	//last, build all items in our array
	for(var i = 0; i < this.items.length; i++){
		this.items[i].display(this.container);
	}
}

//============================SUBLIST CLASS==========================//

function SubList( id, head, date ){
	
	this.id = id;
	this.items = new Array();
	this.date = date || new tDate();
	this.head = new Element(this.id+"head", head, this.date);
	this.head.head = true;
	
}

SubList.prototype.add = function( val, date, reminder, recur, notes, priority){
	var id = this.id + this.items.length;
	var em = new Element( id, val, date, reminder, recur, notes, priority);
	this.items[this.items.length] = em;
}

SubList.prototype.addElement = function( el ){
	this.items[this.items.length] = el;
}

SubList.prototype.addList = function( ls ){
	this.items[this.items.length] = ls;
}

SubList.prototype.display = function( elem ){
	//first, find the container we're building into
	if(!this.container){
		this.container = document.createElement("div");
		this.container.setAttribute("class", "listContainer");
		this.container.setAttribute("id", this.id);
		elem.appendChild(this.container);
	}
	
	//next, build the head if we have one
	
	this.head.display(this.container);		//Check for existence in element
	
	//last, build all items in our array
	if(!this.content){
		this.content = document.createElement("div");
		this.content.setAttribute("class", "listContent");
		this.content.setAttribute("id", this.id + "-c");
		elem.appendChild(this.content);
	}
	
	for(var i = 0; i < this.items.length; i++){
		console.log(this.items[i].value);
		this.items[i].display(this.content);
	}
}

//============================ELEMENT CLASS==========================//

function Element( id, value, date, reminder, recur, notes, priority ){
	
	this.id = id || "element";
	this.value = value || "";
	this.date = date || new tDate();
	this.reminder = reminder || "none";
	this.recur = recur || "none";
	this.notes = notes || "";
	this.priority = priority || -1;
	this.completed = false;
	
	this.head = false;
	
}

Element.prototype.display = function( elem ){
	
	var self = this;
	
	if(this.value == "") return;
	
	
	//elem.innerHTML += "<div class='elementContainer' id='" + this.id + "'></div>";
	if(!this.container){
		this.container = document.createElement("div");
		this.container.setAttribute("class", "elementContainer");
		this.container.setAttribute("id", this.id);
		elem.appendChild(this.container);
	}
	
	
	//checkbox code
	//e.innerHTML += "<div class='elementCheck'><input type='checkbox' id='" + this.id+"-chk'></div>";
	if(!this.chkCont){
		this.chkCont = document.createElement("div");
		this.chkCont.setAttribute("class", "elementCheck");
		
		this.chk = document.createElement("input");
		this.chk.setAttribute("type", "checkbox");
		this.chk.setAttribute("id", this.id + "-chk");
	
		
		
		this.chk.addEventListener("change", function(){checkComplete(self, elem)}, false);
		this.chkCont.appendChild(this.chk);
		this.container.appendChild(this.chkCont);
	}
	//priority code
	if(!this.pDiv && this.priority != -1){
		this.pDiv = document.createElement("div");
		this.pDiv.setAttribute("class", "elementPriority");
		
		for(var i = 0; i < this.priority; i++){
			this.pDiv.innerHTML += "!";
		}
		
		this.container.appendChild(this.pDiv);
	}
	//value code
	if(!this.vDiv){
		this.vDiv = document.createElement("div");
		this.vDiv.setAttribute("class", "elementValue");
		this.vDiv.innerHTML = this.value;
		this.container.appendChild(this.vDiv);
	}
	
	if(this.completed){
		//this.vDiv.style.textDecoration="line-through";
		this.vDiv.setAttribute("style", "text-decoration:line-through; color: #CCC;");
		var temp = this.container;
		window.clearInterval(interval);
		interval = window.setInterval(function(){
			deleteComplete(temp);
			}, 3000);
	}else{
		//this.vDiv.style.textDecoration="none";
		this.vDiv.setAttribute("style", "");
		window.clearInterval(interval);
	}
	
	
	
	//date code
	if(!this.dDiv && this.date.month != 0 && this.date.day != 0){
		this.dDiv = document.createElement("div");
		this.dDiv.setAttribute("class", "elementDate");
		this.dDiv.innerHTML = this.date.getAbsolute();
		this.container.appendChild(this.dDiv);
	}
	
	
}

//============================DATE CLASS============================//

function tDate(month, day, year, hour, minute){
	this.month = month || 0;
	this.day = day || 0;
	this.year = year || (new Date().getYear()+1900);
	this.hour = hour || 0;
	this.minute = minute || 0;	
}

//Gets the time absolutely
tDate.prototype.getAbsolute = function(){
	var ret = this.month + "/" + this.day + "/" + this.year;
	
	//Adding time if it has been set
	if(this.hour != 0 && this.minute != 0){
		//readable minutes
		var min;
		if(this.minute < 10)
			min = "0" + this.minute;
			
		ret += " " + this.hour + ":" + min;
	}
	
	return ret;
}

//Gets the time relative to today
tDate.prototype.getRelative = function(){
	var cur = new Date();
	
	var mDiff = this.month - cur.getMonth();
	var dDiff = this.day - cur.getDate();
	var yDiff = this.day - cur.getYear();
	
	var hDiff = this.hour - cur.getHours();
	var minDiff = this.minute - cur.getMinutes();
	
	var ret;
	
	if(yDiff > 0){
		
		ret = yDiff + " Year";
		
		if (yDiff > 1)
			ret += "s";
	}
	else if(mDiff > 0){
		ret = mDiff + " Month";
		
		if(mDiff > 1)
			ret += "s";
	}
	else if (dDiff > 0){
		if (dDiff == 1){
			ret = "Tomorrow";
		}
		if (dDiff < 7){
			ret = "This week";
		}else{
			ret = dDiff + " weeks";
		}
	}else{
		//must be due today then
		ret = "Today";
		
		if(this.hour != 0 && this.min != 0){
			
			if(hDiff > 0){
				ret += " in ";
				ret += hDiff + "hour";
				
				if(hDiff > 1)
					ret += "s";
			}
			
			if (minDiff > 0){
				ret += " and " + minDiff + " minuute";
				if ( minDiff > 1 )  
					ret += "s";
			}
			
			if(minDiff == 0 && hDiff == 0){
				ret = "Now";
			}
		}
	}
}

//==========================REMINDER CLASS=========================//

function Reminder(){
	this.date = date || new Date();
	this.type = type || "none";
}

//
