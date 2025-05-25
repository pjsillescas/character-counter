import { useCallback, useMemo, useState } from "react";
import "./App.css";

type LetterResult = {
	letter: string
	frequency: number
}

type TextAnalysisResult = {
	numWords: number
	numCharacters: number
	numSentences: number
	letterResults: { [id: string] : number }
};

function App() {
	const [text, setText] = useState<string>("");
	const [analysis, setAnalysis] = useState<TextAnalysisResult | undefined>(undefined);

	const analyzeText = useCallback((text: string) => {
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
			console.log(result);
			return result;
		};
		const analysisResult = {
			numWords: text.split(" ").length,
			numCharacters: text.split("").length,
			numSentences: text.split(".").length,
			letterResults: getLetterFrequencies(text),
		} as TextAnalysisResult;

		console.log(analysisResult);
		return analysisResult;
	}, []);

	const onTextAreaChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newText = event.target.value;
		setText(newText);
		setAnalysis(analyzeText(newText.replace("\n", " ")));
	}, []);

	return (
		<main>
			<h1>Analyze Your Text in Real-Time</h1>
			<form className="card">
				<textarea name="text" value={text} onChange={onTextAreaChange} rows={10} cols={80}></textarea>
			</form>
			{!!analysis && <AnalysisWidget analysis={analysis}/>}
		</main>
	)
}

type AnalysisWidgetProps = {
	analysis: TextAnalysisResult
}
function AnalysisWidget({ analysis }: AnalysisWidgetProps) {
	const numCharacters = Object.entries(analysis.letterResults).map(([_, num]) => num).reduce((c, v) => c + v, 0);
	return (<div>
		<p>{`${analysis.numCharacters} Total Characters`}</p>
		<p>{`${analysis.numWords} Words Count`}</p>
		<p>{`${analysis.numSentences} Sentence Count`}</p>

		{Object.entries(analysis.letterResults).map(([c, num]) => (<p>{`${c} ${num * 100 / numCharacters}%`}</p>))}
	</div>);
}

export default App
