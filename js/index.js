// Fields
const CONTAINER = $("#world-container");
const PREV_BTN = $("#previous > i");
const NEXT_BTN = $("#next > i");

// Classes
class TransitionManager {
	constructor(initialState) {
		this.state = initialState;
		this.state.executeAction();
	}

	previousState() {
		if (this.state.previous != null) {
			this.state = this.state.previous;
			this.state.executeAction();
		} else {
			alert("Previous step is undefined!");
		}
	}

	nextState() {
		if (this.state.next != null) {
			this.state = this.state.next;
			this.state.executeAction();
		} else {
			alert("Next step is undefined!");
		}
	}
}

class TransitionState {
	constructor(action) {
		this.action = action;
		this.previous = null;
		this.next = null;
	}

	executeAction() {
		this.defaultAction();
		this.action();
	}

    defaultAction() {
		CONTAINER.removeClass();
		if (this.previous == null) {
			PREV_BTN.addClass("d-none");
		} else {
			PREV_BTN.removeClass("d-none");
		}
		if (this.next == null) {
			NEXT_BTN.addClass("d-none");
		} else {
			NEXT_BTN.removeClass("d-none");
		}
	}
}

// States
var state0 = new TransitionState(() => {
	CONTAINER.addClass("world-frame-19");
});
var state1 = new TransitionState(() => {
	CONTAINER.addClass("world-frame-15");
});

// Assign states
state0.previous = state1;
state1.next = state0;

// Init manager
var manager = new TransitionManager(state0);

// Enable buttons
$(window).on("load", function () {
	PREV_BTN.click(function () {
		manager.previousState();
	});
	NEXT_BTN.click(function () {
		manager.nextState();
	});
});
