import type { TextAnalysisResult } from "./Types";

type AnalysisWidgetProps = {
	analysis: TextAnalysisResult
}

export default function AnalysisWidget({ analysis }: AnalysisWidgetProps) {
	const numCharacters = Object.entries(analysis.letterResults).map(([_, num]) => num).reduce((c, v) => c + v, 0);
	return (<div>
		<p>{`${analysis.numCharacters} Total Characters`}</p>
		<p>{`${analysis.numWords} Words Count`}</p>
		<p>{`${analysis.numSentences} Sentence Count`}</p>

		{Object.entries(analysis.letterResults).map(([c, num]) => (<p>{`${c} ${(num * 100 / numCharacters).toFixed(2)}%`}</p>))}
	</div>);
}