const generateTestUsers = (numTestUsers) => {
  const testUsers = [];
  for (let i = 0; i < numTestUsers; i += 1) {
    testUsers.push({
      name: `User${i} Test`,
      email: `user${i}@example.com`,
      facebookId: `user${i}facebookid`,
    });
  }
  return testUsers;
};

module.exports = {
  generateTestUsers,
};
