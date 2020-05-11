---
layout: default
title: Weixuan
---

Welcome! Well done for discovering this 'secret' site, since it's not listed anywhere.

This page is only used to test out Jekyll at the moment, I may add something interesting in the future. In the meantime, enjoy some Lorem ipsum.

<div class="separator"></div>

```python
def sieve(n): 
    primes = [False] * 2 + [True] * (n-2)

    i = 2
    while i * i < n:
        if primes[i] is True:
            for j in range(i * i, n, i):
                primes[j] = False
        i += 1
    
    return [indx for indx, state in enumerate(primes) if state is True]
```

<div class="separator"></div>
<div id="blog-list">
<h1 class="header">Posts</h1>

<ul>
  {% for post in site.posts %}
    <li>
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>
</div>

