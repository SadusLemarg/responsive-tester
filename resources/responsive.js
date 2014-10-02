//INSTANCES ====================================================================================================
var file      = document.getElementById('file');
var fake      = document.getElementById('fake');
var iframes   = document.getElementsByTagName('iframe');
var container = document.getElementById('container');
var devices   = document.getElementById('content').getElementsByTagName('li');
var second    = document.getElementById('second');


//CONTAINER RESIZE ====================================================================================================
function ulResize()
{
	var ulSize = 0;
	
	for(var i=0; i<devices.length; i++)
	{
		ulSize += devices[i].offsetWidth;
	}
	
	container.style.width = ulSize + 'px';
}

ulResize();


//UPDATE URL ====================================================================================================
function updateDevices(path)
{
	if(path == '') path = '../index.html';
	
	for(var i=0; i<iframes.length; i++)
	{
		iframes[i].src = path;
	}
}

function updateFake(path)
{
	var newPath = path.replace('../', '');
	newPath     = '../' + newPath;

	if(newPath == '../') newPath = '';
	
	fake.value  = newPath;
	
	updateDevices(newPath);
	
}

function changeFake()
{
	fake.value = file.value.replace('C:\\fakepath\\', '../');

	updateDevices(fake.value);
}


//DEVICES ORIENTATION ====================================================================================================	
function changeOrientation()
{
	for(var i=0; i<iframes.length; i++)
	{
		var sizesTemp     = iframes[i].width;
		iframes[i].width  = iframes[i].height;
		iframes[i].height = sizesTemp;
	}
	ulResize();
}


////AUTO REFRESH ====================================================================================================
var update;

function stopRefresh()
{
	clearInterval(update);
}

function autoRefresh(time)
{
	stopRefresh();

	update = setInterval(function()
	{
		updateDevices(fake.value)
	}, time * 1000);
}

var pattern = /^(\d)$/;
var word;

function validate(digit)
{
	var number = '';
	
	for(var i=0; i<digit.length; i++)
	{
		pattern.test(digit[i]) ? word = digit[i] : word = '';

		number += word;
	}
	
	if(number == 0) second.value = '';
	
	number == '' ? stopRefresh() : autoRefresh(number);
}


//CHANGE TIME IN ARROWS ====================================================================================================
var number = 0;

function secondValue()
{
	return parseInt(second.value);
}

function subtract()
{
	if(second.value == '') return false;
	
	number = secondValue();
	
	if(number <= 1)
	{
		number = '';
		stopRefresh(number);
	}
	else
	{
		number -= 1
		autoRefresh(number);
	}

	second.value = number;
}

function add()
{
	if(second.value != '') number = secondValue();
	
	number += 1;
	second.value = number;
	
	autoRefresh(number);
}