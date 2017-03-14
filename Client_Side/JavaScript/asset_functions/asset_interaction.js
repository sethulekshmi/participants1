'use strict';
function createAsset()
{

    setCookie();

    $('#fade').show();
    $('#loader').show();

    $('#loaderMessages').html('<u>Creating Asset</u><br /><br /><span id="messages"></i>waiting...</i></span><br /></div>&nbsp;');

    let data = {};
    let found = [];
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/blockchain/assets/assets', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.overrideMimeType('text/plain');
    xhr.onprogress = function () {
        let data = xhr.responseText;
        let array = data.split('&&');
        for(let i = 0; i < array.length; i++)
		{
            if(array[i] != '')
			{
                if(typeof JSON.parse(array[i]).error == 'undefined')
				{
                    let fnd = false;
                    for(let j = 0; j < found.length; j++)
					{
                        if(JSON.parse(array[i]).message == found[j])
						{
                            fnd = true;
                        }
                    }
                    if(!fnd)
					{
                        if(found.length == 0){
                            $('#messages').html('<i>'+JSON.parse(array[i]).message+' </i><span id="latestSpan">...</span><br>');
                        }
                        else{
                            $('#latestSpan').html('&nbsp;&#10004');
                            $('#latestSpan').attr('id','');
                            $('#messages').append('<i>'+JSON.parse(array[i]).message+' </i><span id="latestSpan">...</span><br>');
                        }

                        found.push(JSON.parse(array[i]).message);
                    }
                }
                else
				{
                    $('#latestSpan').html('&nbsp;&#10004');
                    $('#latestSpan').attr('id','');
                    $('#loaderMessages').append('<i class="errorRes" >ERROR: '+JSON.parse(array[i]).message+'</i>');
                }
            }
        }
    };
    xhr.onreadystatechange = function (){
        if(xhr.readyState === 4)
		{
            let data = xhr.responseText;
            let array = data.split('&&');
            if(typeof JSON.parse(array[array.length -1]).error != 'undefined')
			{
                $('#loader img').hide();
                $('#loaderMessages').append('<br /><br /><span id="okTransaction">OK</span>');
                let b=document.getElementById('okTransaction');
                b.onclick= function(arg1) {
                    return function() {
                        errCreate(arg1);
                    };
                }(JSON.parse(array[array.length -1]).assetID);
            }
            else
			{
                $('#loader img').hide();
                $('#latestSpan').html('&nbsp;&#10004');
                $('#loaderMessages').append('<br /><br /><span id="okTransaction" onclick="confTrans();">OK</span>');
                $('#chooseConfHd').html('<span>Creation Complete</span>');
                $('#confTxt').html('Created Asset: '+ JSON.parse(array[array.length - 1]).assetID);
            }
        }
    };
    xhr.send(JSON.stringify(data));
}

let numDone = 0;
let errCount = 0;
let succCount = 0;

let transferIndex = 0;
let transferArray = [];

let scrapIndex = 0;
let scrapArray = [];

function transferAssets(input) //Called from page_functions.js
{
    transferArray = input;
    transferIndex = 1;
    transferAsset();
}

function transferAsset()
{
    let found = [];
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', '/blockchain/assets/assets/'+transferArray[transferIndex-1].assetID+'/owner', true); //PUT (Updates)
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.overrideMimeType('text/plain');
    xhr.onprogress = function () {
        let data = xhr.responseText;
        let array = data.split('&&');
        for(let i = 0; i < array.length; i++)
		{
            if(array[i] != '')
			{
                if(typeof JSON.parse(array[i]).error == 'undefined')
				{
                    let fnd = false;
                    for(let j = 0; j < found.length; j++)
					{
                        if(JSON.parse(array[i]).message == found[j])
						{
                            fnd = true;
                        }
                    }
                    if(!fnd)
					{
                        $('#latestSpan'+transferIndex).html('&nbsp;&#10004');
                        $('#latestSpan'+transferIndex).attr('id','');
                        $('#loaderMessages').find('#msg'+transferIndex+'Part'+(found.length+1)).html('<i>'+JSON.parse(array[i]).message+'</i><span id="latestSpan'+transferIndex+'">...</span>');
                        found.push(JSON.parse(array[i]).message);
                    }
                }
                else
				{
                    $('#latestSpan'+transferIndex).html('&nbsp;&#10004');
                    $('#latestSpan'+transferIndex).attr('id','');
                    $('#loaderMessages').find('#msg'+transferIndex+'Part'+(found.length+1)).html('<i class="errorRes" >ERROR: '+JSON.parse(array[i]).message+'</i>');

                }
            }
        }
    };
    xhr.onreadystatechange = function (){
        if(xhr.readyState === 4) //Request stream has finished.
		{
            let data = xhr.responseText;
            let array = data.split('&&');
            $('#latestSpan'+(transferIndex)).html('&nbsp;&#10004');
            if(typeof JSON.parse(array[array.length - 1]).error != 'undefined')
			{
                errCount++;
            }
            else
			{
                succCount++;
            }
            if(transferIndex == transferArray.length)
			{
                if(errCount == 0)
				{
                    $('#loader img').hide();
                    $('#loaderMessages').append('<br /><br /><span id="okTransaction" onclick="confTrans();">OK</span>');
                }
                else
				{
                    $('#loader img').hide();
                    $('#loaderMessages').append('<br /><br /><span id="okTransaction">OK</span>');
                    let b=document.getElementById('okTransaction');
				    	b.onclick= function(arg1, arg2) {
					    return function() {
        errTrans(arg1, arg2);
					    };
    }(errCount, succCount);

                    errCount = 0;
                    succCount = 0;
                }
            }
            else
			{
                $('#latestSpan'+(transferIndex)).html('&nbsp;&#10004');
                transferIndex++;
                setTimeout(function(){transferAsset();},1550);
            }
        }
    };
    xhr.send(JSON.stringify(transferArray[transferIndex-1]));
}

