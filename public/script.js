//Wrapping the code in DOMContentLoaded per phind advice. This way, all the code inside the event listener will be executed once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
// Event listener for the "Design a Card" button
document.getElementById('designCard').addEventListener('click', function() {
    // Hide the video container when "Design a Card" is clicked
    document.getElementById('videoContainer').style.display = 'none';
    document.getElementById('buttons').style.display = 'none';
    this.style.display = 'none'; // Hide the "Design a Card" button
    document.getElementById('inputFields').style.display = 'block';
    initializeSliders();
 }); 

// Function to initialize sliders
function initializeSliders() {
    const sliders = [
        {id: 'closenessRange', valueId: 'closenessValue'},
        {id: 'contactFrequencyRange', valueId: 'contactFrequencyValue'},
        {id: 'formalityRange', valueId: 'formalityValue'},
        {id: 'cheerfulnessRange', valueId: 'cheerfulnessValue'},
        {id: 'lengthRange', valueId: 'lengthValue'}
    ];

    sliders.forEach(sliderInfo => {
        const slider = document.getElementById(sliderInfo.id);
        const output = document.getElementById(sliderInfo.valueId);
        output.innerHTML = slider.value;

        slider.oninput = function() {
            output.innerHTML = this.value;
        };
    });
}

// Call this function when the page loads or when appropriate
initializeSliders();

// Event listener for the submit button
document.getElementById('submitBtn').addEventListener('click', async function() {
    // Collect input values
    const personName = document.getElementById('personName').value;
    const userName = document.getElementById('userName').value;
    const relation = document.getElementById('relation').value;
    const occasion = document.getElementById('occasion').value;
    const closeness = document.getElementById('closenessRange').value;
    const contactFrequency = document.getElementById('contactFrequencyRange').value;
    const formality = document.getElementById('formalityRange').value;
    const cheerfulness = document.getElementById('cheerfulnessRange').value;
    const length = document.getElementById('lengthRange').value;

    // Hide the input fields
    document.getElementById('inputFields').style.display = 'none';

    // Call the function to generate the card text
    const cardText = await generateCardText(personName, userName, relation, occasion, closeness, contactFrequency, formality, cheerfulness, length);
    
    // Display the generated text
    displayCardText(cardText);
});

// Function to generate card text
async function generateCardText(personName, userName, relation, occasion, closeness, contactFrequency, formality, cheerfulness, length) {
    // Construct the prompt
    const prompt = `Create a greeting card message for ${occasion}. The card is from ${userName} to ${personName}, who is ${relation}. The message should reflect a closeness level of ${closeness}, contact frequency of ${contactFrequency}, formality level of ${formality}, cheerfulness level of ${cheerfulness}, and length of ${length}. Please complete the sentence.`;

    // Call OpenAI API
    try {
        const response = await fetch('/api/generateCard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.text;
    } catch (error) {
        console.error('Error fetching card text:', error);
        return "Sorry, looks like we can't help you with a card yet.";
    }
}

function displayCardText(cardText) {
    // Show the card container
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.style.display = 'block';

    // Display the text inside the message container
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = cardText; // Format as needed
}
const personName = document.getElementById('personName').value;
const userName = document.getElementById('userName').value;
document.getElementById('address').innerText = `To: ${personName}`;
document.getElementById('message').innerText = cardText;
document.getElementById('signature').innerText = `Best, ${userName}`;

});