import React from 'react'
import * as d3 from 'd3'

class Circles extends React.Component {
  shouldComponentUpdate () { return false }
  componentDidMount () {
    let svg = d3.select('svg')
    let width = +svg.attr('width')
    let height = +svg.attr('height')
    let format = d3.format(',d')

    let color = d3.scaleSequential(d3.interpolateMagma)
        .domain([-4, 4])

    let stratify = d3.stratify()
        .parentId((d) => { return d.id.substring(0, d.id.lastIndexOf('.')) })

    let pack = d3.pack()
    .size([width - 2, height - 2])
    .padding(3)

    let data = [{id: 'consensys', value: 10}, {id: 'consensys.uport', value: 10}, {id: 'consensys.uport.RouvenHeck', value: 2}, {id: 'consensys.uport.AshokaFinley', value: 2}, {id: 'consensys.OrgDev', value: 10}]

    var root = stratify(data)
        .sum((d) => { return d.value })
        .sort((a, b) => { return b.value - a.value })

    pack(root)

    var node = svg.select('g')
      .selectAll('g')
      .data(root.descendants())
      .enter().append('g')
      .attr('transform', (d) => { return 'translate(' + d.x + ',' + d.y + ')' })
      .attr('class', (d) => { return 'node' + (!d.children ? ' node--leaf' : d.depth ? '' : ' node--root') })
      .each((d) => { d.node = this })
      // .on('mouseover', hovered(true))
      // .on('mouseout', hovered(false))

    node.append('circle')
        .attr('id', (d) => { return 'node-' + d.id })
        .attr('r', (d) => { return d.r })
        .style('fill', (d) => { return color(d.depth) })

    var leaf = node.filter((d) => { return !d.children })

    leaf.append('clipPath')
        .attr('id', (d) => { return 'clip-' + d.id })
      .append('use')
        .attr('xlink:href', (d) => { return '#node-' + d.id + '' })

    leaf.append('text')
        .attr('clip-path', (d) => { return 'url(#clip-' + d.id + ')' })
      .selectAll('tspan')
      .data((d) => { return d.id.substring(d.id.lastIndexOf('.') + 1).split(/(?=[A-Z][^A-Z])/g) })
      .enter().append('tspan')
        .attr('x', 0)
        .attr('y', (d, i, nodes) => { return 13 + (i - nodes.length / 2 - 0.5) * 10 })
        .text((d) => { return d })

    node.append('title')
        .text((d) => { return d.id + '\n' + format(d.value) })
  }
  render () {
    return <svg width='960' height='960'>
      <g transform='translate(1,1)' />
    </svg>
  }
}

export default Circles

const flare = ``
