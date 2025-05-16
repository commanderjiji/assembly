import { useState } from "react";
import { languages } from "./languages";

/**
 * Goal: Build out the main parts of our app
 *
 * Challenge: Create a new array in state to hold user's
 * guessed letters. When the user chooses a letter, add
 * that letter to this state array.
 *
 * Don't worry about whether it was a right or wrong
 * guess yet.
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

	const keyboardElements = alphabet.split("").map((letter) => (
		<button key={letter} onClick={() => handleGuessLetter(letter)}>
			{letter.toUpperCase()}
		</button>
	));

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
