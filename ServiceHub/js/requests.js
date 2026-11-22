// 1. Starter requests so the table isn't empty
var defaultRequests = [
    {
        customer: "Aarav Mehta",
        service: "Plumbing",
        date: "2026-11-22",
        status: "Pending"
    },
    {
        customer: "Sneha Kapoor",
        service: "Electrical Services",
        date: "2026-11-20",
        status: "Completed"
    }
];

// 2. Load saved requests or use starter list
var requests = JSON.parse(localStorage.getItem("requestsData")) || defaultRequests;

// 3. Display all requests in the table
function showRequests() {
    var tableBody = document.getElementById("request-list");
    var role = localStorage.getItem("userRole");
    var currentUser = localStorage.getItem("currentUser");
    tableBody.innerHTML = "";

    for (var i = 0; i < requests.length; i++) {
        // If logged in as Customer, skip requests made by other people
        if (role === "customer" && requests[i].createdBy !== currentUser) {
            continue;
        }

        var actionCell = "—";
        if (role === "admin" && requests[i].status === "Pending") {
            actionCell = "<button class='call-btn' onclick='completeRequest(" + i + ")'>Mark Completed</button>";
        } else if (requests[i].status === "Completed") {
            actionCell = "✅ Done";
        }

        tableBody.innerHTML +=
            "<tr>" +
                "<td>" + requests[i].customer + "</td>" +
                "<td>" + requests[i].service + "</td>" +
                "<td>" + requests[i].date + "</td>" +
                "<td><strong>" + requests[i].status + "</strong></td>" +
                "<td>" + actionCell + "</td>" +
            "</tr>";
    }
}

// 4. Customer submits a new service request
function addRequest(event) {
    event.preventDefault();

    var customer = document.getElementById("customer-name").value;
    var service = document.getElementById("service-select").value;
    var date = document.getElementById("request-date").value;

    if (customer === "" || service === "" || date === "") {
        alert("Please fill in Customer Name, Service, and Date!");
        return;
    }

    var newRequest = {
        customer: customer,
        service: service,
        date: date,
        status: "Pending",
        createdBy: localStorage.getItem("currentUser") // Tags who uploaded it
    };

    requests.push(newRequest);
    localStorage.setItem("requestsData", JSON.stringify(requests));

    alert("Service request submitted!");
    showRequests();

    document.getElementById("customer-name").value = "";
    document.getElementById("service-select").value = "";
    document.getElementById("request-date").value = "";
    document.getElementById("request-desc").value = "";
}
// 5. Admin marks a request as Completed
function completeRequest(index) {
    requests[index].status = "Completed";
    localStorage.setItem("requestsData", JSON.stringify(requests));
    showRequests();
}

// 6. Load table on page open
showRequests();
// 7. Admin removes all completed requests
function clearCompleted() {
    var pendingOnly = [];

    for (var i = 0; i < requests.length; i++) {
        if (requests[i].status !== "Completed") {
            pendingOnly.push(requests[i]);
        }
    }

    requests = pendingOnly;
    localStorage.setItem("requestsData", JSON.stringify(requests));
    showRequests();
    alert("All completed requests removed!");
}