# encoding: utf-8
$:.push File.expand_path("../lib", __FILE__)
require "better_tabs/version"

Gem::Specification.new do |s|
  s.name        = %q{better_tabs}
  s.version     = BetterTabs::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = [%q{Dinesh Yadav}]
  s.email       = [%q{dinesh@crypsis.net}]
  s.homepage    = %q{http://github.com/crypsis/better_tabs}
  s.summary     = %q{Better Tab management (uses bootstrap)}

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  s.rdoc_options = ["--charset=UTF-8"]

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.rubygems_version = %q{0.0.1}
  s.add_dependency(%q<actionpack>, ["~> 3.0"])

  #s.add_dependency(%q<bootstrap>, ["~> 1.0"])

end

