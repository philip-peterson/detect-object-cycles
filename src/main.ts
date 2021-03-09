'use strict';

type Key = string | number;
type Path = Array<Key>;

type ReferenceValue = Array<any> | Record<string, any>;

const isReference = (val: any) => typeof val === 'object' && val !== null;

const walk = (obj: ReferenceValue, curPath: Path, passedSeenReferences: Set<ReferenceValue>): Array<Path> => {
  if (!isReference(obj) && !Array.isArray(obj)) {
    return [];
  }

  if (passedSeenReferences.has(obj)) {
    return [curPath];
  }

  const seenReferences = new Set(passedSeenReferences);
  seenReferences.add(obj);

  const cycles: Array<Path> = [];
  for (const [key, val] of Object.entries(obj)) {
    walk(val, [...curPath, key], seenReferences).forEach(res => {
      cycles.push(res);
    });
  }
  return cycles;
};

export const findCycles = (obj: Object) => {
  return walk(obj, [], new Set([]));
};
