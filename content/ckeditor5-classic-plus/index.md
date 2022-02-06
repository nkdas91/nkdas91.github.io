---
layout: ckeditor5
title: CKEditor 5 - Classic Plus
created: Jun 3, 2021
aliases:
- "/ckeditor5-classic-plus/"
---
<div class="row mx-0">
    <div class="col">
        <h1 class="theme-text-primary">CKEditor 5 - Classic Plus v32.0.0</h1>
        <div class="p-3 my-3 author-note theme-text-primary">
            Note, Image upload won't work because we haven't configured the server to handle it.
        </div>
        <div class="text-dark">
            <div id="editor"></div>
        </div>
    </div>
</div>

<script src="https://unpkg.com/ckeditor5-classic-plus@32.0.0/build/ckeditor.js"></script>

<script>
    document.addEventListener("DOMContentLoaded", function(event) {
        ClassicEditor.create(document.querySelector('#editor'), {
            simpleUpload: {
                // The URL that the images are uploaded to.
                uploadUrl: "http://example.com/",

                // Enable the XMLHttpRequest.withCredentials property if required.
                withCredentials: true,

                // Headers sent along with the XMLHttpRequest to the upload server.
                headers: {
                    "X-CSRF-TOKEN": "CSFR-Token",
                    Authorization: "Bearer <JSON Web Token>"
                }
            }
        })
            .then(editor => {
                window.editor = editor;
            })
            .catch(error => {
                console.error('There was a problem initializing the editor.', error);
            });
    });
</script>
