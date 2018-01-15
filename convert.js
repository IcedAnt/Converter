var units = {
	"Mass":{
		"Gram":{
			"Ounce":0.0352739907,"Pound":0.0022046244,"Stone":0.000157473},
		"Ounce":{
			"Pound":0.0625,"Stone":0.004464286},
		"Pound":{
			"Stone":0.071428571},
		"Stone":"undefined"},
	"Length":{
		"Metre":{
			"Mile":0.0006213689,"Yard":1.0936132983,"Foot":3.280839895,"Inch":39.37007874},
		"Mile":{
			"Yard":1760,"Foot":5280,"Inch":63360},
		"Yard":{
			"Foot":3,"Inch":36},
		"Foot":{
			"Inch":12},
		"Inch":"undefined"},
	"Volume":{
		"Litre":{
			"Gallon":0.2199692483,"Cubic metre":0.001,"Pint":1.7597539864,"Cup":4.2267528377,"Tablespoon":56.312127565,"Teaspoon":168.93638269},
		"Gallon":{
			"Cubic metre":0.00454609,"Pint":8,"Cup":19.2151988081,"Tablespoon":256,"Teaspoon":768},
		"Cubic metre":{
			"Pint":1759.7539864,"Cup":4226.7548297,"Tablespoon":56312.127565,"Teaspoon":168936.38269},
		"Pint":{
			"Cup":2.401900983,"Tablespoon":32,"Teaspoon":96},
		"Cup":{
			"Tablespoon":13.322780675,"Teaspoon":39.968342026},
		"Tablespoon":{
			"Teaspoon":3},
		"Teaspoon":"undefined"}};

// Populate "fromUnit" and "toUnit" dropdowns based on "unitType" dropdown selection
function fillUnits()
{
	var unitType = $("#unitType").val();
	var value = Object.keys(units[unitType]);

	$("#fromUnit").empty();
	$("#toUnit").empty();

	for (var i = 0; i < value.length; i++)
	{
		$("#fromUnit").append("<option>"+value[i]+"</option>");
	}

	var options = $("#fromUnit > option").clone();
	$("#toUnit").append(options);
	var selected = Math.floor(Math.random() * (value.length - 1)) + 2;
	$("#toUnit :nth-child("+selected+")").prop("selected", true);

	calculateValue();
}

// Calculate the converted value
function calculateValue()
{
	var unitType = $("#unitType").val();
	var fromUnit = $("#fromUnit").val();
	var toUnit = $("#toUnit").val();
	var fromValue = $("#fromValue").val();

	// Invert the selected options on "fromUnit" and "toUnit" dropdowns
	if (fromUnit == toUnit)
	{
		fromUnit = document.getElementById("fromUnit").value = $("#toUnit").data("previous");
		toUnit = document.getElementById("toUnit").value = $("#fromUnit").data("previous");
	}

	if (units[unitType][fromUnit][toUnit] === undefined)
	{
		document.getElementById("toValue").value = +parseFloat(fromValue / units[unitType][toUnit][fromUnit]).toFixed(10);
	}
	else
	{
		document.getElementById("toValue").value = +parseFloat(fromValue * units[unitType][fromUnit][toUnit]).toFixed(10);
	}

	// Save the selected options from "fromUnit" and "toUnit" dropdowns so that they can be inverted
	$("#fromUnit").data("previous", $("#fromUnit").val());
	$("#toUnit").data("previous", $("#toUnit").val());
}

// Invert selected options
$("#invert").click(function()
{
	document.getElementById("fromUnit").value = $("#toUnit").data("previous");
	document.getElementById("toUnit").value = $("#fromUnit").data("previous");
	calculateValue();
})

// Populate "unitType" dropdown
$().ready(function()
{
	var value = Object.keys(units)
	for (var i = 0; i < value.length; i++)
	{
		$("#unitType").append("<option>"+value[i]+"</option>");
	}
	fillUnits();
})

$("#unitType").change(fillUnits);
$(".input").change(calculateValue);
$("#fromValue").keyup(calculateValue);
