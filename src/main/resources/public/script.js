function getStarWordsArray(str) {
    var words = str.split(' ').filter((el) => el != null && el != "");
    var maxLen = words.reduce((maxLen, el) => Math.max(maxLen, el.length), 0);
    starWords = words.map((el) => "*&nbsp;" + el + '&nbsp;'.repeat(maxLen - el.length + 1) + "*");
    starWords.push("*".repeat(maxLen + 4));
    return starWords;
}

function printInAFrame(str) {
    if (str == "") {
        console.log("Empty string");
    }
    var words = str.split(' ').filter((el) => el != null && el != "");
    var maxLen = words.reduce((maxLen, el) => Math.max(maxLen, el.length), 0); 
    var result = "";
    result += '*'.repeat(maxLen + 4) + '\n';
    words.map(function(el) {
        result += "* " + el + ' '.repeat(maxLen - el.length + 1) + "*\n";
    })
        result += '*'.repeat(maxLen + 4);
    console.log(result);
}

function frameBtnFunc() {
    var input = document.getElementById("first-input").value;
    printInAFrame(input);
    var result = "";
    if (input == "") {
        result = "Empty string";
    } else {
        var words = getStarWordsArray(input);
        result += "*".repeat(words[words.length - 1].length) + "<br/>";
        words.map(function(el) {
            result += el + "<br/>";
        })
    }
    document.getElementById("first-result").innerHTML = result;
}

function hashBtnFunc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("second-result").innerHTML = this.responseText;
        } else {
            document.getElementById("second-result").innerHTML = "Invalid Input";
        }
    };
    xhttp.open("POST", "/hash", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send('{"text": ' + document.getElementById("second-input").value +'}');
}