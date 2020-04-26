$(document).ready(function () {
    var articleContainer = $("article-container");

    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);

    initPage();

    function initPage() {
        articleContainer.empty();
        $.get("/api/headline?saved=true").then(function (data) {
            if (data && data.length) {
                renderArticles(data);
            } else {
                renderEmpty();
            }
        });
    }

    function renderArticles(articles) {
        var articlePanels = [];

        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }

        articleContainer.append(articlePanels);

    }

    function createPanel(article) {
        var panel =
            $(["<div class='panel panel-default'>",
                "<div class='panel-heading'>",
                "<h3>",
                article.headline,
                "<a class='btn btn-success save'>",
                "Save Article",
                "</a>",
                "</h3>",
                "</div>",
                "<div class='panel-body'>",
                article.summary,
                "</div>",
                "</div>"
            ].join(""));

        panel.data("_id", article._id);
        return panel;
    }

    function renderEmpty() {


    }


    // var noteData;
    // var newNote = $(".bootbox-body textarea").val().trim();

    // if (newNote) {
    //     noteData = {
    //         _id: $(this).data("article")._id,
    //         noteText: newNote
    //     };
    //         $.post("/api/notes", noteData).then(function() {
    //             bootbox.hideall();
    //         });
    //     }

//     function handleNoteDelete() {
//         var noteToDelete = $(this).data("_id");

//         $.ajax({
//             url: "/api/notes/" + noteToDelete,
//             method: "DELETE"
//         }).then(function () {
//             bootbox.hideAll();
//         })
//     }
// })

function handleArticleDelete() {
    var articleToDelete = $(this).parents(".panel").data();

    $.ajax({
        method: "DELETE",
        url: "/api/headlines/" + articleToDelete._id
    }).then(function(data) {
        if (data.ok) {
            initPage();
        }
    });
}})

function handleArticleNotes() {
    var currentArticle = $(this).parents(".panel").data();
    $.get("/api/notes/" + currentArticle._id).then(function(data) {
        var modalText = [
            
        ]
    })
}