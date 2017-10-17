import * as d3 from 'd3'
let svg
let margin
// defined the diameter and margin from the svg attributes
let diameter
let height
let g
// scaleLinear creates a continues scale with maping of the domain to the range
// it creates a line with with formula y=mx+b
var color

export const d3Draw = (data) => {
  svg = d3.select('svg')
  margin = 20
  // defined the diameter and margin from the svg attributes
  diameter = +svg.attr('width')
  height = +svg.attr('height')
  g = svg.append('g').attr('transform', 'translate(' + diameter / 2 + ',' + diameter / 2 + ')')
  // scaleLinear creates a continues scale with maping of the domain to the range
  // it creates a line with with formula y=mx+b
  color = d3.scaleLinear()
    // these are the the scale for the domain so there there are 7
    .domain([-1, 5])
    // these are the mapping for the domain
    .range(['hsl(152,80%,80%)', 'hsl(228,30%,40%)'])
    // creates an interpolate between the 2 range values
    .interpolate(d3.interpolateHcl)
// define the svg as the svg object, the margin, diameter as the svg.attr for width,
// and height as the svg attribute to corresponding groups.
  // define svg as the svg Object

    // append a g element which is used to group other svg elements
    // attr('transform', 'translate
    // transform modifies the center of the diagram
    // translate repositions an element in the horizontal and/or vertical directions
    // this line puts the group in the middle of the svg
// The resulting when given a number will produce an output color based on the domain range and interpolation

var pack = d3.pack()
    .size([diameter - margin, diameter - margin])
    .padding(2)

  let root = d3.hierarchy(data)
      .sum(function (d) { return d.size })
      .sort(function (a, b) { return b.value - a.value })

  var focus = root,
      nodes = pack(root).descendants(),
      view;

  var circle = g.selectAll('circle')
    .data(nodes)
    .enter().append('circle')
      .attr('class', function (d) { return d.parent ? d.children ? 'node' : 'node node--leaf' : 'node node--root' })
      .style('fill', function (d) { return d.children ? color(d.depth) : null })
      .on('click', function (d) { if (focus !== d) zoom(d), d3.event.stopPropagation() })
      // var text = g.selectAll('text')
      //     .data(nodes)
      //   .enter().append('text')
      //     .attr('class', function (d) { return d.children ? 'parent' : 'child' })
      //     .attr('x', function (d) { return d.x })
      //     .attr('y', function (d) { return d.y })
      //     .attr('dy', '.35em')
      //     .attr('text-anchor', 'middle')
      //     .style('opacity', function (d) { return d.r > 20 ? 1 : 0 })
      //     .text(function (d) { return d.name })
  var text = g.selectAll('text')
    .data(nodes)
    .enter().append('text')
      .attr('class', 'label')
      .style('fill-opacity', function (d) { return d.parent === root ? 1 : 0 })
      .style('display', function (d) { return d.parent === root ? 'inline' : 'none' })
      .text(function (d) { return d.data.name })

  var node = g.selectAll('circle,text')

  svg
      .style('background', color(-1))
      .on('click', function () { zoom(root) })

  zoomTo([root.x, root.y, root.r * 2 + margin])

  function zoom (d) {
    var focus0 = focus; focus = d

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween('zoom', function (d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin])
          return function (t) { zoomTo(i(t)) }
        })

    transition.selectAll('text')
      .filter(function (d) { return d.parent === focus || this.style.display === 'inline' })
        .style('fill-opacity', function (d) { return d.parent === focus ? 1 : 0 })
        .on('start', function (d) { if (d.parent === focus) this.style.display = 'inline' })
        .on('end', function (d) { if (d.parent !== focus) this.style.display = 'none' })
  }

  function zoomTo (v) {
    var k = diameter / v[2]; view = v
    node.attr('transform', function (d) { return 'translate(' + (d.x - v[0]) * k + ',' + (d.y - v[1]) * k + ')' })
    circle.attr('r', function (d) { return d.r * k })
  }
}

