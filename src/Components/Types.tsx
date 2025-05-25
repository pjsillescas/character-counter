export type TextAnalysisResult = {
	text: string
	numWords: number
	numCharacters: number
	numSentences: number
	letterResults: { [id: string] : number }
};