function scrapAssets(input)
{
    scrapArray = input;
    scrapIndex = 1;
    scrapAsset();
}

function scrapAsset()
{

	/*
	Scraps the chosen asset, specified by v5cAddr. Because we want to ensure the Asset identifier or the clarity is never assigned to another contract, we
	don't actually delete the contract, instead we update the scrapped attribute to be true.
	*/
    let found = [];
    let objects = [];
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'blockchain/assets/assets/'+scrapArray[scrapIndex-1].assetID, true); //As it refers to an v5, the path is: blockchain/assets/assets/asset/..

    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.overrideMimeType('text/plain');
    xhr.onprogress = function () {
        let data = xhr.responseText;
        let array = data.split('&&');
        for(let i = 0; i < array.length; i++)
		{
            if(array[i] != '')
			{
                if(typeof JSON.parse(array[i]).error == 'undefined')
				{
                    let fnd = false;
                    for(let j = 0; j < found.length; j++)
					{
                        if(JSON.parse(array[i]).message == found[j])
						{
                            fnd = true;
                        }
                    }
                    if(!fnd)
					{
                        $('#latestSpan'+scrapIndex).html('&nbsp;&#10004');
                        $('#latestSpan'+scrapIndex).attr('id','');
                        $('#loaderMessages').find('#msg'+scrapIndex+'Part'+(found.length+1)).html('<i>'+JSON.parse(array[i]).message+'</i><span id="latestSpan'+scrapIndex+'">...</span>');
                        found.push(JSON.parse(array[i]).message);

                    }
                }
                else
				{
                    $('#latestSpan'+scrapIndex).html('&nbsp;&#10004');
                    $('#latestSpan'+scrapIndex).attr('id','');
                    $('#loaderMessages').find('#msg'+scrapIndex+'Part'+(found.length+1)).html('<i class="errorRes" >ERROR: '+JSON.parse(array[i]).message+'</i>');

                }
            }
        }
    };
    xhr.onreadystatechange = function (){ //Streaming data has finished
        if(xhr.readyState === 4)
		{
            let data = xhr.responseText;
            let array = data.split('&&');
            $('#latestSpan'+(scrapIndex)).html('&nbsp;&#10004');

            if(typeof JSON.parse(array[array.length - 1]).error != 'undefined')
			{
                errCount++;
            }
            else
			{
                succCount++;
            }
            if(scrapIndex == scrapArray.length)
			{
                if(errCount == 0)
				{
                    $('#loader img').hide();
                    $('#loaderMessages').append('<br /><br /><span id="okTransaction" onclick="confTrans();">OK</span>');
                }
                else
				{
                    $('#loader img').hide();
                    $('#loaderMessages').append('<br /><br /><span id="okTransaction">OK</span>');
                    let b=document.getElementById('okTransaction');
				    	b.onclick= function(arg1, arg2) {
					    return function() {
        errScrap(arg1, arg2);
					    };
    }(errCount, succCount);

                    errCount = 0;
                    succCount = 0;
                }
            }
            else
			{
                $('#latestSpan'+(scrapIndex)).html('&nbsp;&#10004');
                scrapIndex++;
                setTimeout(function(){scrapAsset();},1500);
            }
        }
    };
    xhr.send(JSON.stringify(scrapArray[scrapIndex-1]));
}


