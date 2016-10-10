'use strict'

import assert from 'assert'
import React from 'react'
import { shallow } from 'enzyme'
import Intensity from '../../app/components/intensity'

describe('<Intensity />', () => {
  it('should use the progress as width', () => {
    const wrapper = shallow(<Intensity percentValue={0.25} />)
    const element = wrapper.find('.progressbar__gauge')
    assert.strictEqual(element.length, 1)
    assert.strictEqual(element.get(0).props.style.width, '25%')
  })

  it('should stop at 0% for intensity < 0', () => {
    const wrapper = shallow(<Intensity percentValue={-1} />)
    const element = wrapper.find('.progressbar__gauge')
    assert.strictEqual(element.length, 1)
    assert.strictEqual(element.get(0).props.style.width, '0%')
  })

  it('should stop at 100% for intensity > 1', () => {
    const wrapper = shallow(<Intensity percentValue={3} />)
    const element = wrapper.find('.progressbar__gauge')
    assert.strictEqual(element.length, 1)
    assert.strictEqual(element.get(0).props.style.width, '100%')
  })
})
