document.onreadystatechange = function () {
	var state = document.readyState;
	if (state == 'interactive') {
		document.getElementById('main-content').style.visibility="hidden";
	} else if (state == 'complete') {
		setTimeout(function(){
		 	document.getElementById('load').style.visibility="hidden";
		 	document.getElementById('main-content').style.visibility="visible";
		},1000);
	}
}