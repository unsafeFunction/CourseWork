function loadJSON(callback) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

loadJSON(function(response) {
    jsonresponse = JSON.parse(response);
    let selectListFirst = document.getElementById('select-list-first');
    for(let i =0;i<jsonresponse.length;i++){
        let option = document.createElement("option");
        option.id=jsonresponse[i].name;
        option.value=jsonresponse[i].name;
        option.text = jsonresponse[i].name;
        selectListFirst.appendChild(option);
    }
    let selectListSecond = document.getElementById('select-list-second');
    for(let i =0;i<jsonresponse.length;i++){
        let option = document.createElement("option");
        option.id=jsonresponse[i].name;
        option.text = jsonresponse[i].name;
        selectListFirst.appendChild(option);
        selectListSecond.appendChild(option);
    }
});
function callConversion() {
loadJSON(function(response) {    //calculate
    response = JSON.parse(response);
    makeConversion(response);
    });
}
function makeConversion(response){
    let priceOfOne,priceOfSecond,finishValue;
    let firstValue = document.getElementById('select-list-first').value;
    let secondValue = document.getElementById('select-list-second').value;
    let firstInputValue = document.getElementById("first-value").value;
    console.log(firstValue);
    for(let i=0;i<response.length;i++) {
        if (response[i].name === firstValue) priceOfOne = parseFloat(response[i].currentCourse);
    }
    for(let i=0;i<response.length;i++){
        if(response[i].name===secondValue)priceOfSecond=parseFloat(response[i].currentCourse);
    }
    console.log(firstInputValue);
    console.log(priceOfSecond);
    if(firstValue ==="BYN") { finishValue = parseInt(firstInputValue)/priceOfSecond;
        let inputValue = document.getElementById('second-value');
        inputValue.value =finishValue;
    }
    else{
        finishValue = firstInputValue*(priceOfOne/priceOfSecond);
        let inputValue = document.getElementById('second-value');
        inputValue.value =finishValue;
    }

}
document.getElementById("convert-button").onclick=callConversion;