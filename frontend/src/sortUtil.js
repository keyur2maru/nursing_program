// sortUtil.js
const sortCandidates = (candidates, sortKey, sortDir) => {
    return [...candidates].sort((a, b) => {
      let modifier = sortDir === 'asc' ? 1 : -1;
      let aValue = getSortValue(a, sortKey);
      let bValue = getSortValue(b, sortKey);
      if (aValue < bValue) return -1 * modifier;
      if (aValue > bValue) return 1 * modifier;
      return 0;
    });
  };
  
const getSortValue = (candidate, sortKey) => {
if (sortKey in candidate.scoreBreakdown) {
    let value = candidate.scoreBreakdown[sortKey];
    // Convert to number if possible for proper comparison
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
    return Number(value);
    }
    return value;
} else if (sortKey === 'name') {
    // Case insensitive sorting for names
    return candidate[sortKey].toLowerCase();
} else {
    let value = candidate[sortKey];
    // Convert to number if possible for proper comparison
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
    return Number(value);
    }
    return value;
}
};

export default {
sortCandidates,
};
