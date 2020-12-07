/**
 * Fix typing for Object.keys
 */
export function ObjectKeys<T extends {}>(o: T): (keyof T)[] {
  return Object.keys(o) as any;
}

export function checkUnreachable(_x: never) {}

export function cn(
  ...args: (string | undefined | null | 0 | false | "")[]
): string {
  return args.filter(isString).join(" ");
}
function isString(a: any): a is string {
  return typeof a === "string";
}
