import { AppState } from './../../app';
import cls from "../../assets/styles/main.module.scss";
import cx from "classnames";

interface props extends Pick<AppState, "histories" | "currentIdx" | "isWin" | "player">{
	onHistory: (idx: number) => void;
}

export default function Histories({histories, onHistory, currentIdx, isWin, player}: props){
 return (
		<div className={cls.controller}>
				<h3>{isWin ? `Winner ${player}` : `Next player: ${player}`}</h3>
				{histories.map((item, idx) => (
     <button key={idx}
					className={cx(cls.btn)}
					onClick={() => onHistory(idx)}
					disabled={currentIdx === idx}>
					go to {idx ? ` move: #${idx}` : ` game start`}
				 {currentIdx === idx ? " (current)" : ""}
						</button>
				))}
			</div>
	)
}
