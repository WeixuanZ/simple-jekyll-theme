#!/usr/bin/env python3

"""
MIT (c) 2020 Weixuan Zhang

Script for automatic extraction of Jekyll tags and creating corresponding
tagpages.

Rewrite of tag_generator.py (c) 2017 Long Qian <lqian8@jhu.edu> to
support list declaration and non-alphanumeric characters.

Specify multiple tags in the post front matter like this:
---
<...some front matter>
tag: ["tag1", "tag2","or without a space after comma"]
<or>
tag: tag1, tag2
<or both>
<...more front matter>
---
`tag:` and `tags:` can both be used
"""

import glob
import os
from itertools import takewhile, dropwhile
from functools import reduce

def extract_tags(filename):
    with open(filename, 'r', encoding='utf8') as f:
        return list(filter(  # deal with trailing comma
                lambda t: t != '',
                map(  # getting the tag bodies
                    lambda t: t.strip('\"\' '),
                    reduce(  # getting a list of tags
                        lambda tags, l: tags + l[1:].strip('[]\n ').split(','),
                        map(  # removing everything up to :
                            lambda l: ''.join(dropwhile(lambda c: c != ':', l)),
                            filter(  # getting lines starting with tag
                                lambda l: l[0:3] == 'tag',
                                takewhile(lambda l: l != '---\n', f.readlines()[1:]),
                            )
                        ),
                        []
                    )
                )
            ))

def all_extracted_tags(post_dir='_posts/'):
    return {i for x in map(extract_tags, glob.glob(post_dir + '*md')) for i in x}

def slugify(string):
    return string.translate(str.maketrans({' ': '-', '?': '-', '.': '-', '#': '-'})).strip('-')

def create_tagpage(tag_dir):
    def wrapped(tag):
        with open(tag_dir + slugify(tag) + '.md', 'w') as f:
            f.write('---\nlayout: tagpage\ntitle: "Tag: {0}"\ntag: "{0}"\n---\n'.format(tag))
    return wrapped

def create_all_tagpages(tags, tag_dir='tags/'):
    try:
        os.makedirs(tag_dir)
    except FileExistsError:
        list(map(os.remove, glob.glob(tag_dir + '*md')))
    list(map(create_tagpage(tag_dir), tags))
    print('Extracted tags are {}'.format(tags))

create_all_tagpages(all_extracted_tags())
