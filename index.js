const superagent = require('superagent');
exports.unfollow = (req, resApp) => {
    var unfollowLink = req.body.unfollowLink

    var payload = {
        apiauth: req.body.tabapiauth,
        username: req.body.username,
        password: req.body.password
    }
    superagent
        .post('https://debateapis.wm.r.appspot.com/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(JSON.parse(JSON.stringify(payload)))
        .end((err, res) => {
            if (err) console.error(`Err @ 1st req: ${err}`)
            superagent
                .get(unfollowLink)
                .set('Cookie', res.body.token)
                .redirects(1)
                .end((err, res) => {
                    if (err) console.error(`Err @ 2nd req: ${err}`)
                    if (res.text.includes('Stop Your Live Updates')) {
                        resApp.status(200).send('Unfollowed')
                    }
                })
        })
}
