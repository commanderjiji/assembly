import { useState } from "react";
import { languages } from "./languages";

import { clsx } from "clsx";

/**
 * Goal: Build out the main parts of our app
 *
 * Challenge: Update the keyboard when a letter is right
 * or wrong.
 *
 * Bonus: use the `clsx` package to easily add conditional
 * classNames to the keys of the keyboard. Check the docs
 * to learn how to use it 📖
 */

export default function AssemblyEndgame() {
	const [currentWord, setCurrentWord] = useState("react");

	const [guessLetter, setGuessLetter] = useState([]);
	console.log(guessLetter);

	const alphabet = "abcdefghijklmnopqrstuvwxyz";

	function handleGuessLetter(letter) {
		setGuessLetter((prevLetter) => (prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter]));
	}
	const languageElements = languages.map((lang) => {
		const styles = {
			backgroundColor: lang.backgroundColor,
			color: lang.color,
		};

		return (
			<span className="chip" key={lang.name} style={styles}>
				{lang.name}
			</span>
		);
	});

	const letterElements = currentWord.split("").map((word, index) => {
		return <span key={index}>{word.toUpperCase()}</span>;
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
			<button key={letter} className={className} onClick={() => handleGuessLetter(letter)}>
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
			<button className="new-game">New Game</button>
		</main>
	);
}
