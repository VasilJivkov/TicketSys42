const data = require('./app/data/data');

const run = async () => {
    const user = await data.users.getOneByCriteria({
        id: 1
    });

    let projects = await user.getProjects();

    const usersByProjects = await Promise.all(projects.map(async (project) => {
        const projectUsers = await project.getUsers()
            .map((projectUser) => projectUser.dataValues.username);
        return projectUsers;
    }));

    projects = projects.map((project) => project.dataValues.title);
}
run();