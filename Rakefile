require 'html-proofer'

task :test do
  sh "bundle exec jekyll build"
  options = { :assume_extension => true, :check_html => true, :check_favicon => false, :check_opengraph => true, :http_status_ignore => [999], :enforce_https => true, :url_ignore => ["https://fonts.gstatic.com"] }
  HTMLProofer.check_directory("./_site", options).run
end

task :default => [:test]