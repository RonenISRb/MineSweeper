export function duplicateItem(times, item) {
  const returnArray = [];
  while (times > 0) {
    returnArray.push(Object.assign({}, item));
    times--;
  }
  return returnArray;
}

export function setValueRandomly(times, array, key, value) {
  const alreadyGenerated = [];
  while (times > 0) {
    const random = Math.floor(Math.random() * array.length);
    if (alreadyGenerated.indexOf(random) === -1) {
      alreadyGenerated.push(random);
      array[random][key] = value;
      times--;
    }
  }
  return alreadyGenerated;
}

export function partition(cols, cells) {
  const res = [];
  const rows = cells.length / cols;
  for (let i = 0; i < rows ; i++) {
    res.push(cells.slice(i * cols, i * cols + cols));
  }
  return res;
}
