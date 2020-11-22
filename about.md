---
layout: default
title: About
description: This page tells you a little bit about myself.
clipboard: true
---

<style type="text/css">
    p > a {
        text-decoration: none;
    }
</style>

{% include_relative README.md %}

<script type="text/javascript">
    document.querySelectorAll(`p > img, p > a[href="https://weixuanz.github.io/simple-jekyll-theme"] > img`).forEach(el => el.setAttribute('src', `{{ site.url }}${el.getAttribute('src')}`))
</script>
