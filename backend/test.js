const data = require('./app/data/data');

const run = async () => {
  const user = await data.users.getOneByCriteria({ id: 2 });
  const newDetails = {
    password: 'pesho12',
  }
  user.updateAttributes(newDetails);
  // user.updateAttributes(data)
    // .on('success', function (project) {
    //   // Check if record exists in db
    //   if (project) {
    //     project.updateAttributes({
    //       title: 'a very different title now'
    //     })
    //       .success(function () { })
    //   }
    // })
}
run();