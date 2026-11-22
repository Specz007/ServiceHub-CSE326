// 1. Starter categories
var defaultCategories = [
    "Home Maintenance",
    "Electrical Services",
    "Plumbing",
    "Healthcare",
    "Education"
];

// 2. Load saved categories or use starter list
var categories = JSON.parse(localStorage.getItem("categoriesData")) || defaultCategories;

// 3. Display categories in the <ul> list
function showCategories() {
    var list = document.getElementById("category-list");
    list.innerHTML = "";

    for (var i = 0; i < categories.length; i++) {
        list.innerHTML += "<li>" + categories[i] + "</li>";
    }
}

// 4. Add a new category from the form
function addCategory(event) {
    event.preventDefault();

    var catName = document.getElementById("category-name").value;

    if (catName === "") {
        alert("Please enter a category name!");
        return;
    }

    categories.push(catName);
    localStorage.setItem("categoriesData", JSON.stringify(categories));

    showCategories();
    document.getElementById("category-name").value = "";
}

// 5. Show list automatically on page load
showCategories();