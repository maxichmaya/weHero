var spicedPg = require("spiced-pg");
var db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg("postgres:postgres:curry@localhost:5432/wehero");
}

exports.newUser = function(first, last, email, password) {
    return db.query(
        "INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
        [first, last, email, password]
    );
};

exports.loginEmail = function loginEmail(email) {
    return db.query(`SELECT email, password, id FROM users WHERE email = $1`, [
        email
    ]);
};

exports.userInfo = function infoPic(id) {
    return db.query(
        `SELECT first, last, imageid, bio FROM users WHERE id = $1`,
        [id]
    );
};

exports.newImage = function newImage(id, imageid) {
    return db.query(`UPDATE users SET imageid = $2 WHERE id = $1`, [
        id,
        imageid
    ]);
};

exports.chatImage = function chatImage(sender_id, imageid) {
    return db.query(
        `INSERT INTO chats(sender_id, imageid) VALUES ($1, $2) RETURNING id`,
        [sender_id, imageid]
    );
};

exports.addBio = function addBio(id, bio) {
    return db.query(`UPDATE users SET bio = $2 WHERE id = $1 RETURNING bio`, [
        id,
        bio
    ]);
};

exports.whoLastJoined = function whoLastJoined() {
    return db.query(`SELECT * FROM users
    ORDER BY id DESC
    LIMIT 3`);
};

exports.findFriend = function(val) {
    return db.query("SELECT * FROM users WHERE first ILIKE $1", [val + "%"]);
};

exports.checkFriendship = function(sender_id, reciever_id) {
    return db.query(
        "SELECT * FROM friendships WHERE (sender_id = $1 AND reciever_id = $2) OR (sender_id = $2 AND reciever_id = $1);",
        [sender_id, reciever_id]
    );
};

exports.makeFriendRequest = function makeFriendRequest(sender_id, reciever_id) {
    return db.query(
        "INSERT INTO friendships (sender_id, reciever_id) VALUES ($1, $2) RETURNING *",
        [sender_id, reciever_id]
    );
};

exports.acceptFriendRequest = function(reciever_id) {
    return db.query(
        "UPDATE friendships SET accepted = true WHERE reciever_id = $1 RETURNING *",
        [reciever_id]
    );
};

exports.cancelFriendRequest = function(sender_id, reciever_id) {
    return db.query(
        "DELETE FROM friendships WHERE (sender_id =$1 AND reciever_id = $2) OR (reciever_id = $1 AND sender_id = $2)",
        [sender_id, reciever_id]
    );
};

exports.friendSelection = function(id) {
    return db.query(
        `SELECT users.id, first, last, imageid, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND reciever_id = $1 AND sender_id = users.id)
        OR (accepted = true AND reciever_id = $1 AND sender_id  = users.id)
        OR (accepted = true AND sender_id  = $1 AND reciever_id = users.id)`,
        [id]
    );
};

exports.chatInDatabase = function(sender_id, message) {
    return db.query(
        `INSERT INTO chats (sender_id, message) VALUES ($1, $2) RETURNING *`,
        [sender_id, message]
    );
};

exports.getLastTenMessages = function() {
    return db.query(
        `SELECT chats.id, sender_id, chats.message, chats.created_at, users.first, users.last, chats.imageid AS chatimageid
        FROM chats
        LEFT JOIN users ON users.id = chats.sender_id
        ORDER BY chats.id
        DESC LIMIT 100`
    );
};
