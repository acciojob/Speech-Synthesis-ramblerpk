// Your script here.
// Function to populate voices dropdown
function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes('en'))
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Function to set the text and voice for speech synthesis
function setTextMessage() {
  msg.text = document.querySelector('[name="text"]').value;
}

// Function to set the voice
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}

// Function to start/toggle speech
function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

// Function to set rate and pitch options
function setOption() {
  msg[this.name] = this.value;
  toggle();
}

// Populate voices when they are loaded
speechSynthesis.addEventListener('voiceschanged', populateVoices);

// Event listener for voice selection
voicesDropdown.addEventListener('change', setVoice);

// Event listeners for rate and pitch sliders and textarea
options.forEach(option => option.addEventListener('change', setOption));

// Event listener for Speak button
speakButton.addEventListener('click', () => {
  setTextMessage();
  toggle();
});

// Event listener for Stop button
stopButton.addEventListener('click', () => toggle(false));