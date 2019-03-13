import _ from 'lodash';

class Graph {
  constructor() {
    this.graph = new Map();
  }

  addNode(node) {
    this.graph.set(node, { in: new Set(), out: new Set() });
  }

  addEdges(edges) {
    _.each(edges, ({ source, target }) => {
      if (!this.graph.has(source)) {
        this.addNode(source);
      }
      if (!this.graph.has(target)) {
        this.addNode(target);
      }

      this.connectNodes(source, target);
    });
  }

  connectNodes(source, target) {
    this.graph.get(source).out.add(target);
    this.graph.get(target).in.add(source);
  }

  static buildPath(target, path) {
    const result = [];

    while (path.has(target)) {
      const source = path.get(target);
      result.push({ source, target });
      target = source;
    }

    return result.reverse();
  }

  findPath(source, target) {
    if (!this.graph.has(source)) {
      return null;
    }

    if (!this.graph.has(target)) {
      return null;
    }

    const queue = [source];
    const visited = new Set();
    const path = new Map();

    while (queue.length > 0) {
      const start = queue.shift();

      if (start === target) {
        return Graph.buildPath(start, path);
      }

      for (const next of this.graph.get(start).out) {
        if (visited.has(next)) {
          continue;
        }

        if (!queue.includes(next)) {
          path.set(next, start);
          queue.push(next);
        }
      }

      visited.add(start);
    }

    return null;
  }
}

export default Graph;