export const d3Update = (data) => {
  var pack = d3.pack()
      // sets the size of the layout
      .size([diameter - margin, diameter - margin])
      // set the
      .padding(2)
  //
  let root = d3.hierarchy(data)
      // this goes is post order traversal which means to descendants first in order to set the value of the node
      .sum(function(d) { return d.size })
      // this sorts the bigger nodes to come before the smaller nodes
      .sort(function(a, b) { return b.value - a.value; })
  var focus = root,
      nodes = pack(root).descendants(),
      view;
  var circle = g.selectAll('circle')
    // joins the specified with the selected elements
    .data(nodes)
    // enter returns the placeholder nodes for the data and it appends circles
    circle.enter().append('circle')
    circle.exit().remove()
    circle.attr('class', function(d) { return d.parent ? d.children ? 'node' : 'node node--leaf' : 'node node--root'; })
      .style('fill', function(d) { return d.children ? color(d.depth) : null; })
      .on('click', function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); })
  var text = g.selectAll('text')
    .data(nodes)
    text.enter().append('text')
    text.exit().remove()
    text.attr('class', 'label')
      .style('fill-opacity', function(d) { return d.parent === root ? 1 : 0; })
      .style('display', function(d) { return d.parent === root ? 'inline' : 'none'; })
      .text(function(d) { return d.data.name; })
      var node = g.selectAll('circle,text')

  //
  svg
      .style('background', color(-1))
      .on('click', function() { zoom(root) })
  //
  zoomTo([root.x, root.y, root.r * 2 + margin])
  function zoom(d) {
    var focus0 = focus; focus = d

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween('zoom', function (d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin])
          return function(t) { zoomTo(i(t)) }
        })

    transition.selectAll('text')
      .filter(function (d) { return d.parent === focus || this.style.display === 'inline' })
        .style('fill-opacity', function (d) { return d.parent === focus ? 1 : 0 })
        .on('start', function (d) { if (d.parent === focus) this.style.display = 'inline' })
        .on('end', function (d) { if (d.parent !== focus) this.style.display = 'none' })
  }
  //
  function zoomTo (v) {
    var k = diameter / v[2]; view = v
    node.attr('transform', function (d) { return 'translate(' + (d.x - v[0]) * k + ',' + (d.y - v[1]) * k + ')' })
    circle.attr('r', function (d) { return d.r * k })
  }
}

// export const d3Draw = (data) => {
//   var w = 700,
//     h = 700,
//     r = 620,
//     x = d3.scaleLinear().range([0, r]),
//     y = d3.scaleLinear().range([0, r]),
//     node,
//     root;
//     console.log(d3.pack())
//   var pack = d3.pack()
//       .size([r, r])
//       // .value(function (d) { return d.size })
//
//   var vis = d3.select('body').insert('svg:svg', 'h2')
//       .attr('width', w)
//       .attr('height', h)
//     .append('svg:g')
//       .attr('transform', 'translate(' + (w - r) / 2 + ',' + (h - r) / 2 + ')')
//   node = root = data
//
//   var nodes = pack(root).descendants()
//
//   vis.selectAll('circle')
//       .data(nodes)
//     .enter().append('svg:circle')
//       .attr('class', function (d) { return d.children ? 'parent' : 'child' })
//       .attr('cx', function (d) { return d.x })
//       .attr('cy', function (d) { return d.y })
//       .attr('r', function (d) { return d.r })
//       .on('click', function (d) { return zoom(node === d ? root : d) })
//
  // vis.selectAll('text')
  //     .data(nodes)
  //   .enter().append('svg:text')
  //     .attr('class', function (d) { return d.children ? 'parent' : 'child' })
  //     .attr('x', function (d) { return d.x })
  //     .attr('y', function (d) { return d.y })
  //     .attr('dy', '.35em')
  //     .attr('text-anchor', 'middle')
  //     .style('opacity', function (d) { return d.r > 20 ? 1 : 0 })
  //     .text(function (d) { return d.name })

//   d3.select(window).on('click', function () { zoom(root) })
//
//   function zoom (d, i) {
//     var k = r / d.r / 2
//     x.domain([d.x - d.r, d.x + d.r])
//     y.domain([d.y - d.r, d.y + d.r])
//
//     var t = vis.transition()
//         .duration(d3.event.altKey ? 7500 : 750)
//
//     t.selectAll('circle')
//         .attr('cx', function (d) { return x(d.x) })
//         .attr('cy', function (d) { return y(d.y) })
//         .attr('r', function (d) { return k * d.r })
//
//     t.selectAll('text')
//         .attr('x', function (d) { return x(d.x) })
//         .attr('y', function (d) { return y(d.y) })
//         .style('opacity', function (d) { return k * d.r > 20 ? 1 : 0 })
//     node = d
//     d3.event.stopPropagation()
//   }
// }
