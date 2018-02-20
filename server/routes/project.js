const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const models = require('../schemas and models/data-model.js');
var app = express();

var http = require("http").Server(router);
var io = require('../sockets/io');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://stefan:stefan281195@ds129156.mlab.com:29156/macrop", {
    useMongoClient: true,
});
mongodb: //<dbuser>:<dbpassword>@ds129156.mlab.com:29156/macrop
    mongodb: //stefan:stefan281195@ds129156.mlab.com:29156/macrop




    router.get("/getAllProjects", (req, res, next) => {
        models.projects.find((err, project) => {
            if (err)
                res.send(err);
            res.json(project);
            io.emit("customEvent", null);
        })
    })

router.get("/getProjects/:id", (req, res, next) => {
    let userId = req.params.id;
    console.log(userId);
    models.projects.find({ $or: [{ "participians": userId }, { "owners": userId }] }, (err, project) => {
        if (err)
            res.send(err);
        res.json(project);
    })
})

router.get("/getProject/:id", (req, res, next) => {
    let projectID = req.params.id;
    console.log(projectID);
    models.projects.findOne({ _id: projectID }, (err, project) => {
        if (err)
            res.send(err);
        res.json(project);
    })
})


router.post("/createProject", (req, res, next) => {
    let ownerId = req.body.ownerId;
    let participians = req.body.participians;
    let projectName = req.body.projectName;
    let participiansIds = [];
    participians.forEach(el => {
        participiansIds.push(el._id);

    });
    models.projects.create({ name: projectName, owners: ownerId, participians: participiansIds }, (err, proj) => {
        if (err)
            res.send(err);
        else {    
            participians.forEach(el => {
                models.roles.create({ projectID: proj._id, userID: el._id, role: el.role }, (err, doc) => {
                    if (err)
                        res.send(err);
                });
            });
            models.chats.create({projectID: proj._id}, (err, doc) =>{
                if (err)
                    res.send(err);
            });
            res.json(proj);
            io.sockets.emit('projectCreated', proj);
        }
    });
});

router.put("/addUserToProject", (request, response) => {
    console.log(request.body);
    let userId = request.body.userId;
    let projectId = request.body.projectId;
    models.projects.findById(projectId, (err, proj) => {
        if (err)
            response.send(err);
        else {
            let parti = proj.participians;
            console.log(parti);
            parti.push(userId);
            proj.set({ participians: parti });
            proj.save();
            response.json(proj);
            io.emit("userAddedToProject", proj);
        }
    });
});

router.put("/addTaskToProject", (req, res, next) => {
    console.log(req.body);
    let projectId = req.body.projectId;
    let taskId = req.body.taskId;
    models.projects.findById(projectId, (err, proj) => {
        if (err)
            res.send(err);
        proj.tasks.push(taskId);
        proj.save();
        res.json(proj);
    })
});

router.get("/getUsersByProjectId/:id", (req, res, next) => {
    let projectId = req.params.id;
    models.projects.findById(projectId, (err, proj) => {
        if (err)
            res.send(err);
        else {
            models.users.find({ $or: [{ '_id': proj.participians }, { '_id': proj.owners }] }, (err, users) => {
                if (err) res.send(err);
                res.json(users);
            });
        }
    });
});

router.delete("/deleteProject/:id", (req, res, next) => {
    let projectId = req.params.id;
    models.projects.findById(projectId, (err, project) => {
        if (err)
            res.json(err);
        else {
            models.chats.findOne({ projectID: project._id }, (err, chat) => {
                if (err)
                    res.json(err);
                else {
                    models.messages.remove({ chatID: chat._id }, (err, messages) => {
                        if (err)
                            res.json(err);
                        else {
                            chat.remove();
                        }
                    });
                }
            });
            models.tasks.remove({ _id: project.tasks }, (err, task) => {
                if (err)
                    res.json(err);
            });

            models.roles.remove({ projectID: projectId }, (err, docs) => {
                if (err)
                    res.json(err);
            });

            models.teams.remove({ projectID: projectId }, (err, docs) => {
                if (err)
                    res.json(err);
            })
            res.json(project);
            project.remove();
        }
    });
});

router.put("/removeProjectUser", (req, res, next) => {
    let deletedUser = req.body.userId;
    let projectId = req.body.projectId;
    models.projects.findById(projectId, (err, proj) => {
        if (err)
            res.send(err);
        else {
            proj.participians = proj.participians.filter(user => user != deletedUser);
            proj.save();

            models.roles.remove({ $and: [{ projectID: projectId }, { userID: deletedUser }] }, (err, docs) => {
                if (err)
                    res.send(err);
            });

            models.teams.findOne({ $and: [{ projectID: projectId }, { members: deletedUser }] }, (err, team) => {
                if (err)
                    res.send(err);
                else {
                    if (team) {
                        team.members = team.members.filter(member => member != deletedUser);
                        team.save();
                    }
                }
            });

            models.tasks.find({ responsible: deletedUser }, (err, task) => {
                if (err)
                    res.send(err);
                else {
                    task.forEach(element => {
                        element.responsible = element.responsible.filter(user => user != deletedUser);
                        element.save();
                    });
                    res.json(deletedUser);
                    io.emit('userRemovedFromProject', deletedUser);
                }
            });
        }
    });
});

// router.get("/allTasksOfProject/:id", (req, res, next) => {
//     let projectId = req.params.id;
//     models.projects.findById(projectId, (err, project) => {
//         if (err)
//             res.json(err);
//         else {
//             models.tasks.find({ _id: project.tasks }, (err, tasks) => {
//                 if (err)
//                     res.json(err);
//                 else
//                     res.json(tasks);
//             });
//         }
//     });
// });




module.exports = router;