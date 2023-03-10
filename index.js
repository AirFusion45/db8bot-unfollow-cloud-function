const superagent = require('superagent');
exports.unfollow = (req, resApp) => {
    var inData = JSON.parse(req.body)

    var unfollowLink = inData.unfollowLink

    var payload = {
        apiauth: inData.tabapiauth,
        username: inData.username,
        password: inData.password
    }

    superagent
        .post(`${process.env.TABURL}/login`)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(JSON.parse(JSON.stringify(payload)))
        .end((err, res) => {
            if (err) console.error(`Err @ 1st req: ${err.message}`);
            superagent
                .get(unfollowLink)
                .set('Cookie', res.body.token)
                .redirects(1)
                .end((err, res) => {
                    if (err) console.error(`Err @ 2nd req: ${err}`)
                    if (res.text.includes('Follower removed')) {
                        resApp.status(200).send('Unfollowed')
                    }
                })
        })
}
