mathayward.com
====

# Getting started

Clone to local machine

    $ git clone git://github.com/mathaywarduk/.com.git
 
Set up a new gemset and install dependencies (requires RVM - http://rvm.io/rvm/install)

    $ rvm gemset create mathayward
    $ bundle install

Install grunt (http://gruntjs.com/getting-started) and dependencies 

    $ sudo npm install


# Running

If search function is required, change ```url``` in ```config.yml``` to http://localhost:4000 

In one terminal window:

    $ grunt watch

In another terminal window

    $ jekyll serve --watch 

Navigate to [http://localhost:4000](http://localhost:4000)


# Deploying

Ensure ```url``` in ```config.yml``` is set to http://mathayward.com 

Close any running watch processes (grunt and jekyll)

Ensure the latest CSS and JS is present

    $ grunt
    
Build the project

    $ jekyll build
    
Upload the contents of ```_site``` directory to the webroot
