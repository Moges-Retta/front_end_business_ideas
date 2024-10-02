"use strict";
fillDetails();
function fillDetails() {
    var p = document.querySelector("p");
    var id = p.id;
    if(id=="about"){
        p.innerText = "Welcome to project ethio, your number one source for project ideas in Ethiopia.\n" +
            "                    We're dedicated to giving you business ideas in 20 sectors, with a focus on consice\n" +
            "                    description of the projects and template detail study to inspireand further detailed study.\n" +
            "                    The projects were collected and shared in 2008 by Moges Ashagrie, has put lots of hours in\n" +
            "                    its beginnings in a home office.<br>\n" +
            "                    When the website was first started out, his passion for providing the project ideas\n" +
            "                    drove him to collect a lot of project ideas and publish them,\n" +
            "                    and gave him the impetus to turn hard work and inspiration into a resource a lot people enjoyd\n" +
            "                    reading.\n" +
            "                    <br>\n" +
            "                    We hope you enjoy our ideas as much as we enjoy offering them to you.\n" +
            "                    If you have any questions or comments, please don't hesitate to contact us at\n" +
            "                    projectethio400@gmail.com.\n" +
            "                    <br>\n" +
            "                    Sincerely,\n" +
            "                    <br>\n" +
            "                    Name, Moges Retta (PhD)";
    }else{
        p.innerText = "";
    }
}