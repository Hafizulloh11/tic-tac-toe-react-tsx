import cls from "../../assets/styles/main.module.scss";
import cx from "classnames";
import { AppState } from "./../../app";

interface props extends Omit<AppState, "currentIdx" | "status" | "player"> {
	onCell: (idx: number) => void;
}

export default function RenderGame({onCell, positions, isWin}: props) {
	return (
		<div className={cls.board}>
			{positions.map((item, idx) => (
				<div
					key={idx}
					className={cx(cls.cell, isWin || item ? cls.disabled : "")}
					onClick={() => {onCell(idx)}}>
					{item}
				</div>
			))}
		</div>
	)
}
