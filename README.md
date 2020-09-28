![Simple](/docs/head.png)

<p align="center">
    <a aria-label="build" href="https://github.com/WeixuanZ/simple-jekyll-theme/actions" target="_blank">
      <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/weixuanz/simple-jekyll-theme/Gem%20Publish?style=flat-square">
    </a>
    <a aria-label="version" href="https://github.com/WeixuanZ/simple-jekyll-theme/blob/master/CHANGELOG.md">
      <img alt="Version" src="https://img.shields.io/github/package-json/v/weixuanz/simple-jekyll-theme?style=flat-square">
    </a>
    <a aria-label="license" href="#license" target="_blank">
      <img alt="License: MIT" src="https://img.shields.io/github/license/weixuanz/simple-jekyll-theme?style=flat-square">
    </a>
</p>

A minimalistic Jekyll theme created for my blog - https://weixuanz.github.io.

* GitHub Pages compatible
* Optimised for speed (perfect score on PageSpeed Insight):
    * No JQuery
    * Minified HTML, CSS and JS
    * Asynchronous loading of non-critical CSS
    * Image lazy-loading
    * And more...
* Dark mode support, with animated transition
* Mobile friendly
* Tag system, with sorted tag clouds
* Ajax pagination
* Dynamic TOC
* Code listings with copy button
* RSS Feed and SEO
* Google Tag Manager

<p align="center">
    <a href="https://weixuanz.github.io/simple-jekyll-theme"><img alt="theme screenshot" src="/screenshot.png" width="400"></a>
</p>

---

