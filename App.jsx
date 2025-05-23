import { useState } from "react";
import { languages } from "./languages";

import { clsx } from "clsx";

/**
 * Goal: Build out the main parts of our app
 *
 * Challenge:
 * Conditionally render either the "won" or "lost" statuses
 * from the design, both the text and the styles, based on the
 * new derived variables.
 *
 * Note: We always want the surrounding `section` to be rendered,
 * so only change the content inside that section. Otherwise the
 * content on the page would jump around a bit too much.
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

	const gameStatusClass = clsx("game-status", {
		won: isGameWon,
		lost: isGameLost,
	});

	return (
		<main>
			<header>
				<h1>Assembly: Endgame</h1>
				<p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
			</header>

			<section
				className={gameStatusClass}
				style={{
					visibility: isGameOver ? "" : "hidden",
				}}
			>
				<h2>{isGameWon ? "You Win!" : "You Lost!"}</h2>
				<p>{isGameWon ? "Well done!🎉" : "You lose! Better start learning Assembly 😭"}</p>
			</section>

			<section className="language-chips">{languageElements}</section>

			<section className="word">{letterElements}</section>

			<section className="keyboard">{keyboardElements}</section>
			{isGameOver && <button className="new-game">New Game</button>}
		</main>
	);
}
