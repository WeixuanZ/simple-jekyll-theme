# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name                    = "simple-jekyll-theme"
  spec.version                 = "0.1.0"
  spec.authors                 = ["W Zhang"]

  spec.summary                 = "A minimalistic theme for personal blogs."
  spec.homepage                = "https://github.com/WeixuanZ/simple-jekyll-theme"
  spec.license                 = "MIT"

  spec.metadata["plugin_type"] = "theme"

  spec.files = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README|404)}i) }

  spec.add_runtime_dependency "jekyll", ">= 3.5", "< 5.0"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.15"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.6.0"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.4"
  spec.add_runtime_dependency "jekyll-paginate", "~> 1.1"

  spec.add_development_dependency "bundler", "~> 2.1"
  spec.add_development_dependency "rake", "~> 13.0"
  spec.add_development_dependency "html-proofer", "~> 3.15"

  spec.post_install_message = "Thanks for installing! Live demo at http://weixuanz.github.io"
end
