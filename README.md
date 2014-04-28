mathayward.com
====

## Requires

* [Sass](http://sass-lang.com/)
* [Compass](http://compass-style.org/)
* [Jekyll](http://jekyllrb.com/)
* [Grunt](http://gruntjs.com/)
 

## Running

If search function is required, change ```url``` in ```config.yml``` to http://localhost:4000 

Clone repository on local machine:

    $ git clone git://github.com/mathaywarduk/.com.git

Install grunt dependencies

    $ sudo npm install

In one terminal window:

    $ grunt watch

In another terminal window

    $ jekyll serve --watch 

Navigate to [http://localhost:4000](http://localhost:4000)

## Deploying

Ensure ```url``` in ```config.yml``` is set to http://mathayward.com 

Close any running watch processes (compass and jekyll)

Ensure the latest CSS is present

    $ compass compile
    
Build the project

    $ jekyll build
    
Upload the contents of ```_site``` directory to the webroot
