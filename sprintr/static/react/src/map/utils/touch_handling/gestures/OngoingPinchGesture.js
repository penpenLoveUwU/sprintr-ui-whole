import { Gesture } from "./Gesture";
import { PinchStartTouchHandlerEvent } from "../events/PinchStartTouchHandlerEvent";
import { distance2d } from "../TouchHandlingUtils";
import { PinchMoveTouchHandlerEvent } from "../events/PinchMoveTouchHandlerEvent";
import { PinchEndTouchHandlerEvent } from "../events/PinchEndTouchHandlerEvent";
export class OngoingPinchGesture extends Gesture {
    constructor(event, event2) {
        super();
        this.pointerId = event.pointerId;
        this.initialPosition = {
            x: event.x,
            y: event.y
        };
        this.lastPosition = {
            x: event.x,
            y: event.y
        };
        this.pointer2Id = event2.pointerId;
        this.initial2Position = {
            x: event2.x,
            y: event2.y
        };
        this.last2Position = {
            x: event2.x,
            y: event2.y
        };
    }
    handleStartEvent(rawEvt, evts) {
        return new PinchStartTouchHandlerEvent((this.initialPosition.x + this.initial2Position.x) / 2, (this.initialPosition.y + this.initial2Position.y) / 2, distance2d(this.initialPosition.x, this.initialPosition.y, this.initial2Position.x, this.initial2Position.y), 1);
    }
    handleOngoingEvent(rawEvt, evts) {
        for (const evt of evts) {
            if (evt.pointerId === this.pointerId) {
                this.lastPosition.x = evt.x;
                this.lastPosition.y = evt.y;
            }
            else if (evt.pointerId === this.pointer2Id) {
                this.last2Position.x = evt.x;
                this.last2Position.y = evt.y;
            }
        }
        const distance = distance2d(this.lastPosition.x, this.lastPosition.y, this.last2Position.x, this.last2Position.y);
        const scale = distance / distance2d(this.initialPosition.x, this.initialPosition.y, this.initial2Position.x, this.initial2Position.y);
        return new PinchMoveTouchHandlerEvent((this.lastPosition.x + this.last2Position.x) / 2, (this.lastPosition.y + this.last2Position.y) / 2, distance, scale);
    }
    handleEndEvent(rawEvt, evts) {
        for (const evt of evts) {
            if (evt.pointerId === this.pointerId) {
                return new PinchEndTouchHandlerEvent(this.last2Position.x, this.last2Position.y, this.pointer2Id);
            }
            else if (evt.pointerId === this.pointer2Id) {
                return new PinchEndTouchHandlerEvent(this.lastPosition.x, this.lastPosition.y, this.pointerId);
            }
        }
        return false;
    }
}
