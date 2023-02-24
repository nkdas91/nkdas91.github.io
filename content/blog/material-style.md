---
layout: post
title: Material Style - A UI Library
date: "2019-01-08T00:00:00Z"
created: Jan 8, 2019
group: blog
toc: true
---
A year ago, I was involved in a project with the requirement to have Material Design styles and animations for the UI. 
Like always, I looked for frameworks or libraries that met the design specification. 

The first library that I came across was [Material Design Lite][material-design-lite].  
It is a super lightweight library that didn’t rely on any JavaScript frameworks. 
Unfortunately, it didn’t have essential components such as Select Boxes. 
Having found it inadequate, I moved on for the next.

[MD Bootstrap][md-bootstrap]   
It was a popular library built on top of Bootstrap. I was curious to see if it could fulfil the requirement. 
Once again, I was left disappointed because the styles and animations were not as per the Material Design Guidelines. 
Moreover, we could not use all its components unless we purchased the PRO version of it. 

[Materialize][materialize]   
Developed by a team of students from Carnegie Mellon University, it was a complete framework that didn’t depend on 
Bootstrap or jQuery. But, like MD Bootstrap, the animations were not as per the Material Design Guidelines. 

Thus, I still did not have any luck going my way with finding a suitable Material Design package.

And then I decided to use Bootstrap as it is and write my CSS and JS on top of it to fulfil the project’s requirement. 
It gave me an idea to create a UI wrapper which would have all the bootstrap components, look and behave as per the 
Material Design Guidelines. I set about developing it and six months later, with some hard work, 
research and sleepless nights, [Material Style][material-style] was born.

[Material Style][material-style] is now an easy to use UI Library based on Bootstrap 4.5 that lets you add Material Design styles 
and animations to Bootstrap components.

<a href="https://materialstyle.github.io/"
   class="btn btn-purple rounded-pill" role="button" style="width:200px;">
    Visit Material Style
</a>

## Few Components from Material Style

<div class="row p-4 material-style-showcase" id="example-light">
    <div class="col">
        <button type="button" class="btn btn-purple btn-lg m-1">
          Button
          <span class="ripple-surface"></span>
        </button>
        <button type="button" class="btn btn-purple btn-lg rounded-pill m-1">
          <i class="bi bi-search"></i> Search
          <span class="ripple-surface"></span>
        </button>
        <button type="button" class="btn btn-fab btn-purple m-1">
          <i class="bi bi-heart-fill"></i>
          <span class="ripple-surface"></span>
        </button>
        <span class="d-block"></span>
        <fieldset class="form-floating base-purple primary-green m-3 bg-trans" style="max-width: 200px;">
          <input type="text" class="form-control" id="firstname"
                 placeholder="firstname" autocomplete="off">
          <label for="firstname">Firstname</label>
        </fieldset>
        <fieldset class="form-floating form-floating-outlined base-purple primary-green m-3" style="max-width: 200px;">
          <input type="text" class="form-control" id="firstname-outline"
                 placeholder="firstname" autocomplete="off">
          <label for="firstname-outline">Firstname</label>
        </fieldset>
        <fieldset class="form-floating base-purple primary-green m-3" style="max-width: 200px;">
          <select class="form-select">
            <option value=""></option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
          </select>
          <label>Select One</label>
        </fieldset>
        <fieldset class="form-floating form-floating-outlined base-purple primary-green m-3" style="max-width: 200px;">
          <select class="form-select">
            <option value=""></option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
          </select>
          <label>Select One</label>
        </fieldset>
    </div>
</div>

[material-design-lite]: https://getmdl.io/
[md-bootstrap]: https://mdbootstrap.com/
[materialize]: https://materializecss.com/
[material-style]: https://materialstyle.github.io/
