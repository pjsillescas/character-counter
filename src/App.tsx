import { useCallback, useState } from "react";
import "./App.css";
import type { TextAnalysisResult } from "./Components/Types";
import AnalysisWidget from "./Components/AnalysisWidget";
import AnalysisUtils from "./Utils/AnalysisUtils";

export default function App() {
	const [analysis, setAnalysis] = useState<TextAnalysisResult | undefined>(undefined);

	const onTextAreaChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newText = event.target.value;

		const text = newText.replace("\n", " ");
		var analysisResult = AnalysisUtils.analyzeText(text);
		setAnalysis(analysisResult);
	}, []);

	return (
		<main>
			<h1>Analyze Your Text in Real-Time</h1>
			<form className="card">
				<textarea name="text" value={analysis?.text ?? ""} onChange={onTextAreaChange} rows={10} cols={80}></textarea>
			</form>
			{!!analysis && <AnalysisWidget analysis={analysis}/>}
		</main>
	)
}
