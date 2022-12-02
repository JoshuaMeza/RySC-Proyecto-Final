// Fields
const LEFT = 0;
const RIGHT = 1;
const SLEEP_TIME = 80;
const CONTAINER = $("#world-container");
const PREV_BTN = $("#previous > i");
const NEXT_BTN = $("#next > i");
const TITLE_CONTAINER = $("#title-container");
const JM = $("#img-jm");
const JG = $("#img-jg");
const RG = $("#img-rg");

// Helpers
function resetWorldContainerContents() {
	TITLE_CONTAINER.addClass("d-none");
	JM.addClass("d-none");
	JG.addClass("d-none");
	RG.addClass("d-none");
	JM.addClass("appear-jm");
	JG.addClass("appear-jg");
	RG.addClass("appear-rg");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getFrameClass(id) {
	var s = "00" + id;
	return "world-frame-" + s.substring(s.length - 2);
}

// Classes
class TransitionManager {
	constructor(initialState) {
		this.state = initialState;
	}

	previousState() {
		if (this.state.previous != null) {
			this.state.executeProcess(LEFT);
			this.state = this.state.previous;
		} else {
			alert("Previous step is undefined!");
		}
	}

	nextState() {
		if (this.state.next != null) {
			this.state.executeProcess(RIGHT);
			this.state = this.state.next;
		} else {
			alert("Next step is undefined!");
		}
	}
}

class TransitionState {
	constructor(action, leftAnimation, rightAnimation) {
		this.action = action;
		this.leftAnimation = leftAnimation;
		this.rightAnimation = rightAnimation;
		this.previous = null;
		this.next = null;
	}

	executeProcess(direction) {
		resetWorldContainerContents();
		if (direction == LEFT) {
			this.leftAnimation(this.previous);
		} else if (direction == RIGHT) {
			this.rightAnimation(this.next);
		}
	}

	executeAction() {
		this.defaultAction();
		this.action();
	}

    defaultAction() {
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
	// FRAME 1
	TITLE_CONTAINER.removeClass("d-none");
	JM.removeClass("d-none");
	JG.removeClass("d-none");
	RG.removeClass("d-none");

	setTimeout(() => {JM.removeClass("appear-jm")}, 1700);
	setTimeout(() => {JG.removeClass("appear-jg")}, 1600);
	setTimeout(() => {RG.removeClass("appear-rg")}, 1800);
}, async (state) => {
}, async (state) => {
	for (let i = 2; i <= 4; i++) {
		await sleep(SLEEP_TIME);
		CONTAINER.removeClass();
		CONTAINER.addClass(getFrameClass(i));
	}

	state.executeAction();
});

var state1 = new TransitionState(() => {
	// FRAME 4
	console.log("action STATE 1");
}, async (state) => {
	for (let i = 3; i >= 1; i--) {
		await sleep(SLEEP_TIME);
		CONTAINER.removeClass();
		CONTAINER.addClass(getFrameClass(i));
	}

	state.executeAction();
}, async (state) => {
	for (let i = 5; i <= 12; i++) {
		await sleep(SLEEP_TIME);
		CONTAINER.removeClass();
		CONTAINER.addClass(getFrameClass(i));
	}

	state.executeAction();
});

var state2 = new TransitionState(() => {
	// FRAME 12
	console.log("action STATE 2");
}, async (state) => {
	for (let i = 11; i >= 4; i--) {
		await sleep(SLEEP_TIME);
		CONTAINER.removeClass();
		CONTAINER.addClass(getFrameClass(i));
	}

	state.executeAction();
}, async (state) => {
	for (let i = 13; i <= 17; i++) {
		await sleep(SLEEP_TIME);
		CONTAINER.removeClass();
		CONTAINER.addClass(getFrameClass(i));
	}
	
	state.executeAction();
});

var state3 = new TransitionState(() => {
	// FRAME 17
	console.log("action STATE 3");
}, async (state) => {
	for (let i = 16; i >= 12; i--) {
		await sleep(SLEEP_TIME);
		CONTAINER.removeClass();
		CONTAINER.addClass(getFrameClass(i));
	}
	
	state.executeAction();
}, async (state) => {
});

// Assign states
state0.next = state1;
state1.previous = state0;
state1.next = state2;
state2.previous = state1;
state2.next = state3;
state3.previous = state2;

// Init
var manager = new TransitionManager(state0);
CONTAINER.addClass("world-frame-01");

$(window).on("load", function () {
	state0.executeAction();
	
	PREV_BTN.click(function () {
		manager.previousState();
	});
	NEXT_BTN.click(function () {
		manager.nextState();
	});
});
