

let needle = require('needle');
    let cheerio = require('cheerio');
    let URL = 'http://www.nbrb.by/statistics/rates/ratesdaily.asp';
    let json = [],id=0,$;
    needle.get(URL, function(err, res) {
        $ = cheerio.load(res.body);
        $('td.titlecol').each(function (i, element) {
            let a = $(this);
            let title = a.text();
            let countOne= a.next().text();
            let nameOfValue = a.next().next().text();
            let currentCourse = a.next().next().next().text();
            currentCourse = devideValue(currentCourse);
            if(parseInt(countOne)>1){
                currentCourse=divideCountOfValue(currentCourse,countOne);
                countOne = 1;
            }
                         id++;
                        json.push({
                            id: id,
                            valueName:nameOfValue,
                            name: title,
                            oneCount:countOne,
                            currentCourse:currentCourse
                        });

                require('fs').writeFileSync('./data.json', JSON.stringify(json, null, 6));
            });

    });
    function divideCountOfValue(currentCourse,countOne){
       return parseFloat(currentCourse/countOne);
    }
    function devideValue(currentCourse) {
        let arrayForNewValue = [];
        let finalValue;
        let tempCurrent = currentCourse.split("");
        for(let i=0;i<tempCurrent.length;i++){
            if(tempCurrent[i]===',')tempCurrent[i]='.'
        }
        let currentArray = ['1','2','3','4','5','6','7','8','9','0','.'];
        for(let i=0;i<tempCurrent.length;i++){
            for(let j=0;j<currentArray.length;j++){
                if(tempCurrent[i]===currentArray[j]){

                    arrayForNewValue.push(tempCurrent[i])
                }
            }
        }
        finalValue = arrayForNewValue.join("");
        return finalValue;
    }