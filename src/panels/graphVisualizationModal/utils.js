import DagreD3 from 'dagre-d3';
import * as d3 from 'd3';

function createAndPopulateGraph(graph, targetElementId) {
  const g = new DagreD3.graphlib.Graph().setGraph({
    rankdir: 'LR',
  });
  const initialScale = 0.75;
  const svg = d3.select(`#${targetElementId}`);
  const inner = svg.select('g');
  // Create the renderer
  /* eslint-disable-next-line */
  const render = new DagreD3.render();

  // Set up zoom support
  const zoom = d3.zoom().on('zoom', function() {
    inner.attr('transform', d3.event.transform);
  });
  svg.call(zoom);

  graph.nodes.forEach(function(node) {
    g.setNode(node.id, { label: node.id, shape: 'ellipse' });
  });

  graph.edges.forEach(function(edge) {
    g.setEdge(edge.source.id, edge.target.id, { label: edge.value });
  });

  // Set some general styles
  g.nodes().forEach(function(v) {
    const node = g.node(v);
    node.rx = 5;
    node.ry = 5;
  });

  // Run the renderer. This is what draws the final graph.
  render(inner, g);
  svg.call(
    zoom.transform,
    d3.zoomIdentity
      .translate(
        (svg.attr('width') - g.graph().width * initialScale) / 2 +
          Number(svg.style('width').slice(0, -2)) / 2,
        (svg.attr('height') - g.graph().height * initialScale) / 2 +
          Number(svg.style('height').slice(0, -2)) / 2,
      )
      .scale(initialScale),
  );
  svg.attr('height', g.graph().height * initialScale + 40);
}

export default createAndPopulateGraph;
