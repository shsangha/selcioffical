HTMLMediaElement.prototype.play = jest.fn()

HTMLMediaElement.prototype.pause = jest.fn()

HTMLMediaElement.prototype.load = jest.fn()

let duration = 10
let currentTime = 0

Object.defineProperty(HTMLMediaElement.prototype, "duration", {
  get() {
    return duration
  },
  set(newDuration) {
    duration = newDuration
  },
})

Object.defineProperty(HTMLMediaElement.prototype, "currentTime", {
  get() {
    return currentTime
  },
  set(newTime) {
    currentTime = newTime

    // non-trusted events are syncronous so this wont break tests
    // worthwhile in being able to to test from user pov
    const fakeUpdateTime = new Event("timeupdate")
    this.dispatchEvent(fakeUpdateTime)
  },
})
