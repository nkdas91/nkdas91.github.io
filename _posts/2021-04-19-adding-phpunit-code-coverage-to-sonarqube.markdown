---
layout: post
title:  "Adding PHPUnit code coverage to SonarQube"
date:   2021-04-19 07:27:57 +0530
author: Neeraj Das
categories: blog
---
We need Xdebug installed in our system to generate a code coverage report. 
Run the following commands (Linux) or check [Xdebug][xdebug-link] installation instruction if the commands don’t work.

```
sudo apt-get install php-xdebug
sudo service apache2 restart
```
<br/>
### Generating code coverage

Open ```phpunit.xml``` and add the following sections within ```<phpunit></phpunit>``` to generate code coverage reports

```xml
<coverage cacheDirectory=".phpunit.cache/code-coverage">
    <include>
        <directory suffix=".php">src</directory>
    </include>
    <report>
        <clover outputFile="report/tests-clover.xml"/>
        <html outputDirectory="report"/>
    </report>
</coverage>

<logging>
    <junit outputFile="report/tests-junit.xml"/>
    <testdoxHtml outputFile="report/testdox.html"/>
</logging>
```

SonarQube uses ```coverage.report.clover``` and ```logging.junit``` to show code coverage.

```coverage.report.html``` generates a code coverage report in HTML.

```logging.testdoxHtml``` generates an HTML report containing a list of Test Cases written.

```outputFile``` sets report path.

Test coverage will be generated when we run phpunit.

```
./vendor/bin/phpunit tests
```
<br/>
### Adding Code Coverage to SonarQube

Add report paths to sonar properties file

```
sonar.tests=tests
sonar.php.tests.reportPath=report/tests-junit.xml
sonar.php.coverage.reportPath=report/tests-clover.xml
```

sonar.tests = path to the test directory of your project
sonar.php.tests.reportPath = path to junit report
sonar.php.coverage.reportPath = path to clover report

Exclude files that are not unit tested

```
sonar.test.exclusions=tests/app/**
sonar.coverage.exclusions=tests/app/**
```

sonar.test.exclusions = files excluded from unit tests
sonar.coverage.exclusions = files excluded from code coverage

Run Sonar scanner

<br/>
### Viewing coverage in a browser
Open ```index.html``` from the path that we specified in ```logging.testdoxHtml```.

[xdebug-link]: https://xdebug.org/
