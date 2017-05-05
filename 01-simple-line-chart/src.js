import { select } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { axisLeft, axisBottom } from 'd3-axis'
import { line } from 'd3-shape'
import { max } from 'd3-array'

function random(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function coords(size = 100) {
  const points = new Array(size)

  for(let i = 0; i < points.length; ++i) {
    points[i] = {
      x: i,
      y: random(0, 10)
    }
  }

  return points
}

const points = coords(30)

const margin = {
  left: 20,
  right: 30,
  top: 20,
  bottom: 30
}

const width = 500
const height = 250

const container = select('#wrap')

const x = scaleLinear()
  .range([0, width - margin.left - margin.right])

const y = scaleLinear()
  .range([height - margin.top - margin.bottom, 0])

const xAxis = axisBottom(x)
const yAxis = axisLeft(y)

const linePath = line()
  .x(p => x(p.x))
  .y(p => y(p.y))

x.domain([0, max(points, p => p.x)])
y.domain([0, max(points, p => p.y)])

const g = container
  .append("svg")
    .attr("width", width)
    .attr('height', height)
  .append("g")
    .attr('transform', `translate(${margin.left},${margin.right})`)

g
  .append('g')
    .attr("class", "x axis")
    .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
  .call(xAxis)

g
  .append('g')
    .attr("class", "y axis")
  .call(yAxis)

g
  .selectAll('g.data')
  .data([points])
  .enter()
    .append('g')
      .attr('class', 'data')
    .append('path')
      .attr("class", "line")
      .attr('d', p => linePath(p))
