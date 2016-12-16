"use strict";

//Script modified from http://tutorialzine.com/2014/07/5-practical-examples-for-learning-facebooks-react-framework/

var PomodoroTimer = React.createClass({
	displayName: "PomodoroTimer",


	getInitialState: function getInitialState() {
		//called before the render function
		return { elapsed: 0, duration: 25, on: false };
	},
	start: function start() {
		if (!this.state.on) {
			this.setState({ start: Date.now(), on: true });
			this.timer = setInterval(this.tick, 50);
		}
	},
	stop: function stop() {
		clearInterval(this.timer);
		this.setState({ on: false });
	},
	reset: function reset() {
		this.stop();
		this.setState({ elapsed: 0 });
	},
	setFive: function setFive() {
		this.reset();
		this.setState({ duration: 5 });
	},
	setTen: function setTen() {
		this.reset();
		this.setState({ duration: 10 });
	},
	playSound: function playSound() {
		var sound = document.getElementById("sound");
		sound.play();
	},
	setTwentyFive: function setTwentyFive() {
		this.reset();
		this.setState({ duration: 25 });
	},
	tick: function tick() {
		//function that is called in the interval
		this.setState({ elapsed: new Date() - this.state.start });
	},
	render: function render() {
		var elapsed = Math.round(this.state.elapsed / 100);

		var seconds = this.state.duration * 60 - (elapsed / 10).toFixed(1);
		if (seconds <= 0) {
			this.stop();
			this.playSound();
		}
		var minutes = Math.floor(seconds / 60);
		var secs = Math.floor(seconds % 60);
		secs < 10 ? secs = '0' + secs : secs;

		return React.createElement(
			"div",
			null,
			React.createElement(
				"p",
				{ className: "timer" },
				minutes,
				":",
				secs
			),
			React.createElement(
				"button",
				{ className: "start", onClick: this.start },
				"Start"
			),
			React.createElement(
				"button",
				{ className: "stop", onClick: this.stop },
				"Stop"
			),
			React.createElement(
				"button",
				{ className: "reset", onClick: this.reset },
				"Reset"
			),
			React.createElement(
				"button",
				{ className: "five duration", onClick: this.setFive },
				"5 minutes"
			),
			React.createElement(
				"button",
				{ className: "ten duration", onClick: this.setTen },
				"10 minutes"
			),
			React.createElement(
				"button",
				{ className: "twentyfive duration", onClick: this.setTwentyFive },
				"25 minutes"
			)
		);
	}

});

ReactDOM.render(React.createElement(PomodoroTimer, null), document.getElementById('pomodoro'));
