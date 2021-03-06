'use strict'

const assert = require('assert')
const runify = require('../../app/lib/runify')

const target = () => ({
  distance: 21.1, // km
  time: 120 // min
})

const data = () => ({
  date: '2014-05-12T13:39:57Z',
  distance: 14.5, // km
  time: 91, // min
  route: ['Startpoint', 'Some point', 'End point'],
  struggle: 3,
  heartRate: 150 // 1/min
})

describe('#runify', () => {
  it('should convert the date field into a date object', () => {
    const result = runify(data(), target())
    const expect = new Date(Date.UTC(2014, 4, 12, 13, 39, 57))
    assert(result.date instanceof Date)
    assert.strictEqual(result.date.getTime(), expect.getTime())
  })

  it('should append target values', () => {
    const t = target()
    const result = runify(data(), t)
    assert.strictEqual(result.targetDistance, t.distance)
    assert.strictEqual(result.targetTime, t.time)
  })

  it('should calculate the pace', () => {
    const result = runify(data(), target())
    const expect = 9.56
    assert.strictEqual(result.pace.toFixed(2), expect.toFixed(2))
  })

  it('should calculate the estimated time for the target distance', () => {
    const result = runify(data(), target())
    const expect = 132.42
    assert.strictEqual(result.estimatedTime.toFixed(2), expect.toFixed(2))
  })

  it('should append the target pace', () => {
    const result = runify(data(), target())
    const expect = 10.55
    assert.strictEqual(result.targetPace.toFixed(2), expect.toFixed(2))
  })

  it('should calculate the intensity as percent value', () => {
    const result = runify(data(), target())
    const expect = 0.56
    assert.strictEqual(result.intensity.toFixed(2), expect.toFixed(2))
  })

  it('should take over all the other properties', () => {
    const result = runify(data(), target())
    assert.strictEqual(result.distance, 14.5)
    assert.strictEqual(result.time, 91)
    assert.deepEqual(result.route, ['Startpoint', 'Some point', 'End point'])
    assert.strictEqual(result.struggle, 3)
    assert.strictEqual(result.heartRate, 150)
  })
})
