function subsets(nums) {
  let results = [[]];

  for (let num of nums) {
    let subsetsWithNum = [];
    for (let subset of results) {
      subsetsWithNum.push([...subset, num])
    }

    results.push(...subsetsWithNum);
  }

  return results;
}
