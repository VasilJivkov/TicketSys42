const data = require('./app/data/data');

const run = async () => {
    const user = await data.users.getOneByCriteria({
        username: 'toshko',
    });
    console.log('-'.repeat(50));
    if (user) {
        console.log(user);
    }
}
run();