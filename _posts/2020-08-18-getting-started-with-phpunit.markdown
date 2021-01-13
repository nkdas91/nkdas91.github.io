---
layout: post
title:  "Getting started with PHPUnit"
date:   2020-08-18 18:24:32 +0530
author: Neeraj Das
categories: blog
---
PHPUnit is a well-known testing framework for PHP. It uses assertions to verify that a specific 
component or unit behaves as expected.  

The goal is to isolate each part of the program and verify that it is correct. A unit test provides 
a strict, written contract that the piece of code must satisfy. As a result, unit tests find problems 
early in the development cycle.  

The purpose of this tutorial is to introduce you to the basics of PHPUnit.

### Installation
Before we start writing our first unit test, we need to have PHPUnit installed. The installation 
process is documented at [https://phpunit.de/][phpunit-link].

### Writing our first test
To get started, we need something to test, so for the first example, I’ve written a simple 
PHP class 
```Average``` that calculates the average of an array of integers.

src/Average.php
```php
<?php declare(strict_types=1);

final class Average
{
    private function ensureIsValidArrayOfIntegers(array $numbers): void
    {
        foreach ($numbers as $number) {
            if (!filter_var($number, FILTER_VALIDATE_INT)) {
                throw new InvalidArgumentException(
                    sprintf(
                        '"%s" is not a valid number',
                        $number
                    )
                );
            }
        }
    }

    public function getAverage(array $numbers): float
    {
        $this->ensureIsValidArrayOfIntegers($numbers);

        return array_sum($numbers) / count($numbers);
    }
}
```

To ensure that our class ```Average``` works, we need to create a test class that extends ```PHPUnit\Framework\TestCase```.  

tests/AverageTest.php
```php
<?php declare(strict_types=1);
use PHPUnit\Framework\TestCase;

final class AverageTest extends TestCase
{
    public function testExceptionFromInvalidArgumentType(): void
    {
        $this->expectException(TypeError::class);

        $average = new Average();
        $verage->getAverage('string');
    }

    public function testExceptionFromInvalidArgument(): void
    {
        $this->expectException(InvalidArgumentException::class);
        
        $average = new Average();
        $average->getAverage([1, 'a', 3, 4, 5]);
    }

    public function testErrorFromEmptyArrayArgument(): void
    {
        $this->expectError();
        
        $average = new Average();
        $average->getAverage([]);
    }

    public function testGetAverage(): void
    {
        $average = new Average();
        $this->assertEquals(3.0, $average->getAverage([1, 2, 3, 4, 5]));
    }
}
```
### Running our tests
Running your tests is as simple as calling the phpunit executable and pointing it at your tests. 
Here’s an example:

```
./vendor/bin/phpunit tests
```

Output

```
PHPUnit 9.5.0 by Sebastian Bergmann and contributors.

....                                                                4 / 4 (100%)

Time: 00:00.008, Memory: 4.00 MB

OK (4 tests, 4 assertions)
```

### Setup & Teardown

In ```AverageTest.php```, it is tedious to instantiate ```Average``` class in each test case.  

PHPUnit supports sharing the setup code. Before a test method is run, a template 
method called ```setUp()``` is invoked. ```setUp()``` is where you create the objects against 
which you will test. Once the test method has finished running, whether it succeeded 
or failed, another template method called ```tearDown()``` is invoked. ```tearDown()``` is where 
you clean up the objects against which you tested.  

tests/AverageTest.php

```php
<?php declare(strict_types=1);
use PHPUnit\Framework\TestCase;

final class AverageTest extends TestCase
{
    protected $average;

    protected function setUp(): void {
        $this->average = new Average();
    }

    protected function tearDown(): void {
        unset($this->average);
    }

    public function testExceptionFromInvalidArgumentType(): void
    {
        $this->expectException(TypeError::class);

        $this->average->getAverage('string');
    }

    public function testExceptionFromInvalidArgument(): void
    {
        $this->expectException(InvalidArgumentException::class);

        $this->average->getAverage([1, 'a', 3, 4, 5]);
    }

    public function testErrorFromEmptyArrayArgument(): void
    {
        $this->expectError();

        $this->average->getAverage([]);
    }

    public function testGetAverage(): void
    {
        $this->assertEquals(3.0, $this->average->getAverage([1, 2, 3, 4, 5]));
    }
}
```

### Data Providers
A test method can accept arbitrary arguments. These arguments are to be provided by one or 
more data provider methods. The data provider method to be used is specified using the 
```@dataProvider``` annotation.   

tests/AverageTest.php   
```php
<?php declare(strict_types=1);
use PHPUnit\Framework\TestCase;

final class AverageTest extends TestCase
{
    protected $average;

    protected function setUp(): void {
        $this->average = new Average();
    }

    protected function tearDown(): void {
        unset($this->average);
    }

    public function testExceptionFromInvalidArgumentType(): void
    {
        $this->expectException(TypeError::class);

        $this->average->getAverage('string');
    }

    public function testExceptionFromInvalidArgument(): void
    {
        $this->expectException(InvalidArgumentException::class);

        $this->average->getAverage([1, 'a', 3, 4, 5]);
    }

    public function testErrorFromEmptyArrayArgument(): void
    {
        $this->expectError();

        $this->average->getAverage([]);
    }

    public function testGetAverage(): void
    {
        $this->assertEquals(3.0, $this->average->getAverage([1, 2, 3, 4, 5]));
    }

    /**
     * @dataProvider averageProvider
     */
    public function testGetAverageUsingDataProvider(int $a, int $b, float $expected): void
    {
        $this->assertSame($expected, $this->average->getAverage([$a, $b]));
    }

    public function averageProvider(): array
    {
        return [
            [1, 2, 1.5],
            [3, 4, 3.5],
            [4, 2, 3.0],
            [4, 4, 4.0]
        ];
    }
}
```

### XML Configuration
```phpunit.xml``` file can be used to compose a test suite and specify other configurations.
The following is an xml configuration that will add all ```*Test``` classes that are 
found in ```*Test.php``` files when the ```tests``` directory is recursively traversed.  

phpunit.xml

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
    <testsuites>
        <testsuite name="default">
            <directory suffix="Test.php">tests</directory>
        </testsuite>
    </testsuites>
</phpunit>
```

running our tests

```
./vendor/bin/phpunit
```

### Code Coverage
Code coverage is a measure used to describe the degree to which the source code of a 
program is tested by a particular test suite. A program with high code coverage has 
been more thoroughly tested and has a lower chance of containing software bugs than 
a program with low code coverage.  

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

Output directory is set as ```report```. So, open ```report/index.html``` on a browser to see 
the code coverage.  

I hope this is a good introduction to the world of unit testing. Even though there are several 
topics I’ve not touched on, I’ve tried to give you a good point where you can start writing 
your tests.

[phpunit-link]: https://phpunit.de/
