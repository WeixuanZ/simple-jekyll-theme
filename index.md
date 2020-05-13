---
layout: home
title: Weixuan
---

Welcome! Well done for discovering this 'secret' site, since it's not listed anywhere.

This site is still under development, I may add something interesting in the future. In the meantime, enjoy some Lorem ipsum.

<div class="separator"></div>

Listing test

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
