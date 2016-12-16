//Script modified from http://tutorialzine.com/2014/07/5-practical-examples-for-learning-facebooks-react-framework/

var PomodoroTimer = React.createClass({

	getInitialState: function() {
		//called before the render function
		return { elapsed: 0, duration: 25, on: false };
	},
	start: function() {
		if (!this.state.on) {
			this.setState({ start: Date.now(), on: true });
			this.timer = setInterval(this.tick, 50);
		}
	},
	stop: function() {
		clearInterval(this.timer);
		this.setState({ on: false });
	},
	reset: function() {
		this.stop();
		this.setState({ elapsed: 0 });
	},
	setFive: function() {
		this.reset();
		this.setState({ duration: 5 });
	},
	setTen: function() {
		this.reset();
		this.setState({ duration: 10 });
	},
	playSound: function() {
		var sound = document.getElementById("sound");
    	sound.play();
	},
	setTwentyFive: function() {
		this.reset();
		this.setState({ duration: 25 });
	},
	tick: function() {
		//function that is called in the interval
		this.setState({ elapsed: new Date() - this.state.start });
	},
	render: function() {
		var elapsed = Math.round(this.state.elapsed / 100);

		var seconds = (this.state.duration * 60) - (elapsed / 10).toFixed(1);
		if (seconds <= 0) {
			this.stop();
			this.playSound();
		}
		var minutes = Math.floor(seconds / 60);
		var secs = Math.floor(seconds % 60);
		(secs < 10) ? secs = '0' + secs : secs;

		return (
			<div>
				<p className="timer">{minutes}:{secs}</p>
				<button className="start" onClick={this.start}>Start</button>
				<button className="stop" onClick={this.stop}>Stop</button>
				<button className="reset" onClick={this.reset}>Reset</button>
				
				<button className="five duration" onClick={this.setFive}>5 minutes</button>
				<button className="ten duration" onClick={this.setTen}>10 minutes</button>
				<button className="twentyfive duration" onClick={this.setTwentyFive}>25 minutes</button>
			</div>
		)
	}

});

ReactDOM.render(
	<PomodoroTimer />,
	document.getElementById('pomodoro')
);