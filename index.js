document.addEventListener("DOMContentLoaded", () => {
    // Add event listeners for gender and activity buttons to toggle selected states
    document.querySelectorAll(".btn-group button").forEach(button => {
        button.addEventListener("click", () => {
            // Remove selected class from all buttons in the group
            button.parentNode.querySelectorAll("button").forEach(btn => btn.classList.remove("selected"));
            // Add selected class to the clicked button
            button.classList.add("selected");
        });
    });

    document.querySelectorAll(".activity-level button").forEach(button => {
        button.addEventListener("click", () => {
            // Remove selected class from all buttons in the group
            button.parentNode.querySelectorAll("button").forEach(btn => btn.classList.remove("selected"));
            // Add selected class to the clicked button
            button.classList.add("selected");
        });
    });
});

function calculateMacros() {
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const age = document.getElementById("age").value;

    // Capture selected gender and activity level
    const gender = document.querySelector(".btn-group button.selected")?.getAttribute("data-gender");
    const activity = document.querySelector(".activity-level button.selected")?.getAttribute("data-activity");

    // Check if all required inputs and selections are filled
    if (!weight || !height || !age || !gender || !activity) {
        alert("Please fill in all fields and select all options.");
        return;
    }

    // Prepare the data to be sent to the API
    const data = {
        weight: weight, // weight in lbs
        height: height, // height in inches
        age: age,
        gender: gender, // "male" or "female"
        activityLevel: activity // "sedentary", "light", "moderate", "active", "very-active"
    };

    // Make the API request to calculate macros
    axios.post('https://your-api-endpoint-for-macros.com/calculateMacros', data)
        .then(response => {
            const result = response.data;
            displayResult(result);
        })
        .catch(error => {
            console.error("There was an error calculating the macros:", error);
        });
}

function displayResult(result) {
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = `
        <h2>Your Daily Macros</h2>
        <p>Calories: <span>${result.calories}</span></p>
        <p>Protein: <span>${result.protein}g</span></p>
        <p>Fat: <span>${result.fat}g</span></p>
        <p>Carbs: <span>${result.carbs}g</span></p>
    `;
}
