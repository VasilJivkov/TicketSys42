const data = require('./app/data/data');

const run = async () => {
  let user = await data.users.getById(1);
  await user.setProjects([1]);
  user = await data.users.getById(2);
  await user.setProjects([2]);
}
run();