This repository is a clone of that for my website, with commits not related to the theme stripped out, also with modifications for generalisation. For the commenting system (not included in this theme), check out [my fork of Utterances](https://github.com/WeixuanZ/utterances).

* [Installation](#installation)
* [Usage](#usage)
    * [Metadata](#metadata)
        * [Google Analytics \(optional\)](#google-analytics-optional)
        * [Font Awesome Kit \(optional\)](#font-awesome-kit-optional)
    * [Navigation](#navigation)
    * [Homepage](#homepage)
    * [Blog Posts](#blog-posts)
    * [Customising](#customising)
* [Contributing](#contributing)
* [Development](#development)
* [License](#license)


## Installation

> If you are hosting your site on GitHub Pages, fork this repository and follow the [Development](#development) setup **instead**, and rename it to `<username>.github.io`. Alternatively, you can use `remote_theme: WeixuanZ/simple-jekyll-theme` by including a whitelisted gem called _jekyll-remote-theme_ in your `_config.yml`, [more details here](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/adding-a-theme-to-your-github-pages-site-using-jekyll#adding-a-jekyll-theme-in-your-sites-_configyml-file).

Add this line to your Jekyll site's `Gemfile`:

```ruby
gem "simple-jekyll-theme"
```

And then execute:

```bash
$ bundle
```

## Usage

Add this line to your Jekyll site's `_config.yml`:

```yaml
theme: simple-jekyll-theme
```

The theme provides four layouts:

* `default.html` — The base layout that lays the foundation for subsequent layouts, can be used for standalone pages.
* `home.html` — The layout for your landing-page / home-page / index-page. [[More Info](#homepage)]
* `post.html` — The layout for your posts.
* `tagpage.html` — The layout for your tag pages.

Note that you would have to include the corresponding font-matter to specify the layout, since Jekyll’s default settings cannot be overridden by a theme-config.


### Metadata

Overwrite the default values shown below by providing alternatives in your `_config.yml`.

```yaml
title: Simple Jekyll Theme
author: W Zhang
tagline: "A minimalistic theme for blogs"
description: "Theme for my personal blog https://weixuanz.github.io"
url: "https://weixuanz.github.io/simple-jekyll-theme"  # no "/" at the end
lang: en
paginate: 5  # number of posts displayed on each page
```


#### Google Analytics (optional)

You can add Google Analytics through Google Tag Manager, add the following to your `_config.yml`:

```yaml
google-tag-manager-id: GTM-xxxxxx
```

#### Font Awesome Kit (optional)

You can use the Font Awesome Kit instead of using the default hardcoded svg icons. This is useful if you want to include more icons than the ones defined in `./_includes/icons.html`. You can register for a free kit at https://fontawesome.com.

```yaml
font-awesome-kit: xxxxxxxxxx
```

If the above is specified in `_config.yml`, svg icon definitions will not be included, and `<i />` will be used.


### Navigation

Add names and paths under the `navigation` key in `_config.yml` to specify links in the navigation bar:

```yaml
navigation:
  - name: Home
    link: /
  - name: About
    link: /about/
```

Note that the default permalink setting is `pretty`, you need to include `permalink: pretty` in `_config.yml`, or use the corresponding format when specifying `navigation`.


### Homepage

Add the following to `index.html` of your site:

```yaml
---
layout: home
title: Home
pagination:
  enabled: true
---
```

Please note that for pagination to work, the index file must be in `.html` instead of `.md`.

All content from the file (if there's any) will be injected above the generated post list by the `home` layout. This will allow you to include non-posts related content to be published on the landing page.


### Blog Posts

Name your blog posts as `yyyy-mm-dd-name.md` and put them in `./_posts/`. Some important front matter configurations are listed below:

```yaml
---
layout: post
title: Example
author: W Zhang
description: This is an example post
tag: [example, jekyll]
toc: true
mathjax: true
---
```

A rather unfortunate result of supporting GitHub Pages is that the fantastic Jekyll tag gems cannot be used. I wrote a Python script `./scripts/tag_generator.py` based on [Long Qian's fantastic solution](https://longqian.me/2017/02/09/github-jekyll-tag/). You will need to download it separately if you are using the gem approach, perhaps using:

```bash
wget https://raw.githubusercontent.com/WeixuanZ/simple-jekyll-theme/master/tag_generator.py
```

You can use the provided `./scripts/pre-commit` git hook for automatic execution, or use `yarn run tag` if you cloned this repository.

On the other hand, if you prefer doing it manually, you simply need to create `.md` files under `./tag/`. For example, `./tag/jekyll.md` for a tag named _jekyll_ may contain the following:

```yaml
---
layout: tagpage
title: "Tag: jekyll"
tag: jekyll
---
```

Other than `blockquotes`, this theme also provides `.hint` and `.danger`, with blue and red left border respectively. They are implemented as classes on top of `blockquotes`, you can use the Kramdown syntax:

```markdown
> This is a hint
{:.hint}
```

The theme also includes the [lazysizes](https://github.com/aFarkas/lazysizes) package, to enable lazy-loading of images, use `data-src` instead of `src`, and add `lazyload` class.

```html
<figure>
    <img data-src="/assets/images/example.png" class="lazyload">
    <figcaption>Example figure</figcaption>
</figure>
```


### Customising

To override the default structure and style, simply create the concerned directory at the root of your site, copy the file you wish to customise to that directory, and then edit the file.

The files you may be particularly interested in:

```
.
├── _includes
│   ├── footer.html
│   ├── head.html         -> <head /> in default layout
│   ├── custom-head.html  -> placeholder for adding more metadata to <head />, e.g. png favicons
│   └── comment.html      -> placeholder for commenting system
├── _sass
│   ├── blog.scss         -> critical and non-critical styles related to blog posts, e.g. toc
│   ├── code.scss
│   ├── definitions.scss  -> colour, font and mixin definitions
│   ├── main.scss         -> critical styles
│   ├── mobile.scss       -> media queries
│   └── print.scss
└── assets
    └── js
        ├── main.js       ┬> note that the minified versions xxxx.min.js are used
        └── pagination.js ┘
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/weixuanz/simple-jekyll-theme. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](https://contributor-covenant.org) code of conduct.


## Development

To set up your environment to develop this theme, run `bundle install` and `yarn install`.

To test your theme, run `bundle exec jekyll serve` and open your browser at `http://localhost:4000`. This starts a Jekyll server using the theme. Add pages, documents, data, etc. like normal to test the theme's contents. As you make modifications to the theme and content, the site will regenerate and you should see the changes in the browser after a refresh, just like normal.

I recommend using Google's Closure-compiler for minifying JavaScripts. If you have Homebrew installed, it's simply `brew install closure-compiler`. For automatic execution, you can also use the provided git hook.

When the theme is released, only the files in `_layouts`, `_includes`, `_sass` and `assets` tracked with Git will be bundled. To add a custom directory to the theme-gem, please edit the regexp in `simple-jekyll-theme.gemspec` accordingly.

## License

The theme is available as open source under the terms of the [MIT License](/LICENSE.md). Please link to this repository in the footer if you overwrite the default one.

By default, svg icons used (in `./_includes/icons.html`) are from Font Awesome, which are licensed under the [Creative Commons Attribution 4.0 International license](https://creativecommons.org/licenses/by/4.0/). No modifications were made.

Amazing open-source code used:
* Source-codes included in this gem:
    * [Monokai theme colour definitions](https://gist.github.com/asaaki/1007420)
    * [Theme switching script by Koos Looijesteijn](https://gist.github.com/kslstn/20f654fd27eb29619040c74fa6526919) (_Modified_)
    * [jekyll-compress-html](https://github.com/penibelst/jekyll-compress-html) MIT
    * [jekyll-toc](https://github.com/allejo/jekyll-toc) MIT (_Modification merged upstream_)
* Dependencies:
    * JS libraries:
        * [Clipboard.js](https://clipboardjs.com)
        * [lazysizes](https://github.com/aFarkas/lazysizes)
    * Jekyll plug-ins:
        * [jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag)
        * [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap)
        * [jekyll-feed](https://github.com/jekyll/jekyll-feed)
