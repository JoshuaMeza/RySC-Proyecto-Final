// Fields
const CONTAINER = $("#world-container");
const PREV_BTN = $("#previous > i");
const NEXT_BTN = $("#next > i");
const TITLE_CONTAINER = $("#title-container");
const JM = $("#img-jm");
const JG = $("#img-jg");
const RG = $("#img-rg");

// Helper
function hideAllWorldContainerContents() {
	TITLE_CONTAINER.addClass("d-none");
	JM.addClass("d-none");
	JG.addClass("d-none");
	RG.addClass("d-none");
}

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
		hideAllWorldContainerContents();
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
	CONTAINER.addClass("world-frame-01");
	
	TITLE_CONTAINER.removeClass("d-none");
	JM.removeClass("d-none");
	JG.removeClass("d-none");
	RG.removeClass("d-none");

	setTimeout(function () {
		TITLE_CONTAINER.removeClass("appear-title");
		JM.removeClass("appear-jm");
		JG.removeClass("appear-jg");
		RG.removeClass("appear-rg");
	}, 2000)
});
var state1 = new TransitionState(() => {
	CONTAINER.addClass("world-frame-02");
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
