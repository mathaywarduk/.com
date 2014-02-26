mathayward.com
====

## Requires

* Sass
* Compass
* Jekyll
 

## Running

Clone repository on local machine:

    $ git clone git://github.com/mathaywarduk/.com.git

In one terminal window:

    $ compass watch

In another terminal window

    $ jekyll serve --watch 

Navigate to [http://localhost:4000](http://localhost:4000)

## Deploying

Close any running watch processes (compass and jekyll)

Ensure the latest CSS is present

    $ compass compile
    
Build the project

    $ jekyll build
    
Upload the contents _site directory to the webroot
