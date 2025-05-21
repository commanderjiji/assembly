import { useState } from "react";
import { languages } from "./languages";

import { clsx } from "clsx";

/**
 * Goal: Build out the main parts of our app
 *
 * Challenge:
 * 1. Create a variable `isGameOver` which evaluates to `true`
 *    if the user has guessed incorrectly 8 times. Consider how
 *    we might make this more dynamic if we were ever to add or
 *    remove languages from the languages array.
 * 2. Conditionally render the New Game button only if the game
 *    is over.
 */

export default function AssemblyEndgame() {
	// State values
	const [currentWord, setCurrentWord] = useState("react");
	const [guessLetter, setGuessLetter] = useState([]);

	// Derive values
	const wrongGuessCount = guessLetter.filter((letter) => !currentWord.includes(letter)).length;
	const isGameWon = currentWord.split("").every((letter) => guessLetter.includes(letter));
	const isGameLost = wrongGuessCount >= languages.length;
	const isGameOver = isGameWon || isGameLost;

	// Static values
	const alphabet = "abcdefghijklmnopqrstuvwxyz";

	function addGuessLetter(letter) {
		setGuessLetter((prevLetter) => (prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter]));
	}

	const languageElements = languages.map((lang, i) => {
		const isLanguageLost = i < wrongGuessCount;
		const className = clsx("chip", isLanguageLost && "lost");

		const styles = {
			backgroundColor: lang.backgroundColor,
			color: lang.color,
		};

		return (
			<span className={className} key={lang.name} style={styles}>
				{lang.name}
			</span>
		);
	});

	const letterElements = currentWord.split("").map((letter, index) => {
		return <span key={index}>{guessLetter.includes(letter) ? letter.toUpperCase() : ""}</span>;
	});

	const keyboardElements = alphabet.split("").map((letter) => {
		const isGuessed = guessLetter.includes(letter);
		const isCorrect = isGuessed && currentWord.includes(letter);
		const isWrong = isGuessed && !currentWord.includes(letter);
		const className = clsx({
			correct: isCorrect,
			wrong: isWrong,
		});

		return (
			<button key={letter} className={className} onClick={() => addGuessLetter(letter)}>
				{letter.toUpperCase()}
			</button>
		);
	});

	return (
		<main>
			<header>
				<h1>Assembly: Endgame</h1>
				<p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
			</header>

			<section className="game-status">
				<h2>You Win!</h2>
				<p>Well done!🎉</p>
			</section>

			<section className="language-chips">{languageElements}</section>

			<section className="word">{letterElements}</section>

			<section className="keyboard">{keyboardElements}</section>
			{isGameOver && <button className="new-game">New Game</button>}
		</main>
	);
}
