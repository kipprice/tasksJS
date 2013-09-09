var ls;
var interval;
//value code

function checkComplete( e , elem){
	e.completed = !e.completed;
	e.display(elem);
}

function init(){
	ls = new List("ls", "Groceries", new tDate(4, 12, 1993));
	ls.add("Milk", new tDate(4,13,1993));
	
	var ls2 = new SubList("ls2");
	ls2.add("Figs");
	ls2.add("Grapenuts");
	ls.addList(ls2);
	
	var e = document.getElementById("lc");
	
	console.log(e);
	ls.display(e);
}

function deleteComplete( elem ){
	window.clearInterval(interval);
	console.log(elem);
	while(elem.firstChild){
		elem.removeChild(elem.firstChild);
	}

}

init();