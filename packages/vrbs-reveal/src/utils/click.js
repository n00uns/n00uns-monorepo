export default class Click {
    constructor(target,callback) {
        this.target = target;
        this.callback = callback;
        this.isHeld = false;
        this.activeHoldTimeoutId = null;

        ["mousedown", "pointerdown", "touchstart"].forEach(type => {
            this.target.addEventListener(type, this._onHoldStart.bind(this));
        });

        ["mouseup", "pointerup", "mouseleave", "mouseout", "touchend", "touchcancel"].forEach(type => {
            this.target.addEventListener(type, this._onHoldEnd.bind(this));
        });
    }

    _onHoldStart() {
        this.isHeld = true;

        this.activeHoldTimeoutId = setTimeout(() => {
            if(!this.isHeld) {
                this.callback();
            }
        }, 1000);
    }

    _onHoldEnd() {
        this.isHeld = false;
        // clearTimeout(this.activeHoldTimeoutId);
    }
}