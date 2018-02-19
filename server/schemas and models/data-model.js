const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let usersSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String,
});

let rolesSchema = mongoose.Schema({
    projectID: String,
    userID: String,
    role: String
});

let teamsSchema = mongoose.Schema({
    projectID: String,
    name: String,
    leader: String,
    tasks: [],
    members: []
});

let tasksSchema = mongoose.Schema({
    name: String,
    body: [],
    projectID: String,
    responsible: [],
    completness: []
});

let projectSchema = mongoose.Schema({
    name: String,
    owners: [],
    tasks: [],
    participians: [],
    teams: [],
    reports: []
});

let chatSchema = mongoose.Schema({
    projectID: String
});

let messageSchema = mongoose.Schema({
    author: String,
    text: String,
    chatID: String
});

let reportsSchema = mongoose.Schema({
    name: String,
    owner: String,
    type: String,
    reports: [],
    data: String
});

exports.users = mongoose.model("users", usersSchema);
exports.tasks = mongoose.model("tasks", tasksSchema);
exports.projects = mongoose.model("projects", projectSchema);
exports.chats = mongoose.model("chat", chatSchema);
exports.messages = mongoose.model("messages", messageSchema);
exports.roles = mongoose.model("roles", rolesSchema);
exports.teams = mongoose.model("teams", teamsSchema);
exports.reports = mongoose.model("reports", reportsSchema);