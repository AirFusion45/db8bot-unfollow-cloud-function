const superagent = require('superagent');
exports.unfollow = (req, resApp) => {
    var { unfollowLink, tabapiauth, username, password } = req.body

    // console.log(unfollowLink)
    // console.log(tabapiauth)
    // console.log(username)
    // console.log(password)
    // console.log(req.body)
    console.log(JSON.parse(Buffer.from(Buffer.from(req.body).toString('base64'), 'base64').toString()))
    console.log(JSON.parse(Buffer.from(Buffer.from(req.body).toString('base64'), 'base64').toString()).unfollowLink)

    var payload = {
        apiauth: tabapiauth,
        username: username,
        password: password
    }

    superagent
        .post('https://debateapis.wm.r.appspot.com/login')
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
                    if (res.text.includes('Stop Your Live Updates')) {
                        resApp.status(200).send('Unfollowed')
                    }
                })
        })
}
