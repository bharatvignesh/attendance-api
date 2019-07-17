const UserService = require('../service/user-service')


class User {

    constructor(config) {
        this.config = config;
        this.userService = new UserService(this.config);
    }

    registerUrlToRoute(router)  {
        const me = this;
        router.get('/user', async function (req, res) {
            const list = await me.userService.getAllUser()
            res.send(list);
        });
    }

}
module.exports = User;