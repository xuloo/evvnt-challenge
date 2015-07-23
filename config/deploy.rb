set :application, 'event'
set :deploy_user, 'ubuntu'

# setup repo details
set :scm, :git
set :repo_url, 'git@github.com:xuloo/evvnt-challenge.git'
set :ssh_options,     { forward_agent: true, user: fetch(:user), keys: %w(~/.ssh/elk.pem) }

# setup rvm.
#set :rbenv_type, :system
#set :rbenv_ruby, '2.1.1'
#set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"
#set :rbenv_map_bins, %w{rake gem bundle ruby rails}

# how many old releases do we want to keep
set :keep_releases, 5

# files we want symlinking to specific entries in shared.
#set :linked_files, %w{config/database.yml}

# dirs we want symlinking to shared
#set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

# what specs should be run before deployment is allowed to
# continue, see lib/capistrano/tasks/run_tests.cap
#set :tests, []

# which config files should be copied by deploy:setup_config
# see documentation in lib/capistrano/tasks/setup_config.cap
# for details of operations
#set(:config_files, %w(
#  nginx.conf
#  database.example.yml
#  log_rotation
#  monit
#  unicorn.rb
#  unicorn_init.sh
#))

# which config files should be made executable after copying
# by deploy:setup_config
#set(:executable_config_files, %w(
#  unicorn_init.sh
#))

# files which need to be symlinked to other parts of the
# filesystem. For example nginx virtualhosts, log rotation
# init scripts etc.
#set(:symlinks, [
#  {
#    source: "nginx.conf",
#    link: "/etc/nginx/sites-enabled/#{fetch(:full_app_name)}"
#  },
#  {
#    source: "unicorn_init.sh",
#    link: "/etc/init.d/unicorn_#{fetch(:full_app_name)}"
#  },
##  {
  #  source: "log_rotation",
   #link: "/etc/logrotate.d/#{fetch(:full_app_name)}"
#  },
#  {
#    source: "monit",
#    link: "/etc/monit/conf.d/#{fetch(:full_app_name)}.conf"
#  }
#])

namespace :deploy do

  task :bower_and_npm_install do
    on roles(:app), in: :sequence, wait: 5 do
      within release_path do
        unless test "[ -d #{File.join(current_path, 'node_modules', 'grunt-cli', 'bin')} ]"
          execute :npm, "install yo"
        end
        execute :npm, "install"
        execute :bower, "install"
      end
    end
  end

  task :build do
    on roles(:app), in: :sequence, wait: 5 do
      within File.join(release_path, 'ngapp') do
        execute :grunt, "build"
      end
    end
  end

  after :bower_and_npm_install, :build
  after :publishing, :restart
  after :published, :bower_and_npm_install
end
