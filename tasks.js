    var curList;
    ITEM = ["name", "date"]
    RECUR = ["none", "daily", "weekly", "monthly", "yearly", "weekdaily", "custom"];    //Possible values for recurring events
    REMIND_TYPE = ["email", "text", "notif"]
    
    function List(id){
        this.id = id || "list";
        this.items = new Array();
        this.head = new Item();
        
        this.sharedWith = new Array();
    }
    
    List.prototype.sort = function(asc, sortBy){
        a = asc || false;
        sb = sortBy || 1;
        
        for (var i = 0; i < this.items.length; i++){
            //selection sort
            //TODO
        }
    }
    
    List.prototype.add = function(value, date, recurring, reminder, notes){
        var v = value || "null";
        var d = date || new Date();
        var r = recurring || "none";
        var m = reminder || "none";
        var n = notes || "";
        
        this.items[this.items.length] = new Item(this.id + "-0", v, d, r, m, n);
        this.items[this.items.length-1].i = this.id + "-" + (this.items.length-1);
        
    }
    
    List.prototype.addList = function(l){
        this.items[this.items.length] = l;
    }
    
    List.prototype.display = function(elem){
        
        
        //First, insert the list into the current element
        elem.innerHTML += "<div class='list' id='" + this.id + "'></div>";
        
        var e = document.getElementById(this.id);
        
        //Next, check if the list has a head
        if(this.head.v != "") this.head.display(e); //can't be a list
        
        //Then, display every item on the list
        //If an item is a list, it gets layered in
        //Need a way to keep track of indentation
        for(var i = 0; i < this.items.length; i++){
            
            this.items[i].display(e);
        }
    }
    
    List.prototype.collapse = function(){
        
    }
    
    List.prototype.expand = function(){}
    
    function Item(id, value, date, recurring, reminder, notes){
        
        this.i = id || "0";
        this.v = value || "";
        this.d = date || new Date();
        this.r = recurring || 0;
        this.m = reminder || 0;
        this.n = notes || "n";
        this.c = false;
    }
    
    Item.prototype.display = function(elem){
        ///elem is the div we are inserting into
        
        //first, we create a new part of elem
        elem.innerHTML += "<div class='item' id='"+this.i+"'></div>";
        var e = document.getElementById(this.i);    //Hopefully this is unique
        
        //Then, we display the data
        e.innerHTML = "<span class='itemCheck'><input type='checkbox' onchange='strike(\""+this.i+"\")' ></input></span>" +
                    "   <span class='itemValue'>" + this.v +
                        "</span><div class='itemDate'>" + this.d.getMonth() +"/" + this.d.getDate() + "/" + (this.d.getYear() + 1900) + "</div>";
                        
        
        //then, if you want more info, dblClick
    }
    
    Item.prototype.detailDisplay = function(id){
        
    }
    
    function Reminder(type, date){
        this.t = type || "email";
        this.d = date;
    }

    function strike(id){
        var e = document.getElementById(id);
        var children = e.childNodes;
        
        console.log("checked " + children[0].firstChild.checked + " " + children[0].innerHTML);
        if (children[0].firstChild.checked){
            
            children[2].innerHTML = "<strike>" + children[2].innerHTML + "</strike>";
        }else{
            children[2].innerHTML = children[2].innerHTML.substring(8, children[2].innerHTML.length - 9);
        }
    }
    
    function enter(e){
        var event = e || window.event;
        var key = event.keyCode;
        console.log(key);
        if(key == 13){
            var cnt = document.getElementById("txt").value;
            curList.add(cnt, new Date());
            document.getElementById("txt").value = "";
            ls.display(document.getElementById("lc"));
        }
    }