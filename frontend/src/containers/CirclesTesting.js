import React from 'react'
import Header from '../components/shared/Header'
import * as d3 from 'd3'
import { fetchProfiles } from '../actions/profileActions'
import { connect } from 'react-redux'
import * as _ from 'lodash'

class Circles extends React.Component {
  constructor () {
    super()
    this.state = {
      data: {name: 'consensys',
        children: [

        ]
      }
    }
  }
  // shouldComponentUpdate () { return false }
  // componentDidMount () {
  //   this.props.fetchProfiles()
  // }
  // componentWillReceiveProps (props) {
    // // this.props.fetchProfiles()
    // if (_.isEqual(this.props.profiles.sort(), props.profiles.sort())) {
    //   null
    // } else {
    //   let data = {name: 'consensys',
    //     children: []
    //   }
    //   props.profiles.map((v, i) => {
    //     if (typeof v.roles !== 'undefined') {
    //       v.roles.forEach((role) => {
    //         let index = _.findIndex(data.children, (v) => v.name === role)
    //         index > 0
    //         ? data.children[index].children.push({'name': v.name, 'size': 10})
    //         : data.children.push({'name': role, children: [{'name': v.name, 'size': 10}]})
    //         // data.push({id: `consensys.${role.replace(/\s/g, '')}`, value: 10})
    //         // data.push({id: `consensys.${role.replace(/\s/g, '')}.${}`, value: 10})
    //       })
    //     }
    //     if (typeof v.projects !== 'undefined') {
    //       v.projects.forEach((proj) => {
    //         let index = _.findIndex(data.children, (v) => v.name === proj)
    //         index > 0
    //         ? data.children[index].children.push({'name': v.name, 'size': 10})
    //         : data.children.push({'name': proj, children: [{'name': v.name, 'size': 10}]})
    //         // data.push({id: `consensys.${proj.replace(/\s/g, '')}`, value: 10})
    //         // data.push({id: `consensys.${proj.replace(/\s/g, '')}.${v.name.replace(/\s/g, '')}`, value: 10})
    //       })
    //     }
    //     if (typeof v.teams !== 'undefined') {
    //       v.teams.forEach((team) => {
    //         let index = _.findIndex(data.children, (v) => v.name === team)
    //         index > 0
    //         ? (
    //           data.children[index].children.push({'name': v.name, 'size': 10})
    //         )
    //         : data.children.push({'name': team, children: [{'name': v.name, 'size': 10}]})
    //       })
    //     }
    //   })
    //   d3Draw(data)
    //   this.setState({data})
    // }
  // }

