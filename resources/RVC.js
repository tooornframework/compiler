window.RVC = {
  __d: [],
  __ds: {},
  __qToC: new Map(),

  d(defs) {
    for (const def of defs) {
      window.RVC.__d.push(def)
    }
  },
  ds(defs) {
    window.RVC.__ds = defs;
  },
  ref(qualif) {
    return (Class) => {
      if (window.RVC.__qToC.has(qualif)) {
        console.warn("Overriding qualifier: " + qualif);
      }

      window.RVC.__qToC.set(qualif, Class);
    }
  }
};