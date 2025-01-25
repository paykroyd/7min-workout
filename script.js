const exercises = [
  { name: "Jumping Jacks", duration: 30 },
  { name: "Wall Sit", duration: 30 },
  { name: "Push-ups", duration: 30 },
  { name: "Abdominal Crunches", duration: 30 },
  { name: "Step-ups onto Chair", duration: 30 },
  { name: "Squats", duration: 30 },
  { name: "Triceps Dips on Chair", duration: 30 },
  { name: "Plank", duration: 30 },
  { name: "High Knees/Running in Place", duration: 30 },
  { name: "Lunges", duration: 30 },
  { name: "Push-ups and Rotation", duration: 30 },
  { name: "Side Plank", duration: 30 }
];
const restTime = 10;

let currentExerciseIndex = -1;
let currentExerciseTime = 0;
let timerInterval = null;
let isResting = false;
let dingSound = document.getElementById("ding");

const timerDisplay = document.getElementById("timer");
const exerciseDisplay = document.getElementById("exercise");
const nextExerciseDisplay = document.getElementById("next-exercise");
const progressCircle = document.querySelector(".progress-ring__circle");
const radius = progressCircle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

progressCircle.style.strokeDasharray = `${circumference}`;
progressCircle.style.strokeDashoffset = `${circumference}`;

function onPlayPauseClick() {
  const playPauseButton = document.getElementById("play-pause");
  if (currentExerciseIndex === -1) {
      startWorkout();
      playPauseButton.textContent = "Pause";
  } else if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      playPauseButton.textContent = "Resume";
  } else {
      timerInterval = setInterval(updateTimer, 1000);
      playPauseButton.textContent = "Pause";
  }
}

function setProgress(percent) {
  const offset = circumference - percent / 100 * circumference;
  progressCircle.style.strokeDashoffset = offset;
}

function startWorkout() {
  currentExerciseIndex = -1;
  nextExercise();
}

function nextExercise() {
  dingSound.play();
  if (isResting || currentExerciseIndex === -1) {
      currentExerciseIndex++;
      if (currentExerciseIndex >= exercises.length) {
          exerciseDisplay.textContent = "Workout Complete!";
          nextExerciseDisplay.textContent = "";
          clearInterval(timerInterval);
          return;
      }
      isResting = false;
      currentExerciseTime = exercises[currentExerciseIndex].duration;
      exerciseDisplay.textContent = exercises[currentExerciseIndex].name;
      nextExerciseDisplay.textContent = "";
  } else {
      isResting = true;
      currentExerciseTime = restTime;
      exerciseDisplay.textContent = "Rest";
      if (currentExerciseIndex + 1 < exercises.length) {
          nextExerciseDisplay.textContent = "Next: " + exercises[currentExerciseIndex + 1].name;
      } else {
          nextExerciseDisplay.textContent = "";
      }
  }

  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timerDisplay.textContent = currentExerciseTime;

  const totalTime = isResting ? restTime : exercises[currentExerciseIndex].duration;
  const percentage = ((totalTime - currentExerciseTime) / totalTime) * 100;
  setProgress(percentage);

  currentExerciseTime--;
  if (currentExerciseTime < 0) {
      nextExercise();
  }
}

// startWorkout();