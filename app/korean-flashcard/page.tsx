import KoreanFlashcard from "@/components/korean-flashcard/korean-flashcard-game";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Korean Flashcard",
  description: "Learn Korean with flashcards",
};

export default function KoreanFlashcardPage() {
	return (
		<KoreanFlashcard />
	)
}