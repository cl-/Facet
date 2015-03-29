#!/usr/bin/env bash
heroku login
  #20150329h@reallymymail.com
  #mypassword1
git clone git_url_PLEASE_CHANGE_THIS
cd ~/myAppName_PLEASE_CHANGE_THIS
heroku create
  #[read the heroku url from this result]
git push heroku master
