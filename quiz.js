(function () {

	var easyQuestions = [{
			question: "What is the first name of the tennis playing sister of Serena Williams?",
			choices: ["Khloe", "Venus", "Amy", "Vanessa"],
			correctAnswer: 1
  }, {
			question: "A variety of apple called Granny Smith, is what color?",
			choices: ["blue", "orange", "red", "green"],
			correctAnswer: 3
  }, {
			question: "What is the name of the kids show that features big purple dinosaur?",
			choices: ["Thomas", "Fred", "Barney", "The Wiggles"],
			correctAnswer: 2
  }, {
			question: "Who is condisered to be the greatest basketball player of all time?",
			choices: ["Steph Curry", "Michael Jordan", "Larry Bird", "Kobe Bryant"],
			correctAnswer: 1
  }, {
			question: "What is the capital of the United States of America?",
			choices: ["Washington, D.C.", "Seattle", "Maryland", "Canada"],
			correctAnswer: 0
  }],

		mediumQuestions = [{
			question: "What is James Bond's secret agent number?",
			choices: ["911", "80", "4", "007"],
			correctAnswer: 3
  }, {
			question: "How many edges does a cube have?",
			choices: ["6", "1", "5", "10"],
			correctAnswer: 0
  }, {
			question: "What is the biggest continent in the world?",
			choices: ["Europe", "Asia", "Canada", "Alaska"],
			correctAnswer: 1
  }, {
			question: "Which comic book superhero does not have any 'special powers'?",
			choices: ["Superman", "Flash", "Batman", "Pinocchio"],
			correctAnswer: 2
  }, {
			question: "Who is usually credited for the invention of the light bulb?",
			choices: ["Thomas Edison", "Albert Einstein", "George Washington", "Isaac Newton"],
			correctAnswer: 0
  }],

		hardQuestions = [{
			question: "What does the 'www' stand for in 'www.google.com'?",
			choices: ["webpage", "world wide web", "whiskey while working", "internet"],
			correctAnswer: 1
  }, {
			question: "What is the square root of the number 25?",
			choices: ["1", "7.43", "625", "5"],
			correctAnswer: 3
  }, {
			question: "What American icon wore a 'coonskin cap?",
			choices: ["Henry Ford", "Paul Bunyan", "Davy Crockett", "John Adams"],
			correctAnswer: 2
  }, {
			question: "What kind of car did the 'Dukes of Hazard' drive",
			choices: ["Dodge Charger", "Dodge Neon", "Chevrolet Camaro", "Ford Thunderbird"],
			correctAnswer: 0
  }, {
			question: "What kind of animal was Lassie?",
			choices: ["elephant", "horse", "dolphin", "dog"],
			correctAnswer: 3
  }],

		diff = 0, //difficulty
		right = 0,
		wrong = 0,
		counter = 0, // keep track of which question the user is on
		diffButtons = document.getElementsByClassName("diff"),
		answerButtons = document.getElementsByClassName("answer"),
		resetButton = document.getElementById("reset"),
		start = document.getElementById("start"),
		question = document.getElementById("question"),
		correct = document.getElementById("correct"),
		missed = document.getElementById("missed"),
		check = document.getElementById("submit"),
		next = document.getElementById("next"),
		label = document.getElementsByClassName("guessLabel"),
		guessForm = document.getElementById("guessForm"),
		caution = document.getElementById("caution"),
		gameContainer = document.getElementById("container"), // container for questions and answers
		previous = document.getElementById("previous"), // to set previous score
		directions = document.getElementById('directions'),
		directionList = document.getElementById('directionList'),
		toggleDirections = document.getElementById('toggleDirections'),
		score = document.getElementById('score'),
		answers = [];


	for (var i = 0; i < 4; i++) {
		answerButtons[i].style.visibility = "hidden";
	}

	check.disabled = true;

	right = 0;
	wrong = 0;
	correct.textContent = right;
	missed.textContent = wrong;

	start.addEventListener("click", startQuiz);
	check.addEventListener("click", submitAnswer);
	resetButton.addEventListener("click", resetAll);
	toggleDirections.addEventListener("click", toggleDirect);

	function getDifficulty() { //sets difficulty of questions

		diff = 0;

		if (diffButtons[2].checked === true) {
			diff = 3;
		} else if (diffButtons[1].checked === true) {
			diff = 2;
		} else {
			diff = 1;
		}

	}

	function radioHidden() {

		for (var i = 0; i < 4; i++) {
			answerButtons[i].style.visibility = "hidden";
		}

	}

	function radioVis() {

		for (var i = 0; i < 4; i++) {
			answerButtons[i].style.visibility = "visible";
		}

	}

	function radioGuess() {

		if (diff === 3) {
			question.textContent = hardQuestions[counter]["question"];

			for (var i = 0; i < 4; i++) {
				label[i].textContent = hardQuestions[counter]["choices"][i];
			}

		} else if (diff === 2) {
			question.textContent = mediumQuestions[counter]["question"];

			for (var i = 0; i < 4; i++) {
				label[i].textContent = mediumQuestions[counter]["choices"][i];
			}

		} else {
			diffButtons[0].checked = true;
			question.textContent = easyQuestions[counter]["question"];

			for (var i = 0; i < 4; i++) {
				label[i].textContent = easyQuestions[counter]["choices"][i];
			}

		}

	}

	function hideDirections() {
		directionList.classList.add('hide');
	}
	function showDirections() {
		directionList.classList.remove('hide');
	}

	function toggleDirect() {
		if (directionList.classList.contains('hide')) {
			showDirections();
			toggleDirections.textContent = "Hide Directions";
		} else {
			hideDirections();
			toggleDirections.textContent = "Show Directions";
		}
	}

	function startQuiz() {

		hideDirections();

		start.disabled = true;
		check.disabled = false;

		getDifficulty();
		radioVis();
		radioGuess();

		if (localStorage.score >= 0) {
			var score = localStorage.getItem("score");
			var myDiff = localStorage.getItem("diff");
			previous.textContent = myDiff + " : " + score + " / " + easyQuestions.length; // in case number of questions change
		} else {
			previous.textContent = "No Score Saved";
		}

	}

	function submitAnswer() { //check user answer vs. correct answer

		var wrongGuess = 0;
		var didAnswer = 0; // to check if user chose an answer

		for (var i = 0; i < 4; i++) {
			if (answerButtons[i].checked === true) {
				didAnswer = 1;
				if (diff === 1) {
					if (Number(answerButtons[i].value) === easyQuestions[counter]["correctAnswer"]) {
						right++;
					} else {
						wrongGuess++;
					}
				} else if (diff === 2) {
					if (Number(answerButtons[i].value) === mediumQuestions[counter]["correctAnswer"]) {
						right++;
					} else {
						wrongGuess++;
					}
				} else {
					if (Number(answerButtons[i].value) === hardQuestions[counter]["correctAnswer"]) {
						right++;
					} else {
						wrongGuess++;
					}
				}
			} else {
				continue;
			}

		}

		if (wrongGuess > 0) {
			wrong++;
		}

		// check if answer was submitted
		if (didAnswer === 1) {
			check.disabled = true; // disable when answer is chosen
			guessForm.classList.remove("cautionBorder");
			caution.style.visibility = "hidden";
			correct.textContent = right;
			missed.textContent = wrong;
			nextQuestion();
		} else {
			caution.style.visibility = "visible";
			guessForm.classList.add("cautionBorder");
		}

	}

	function nextQuestion() {

		counter++;

		check.disabled = false;

		for (var i = 0; i < 4; i++) {
			answerButtons[i].checked = false;
		}

		if (counter < easyQuestions.length) {
			radioGuess();
		} else {
			question.textContent = "Congratulations! You have reached the end of the quiz!";
			check.disabled = true;

			for (var i = 0; i < 4; i++) {
				label[i].textContent = ""
			}

			radioHidden();

			if (storageAvailable("localStorage")) {
				localStorage.setItem("score", right);
				if (diff == 1) {
					localStorage.setItem("diff", "Easy");
				} else if (diff == 2) {
					localStorage.setItem("diff", "Medium");
				} else {
					localStorage.setItem("diff", "Hard");
				}
			}
		}

	}

	function resetAll() {

		right = 0;
		wrong = 0;
		diff = 0;
		counter = 0;

		question.textContent = "";
		correct.textContent = right;
		missed.textContent = wrong;
		caution.style.visibility = "hidden";
		guessForm.classList.remove("cautionBorder");

		radioHidden();

		for (var i = 0; i < 4; i++) {
			answerButtons[i].checked = false;
			label[i].textContent = "";
		}

		for (var i = 0; i < 3; i++) {
			diffButtons[i].checked = false;
		}

		start.disabled = false;
		check.disabled = true;

	}

	// check if local storage is available
	function storageAvailable(type) {

		try {
			var storage = window[type];
			var x = "__storage_test__";
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		} catch (e) {
			return false;
		}

	}


})();
