import './index.css';
import * as d3 from 'd3';

let graph;
let siblingCount;
let xRotation;
let largeArc;

function Graph(data, ref) {
  const force = d3.layout.force();

  const nodes = force.nodes();
  const links = force.links();

  function collide(node) {
    const r = node.radius + 16;
    const nx1 = node.x - r;
    const nx2 = node.x + r;
    const ny1 = node.y - r;
    const ny2 = node.y + r;
    return function(quad, x1, y1, x2, y2) {
      if (quad.point && quad.point !== node) {
        let x = node.x - quad.point.x;
        let y = node.y - quad.point.y;
        let l = Math.sqrt(x * x + y * y);
        const r = node.radius + quad.point.radius;
        if (l < r) {
          l = ((l - r) / l) * 0.5;
          node.x -= x *= l;
          node.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    };
  }

  const update = function() {
    const path = svg.selectAll('path.link').data(force.links());

    path
      .enter()
      .append('svg:path')
      .attr('id', function(d) {
        return `${d.source.id}-${d.value}-${d.target.id}`;
      })
      .attr('class', 'link')
      .attr('marker-end', 'url(#arrowhead)');

    path.exit().remove();

    const pathInvis = svg.selectAll('path.invis').data(force.links());

    pathInvis
      .enter()
      .append('svg:path')
      .attr('id', function(d) {
        return `invis_${d.source.id}-${d.value}-${d.target.id}`;
      })
      .attr('class', 'invis');

    pathInvis.exit().remove();

    const pathLabel = svg.selectAll('.pathLabel').data(force.links());

    pathLabel
      .enter()
      .append('g')
      .append('svg:text')
      .attr('class', 'pathLabel')
      .append('svg:textPath')
      .attr('startOffset', '50%')
      .attr('text-anchor', 'middle')
      .attr('xlink:href', function(d) {
        return `#invis_${d.source.id}-${d.value}-${d.target.id}`;
      })
      .style('fill', 'black')
      .style('font-size', 10)
      .text(function(d) {
        return d.value;
      });

    const node = svg.selectAll('g.node').data(force.nodes());
    const nodeEnter = node
      .enter()
      .append('g')
      .attr('class', 'node')
      .call(force.drag);

    nodeEnter
      .filter(function(d) {
        return d.type === 'ellipse';
      })
      .append('svg:ellipse')
      .attr('rx', function(d) {
        return d.id.length * 5 + 4;
      })
      .attr('ry', 20)
      .attr('id', function(d) {
        return `Node;${d.id}`;
      })
      .attr('class', 'nodeStrokeClass')
      .attr('fill', '#fff')
      .attr('stroke', '#000');

    nodeEnter
      .filter(function(d) {
        return d.type === 'rect';
      })
      .append('svg:rect')
      .attr('width', function(d) {
        return d.id.length * 10 + 4;
      })
      .attr('height', 20)
      .attr('id', function(d) {
        return `Node;${d.id}`;
      })
      .attr('x', function(d) {
        return -(d.id.length * 10 + 4) / 2;
      })
      .attr('y', -10)
      .attr('class', 'nodeStrokeClass')
      .attr('stroke', '#000')
      .attr('fill', '#fff');

    nodeEnter
      .append('svg:text')
      .attr('class', 'textClass')
      .attr('text-anchor', 'middle')
      .attr('y', '.31em')
      .text(function(d) {
        return d.label;
      });

    node.exit().remove();

    function arcPath(leftHand, d) {
      const x1 = leftHand ? d.source.x : d.target.x;
      const y1 = leftHand ? d.source.y : d.target.y;
      const x2 = leftHand ? d.target.x : d.source.x;
      const y2 = leftHand ? d.target.y : d.source.y;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dr = Math.sqrt(dx * dx + dy * dy);
      let drx = dr;
      let dry = dr;
      const sweep = leftHand ? 0 : 1;
      siblingCount = countSiblingLinks(d.source, d.target);
      (xRotation = 0), (largeArc = 0);

      if (siblingCount > 1) {
        const siblings = getSiblingLinks(d.source, d.target);
        const arcScale = d3.scale
          .ordinal()
          .domain(siblings)
          .rangePoints([1, siblingCount]);
        drx /= 1 + (1 / siblingCount) * (arcScale(d.value) - 1);
        dry /= 1 + (1 / siblingCount) * (arcScale(d.value) - 1);
      }

      return `M${x1},${y1}A${drx}, ${dry} ${xRotation}, ${largeArc}, ${sweep} ${x2},${y2}`;
    }

    force.on('tick', function(e) {
      const q = d3.geom.quadtree(nodes);
      let i = 0;
      const n = nodes.length;
      const k = 0.1 * e.alpha;

      while (++i < n) q.visit(collide(nodes[i]));

      node.attr('transform', function(d) {
        return `translate(${d.x},${d.y})`;
      });

      path.attr('d', function(d) {
        return arcPath(true, d);
      });

      pathInvis.attr('d', function(d) {
        return arcPath(d.source.x < d.target.x, d);
      });
    });

    force
      .charge(-10000)
      .friction(0.5)
      .linkDistance(linkDistance)
      .size([w, h])
      .start();
    //   keepNodesOnTop();
  };

  const findNode = function(nodeId) {
    for (const i in nodes) {
      if (nodes[i].id === nodeId) {
        return nodes[i];
      }
    }
  };
  this.addNode = function(n) {
    if (!findNode(n.id)) {
      nodes.push({ id: n.id, label: n.label, type: n.type || 'ellipse' });
      update();
    }
  };

  this.addLink = function(source, target, value) {
    links.push({
      source: findNode(source.id),
      target: findNode(target.id),
      value,
    });
    update();
  };

  this.initialize = function() {
    data.nodes.forEach(function(node) {
      graph.addNode(node);
    });

    data.edges.forEach(function(d) {
      graph.addNode(d.source);
      graph.addNode(d.target);
      graph.addLink(d.source, d.target, d.value);
    });
  };

  const countSiblingLinks = function(source, target) {
    let count = 0;
    for (let i = 0; i < links.length; ++i) {
      if (
        (links[i].source.id === source.id &&
          links[i].target.id === target.id) ||
        (links[i].source.id === target.id && links[i].target.id === source.id)
      )
        count++;
    }
    return count;
  };

  const getSiblingLinks = function(source, target) {
    const siblings = [];
    for (let i = 0; i < links.length; ++i) {
      if (
        (links[i].source.id === source.id &&
          links[i].target.id === target.id) ||
        (links[i].source.id === target.id && links[i].target.id === source.id)
      )
        siblings.push(links[i].value);
    }
    return siblings;
  };

  const w = ref.current.clientWidth - 20;
  const h = ref.current.clientHeight;
  const middle = w / 2;
  const linkDistance = 300;

  const colors = d3.scale.category20();

  const svg = d3
    .select('#graph')
    .append('svg:svg')
    .attr('width', w)
    .attr('height', h)
    .style('z-index', -10)
    .attr('id', 'svg');
  // .call(d3.behavior.zoom().on("zoom", function () {
  //     svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
  //   }))

  svg
    .append('svg:defs')
    .selectAll('marker')
    .data(['end'])
    .enter()
    .append('svg:marker')
    .attr({
      id: 'arrowhead',
      viewBox: '0 -5 10 10',
      refX: 22,
      refY: 0,
      orient: 'auto',
      markerWidth: 20,
      markerHeight: 20,
      markerUnits: 'strokeWidth',
      xoverflow: 'visible',
    })
    .append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#ccc');

  update();
}

function keepNodesOnTop() {
  // let els = document.getElementsByClassName("nodeStrokeClass");
  // els.forEach(function( element ) {
  //     console.log(element)
  //     var gNode = element.parentNode;
  //     gNode.parentNode.appendChild(gNode);
  // });
}

export function drawGraph(data, ref) {
  graph = new Graph(data, ref);
  graph.initialize();
}
