sudo service elasticsearch restart
sudo service redis-server restart

sleep 5

cd /opt/liveblog/server && honcho start &
cd /opt/liveblog/client && grunt --force server --server='http://localhost:5000/api' --ws='ws://localhost:5100'