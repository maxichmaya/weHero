const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const bc = require("./utils/bc");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
var bcrypt = require("./utils/bc");
const csurf = require("csurf");
const axios = require("axios");
const s3 = require("./s3");
var multer = require("multer");
const config = require("./config");
var uidSafe = require("uid-safe");
var path = require("path");

const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: process.env.PORT
        ? "https://wehero-bridge.herokuapp.com"
        : "localhost:8080"
});

app.use(compression());
app.use(express.static("./public"));
app.use(bodyParser.json());

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
// -------FINDPEOPLE------------------------------------
app.get("/users", async function(req, res) {
    console.log("route is running:");
    try {
        let results = await db.whoLastJoined();
        console.log("result in user: ", results);
        res.json(results.rows);
    } catch (err) {
        console.log("error: ", err);
    }
});

app.post("/findnewfriend", async function(req, res) {
    try {
        let { rows } = await db.findFriend(req.body.key);
        res.json(rows);
    } catch (err) {
        console.log("error in findfriends: ", err);
    }
});

// -----------------------------------------------
app.get("/user", function(req, res) {
    db.userInfo(req.session.userId)
        .then(results => {
            res.json(results.rows[0]);
        })
        .catch(err => {
            console.log("err in welcome ", err);
        });
});

app.get("/user/:id.json", async function(req, res) {
    if (req.params.id == req.session.userId) {
        res.redirect("/");
    } else
        try {
            const user = await db.userInfo(req.params.id);
            user.imageid = user.rows[0].imageid;

            const module = require("module");
            if (!user.imageid) {
                user.imageid = "/public/3.png";
            }
            res.json({ user });
        } catch (err) {
            console.log("Error in otherprofile route: ", err);
        }
});
// -----------------FRIENDBUTTON CHECK FRIENDSHIP------------------/
app.get("/friendship/:otherProfileId", async function(req, res) {
    console.log("hello", req.session.userId, req.params.otherProfileId);
    try {
        const user = await db.checkFriendship(
            req.session.userId,
            req.params.otherProfileId
        );
        // console.log("user from checkfriedship:", user);

        if (user.rows.length == 0) {
            res.json({ buttonText: "Lets Team Up" });
        } else if (
            req.session.userId == user.rows[0].reciever_id &&
            user.rows[0].accepted == false
        ) {
            res.json({
                buttonText: "Accept Team Up request"
            });
        } else if (
            req.session.userId == user.rows[0].sender_id &&
            user.rows[0].accepted == false
        ) {
            res.json({
                buttonText: "Cancel Team Up request"
            });
        } else if (
            req.session.userId == user.rows[0].reciever_id &&
            user.rows[0].accepted == true
        ) {
            console.log("about to send unfriend");
            res.json({
                buttonText: "No Team no more"
            });
        } else if (
            req.session.userId == user.rows[0].sender_id &&
            user.rows[0].accepted == true
        ) {
            console.log("about to send unfriend");
            res.json({
                buttonText: "No Team no more"
            });
        }
    } catch (err) {
        console.log("Error in friendbutton GET route: ", err);
    }
});
// -------------ACCEPT FRIEND REQUEST OPTIONS-----------------------------------------
app.post("/friendship/", async function(req, res) {
    console.log("req.body:", req.body);
    try {
        if (req.body.button == "Lets Team Up") {
            await db.makeFriendRequest(req.session.userId, req.body.id);
            res.json({ buttonText: "Cancel Team Up request" });
        }
        console.log("req.body.otherProfileId:", req.body.id);
        if (req.body.button == "Cancel Team Up request") {
            await db.cancelFriendRequest(req.session.userId, req.body.id);
            res.json({ buttonText: "Lets Team Up" });
        }

        if (req.body.button == "Accept Team Up request") {
            await db.acceptFriendRequest(req.session.userId);
            res.json({ buttonText: "No Team no more" });
        }

        if (req.body.button == "No Team no more") {
            await db.cancelFriendRequest(req.session.userId, req.body.id);
            res.json({ buttonText: "Lets Team Up" });
        }
    } catch (err) {
        console.log("Error in friendbutton POST route: ", err);
    }
});

