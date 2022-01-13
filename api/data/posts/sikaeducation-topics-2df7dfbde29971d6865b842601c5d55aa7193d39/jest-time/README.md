# Jest: Mocking Time

Some apps and code use time as a significant factor. For example:

* Calendars
* Event bookings
* Messages that are only displayed for a few seconds
* States that expire after a period of time
* Things the reoccur on a schedule

It's usually impractical to wait the seconds, minutes, days, or years needed for the code to work. In these situations, use Jest's fake timers. Fake timers override the system clock for the tests, and allows you to start, stop, and manipulate how the application sees time freely.

## Using Fake Timers

* Before testing code that uses time, call `jest.useFakeTimers()`
* To set the time, use `jest.setSystemTime(someDate)`
* To move time forward, use `jest.advanceTimersByTime(timeInMilliseconds)

For example, to verify that a bus pass purchased at noon on September 21st, 2005 expires at midnight, you could write the following test:

```js
test("Purchased bus passes expire at midnight", () => {
  jest.useFakeTimers()
  jest.setSystemTime(new Date("2005-09-21T12:00:00"))

  const ticket = new Ticket()
  expect(ticket.isValid()).toBeTruthy()

  jest.advanceTimersByTime(1000 * 60 * 60 * 12) // (1000 * 60 * 60 * 12) is 12 hours in milliseconds

  expect(ticket.isValid()).toBeFalsy()
})
```

## Watch Out!

* Every call to `jest.useFakeTimers()` resets the clock
* If you need to turn off fake timers, you can do so with `jest.useRealTimers()`

## Additional Resources

| Resource | Description |
| --- | --- |
| [Jest: Timer Mocks](https://jestjs.io/docs/timer-mocks) | Official guide to Jest's timers |
| [Jest: Timer Mocks API](https://jestjs.io/docs/jest-object#mock-timers) | Official API docs for Jest's timers |
