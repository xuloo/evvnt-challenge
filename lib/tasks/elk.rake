namespace :elk do

  elk_dir = "vendor/elk"
  logstash_version = "1.5.0.rc1.1"
  logstash_name = "logstash-#{logstash_version}"

  desc "TODO"
  task :install_elasticsearch => :environment do
    file = "#{elk_dir}/elasticsearch-1.4.4.tar.gz"
    sh "curl -# -o #{file} --create-dirs https://download.elastic.co/elasticsearch/elasticsearch/elasticsearch-1.4.4.tar.gz"
    sh "tar -xzvf #{file} -C #{elk_dir}/"
    sh "rm #{file}"
  end

  task :start_elasticsearch => :environment do
    sh "./#{elk_dir}/elasticsearch-1.4.4/bin/elasticsearch -d -p tmp/pids/elasticsearch.pid"
  end

  desc "TODO"
  task :install_logstash => :environment do
    #file = "#{elk_dir}/logstash-1.5.0.rc1.1.tar.gz"
    #sh "curl -# -o #{file} --create-dirs https://download.elastic.co/logstash/logstash/logstash-1.5.0.rc1.1.tar.gz"
    #sh "tar -xzvf #{file} -C #{elk_dir}/"
    #sh "rm #{file}"
    sh "cd #{elk_dir}/#{logstash_name}"
    sh "bundle install"
    sh "./#{elk_dir}/#{logstash_name}/bin/plugin install xuloo/logstash-input-evvnt-challenge"
  end

end
