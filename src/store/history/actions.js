export function newLoanHistory(id, loan) {
  return {
    type: 'NEW_LOAN',
    loan,
  };
}

export function updateHistory(id, updates) {
  return {
    type: 'UPDATE_HISTORY',
    id,
    updates,
  };
}
