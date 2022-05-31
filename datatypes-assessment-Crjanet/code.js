let textArea = document.getElementById("text");
let results = document.getElementById("results");
let button = document.getElementById("btn")

// Your Code Here.
let result = {  
    text: " ", 
    vowels: {
      a: 0,
      e: 0,
      i: 0,
      o: 0,
      u: 0,
    },
    punctuation: {
      period: 0,
      comma: 0,
      exclamation: 0,
      questionMark: 0,
    },
    numCharacters: 0,
    numWords: 0,
    longestWord: "",
    shortestWord: "",
    lastThreeWords: ["", "", ""],
    waldoIndexes: [],
}

document.addEventListener('keyup', onKeyUp) 
function onKeyUp (e){ 
    updateVowels(e.code) 
    updatePunctuation(e.code) 

    result.text = (textArea.value)   
    result.numWords = wordCount(textArea.value)  
    result.numCharacters = textArea.value.length
    result.longestWord = findLongestWord(textArea.value) 
    result.shortestWord = findShortestWord(textArea.value)
    result.lastThreeWords = getLastWords (textArea.value)  

    let indexes = findWaldo("waldo", textArea.value)    
    result.waldoIndexes = indexes         

    renderResults();  
}

document.addEventListener('keydown', (e) =>{      
    if(e.code === "Backspace"){ 
        let tempChar = e.target.value.slice(-1) 
        updateObject(tempChar)         
    }
})

function updateVowels (char){   
    switch(char){    
        case 'KeyA': 
            result.vowels.a++
            console.log(result.vowels.a)
            break
        case 'KeyE': 
            result.vowels.e++ 
            console.log(result.vowels.e)
            break
        case 'KeyI': 
            result.vowels.i++
            console.log(result.vowels.i) 
            break
        case 'KeyO': 
            result.vowels.o++ 
            console.log(result.vowels.o)
            break
        case 'KeyU': 
            result.vowels.u++
            console.log(result.vowels.u)
            break
    }
    return
}

function updatePunctuation (sign){
    switch(sign){
        case 'Digit1':
            result.punctuation.exclamation++
            console.log(result.punctuation.exclamation) 
            break
        case 'Comma':
            result.punctuation.comma++
            console.log(result.punctuation.comma)
            break
        case 'Slash':
            result.punctuation.questionMark++
            console.log(result.punctuation.questionMark)  
            break
        case 'Period':
            result.punctuation.period++
            console.log(result.punctuation.period) 
            break
    }
}

function wordCount(text) {
    return text.split(" ").length;
}

function findLongestWord(str){  
    let strSplit = str.split(' ')
    let longestWord = 0
    let tempResult = ""
    for(let i = 0; i < strSplit.length; i++) {
        if(strSplit[i].length > longestWord){
            longestWord = strSplit[i].length
            tempResult = strSplit[i]
        }
    }
    return tempResult;
}

function findShortestWord(str) {  
    let words = str.split(' ')
    let shortest = words.reduce((shortestWord, currentWord) => {
      return currentWord.length < shortestWord.length ? currentWord : shortestWord
    }, words[0])
    return shortest
}


function getLastWords(str){  
    let arr = str.split(' ')
    let forReturn = [" ", " ", " "]
    if(arr.length >= 3){
        forReturn[2] = arr[arr.length - 1]
        forReturn[1] = arr[arr.length - 2]
        forReturn[0] = arr[arr.length - 3]
    }
    else if(arr.length === 1){
            forReturn[2] = arr[arr.length - 1]
            forReturn[1] = ", "
            forReturn[0] = ", "
    }
    else if(arr.length === 2){
        forReturn[2] = arr[arr.length - 1]
        forReturn[1] = arr[arr.length - 2]
        forReturn[0] = ", "
    }
    else{
        return forReturn
    }
    return forReturn
}

function findWaldo(searchStr, str, caseSensitive) {  
    let searchStrLen = searchStr.length
    if (searchStrLen === 0) {
        return [];
    }   
    let startIndex = 0, index, indexes = []
    if (!caseSensitive) {
        str = str.toLowerCase()
        searchStr = searchStr.toLowerCase()
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indexes.push(index)
        startIndex = index + searchStrLen
    }
    return indexes
}

function updateObject(char){  //decrement values inside the object accordingly
    let newChar = char.toLowerCase()
    if(newChar === 'a' && result.vowels.a >= 1){
        result.vowels.a--
    }
    else if(newChar === 'e' && result.vowels.e >= 1){
        result.vowels.e--
    }
    else if(newChar === 'i' && result.vowels.i >= 1){
        result.vowels.i--
    }
    else if(newChar === 'o' && result.vowels.o >= 1){
        result.vowels.o--
    }
    else if(newChar === 'u' && result.vowels.u >= 1){
        result.vowels.u--
    }
    else if(newChar === '!' && result.punctuation.exclamation >= 1){
        result.punctuation.exclamation--
    }
    else if(newChar === ',' && result.punctuation.comma >= 1){
        result.punctuation.comma--
    }
    else if(newChar === '.' && result.punctuation.period >= 1){
        result.punctuation.period--
    }
    else if(newChar === '?' && result.punctuation.questionMark >= 1){
        result.punctuation.questionMark--
    }
    else{
        return;
    }
}

//displaying information
let newElement = document.createElement('div')
newElement.classList.add("firstElement")
results.append(newElement)

let secondNewElement = document.createElement('div')
secondNewElement.classList.add("secondElement")
results.appendChild(secondNewElement)


function renderResults(){
    // newElement.innerHTML ="<h2>Text Analysis</h2>";
    newElement.innerHTML = "<h3>Vowel Counts</h3>"
    newElement.innerHTML += "<p> a: "+result.vowels.a+" </p>"
    newElement.innerHTML += "<p> e: "+result.vowels.e+" </p>"
    newElement.innerHTML += "<p> o: "+result.vowels.o+" </p>"
    newElement.innerHTML += "<p> u: "+result.vowels.u+" </p>"

    newElement.innerHTML = "<h3>Punctuation Counts</h3>"
    newElement.innerHTML += "<p> Commas: "+result.punctuation.comma+" </p>"
    newElement.innerHTML += "<p> Question Marks: "+result.punctuation.questionMark+" </p>"
    newElement.innerHTML += "<p> Exclamation Marks: "+result.punctuation.exclamation+" </p>"

    secondNewElement.innerHTML += "<h3> Num Of Words : "+result.numWords+" </h3>"
    secondNewElement.innerHTML += "<h3> Longest Word: "+result.longestWord+" </h3>"
    secondNewElement.innerHTML += "<h3> Shortest Word: "+result.shortestWord+" </h3>"
    secondNewElement.innerHTML += "<h3> Last Three: "+result.lastThreeWords+" </h3>"
    secondNewElement.innerHTML += "<h3> Waldo Indexes: "+result.waldoIndexes+" </h3>"

}


btn.addEventListener("click", (e) =>{
    result.text = "";
    result.vowels.a = 0
    result.vowels.e = 0 
    result.vowels.i = 0
    result.vowels.o = 0 
    result.vowels.u = 0
    result.punctuation.comma = 0
    result.punctuation.period = 0
    result.punctuation.exclamation = 0
    result.punctuation.questionMark = 0
    result.numWords = 0
    result.numCharacters = 0
    result.shortestWord = ""
    result.longestWord = ""
    result.lastThreeWords = ["", "", ""]
    result.waldoIndexes = ["", "", ""]
    textArea.value = ""
    renderResults()
})