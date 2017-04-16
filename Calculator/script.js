window.onload = function(){

// Определить в какое поле будут вводится цифры.
var lastSelectedNumField = 1;


	document.getElementById("tips").onclick = tips;
	document.getElementById("close_tips").onclick = close_tips;


	document.getElementById("clean").onclick = clear;
	document.getElementById("clear_last").onclick = function(){
		clear_last(lastSelectedNumField);
	}
	document.getElementById("operate").onclick = operate;

	// Math operations
	document.getElementById("sub").onclick = substract;
	document.getElementById("add").onclick = add;
	document.getElementById("divide").onclick = divide;
	document.getElementById("multiply").onclick = multiply;



	document.getElementById("first").onclick = focusFirst;
	document.getElementById("second").onclick = focusSecond;


	document.getElementById("operation").onclick = operation_tip;

	// number enter buttons
	document.getElementById("one").onclick = function(){
		enter_number(this.value, lastSelectedNumField);
	}
	document.getElementById("two").onclick = function(){
		enter_number(this.value, lastSelectedNumField);
	}
	document.getElementById("three").onclick = function(){
		enter_number(this.value, lastSelectedNumField);
	}
	document.getElementById("four").onclick = function(){
		enter_number(this.value, lastSelectedNumField);
	}
	document.getElementById("five").onclick = function(){
		enter_number(this.value, lastSelectedNumField);
	};
	document.getElementById("six").onclick = function(){
		enter_number(this.value, lastSelectedNumField);
	};
	document.getElementById("seven").onclick = function(){
		enter_number(this.value, lastSelectedNumField);
	};
	document.getElementById("eight").onclick = function(){
		enter_number(this.value, lastSelectedNumField);
	};
	document.getElementById("nine").onclick = function(){
		enter_number(this.value, lastSelectedNumField);
	};
	document.getElementById("zero").onclick = function(){
		enter_number(this.value, lastSelectedNumField);
	};



	document.getElementById("reverse").onclick = function(){
		reverse(lastSelectedNumField);
	}





//Определение того, какое поле для цифр было нажато последним.
	setInterval(function(){
		if(document.activeElement.id == "first_num"){
					lastSelectedNumField = 1;
			}
		if(document.activeElement.id == "second_num"){
					lastSelectedNumField = 2;
			}
	},100);

	window.onkeypress = function(){
		which = window.event.which;
		// console.log(which);
		if(which == 13){
			operate();
		}
		if(which == 119){
			focusFirst();
		}
		if(which == 115){
			focusSecond();
		}

		if(which == 100 || which == 97){
			focusNext();
		}

//Math operation change
		if(which == 112){
				add();
		}
		if(which == 109){
				substract();
		}
		if(which == 108){
				divide();
		}
		if(which == 111){
				multiply();
		}

	}

}


function operate(){
	var first_num_input_value = +document.querySelector("#first_num").value;
	var second_num_input_value = +document.querySelector("#second_num").value;
	var operation_input_value = document.querySelector("#operation").value;
	var operation_for_php = 0;

	if(operation_input_value == "+"){
		document.querySelector("#result").value = first_num_input_value + second_num_input_value;
			operation_for_php = "add";
	}
	if(operation_input_value == "-"){
		document.querySelector("#result").value = first_num_input_value - second_num_input_value;
			operation_for_php = "sub";
	}
	if(operation_input_value == "/"){
		document.querySelector("#result").value = first_num_input_value / second_num_input_value;
			operation_for_php = "div";
	}
	if(operation_input_value == "*"){
		document.querySelector("#result").value = first_num_input_value * second_num_input_value;
			operation_for_php = "mult";
	}

	answer = document.querySelector("#result").value;

	var parametrs = 'first_num=' + first_num_input_value + '&' + 'second_num=' + second_num_input_value + '&' + 'operation=' + operation_for_php + '&' + 'answer=' + answer;
	archivation(parametrs);
}


function archivation(parametrs){

	var request = new XMLHttpRequest();

		request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200) {
			console.log(request.responseText);
		}
	}

	request.open("POST","archivator.php");
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send(parametrs);
}





//Select operation
function substract(){
	document.querySelector("#operation").value = "-";
}

function add(){
	document.querySelector("#operation").value = "+";
}

function divide(){
	document.querySelector("#operation").value = "/";
}

function multiply(){
	document.querySelector("#operation").value = "*";
}


function tips(){
	if(document.querySelector(".tips_menu").style.display != "block") document.querySelector(".tips_menu").style.display = "block";
	else document.querySelector(".tips_menu").style.display = "none";
}

function close_tips(){
	document.querySelector(".tips_menu").style.display = "none";
}



function clear(){
		document.querySelector("#first_num").value = "";
		document.querySelector("#second_num").value = "";
		document.querySelector("#result").value = "";
}

function clear_last(lastSelectedNumField){
	if(lastSelectedNumField == 1){
		var clearOnce = document.querySelector("#first_num").value;
			clearOnce = +(clearOnce.slice(0, -1));
			document.querySelector("#first_num").value = clearOnce;
			focusFirst();

	}
	if(lastSelectedNumField == 2){
		var clearOnce = document.querySelector("#second_num").value;
			clearOnce = +(clearOnce.slice(0, -1));
			document.querySelector("#second_num").value = clearOnce;
			focusSecond();
	}
}


//Focus between first and second number fields
function focusFirst(){
	document.querySelector("#first_num").focus();
	lastSelectedNumField = 1;
}

function focusSecond(){
	document.querySelector("#second_num").focus();
	lastSelectedNumField = 2;
}

function focusNext(){
	if(document.activeElement.id == "first_num"){
	document.querySelector("#second_num").focus();
	lastSelectedNumField = 2;
	}
	else{
		document.querySelector("#first_num").focus();
		lastSelectedNumField = 1;
	}
}



function operation_tip(){
		document.getElementById("operation_tip").innerHTML = "Выбранная операция: " + document.querySelector("#operation").value;
		document.getElementById("operation_tip").style.display = "block";
		document.getElementById("operation_tip").style.opacity = "0.9";

		setTimeout(hide_operation_tip,3000);

		function hide_operation_tip(){
			document.getElementById("operation_tip").style.display = "none";
		}
};



function reverse(lastSelectedNumField){
	if(lastSelectedNumField == 1){
		document.querySelector("#first_num").value = -document.querySelector("#first_num").value;
	}
	if(lastSelectedNumField == 2){
		document.querySelector("#second_num").value = -document.querySelector("#second_num").value;
	}
}





function enter_number(number, lastSelectedNumField){

	if(lastSelectedNumField == 1){
		document.querySelector("#first_num").value += number;
		focusFirst();
	}
	if(lastSelectedNumField == 2){
		document.querySelector("#second_num").value += number;
		focusSecond();
	}

}