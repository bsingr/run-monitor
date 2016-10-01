'use strict'

const timeString = (minutes) => {
  const h = Math.floor(minutes / 60)
  const mm = ('0' + Math.round(minutes % 60)).substr(-2)
  return h + ':' + mm
}

module.exports = (domNode, actualTime, extrapolatedTime, targetTime) => {
  // Setup Container
  const container = document.createElement('div')
  container.setAttribute('class', 'widget time')
  container.setAttribute('title', 'Time')
  domNode.appendChild(container)

  // Render Text
  const value = document.createElement('div')
  value.setAttribute('class', 'value time-value')
  value.innerText = timeString(actualTime)
  container.appendChild(value)

  const reference = document.createElement('div')
  reference.setAttribute('class', 'reference time-reference')
  reference.innerText = timeString(targetTime)
  container.appendChild(reference)

  const extrapolated = document.createElement('div')
  extrapolated.setAttribute('class', 'reference time-extrapolated')
  extrapolated.innerText = timeString(extrapolatedTime)
  container.appendChild(extrapolated)

  // Render SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', '100%')
  svg.setAttribute('height', '75%')
  container.appendChild(svg)

  const scale = new Plottable.Scales.Linear()
  const colorScale = new Plottable.Scales.Color()
  colorScale.range(['#3498db', '#ccc'])
  const data = [
    Math.floor(actualTime * 10),
    Math.floor((targetTime - actualTime) * 10)
  ]

  const plot = new Plottable.Plots.Pie()
    .addDataset(new Plottable.Dataset(data))
    .sectorValue((value) => value, scale)
    .attr('fill', (value) => value, colorScale)
    .renderTo(svg)

  window.addEventListener('resize', () => {
    plot.redraw()
  })
}
