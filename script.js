function main_order() {
	document.getElementById("shorter_button").style.width = document.getElementById("longer_button").clientWidth + 4 + "px";
	document.getElementById("shorter_button").style.height = document.getElementById("shorter_button").clientHeight + 6 + "px";
	document.getElementById("longer_button").style.height = document.getElementById("longer_button").clientHeight + 6 + "px";
	document.getElementById("other_button").style.height = document.getElementById("longer_button").clientHeight + 5 + "px";
	document.getElementById("stock_select").style.width = document.getElementById("location_select").clientWidth + 4 + "px";
	document.getElementById("delivery_select").style.width = document.getElementById("location_select").clientWidth + 4 + "px";
}

let currentPrice = 0;
let products = [];
let index = 0;
let place = "";
let delivery = "";
const pricesForProducts = {
	"s10": 71,
	"s15": 84,
	"s30": 97,
	"ś15": 97,
	"ś20": 110,
	"m15": 97,
	"m20": 110,
	"e25": 119,
}
const pricesForPlace = {
	"": 0,
	"C": 0,
	"O": 8
}
const pricesForDevilery = {
	"": 0,
	"W": 95,
	"S": 144
}

function updateCode() {
	if (products.length != 0) {
		document.getElementById("empty_label").style.display = "none";
	} else {
		document.getElementById("empty_label").style.display = "block";
	}
	let code = "";
	if (place == "" || delivery == "") {
	 	code = "brak"
	} else {
		code += place + "_" + delivery;
		for (let i = 0; i < products.length; i++) {
			code += "_" + products[i];
		}
	}
	document.getElementById("price_and_code").innerHTML = "Cena zamówienia: " + currentPrice + "zł (miejsce odbioru: " + pricesForPlace[place] + " zł, tryb dostawy: " + pricesForDevilery[delivery] + " zł, łączna cena produktów: " + (currentPrice - pricesForPlace[place] - pricesForDevilery[delivery]) + " zł)</br>Kod zamówienia: " + code;
}

function remove_item(productIndex, elementId) {
	currentPrice -= pricesForProducts[document.getElementById("stock_select").value];
	products.splice(productIndex, 1);
	updateCode();
	document.getElementById(elementId).remove();
}

function add_product() {
	if (document.getElementById("stock_select").value != "n") {
		const newButton = document.createElement("input");
		newButton.setAttribute("type", "button");
		newButton.value = document.getElementById(document.getElementById("stock_select").value).innerHTML + " (" + pricesForProducts[document.getElementById("stock_select").value] + " zł)";
		document.getElementById("products_list").appendChild(newButton);
		currentPrice += pricesForProducts[document.getElementById("stock_select").value];
		products.push(document.getElementById("stock_select").value);
		const productIndex = products.length - 1;
		newButton.setAttribute("id", productIndex.toString());
		newButton.setAttribute("onclick", "remove_item(" + productIndex + ", " + productIndex.toString() + ");")
		updateCode();
	}
}

function change_place() {
	if (document.getElementById("location_select").value != "N") {
		place = document.getElementById("location_select").value;
		currentPrice += pricesForPlace[document.getElementById("location_select").value]
		updateCode();
	}
}

function change_delivery() {
	if (document.getElementById("delivery_select").value != "N") {
		delivery = document.getElementById("delivery_select").value;
		currentPrice += pricesForDevilery[document.getElementById("delivery_select").value]
		updateCode();
	}
}