const superagent = require('superagent');
exports.unfollow = (req, resApp) => {
    var parsed = JSON.parse(req.body)
    var unfollowLink = parsed.unfollowLink

    var payload = {
        apiauth: parsed.tabapiauth,
        username: parsed.username,
        password: parsed.password
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
