---
layout: post
title:  "Material Style - A UI Library"
date:   2019-01-08 18:24:32 +0530
author: Neeraj Das
categories: blog
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

<div class="m-shape-container mt-2 mb-4">
    <a href="https://materialstyle.github.io/"
       class="btn btn-ms btn-deep-purple" role="button" style="width:250px;">
        Check Material Style
    </a>
    <div class="angle-top-left"></div>
    <div class="angle-top-right"></div>
    <div class="angle-bottom-left"></div>
    <div class="angle-bottom-right"></div>
</div>

### Few Components from Material Style
<div class="row p-4 material-style-showcase">
    <div class="col">
    
        <div class="form-group">
            <button class="btn btn-cyan">Button</button>
        </div>

        <div class="form-group">
            <button type="button" class="btn btn-fab btn-cyan">
                <i class="material-icons">favorite</i>
            </button>
        </div>

        <div class="form-group">
            <button type="button" class="btn btn-fab extended-fab btn-cyan">
                <i class="material-icons">search</i> Search
            </button>
        </div>
        
        <span class="d-block" style="width: 100%;"></span>

        <div class="form-group" style="max-width: 200px">
            <div class="m-text-field primary-cyan accent-pink-a400">
                <label class="floating-label">Text Field</label>
                <input type="text" class="form-control bg-transparent text-pink">
            </div>
        </div>

        <div class="form-group" style="max-width: 200px">
            <div class="m-text-field-outline primary-cyan accent-pink-a400">
                <label class="floating-label">Text Field</label>
                <input type="text" class="form-control text-pink">
            </div>
        </div>

        <div class="form-group" style="max-width: 200px;">
            <div class="m-select-outline primary-cyan accent-pink-a400">
                <label class="floating-label">Select</label>
                <select class="form-control">
                    <option value=""></option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                </select>
            </div>
        </div>
        
    </div>
</div>

[material-design-lite]: https://getmdl.io/
[md-bootstrap]: https://mdbootstrap.com/
[materialize]: https://materializecss.com/
[material-style]: https://materialstyle.github.io/
