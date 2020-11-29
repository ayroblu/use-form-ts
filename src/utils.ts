/**
 * Fix typing for Object.keys
 */
export function ObjectKeys<T extends {}>(o: T): (keyof T)[] {
  return Object.keys(o) as any;
}

export function checkUnreachable(_x: never) {}
