import { select } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { line, curveBasis } from 'd3-shape'
import { max } from 'd3-array'

const points = Array.from(new Array(50)).map(() => random(0, 10))
const wrapper = select('#wrap')

const width = 500
const height = 250

function random (min = 0 , max = 100) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function draw (selection) {
  const x = scaleLinear()
    .range([0, width])

  const y = scaleLinear()
    .range([height, 0])

  const linePath = line()
    .x(p => x(p.x))
    .y(p => y(p.y))
    .curve(curveBasis)

  selection.each(function (data) {
    const container = select(this)

    x.domain([0, max(data, p => p.x)])
    y.domain([0, max(data, p => p.y)])

    const svg = container
      .selectAll('svg')
      .data([data])

    const gEnter = svg
      .enter()
      .append('svg')
      .append('g')

    svg
      .attr('width', width)
      .attr('height', height)

    gEnter
      .append('g')
      .attr('class', 'path layer')
      .append('path')
      .attr('class', 'line')

    const g = svg.select('g')

    g
      .select('path.line')
      .attr('d', linePath(data))
  })
}

function animate () {
  points.shift()
  points.push(random(0, 10))

  const coords = points.map((y, x) => ({x, y}))

  wrapper
    .datum(coords)
    .call(draw)

  setTimeout(() => requestAnimationFrame(animate), 100)
}

requestAnimationFrame(animate)
