// select the dom elements and set it to variables(using querySelector) 
var $tbody = document.querySelector("tbody");
var $btnSearch = document.getElementById("search");
var $btnReset = document.getElementById("reset");
var $ul = document.querySelector("ul");


// add event listerns to the buttons
$btnSearch.addEventListener("click", filterByParameters);
$btnReset.addEventListener("click", resetTable);
$ul.addEventListener("click", clickPage);

// Pagination
var itemsPerPage = 1000;

var filteredDataSet = dataSet;

// function which does the pagination
function clickPage(event){
    var pageNumber = event.target.parentNode.id;

    if (pageNumber === 1) {
        var startIndex = 0;
        var endIndex = startIndex + itemsPerPage;
    
        console.log(startIndex);
        console.log(endIndex);
    
        filteredDataSet = filteredDataSet.slice(startIndex, endIndex);
    
        renderTable();
        filteredDataSet = dataSet;

    }  else  {
        var startIndex = (pageNumber-1)*itemsPerPage;
        var endIndex = startIndex + itemsPerPage;
    
        console.log(startIndex);
        console.log(endIndex);
    
        filteredDataSet = filteredDataSet.slice(startIndex, endIndex);
    
        renderTable(filteredDataSet);
        filteredDataSet = dataSet;
    }  
};

// funciton for pagination
function pagination(data){
    // store the data to a variable

    $ul.innerHTML = "";
    console.log(data.length)

    var numberOfPages = data.length / itemsPerPage;


    for (var i = 1; i <= numberOfPages; i++) {
        var $li = document.createElement("li");
        $li.setAttribute("id", i);
        $li.innerHTML = `<a href="#">${i}</a>`;
        $ul.appendChild($li);
    };

    var startIndex = 0;
    var endIndex = startIndex + itemsPerPage;

    data = data.slice(startIndex, endIndex);
 
    // render the table for the first time on page load
    renderTable(data);
};




// function which filters the data based on user inputs
function filterByParameters(event) {

    // prevent the browser from refreshing on click of submit button 
    event.preventDefault();

    // create the user input object by calling the createUserInputObject function
    userInputObject = createUserInputObject()

    // filter the dataSet based on the userInput Conditions
    filteredDataSet = dataSet.filter(function (row) {
        // a variable to store boolean value
        var filterArray = [];

        // compare each element of userInputObject to the row and generate booleans
        // populate the filterArray with the generated booleans
        Object.keys(userInputObject).forEach(function (key) {
            filterArray.push(userInputObject[key] === row[key].trim().toLowerCase());
        });

        // check if all elements in the filterArray are true or false
        // if true it will get filtered
        return filterArray.every(element => element === true)
    });

    pagination(filteredDataSet)

};


// create a function which renders the table to the HTML
function renderTable(data) {
    // empty the content in the tbody element(using innerHTML)
    $tbody.innerHTML = "";

    // loop to add rows and cells based on the dimensions in dataSet
    // array of objects(insertRow and insertCell)
    for (i = 0; i < data.length; i++) {
        var $row = $tbody.insertRow(i);

        for (j = 0; j < Object.keys(data[i]).length; j++) {
            var $cell = $row.insertCell(j);
            var cellValue = data[i][Object.keys(data[i])[j]];
            $cell.innerText = cellValue;
        }
    }
};


// create a function that constructs an object based on inputs provided by users
function createUserInputObject() {

    var userInputObject = {}

    // select the user input elements and set those into seperate variables
    var inputDate = document.querySelector('#inputDate');
    var inputCity = document.querySelector('#inputCity');
    var inputState = document.querySelector('#inputState');
    var inputCountry = document.querySelector('#inputCountry');
    var inputShape = document.querySelector('#inputShape');

    if (inputDate.value !== "") {
        // the variable is defined
        userInputObject["datetime"] = inputDate.value;
    }
    if (inputCity.value !== "") {
        // the variable is defined
        userInputObject["city"] = inputCity.value.trim().toLowerCase();
    }
    if (inputState.value !== "") {
        // the variable is defined
        userInputObject["state"] = inputState.value.trim().toLowerCase();
    }
    if (inputCountry.value !== "") {
        // the variable is defined
        userInputObject["country"] = inputCountry.value.trim().toLowerCase();
    }
    if (inputShape.value !== "") {
        // the variable is defined
        userInputObject["shape"] = inputShape.value.trim().toLowerCase();
    }
    return userInputObject;
}

// function which resets the HTML page
function resetTable() {

    var inputDate = document.querySelector('#inputDate');
    var inputCity = document.querySelector('#inputCity');
    var inputState = document.querySelector('#inputState');
    var inputCountry = document.querySelector('#inputCountry');
    var inputShape = document.querySelector('#inputShape');

    inputDate.value = "";
    inputCity.value = "";
    inputState.value = "";
    inputCountry.value = "";
    inputShape.value = "";

    data = dataSet;

    pagination(data)

};


pagination(filteredDataSet);