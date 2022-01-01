const superagent = require('superagent');
exports.unfollow = (req, resApp) => {
    var unfollowLink = req.body.unfollowLink

    var payload = {
        apiauth: req.body.tabapiauth,
        username: req.body.tabUser,
        password: req.body.tabPass
    }
    console.log('not in requests yet')
    superagent
        .post('https://debateapis.wm.r.appspot.com/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(JSON.parse(JSON.stringify(payload)))
        .end((err, res) => {
            if (err) console.error(`Err @ 1st req: ${err}`)
            console.log(`req1 done: ${JSON.stringify(res.body)}`)
            superagent
                .get(unfollowLink)
                .set('Cookie', res.body.token)
                .redirects(1)
                .end((err, res) => {
                    if (err) console.error(`Err @ 2nd req: ${err}`)
                    if (res.text.includes('Stop Your Live Updates')) {
                        resApp.status(200).send('Unfollowed')
                        console.log('Unfollowed')
                    }
                })
        })
}
