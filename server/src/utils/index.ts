export function* range(size: number) {
  let index = 0;
  do {
    yield index;
  } while (index++ < size);
  return index;
}
