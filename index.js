



let selectedGender = '';
let selectedActivity = '';

const apiKey = 'bfc2d72f6emshae14cc91f69a38ep164c54jsn0cb125e82b3e';

// Function to handle gender selection
function selectGender(gender) {
    selectedGender = gender;
    document.getElementById('male').classList.remove('selected');
    document.getElementById('female').classList.remove('selected');
    document.getElementById(gender).classList.add('selected');
}

// Function to handle activity level selection
function selectActivity(activity) {
    selectedActivity = activity;
    document.getElementById('sedentary').classList.remove('selected');
    document.getElementById('light').classList.remove('selected');
    document.getElementById('moderate').classList.remove('selected');
    document.getElementById('active').classList.remove('selected');
    document.getElementById('very-active').classList.remove('selected');
    document.getElementById(activity).classList.add('selected');
}

// Function to calculate macros
function calculateMacros() {
    const age = document.getElementById('age').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;

    // Ensure all fields are filled
    if (!age || !selectedGender || !height || !weight || !selectedActivity) {
        alert("Please fill in all fields and select all options.");
        return;
    }

    // Build request payload
    const payload = {
        age: parseInt(age),
        gender: selectedGender,
        height: parseFloat(height),
        weight: parseFloat(weight),
        activity_level: selectedActivity
    };

    // Axios POST request to the RapidAPI endpoint
    axios.post('https://macros1.p.rapidapi.com/calculate_macros/', payload, {
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'macros1.p.rapidapi.com',
            'Content-Type': 'application/json',

        }
    })
        .then(response => {
            const { calories, protein, carbs, fats } = response.data;
            document.getElementById('calories').textContent = calories;
            document.getElementById('protein').textContent = protein;
            document.getElementById('carbs').textContent = carbs;
            document.getElementById('fats').textContent = fats;
            document.getElementById('result').style.display = 'block';
        })
        .catch(error => {
            console.error('Error calculating macros:', error);
            alert('An error occurred. Please try again.');
        });
}
