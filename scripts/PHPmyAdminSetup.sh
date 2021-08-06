#!/bin/bash

sudo /opt/lampp/lampp stop
sudo service apache2 stop
sudo service mysql stop
sudo /opt/lampp/lampp start
sleep 1
firefox --new-tab http://localhost/phpmyadmin/