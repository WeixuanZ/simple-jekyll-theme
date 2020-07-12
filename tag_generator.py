#!/usr/bin/env python3

"""
C 2020 Weixuan Zhang
Rewrite of tag_generator.py Copyright 2017 Long Qian (lqian8@jhu.edu)

Script for automatic extraction of Jekyll tags and creating corresponding tagpages.
Specify multiple tags in the post front matter like this:
---
<...some front matter>
tag: [tag1, tag2<,or without a space after comma>]
<...more front matter>
---
"""

import glob
import os
from itertools import takewhile

def extract_tags(filename):
    with open(filename, 'r', encoding='utf8') as f:
        return list(*map(
                lambda x: x[4:-1].replace(', ', ',').strip('[] ').split(','),
                filter(
                    lambda x: x[0:4] == 'tag:',
                    takewhile(lambda l: l != '---\n', f.readlines()[1:]),
                )
            ))

def all_extracted_tags(post_dir='_posts/'):
    return {i for x in map(extract_tags, glob.glob(post_dir + '*md')) for i in x}

def slugify(string):
    return string.translate(str.maketrans({' ': '-', '?': '-', '.': '-', '#': '-'})).strip('-')

def create_tagpage(tag_dir):
    def wrapped(tag):
        with open(tag_dir + slugify(tag) + '.md', 'w') as f:
            f.write('---\nlayout: tagpage\ntitle: \"Tag: {0}\"\ntag: {0}\n---\n'.format(tag))
    return wrapped

def create_all_tagpages(tags, tag_dir='tags/'):
    try:
        os.makedirs(tag_dir)
    except FileExistsError:
        list(map(os.remove, glob.glob(tag_dir + '*md')))
    list(map(create_tagpage(tag_dir), tags))
    print('Extracted tags are {}'.format(tags))

create_all_tagpages(all_extracted_tags())
