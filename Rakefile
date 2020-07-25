require 'html-proofer'

task :test do
  sh "bundle exec jekyll build"
  options = { :assume_extension => true, :check_favicon => true, :check_opengraph => true, :http_status_ignore => [999], :url_ignore => ["https://fonts.gstatic.com"] }
  HTMLProofer.check_directory("./_site", options).run
end