// -------------ALL USERS AND WANNABES--------------------------------------------------
app.get("/friendsworld", async function(req, res) {
    try {
        let { rows } = await db.friendSelection(req.session.userId);
        res.json(rows);
    } catch (err) {
        console.log("Error in friends route: ", err);
    }
});
// ----------------------new part--------------------------------------------------------

// ---------------------------------------------------------------------------
app.post("/welcome", function(req, res) {
    console.log("req.body:", req.body);
    bcrypt
        .hashPassword(req.body.password)
        .then(hash => {
            db.newUser(
                req.body.first,
                req.body.last,
                req.body.email,
                hash
            ).then(results => {
                req.session.userId = results.rows[0].id;
                console.log("req.session.userId: ", req.session.userId);
                res.json({ success: true });
            });
        })
        .catch(err => {
            console.log("err in welcome ", err);
            res.json({ success: false });
        });
});

app.post("/bio", function(req, res) {
    console.log("hello Monday:", req.body, req.session.userId);

    db.addBio(req.session.userId, req.body.bio)
        .then(results => {
            console.log("results.rows.bio:", results.rows[0].bio);
            res.json(results.rows[0].bio);
        })
        .catch(err => {
            console.log("error in bio: ", err);
            res.sendStatus(500);
        });
});

app.post("/login", (req, res) => {
    db.loginEmail(req.body.email)
        .then(results => {
            if (results.rows.length == 0) {
                res.json({ success: false });
            } else {
                req.session.userId = results.rows[0].id;
                return bcrypt
                    .checkPassword(req.body.password, results.rows[0].password)
                    .then(results => {
                        console.log("results bcrypt:", results);
                        if (results) {
                            res.json({ success: true });
                        }
                    })
                    .catch(err => {
                        console.log("check pass", err);
                    });
            }
        })
        .catch(err => {
            console.log("get pass", err);
        });
});

app.post("/uploader/profile", uploader.single("file"), s3.upload, function(
    req,
    res
) {
    const fullurl = config.s3Url + req.file.filename;
    db.newImage(req.session.userId, fullurl)
        .then(() => {
            res.json({ imageid: fullurl });
        })
        .catch(err => {
            console.log("err: ", err);
            res.sendStatus(500);
        });
});

app.post("/uploader/chat", uploader.single("file"), s3.upload, function(
    req,
    res
) {
    const fullurl = config.s3Url + req.file.filename;
    db.chatImage(req.session.userId, fullurl)
        .then(() => {
            res.json({ imageid: fullurl });
        })
        .catch(err => {
            console.log("err: ", err);
            res.sendStatus(500);
        });
}); //function closing

// SERVER SIDE SOCKET //
io.on("connection", async function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    let userId = socket.request.session.userId;

    let data = await db.userInfo(userId);

    socket.request.first = data.rows[0].first;
    socket.request.last = data.rows[0].last;
    // socket.request.imageid = data.rows[0].imageid;

    socket.on("My amazing chat message", async msg => {
        let { rows } = await db.chatInDatabase(userId, msg);
        io.sockets.emit("chatMessage", {
            id: rows[0].id,
            sender_id: rows[0].sender_id,
            message: rows[0].message,
            created_at: rows[0].created_at,
            first: socket.request.first,
            last: socket.request.last
        });

        console.log("new rows in chat: ", rows[0]);
    });

    socket.on("show new messages", async () => {
        let { rows } = await db.getLastTenMessages();
        io.sockets.emit("chatMessages", rows);
    });
    socket.on("new upload", async imageid => {
        console.log("made it here", imageid);
        io.sockets.emit("chatImage", {
            imageid: imageid
        });
    });
});

//end of socket//
// --------------DO NOT DELETE THIS
app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// --------------DO NOT DELETE THIS

// we would res.json
server.listen(process.env.PORT || 8080, function() {
    console.log("I'm listening.");
});

// newImage(req.session.userId)
