import type { TextAnalysisResult } from "../Components/Types";

export default class AnalysisUtils {
	public static analyzeText(originalText: string): TextAnalysisResult {
		const text = originalText.replace("\n", " ");
		const getLetterFrequencies = (text: string) => {

			var result = {} as { [id: string] : number; };

			text.split("").map(c => {
				if (!!result && !!result[c] && result[c] > 0)
				{
					result[c]++;
				}
				else
				{
					result[c] = 1;
				}
			});
			return result;
		};
		return {
			text: originalText,
			numWords: text.split(" ").length,
			numCharacters: text.split("").length,
			numSentences: text.split(".").length,
			letterResults: getLetterFrequencies(text),
		} as TextAnalysisResult;

	}
}
