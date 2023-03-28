let arrFlages = [];
let arrName = [];
let arrContinent = [];
let arrCapital = [];
let arrPopulation = [];
let arrSubRagion = [];
let arrCarruncies = [];
let arrLanguages = [];
let arrBorders = [];
let arrNativeName = [];
let arrDomain = [];
let arrTobLevelDomain = [];

let countries = document.createElement("div");
let contianer = document.querySelector(".container");
contianer.appendChild(countries);
countries.classList.add("countries");

requestData = function(){
    let jsonData = new XMLHttpRequest();
    jsonData.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let jsData = JSON.parse(this.responseText);
            for(let i = 0; i < 250; i++){
                arrFlages.push(jsData[i].flags.png);
                arrName.push(jsData[i].name.common);
                arrContinent.push(jsData[i].continents);
                arrCapital.push(jsData[i].capital);
                arrPopulation.push(jsData[i].population);
                arrSubRagion.push(jsData[i].subregion);
                arrTobLevelDomain.push(jsData[i].tld);

                if(i !== 53){
                    arrNativeName.push(jsData[i].name.official);
                }else{
                    arrNativeName.push("Not available");
                }

                let jsDataKeys = Object.keys(jsData[i]);
                if(jsDataKeys.includes("currencies")){
                    let currObject = jsData[i].currencies;
                    let currKeys = Object.keys(currObject);
                    if(currKeys.length > 1){
                        arrCarruncies[i] = [];
                        for(let j = 0; j < currKeys.length; j++){
                            arrCarruncies[i].push(jsData[i].currencies[currKeys[j]].name);
                        }
                    }else{
                        arrCarruncies[i] = jsData[i].currencies[currKeys[0]].name;
                    }
                }else{ arrCarruncies.push("Not available");}

                if(jsDataKeys.includes("languages")){
                    let langCurrObject = jsData[i].languages;
                    let langCurrKeys = Object.keys(langCurrObject);
                    if(langCurrKeys.length > 1){
                        arrLanguages[i] = [];
                        for(let j = 0; j < langCurrKeys.length; j++){
                            arrLanguages[i].push(jsData[i].languages[langCurrKeys[j]]);
                        }
                    }else{
                        arrLanguages[i] = langCurrObject[langCurrKeys[0]];
                    }
                }else{arrLanguages.push("Not available")}

                if(jsDataKeys.includes("borders")){
                    arrBorders.push(jsData[i].borders);
                    for(let k = 0; k < arrBorders[i].length; k++){
                        for(let l = 0; l  < 250; l++){
                            let temKeys = Object.keys(jsData[l])
                            if(temKeys.includes("fifa") && arrBorders[i][k] === jsData[l].fifa){
                                arrBorders[i][k] = jsData[l].name.common;
                            }
                        }
                    }
                }else{
                    arrBorders.push("Not available");
                }
            }
            getData();
            setMainData();
            newPage();
        }
    }
    jsonData.open("GET", "https://restcountries.com/v3.1/all", true);
    jsonData.send();
}
requestData();

 setMainData = function(){
    let c = 0;
    for(let i = 0; i < 250; i++){
        if(arrContinent[i][0] === continent){
            c++;
            console.log(c);
            let content = document.createElement("a");
            content.setAttribute("href", "page3.html");
            countries.appendChild(content);
            content.classList.add("country");
            content.setAttribute("id", i);

            let flagDisplay = document.createElement("img");
            flagDisplay.setAttribute("src", arrFlages[i]);
            flagDisplay.classList.add(i, "img");
            content.appendChild(flagDisplay);

            let nameDisplay = document.createElement("p");
            nameDisplay.textContent = arrName[i];
            nameDisplay.classList.add(i, "name");
            content.appendChild(nameDisplay);

            let populationDisplay = document.createElement("p");
            populationDisplay.textContent = "Population: ";
            populationDisplay.classList.add(i, "popualtion", "par");
            let count = document.createElement("span");
            count.textContent = arrPopulation[i];
            populationDisplay.appendChild(count);
            content.appendChild(populationDisplay);

            let continentDisplay = document.createElement("p");
            continentDisplay.textContent = "Continent: ";
            continentDisplay.classList.add(i, "continent", "par");
            let cont = document.createElement("span");
            cont.textContent = arrContinent[i];
            continentDisplay.appendChild(cont);
            content.appendChild(continentDisplay);

            let capitalDisplay = document.createElement("p");
            capitalDisplay.textContent = "Capital: ";
            capitalDisplay.classList.add(i, "capital", "par");
            let cap = document.createElement("span");
            cap.textContent = arrCapital[i];
            capitalDisplay.appendChild(cap);
            content.appendChild(capitalDisplay);
        }
    }
}
let continent = "";
let jsonCon;
getData = function(){
    jsonCon = window.localStorage.getItem("continent");
    let jsCon = JSON.parse(jsonCon);
    continent = jsCon.continent;
}
newPage = function(){
    let detailes = document.getElementsByClassName("country");
    for(let i = 0; i < detailes.length; i++){
        detailes[i].addEventListener("click", (e) => {
            let a = detailes[i].id;
            window.localStorage.setItem("index", a);
        });
    }
}
let darkMode = document.querySelector(".container .header .toggle_mode i");
let body = document.querySelector("body");
darkMode.onclick = function(){
    body.classList.toggle("dark_mode");
}
let getSearch = document.querySelector(".container form input");
search  = function(){
    let a = getSearch.value;
        for(let i = 0; i < arrName.length; i++){
            if(arrName[i] === a) {
                storeData();
                window.localStorage.setItem("index", i);
                window.open("page3.html", "_self");
            }
        }
}
getSearch.addEventListener("touchstart", (e) => {
    search();
})
getSearch.addEventListener("keydown", (e) => { 
    if(e.key === "Enter"){
        e.preventDefault();
        search();
    }
});
