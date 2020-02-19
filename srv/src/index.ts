import express, { Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';

const parseCookies = (request: any) => {
    const list = {},
      rc = request.headers.cookie;

    rc &&
      rc.split(';').forEach(function(cookie: any) {
        const parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
      });

    return list;
  }


let app = express();

// app.use(session({secret: 'ssshhhhh'}));

const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

const port = 3000;

const index = (req: Request, res: Response) => {
    res.status(200).send(`
        <div>
            <p>respons-cookie-httponly - server running on port ${port}</p>
        </div>
    `);
};

// app.use(session({
//     name: 'sessionName',
//     secret: "notagoodsecretnoreallydontusethisone",
//     resave: false,
//     saveUninitialized: true,
//     httpOnly: true,  // dont let browser javascript access cookie ever
//     secure: true, // only use cookie over https
//     ephemeral: true // delete this cookie while browser close
// }));


app.get('/', index);
app.post('/login', async (req: Request, res: Response) => {

    // Set response httponly cookie 
    console.log("setCookie (refresh_token)"); // eslint-disable-line
    let key = 'refresh_token';
    let value = 'accessToken';
    let thirty = 60 * 60 * 24 * 30;
    //document.cookie = `${key}=${value};path=/;max-age=${thirty};HttpOnly`; // one cookie at a time
    document.cookie = 'name=Flavio; Secure; HttpOnly'

  return res.send({ ok: true });
});

app.post('/getcookie', async (req: Request, res: Response) => {

    // Set response httponly cookie 
    //res.cookie('fromExpress', 'I am from express');
    res.cookie('fromExpress', 'I am from express', { expires: new Date(Date.now() + 900000), httpOnly: true, secure: false });


    return res.send({ ok: true });
});

app.post('/usecookie', async (req: Request, res: Response) => {
    // Get request cookies
    const cookiesList = parseCookies(req)
    console.log('cookiesList: ' + JSON.stringify(cookiesList, null, 2));

    return res.send({ ok: true });
});




app.listen(port, (err: any) => {
    if (err) {
        return console.log(err); // eslint-disable-line no-console
    }

    // eslint-disable-next-line no-console
    return console.log(`server is listening on ${port}`);
});