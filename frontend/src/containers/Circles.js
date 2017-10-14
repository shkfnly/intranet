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
  componentDidMount () {
    this.props.fetchProfiles()
  }
  componentWillReceiveProps (props) {
    // this.props.fetchProfiles()
    if (_.isEqual(this.props.profiles.sort(), props.profiles.sort())) {
      null
    } else {
      let data = {name: 'consensys',
        children: []
      }
      props.profiles.map((v, i) => {
        v.roles.forEach((role) => {
          let index = _.findIndex(data.children, (v) => v.name === role)
          index > 0
          ? data.children[index].children.push({'name': v.name.replace(/\s/g, ''), 'size': 10})
          : data.children.push({'name': role, children: [{'name': v.name.replace(/\s/g, ''), 'size': 10}]})
          // data.push({id: `consensys.${role.replace(/\s/g, '')}`, value: 10})
          // data.push({id: `consensys.${role.replace(/\s/g, '')}.${}`, value: 10})
        })
        v.projects.forEach((proj) => {
          let index = _.findIndex(data.children, (v) => v.name === proj)
          index > 0
          ? data.children[index].children.push({'name': v.name.replace(/\s/g, ''), 'size': 10})
          : data.children.push({'name': proj, children: [{'name': v.name.replace(/\s/g, ''), 'size': 10}]})
          // data.push({id: `consensys.${proj.replace(/\s/g, '')}`, value: 10})
          // data.push({id: `consensys.${proj.replace(/\s/g, '')}.${v.name.replace(/\s/g, '')}`, value: 10})
        })
        v.teams.forEach((team) => {
          let index = _.findIndex(data.children, (v) => v.name === team)
          index > 0
          ? (
            data.children[index].children.push({'name': v.name.replace(/\s/g, ''), 'size': 10})
          )
          : data.children.push({'name': team, children: [{'name': v.name.replace(/\s/g, ''), 'size': 10}]})
        })
      })
      d3Draw(data)
      this.setState({data})
    }
  }

  render () {
    return (
      <div>
        <Header />
        <div style={{width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
          <svg width={700} height={700} style={{display: 'flex', alignSelf: 'center'}} />
        </div>
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

var svg = d3.select("svg"),
    margin = 20,
    diameter = +svg.attr("width"),
    height = +svg.attr('height'),
    g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

var color = d3.scaleLinear()
    .domain([-1, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

var pack = d3.pack()
    .size([diameter - margin - 40, diameter - margin - 40])
    .padding(2);


  let root = d3.hierarchy(data)
      .sum(function(d) { return d.size; })
      .sort(function(a, b) { return b.value - a.value; });

  var focus = root,
      nodes = pack(root).descendants(),
      view;

  var circle = g.selectAll("circle")
    .data(nodes)
    .enter().append("circle")
      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

  var text = g.selectAll("text")
    .data(nodes)
    .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
      .text(function(d) { return d.data.name; });

  var node = g.selectAll("circle,text");

  svg
      .style("background", color(-1))
      .on("click", function() { zoom(root); });

  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Circles)
