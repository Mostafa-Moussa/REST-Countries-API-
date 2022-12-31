let jsonData = window.sessionStorage.getItem("data");
let jsDetails = JSON.parse(jsonData);
window.localStorage.setItem("data", "");

let x = window.localStorage.getItem("index");
if(typeof(x) === "string"){
    for(let c = 0; c < 250; c++){
        if(jsDetails.name[c] === x){
            x = c;
        }
    }
    if(typeof(x) === "number"){
        window.open("index.html", "_self");
    }
}

let countSpace = document.createElement("div");
let container = document.querySelector(".container");
container.appendChild(countSpace);
countSpace.classList.add("count-space");
let column1 = document.createElement("div");
column1.classList.add("column1");
let column2 = document.createElement("div");
column2.classList.add("column2");

let img = document.createElement("img");
let getFlag = jsDetails.flag[x];
img.setAttribute("src", getFlag);

let nameCr = document.createElement("p");
let getName = jsDetails.name[x];
nameCr.textContent = getName;

let native = document.createElement("p");
let nam = document.createElement("span");
let getNative = jsDetails.nativeName[x];
native.innerHTML = "Native Name: " 
nam.textContent = getNative;
native.appendChild(nam);

let pop = document.createElement("p");
let num = document.createElement("span");
let getNum = jsDetails.population[x];
pop.innerHTML = "Population: " 
num.textContent = getNum;
pop.appendChild(num);

let ragionCr = document.createElement("p");
let ragionDis = document.createElement("span");
let getRagion = jsDetails.continent[x];
ragionCr.innerHTML = "Ragion: " 
ragionDis.textContent = getRagion;
ragionCr.appendChild(ragionDis);

let subCr = document.createElement("p");
let subDis = document.createElement("span");
let getSubRagion = jsDetails.subregion[x];
subCr.innerHTML = "Sub Ragion: " 
subDis.textContent = getSubRagion;
subCr.appendChild(subDis);

let capitalCr= document.createElement("p");
let capitalDis = document.createElement("span");
let getCapital = jsDetails.capital[x];
capitalCr.innerHTML = "Capital: " 
capitalDis.textContent = getCapital;
capitalCr.appendChild(capitalDis);

let domainCr = document.createElement("p");
let domainDis = document.createElement("span");
let getDomain = jsDetails.domain[x];
domainCr.innerHTML = "Top Level Domain: " 
domainDis.textContent = getDomain;
domainCr.appendChild(domainDis);

let curnCr = document.createElement("p");
let curnDis = document.createElement("span");
let getCurn = jsDetails.currency[x];
curnCr.innerHTML = "Currency: " 
curnDis.textContent = getCurn;
curnCr.appendChild(curnDis);

let langCr = document.createElement("p");
let langDis = document.createElement("span");
let getLanguage = jsDetails.language[x];
langCr.innerHTML = "Languages: " 
langDis.textContent = getLanguage;
langCr.appendChild(langDis);

let bordersCr = document.createElement("div");
bordersCr.classList.add("borders");
let borders = jsDetails.border[x];

if(borders !== "Not available"){
    let span = document.createElement("div");
    for(let i = 0; i <= borders.length; i++){
        if(i === 0){
            span.innerHTML = "Borders: ";
            bordersCr.appendChild(span);
        }
        else{
            let pars = document.createElement("p");
            span.appendChild(pars);
            pars.innerHTML = borders[i - 1];
            pars.classList.add("bcount");
        }
    }
}
column1.append(nameCr, native, ragionCr, subCr, capitalCr);
column2.append(pop, domainCr, curnCr, langCr);
countSpace.append(img, column1, column2, bordersCr);

let darkMode = document.querySelector(".container .header .toggle_mode i");
let body = document.querySelector("body");
darkMode.onclick = function(){
    body.classList.toggle("dark_mode");
}
newPage = function(){
    let arborders = document.querySelectorAll(".bcount");
    for(let i = 0; i < arborders.length; i++){
        arborders[i].addEventListener("click", (e) => {
            let a = arborders[i].innerHTML;
            for(let i = 0; i < jsDetails.name.length; i++){
                if(jsDetails.name[i] === a) {
                    window.localStorage.setItem("index", i);
                    window.open("page3.html", "_self");
                }
            }
        });
    }
}
newPage();
