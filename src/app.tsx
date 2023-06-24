import React from "react";
import RenderGame from "./components/render-game/render-game";
import cls from "./assets/styles/main.module.scss";
import Histories from "./components/render-histories/histories";

export interface AppState {
	currentIdx: number;
	histories: AppState["positions"][];
	positions: string[];
	isWin: boolean;
	player: string;
}
export default class App extends React.Component<{}, AppState> {
	state: AppState = {
		currentIdx: 0,
		player: "X",
		histories: [["", "", "", "", "", "", "", "", ""]],
		positions: ["", "", "", "", "", "", "", "", ""],
		isWin: false,
	};
	playerX: number[] = [];
	playerO: number[] = [];
	winnerPositions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	handleCell = async (idx: number) => {
		let { histories, currentIdx, player } = this.state;
		let positions = [...this.state.positions];
		if (positions[idx]) return;
		positions[idx] = player;
		player = player === "X" ? "O" : "X";
		if (positions[idx] === "X") {
			await this.playerX.push(idx);
		} else {
			await this.playerO.push(idx);
		}

		await this.setState({
			positions,
			histories: [...histories.splice(0, currentIdx + 1), positions],
			currentIdx: currentIdx + 1,
			player,
		});
		this.checkWinner();
	};

	checkWinner = () => {
		/// handle Cell
		let playerX = this.playerX;
		let playerO = this.playerO;
		for (let [p1, p2, p3] of this.winnerPositions) {
			let winX = playerX.includes(p1) && playerX.includes(p2) && playerX.includes(p3);
			let winO = playerO.includes(p1) && playerO.includes(p2) && playerO.includes(p3);
			if (winX) {
				this.state.isWin = true;
				if (this.state.isWin) {
					this.setState({player: "X" });
				}
			} else if (winO) {
				this.state.isWin = true;
				if (this.state.isWin) {
					this.setState({player: "O" });
				}
			}
			// this.setState({player: this.state.isWin ? "X" : "O"})
		}
	};

	restartGame = async () => {
		await this.setState({ isWin: false, currentIdx: 0, player: "X",});
		this.playerO = [];
		this.playerX = [];
		let positions = [...this.state.positions];
		for (let i = 0; i < positions.length; i++) {
			positions[i] = "";
		}
		console.log(positions);
		await this.setState({ positions });
		await this.setState({ histories: [positions] });
	};

	handleHistory = (idx: number) => {
		let { histories } = this.state;
		let positions = [...histories[idx]];
		this.setState({ positions, currentIdx: idx, isWin: false});
	};

	render() {
		return (
			<div className={cls.app}>
				<div className="game-bar">
					<RenderGame
					isWin={this.state.isWin}
						positions={this.state.positions}
						histories={this.state.histories}
						onCell={this.handleCell}
					/>
					<button onClick={this.restartGame} className={cls.restartBtn}>
						restart
					</button>
				</div>
				<div className="histories">
					<Histories
					 player={this.state.player}
					 isWin={this.state.isWin}
						histories={this.state.histories}
						currentIdx={this.state.currentIdx}
						onHistory={this.handleHistory}
					/>
				</div>
			</div>
		);
	}
}
