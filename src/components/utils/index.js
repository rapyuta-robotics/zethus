export const toggleWireFrame = (obj) => {
  const f = (obj2) => {
    if (obj2.hasOwnProperty('material')) {
      obj2.material.wireframe = !obj2.material.wireframe;
    }
  };
  obj.traverse(f);
};
