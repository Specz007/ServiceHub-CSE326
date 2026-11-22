var currentRole = localStorage.getItem("userRole");

if (currentRole === "customer") {
    // Popup and kick back to dashboard if they try to open admin pages
    if (window.location.href.includes("users.html") || window.location.href.includes("reports.html")) {
        alert("Access Denied! This page is for Administrators only.");
        window.location.href = "dashboard.html";
    }

    var adminItems = document.getElementsByClassName("admin-only");
    for (var i = 0; i < adminItems.length; i++) {
        adminItems[i].style.display = "none";
    }
}

if (currentRole === "admin") {
    var customerItems = document.getElementsByClassName("customer-only");
    for (var i = 0; i < customerItems.length; i++) {
        customerItems[i].style.display = "none";
    }
}