let bigData;
let increment;
function updateAsset(clarity, diamondat, cut, colour, date, assetID, el)
{
	/*
	Formats the transaction request to update an attribute of a V5C. The logic on who can update what is contained within the contract on the blockchain.
	*/

    selRw = el;
    $('#loaderMessages').html('');


    bigData = [{'value':clarity,'field':'clarity', 'title': 'clarity','assetID':assetID},{'value':diamondat,'field':'diamondat', 'title': 'diamondat','assetID':assetID},{'value':cut,'field':'cut', 'title': 'cut','assetID':assetID},{'value':colour,'field':'colour', 'title': 'Colour','assetID':assetID},{'value':date,'field':'date', 'title': 'date','assetID':assetID},{'value':timestamp,'field':'timestamp', 'title': 'timestamp','assetID':assetID},{'value':symmetry,'field':'symmetry', 'title': 'symmetry','assetID':assetID},{'value':polish,'field':'polish', 'title': 'polish','assetID':assetID},{'value':jewellerytype,'field':'jewellerytype', 'title': 'jewellerytype','assetID':assetID}];
    increment=0;

    for(var i = bigData.length-1; i >= 0; i--)
	{
        let field = bigData[i].field.toLowerCase();
        field = field.charAt(0).toUpperCase() + field.slice(1);

        if($('#hid'+field).val() == bigData[i].value)
		{
            bigData.splice(i,1);
        }
    }
    let spans = '';
    for(var i = 0; i < bigData.length; i++)
	{
        spans += '<div class="loaderSpan" id="span'+(i+1)+'"><u>'+bigData[i].title+'</u><br /><br /><span id="msg'+(i+1)+'Part1"></i>waiting...</i></span><br /><span id="msg'+(i+1)+'Part2"></span><br /><span id="msg'+(i+1)+'Part3"></span><br /><span id="msg'+(i+1)+'Part4"></span><br /></div>&nbsp;';
    }
    $('#loaderMessages').html(spans);
    if(bigData.length > 0)
	{
        $('#chooseOptTbl').hide();
        $('#loader').show();
        updateField();
    }
    else
	{
        $('#chooseOptTbl').hide();
        $('#fade').hide();
    }

}

let errArr = [];
let succarr = [];

function updateField()
{

    let fieldId = bigData[increment].field.toLowerCase();
    fieldId = fieldId.charAt(0).toUpperCase() + fieldId.slice(1);

    console.log('OLD VALUE: ' + $('#hid'+fieldId).val());

    let data = {};
    data.value = bigData[increment].value;
    let found = [];
    let field = bigData[increment].field;
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', '/blockchain/assets/assets/'+bigData[increment].assetID+'/'+bigData[increment].field, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.overrideMimeType('text/plain');
    xhr.onprogress = function () {
        let data = xhr.responseText;
        let array = data.split('&&');
        for(let i = 0; i < array.length; i++)
		{
            if(array[i] != '')
			{
                if(typeof JSON.parse(array[i]).error == 'undefined')
				{
                    let fnd = false;
                    for(let j = 0; j < found.length; j++)
					{
                        if(JSON.parse(array[i]).message == found[j])
						{
                            fnd = true;
                        }
                    }
                    if(!fnd)
					{
                        $('#latestSpan'+(increment+1)).html('&nbsp;&#10004');
                        $('#latestSpan'+(increment+1)).attr('id','');
                        $('#loaderMessages').find('#msg'+(increment+1)+'Part'+(found.length+1)).html('<i>'+JSON.parse(array[i]).message+'</i><span id="latestSpan'+(increment+1)+'">...</span>');
                        found.push(JSON.parse(array[i]).message);
                    }
                }
                else
				{
                    $('#latestSpan'+(increment+1)).html('&nbsp;&#10004');
                    $('#latestSpan'+(increment+1)).attr('id','');
                    $('#loaderMessages').find('#msg'+(increment+1)+'Part'+(found.length+1)).html('<i class="errorRes" >ERROR: '+JSON.parse(array[i]).message+'</i><span id="latestSpan'+(increment+1)+'">...</span>');
                    errArr.push(field);
                }
            }
        }
    };
    xhr.onreadystatechange = function (){
        if(xhr.readyState === 4)
		{
            if(errArr.indexOf(field) == -1)
			{
                succarr.push(field);
            }
            if(increment == bigData.length - 1){
                if(errArr.length == 0)
				{
                    $('#latestSpan'+(increment+1)).html('&nbsp;&#10004');
                    $('#loader img').hide();
                    $('#loaderMessages').append('<br /><br /><span id="okTransaction" onclick="confTrans();">OK</span>');
                    $('#confTxt').html('Updates committed to the blockchain.');
                }
                else
				{
                    $('#latestSpan'+(increment+1)).html('&nbsp;&#10004');
                    $('#loader img').hide();
                    $('#loaderMessages').append('<br /><br /><span id="okTransaction">OK</span>');
                    let b=document.getElementById('okTransaction');
                    b.onclick= function(arg1, arg2) {
                        return function() {
                            errUpdate(arg1, arg2);
                        };
                    }(errArr, succarr);
                }
            }
            else
			{
                $('#latestSpan'+(increment+1)).html('&nbsp;&#10004');
                increment++;
                setTimeout(function(){
                    updateField();
                }, 500);
            }
        }
    };
    xhr.send(JSON.stringify(data));
}