  render () {
    var color = d3.scaleLinear()
        // these are the the scale for the domain so there there are 7
        .domain([-1, 50])
        // these are the mapping for the domain
        .range(['hsl(152,80%,80%)', 'hsl(228,30%,40%)'])
        // creates an interpolate between the 2 range values
        .interpolate(d3.interpolateHcl)
    function range1 (i) { var x = []; var j = 1; while (x.push(j++) < i) {};return x }
    const array = range1(100)
    const divs = array.map((v) => {
      return <div style={{minWidth: 100, minHeight: 100, backgroundColor: color(v)}} />
    })
    const data = {
      "name": "Eve",
      "children": [
       {
         "name": "Cain"
       },
       {
         "name": "Seth",
         "children": [
           {
             "name": "Enos"
           },
           {
             "name": "Noam"
           }
         ]
       },
       {
         "name": "Abel"
       },
       {
         "name": "Awan",
         "children": [
           {
             "name": "Enoch"
           }
         ]
       },
       {
         "name": "Azura"
       }
     ]
    }
    const data2 = {
      "name": "Ashoka",
      "children": [
       {
         "name": "Sarah"
       },
       {
         "name": "Seth",
         "children": [
           {
             "name": "Enos"
           },
           {
             "name": "Noam"
           }
         ]
       },
       {
         "name": "Abel"
       },
       {
         "name": "Awan",
         "children": [
           {
             "name": "Enoch"
           }
         ]
       },
       {
         "name": "Azura"
       }
     ]
    }
    let root = d3.hierarchy(data).sum(function(d) { return d.size; }).sort(function(a, b) { return b.value - a.value; });
    let root2 = d3.hierarchy(data2).sum(function(d) { return d.size; }).sort(function(a, b) { return b.value - a.value; });
    console.log(root)
    let svg = d3.select('svg')
    let margin = 20
    // defined the diameter and margin from the svg attributes
    let diameter = 700
    let height = 700
    var pack = d3.pack()
        // sets the size of the layout
        .size([diameter - margin - 40, diameter - margin - 40])
        // set the
        .padding(2);
    console.log(pack(root))
    console.log(pack(root2))

    return (
      // <div>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20}}>

        {divs}
        {/* <Header />
        <div style={{width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
          <svg width={700} height={700} style={{display: 'flex', alignSelf: 'center'}} />
        </div> */}
      </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profiles.profiles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProfiles: () => dispatch(fetchProfiles())
    // selectProfile: (profile) => dispatch(selectProfile(profile)),
    // navigateToProfile: (address) => dispatch(push(`/profiles/${address}`))
  }
}

const d3Draw = (data) => {
// define the svg as the svg object, the margin, diameter as the svg.attr for width,
// and height as the svg attribute to corresponding groups.
  // define svg as the svg Object
  let svg = d3.select('svg')
  let margin = 20
  // defined the diameter and margin from the svg attributes
  let diameter = +svg.attr('width')
  let height = +svg.attr('height')
    // append a g element which is used to group other svg elements
    // attr('transform', 'translate
    // transform modifies the center of the diagram
    // translate repositions an element in the horizontal and/or vertical directions
    // this line puts the group in the middle of the svg
  let g = svg.append('g').attr('transform', 'translate(' + diameter / 2 + ',' + diameter / 2 + ')')

// scaleLinear creates a continues scale with maping of the domain to the range
// it creates a line with with formula y=mx+b
var color = d3.scaleLinear()
    // these are the the scale for the domain so there there are 7
    .domain([-1, 5])
    // these are the mapping for the domain
    .range(['hsl(152,80%,80%)', 'hsl(228,30%,40%)'])
    // creates an interpolate between the 2 range values
    .interpolate(d3.interpolateHcl);
// The resulting when given a number will produce an output color based on the domain range and interpolation

// create a new pack layout with default settings
var pack = d3.pack()
    // sets the size of the layout
    .size([diameter - margin - 40, diameter - margin - 40])
    // set the
    .padding(2);

    // creates a hierarchy from a data set given to it
  let root = d3.hierarchy(data)
      // this goes is post order traversal which means to descendants first in order to set the value of the node
      .sum(function(d) { return d.size; })
      // this sorts the bigger nodes to come before the smaller nodes
      .sort(function(a, b) { return b.value - a.value; });


 // set the focus to be the root hierarchy
  var focus = root,
      /*
      Lays out the specified root hierarchy, assigning the following properties on root and its descendants:

      node.x - the x-coordinate of the circle’s center
      node.y - the y-coordinate of the circle’s center
      node.r - the radius of the circle
      */
      nodes = pack(root).descendants(),
      view;

  var circle = g.selectAll('circle')
    // joins the specified with the selected elements
    .data(nodes)
    // enter returns the placeholder nodes for the data and it appends circles
    .enter().append('circle')
      .attr('class', function(d) { return d.parent ? d.children ? 'node' : 'node node--leaf' : 'node node--root'; })
      .style('fill', function(d) { return d.children ? color(d.depth) : null; })
      .on('click', function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

  var text = g.selectAll('text')
    .data(nodes)
    .enter().append('text')
      .attr('class', 'label')
      .style('fill-opacity', function(d) { return d.parent === root ? 1 : 0; })
      .style('display', function(d) { return d.parent === root ? 'inline' : 'none'; })
      .text(function(d) { return d.data.name; });

  var node = g.selectAll('circle,text');

  svg
      .style('background', color(-1))
      .on('click', function() { zoom(root); });

  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween('zoom', function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll('text')
      .filter(function(d) { return d.parent === focus || this.style.display === 'inline'; })
        .style('fill-opacity', function(d) { return d.parent === focus ? 1 : 0; })
        .on('start', function(d) { if (d.parent === focus) this.style.display = 'inline'; })
        .on('end', function(d) { if (d.parent !== focus) this.style.display = 'none'; });
  }

  function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr('transform', function(d) { return 'translate(' + (d.x - v[0]) * k + ',' + (d.y - v[1]) * k + ')'; });
    circle.attr('r', function(d) { return d.r * k; });
  }

  this.update = (data) => {
    var pack = d3.pack()
        // sets the size of the layout
        .size([diameter - margin - 40, diameter - margin - 40])
        // set the
        .padding(2);

    let root = d3.hierarchy(data)
        // this goes is post order traversal which means to descendants first in order to set the value of the node
        .sum(function(d) { return d.size; })
        // this sorts the bigger nodes to come before the smaller nodes
        .sort(function(a, b) { return b.value - a.value; });
    var focus = root,
        nodes = pack(root).descendants(),
        view;
    var circle = g.selectAll('circle')
      // joins the specified with the selected elements
      .data(nodes)
      // enter returns the placeholder nodes for the data and it appends circles
      .enter().append('circle')
        .attr('class', function(d) { return d.parent ? d.children ? 'node' : 'node node--leaf' : 'node node--root'; })
        .style('fill', function(d) { return d.children ? color(d.depth) : null; })
        .on('click', function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });
    var text = g.selectAll('text')
      .data(nodes)
      .enter().append('text')
        .attr('class', 'label')
        .style('fill-opacity', function(d) { return d.parent === root ? 1 : 0; })
        .style('display', function(d) { return d.parent === root ? 'inline' : 'none'; })
        .text(function(d) { return d.data.name; });
        var node = g.selectAll('circle,text');

    svg
        .style('background', color(-1))
        .on('click', function() { zoom(root); });

    zoomTo([root.x, root.y, root.r * 2 + margin]);

  }
}

const d3Update = (draw) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(Circles)
