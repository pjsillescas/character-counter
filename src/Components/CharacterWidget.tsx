type Props = {
	character: string
	frequency: number
}

export default function CharacterWidget({ character, frequency}: Props) {
	return (<p>{`${character} ${frequency.toFixed(2)}%`}</p>);
}