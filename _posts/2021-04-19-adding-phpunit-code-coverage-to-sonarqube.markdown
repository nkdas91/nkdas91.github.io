---
layout: post
title:  "Adding PHPUnit code coverage to SonarQube"
date:   2021-04-19 07:27:57 +0530
author: Neeraj Das
categories: blog
---
Code coverage is a measure used to describe the degree to which the source code of a 
program is tested by a particular test suite. A program with high code coverage has 
been more thoroughly tested and has a lower chance of containing software bugs than 
a program with low code coverage.  

We need Xdebug installed in our system to generate a code coverage report. 
Run the following commands (Linux) or check [Xdebug][xdebug-link] installation instruction if the commands don’t work.

```
sudo apt-get install php-xdebug
sudo service apache2 restart
```
<br/>
### Generating code coverage
To generate code coverage, update ```phpunit.xml``` as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="https://schema.phpunit.de/9.3/phpunit.xsd"
         bootstrap="vendor/autoload.php"
         cacheResultFile=".phpunit.cache/test-results"
         executionOrder="depends,defects"
         beStrictAboutOutputDuringTests="true"
         beStrictAboutTodoAnnotatedTests="true"
         failOnRisky="true"
         failOnWarning="true"
         verbose="true">
         
    <php>
        <server name="DOCUMENT_ROOT" value="ABSOLUTE_PATH_TO_DOCUMENT_ROOT"/>
    </php>
             
    <coverage cacheDirectory=".phpunit.cache/code-coverage">
        <include>
            <directory suffix=".php">src</directory>
        </include>
        <report>
            <clover outputFile="report/tests-clover.xml"/>
            <html outputDirectory="report"/>
        </report>
    </coverage>
    <testsuites>
        <testsuite name="default">
            <directory suffix="Test.php">tests</directory>
        </testsuite>
    </testsuites>
    <logging>
        <junit outputFile="report/tests-junit.xml"/>
        <testdoxHtml outputFile="report/testdox.html"/>
    </logging>
</phpunit>
```

And run tests:

```
./vendor/bin/phpunit
```

If you get a warning: ```XDEBUG_MODE=coverage or xdebug.mode=coverage has to be set```,
Run the tests as:

```
XDEBUG_MODE=coverage ./vendor/bin/phpunit
```
<br/>
### Viewing coverage in a browser
Output directory is set as ```report```. So, open ```report/index.html``` on a browser to see 
the code coverage.  
<br/>
### Adding Code Coverage to SonarQube
SonarQube uses ```coverage.report.clover``` and ```logging.junit``` to show code coverage.  
```coverage.report.html``` generates a code coverage report in HTML.  
```logging.testdoxHtml``` generates an HTML report containing a list of Test Cases written.  
```outputFile``` sets report path.

Add report paths to sonar properties file

```
sonar.tests=tests
sonar.php.tests.reportPath=report/tests-junit.xml
sonar.php.coverage.reportPath=report/tests-clover.xml
```

```sonar.tests``` = path to the test directory of your project  
```sonar.php.tests.reportPath``` = path to junit report  
```sonar.php.coverage.reportPath``` = path to clover report

Exclude files that are not unit tested

```
sonar.test.exclusions=tests/app/**
sonar.coverage.exclusions=tests/app/**
```

```sonar.test.exclusions``` = files excluded from unit tests  
```sonar.coverage.exclusions``` = files excluded from code coverage

Run Sonar scanner

[xdebug-link]: https://xdebug.org/
