---
layout: post
title:  "Getting started with PHPUnit"
date:   2020-08-18 18:24:32 +0530
updated: 2021-03-21 18:24:32 +0530
author: Neeraj Das
categories: blog
---
A unit test provides a strict, written contract that a piece of code must satisfy. 
As a result, unit tests find problems early in the development cycle.

The goal is to isolate each part of the program and verify that it is correct.

[PHPUnit][phpunit-link] is a well-known testing framework for PHP. It uses assertions to verify that a specific 
component or unit behaves as expected.

The purpose of this tutorial is to introduce you to the basics of PHPUnit.

### Installation
Before we start writing our first unit test, we need to have PHPUnit installed. The installation 
process is documented at [https://phpunit.de/][phpunit-link].

### Writing our first test
<div class="p-3 my-3 bg-indigo-50">
Before we begin,<br>  
Please Clone / Download the example code from <a target="_blank" href="https://github.com/nkdas91/Getting-started-with-PHPUnit">GitHub</a>.<br>
Copy <b>env.example.php</b> to <b>env.php</b> and replace default values.<br>
Create a DB <b>phpunit</b> and import <b>sql/phpunit.sql</b>.<br>
Update <b>ABSOLUTE_PATH_TO_DOCUMENT_ROOT</b> in <b>phpunit.xml</b>.<br>
Run <b>composer install</b> in the root directory.
</div>

To get started, we need something to test, so for the first example, I’ve written a simple 
PHP class ```Average``` that calculates the average of an array of integers.

src/Average.php
```php
<?php declare(strict_types=1);

class Average
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

Basic coventions for writing tests with PHPUnit:
1. The tests for a class ```Class``` go into a class ```ClassTest```.
2. ```ClassTest``` inherits (most of the time) from ```PHPUnit\Framework\TestCase```.
3. The tests are public methods that are named ```test*```.
4. Alternatively, we can use the ```@test``` annotation in a method’s docblock to mark it as a test method.
5. Inside the test methods, assertion methods are used to assert that an actual value matches an expected value.

To ensure that our class ```Average``` works, we need to create a test class ```AverageTest``` that extends ```PHPUnit\Framework\TestCase```.

tests/AverageTest.php
```php
<?php declare(strict_types=1);
use PHPUnit\Framework\TestCase;

final class AverageTest extends TestCase
{
    /**
     * Test for an Exception if invalid argument type is passed.
     */
    public function testExceptionFromInvalidArgumentType(): void
    {
        $this->expectException(TypeError::class);

        $average = new Average();
        $verage->getAverage('string');
    }

    /**
     * Test for an Exception if invalid argument is passed.
     */
    public function testExceptionFromInvalidArgument(): void
    {
        $this->expectException(InvalidArgumentException::class);
        
        $average = new Average();
        $average->getAverage([1, 'a', 3, 4, 5]);
    }

    /**
     * Test for an Error if an empty array is passed.
     */
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
Running our tests is as simple as calling the phpunit executable and pointing it at our tests. 
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

### Fixtures (Setup & Teardown)
The purpose of a fixture is to ensure that there is a well known and fixed environment 
in which tests are run. This allows for tests to be repeatable, which is one of the key 
features of an effective test framework.

Examples:
* Loading a database with a specific known set of data.
* Preparation of input data as well as set-up and creation of mock objects.
* Copying a specific known set of files 

PHPUnit supports sharing the setup code. Before a test method is run, a template 
method called ```setUp()``` is invoked. ```setUp()``` is where we create the objects against 
which we will test. Once the test method has finished running, whether it succeeded 
or failed, another template method called ```tearDown()``` is invoked. ```tearDown()``` is where 
we clean up the objects against which we tested.  

In ```AverageTest.php```, it is tedious to instantiate ```Average``` class in each test case.
So, we move it to ```setUp()``` and ```tearDown()```.

<div class="p-3 my-3 bg-indigo-50">Also check tests/UserTest.php for another example.</div>

tests/AverageTest.php

```php
<?php declare(strict_types=1);
use PHPUnit\Framework\TestCase;

final class AverageTest extends TestCase
{
    protected $average;

    /**
     * This function is invoked before each test function.
     */
    protected function setUp(): void {
        $this->average = new Average();
    }

    /**
     * This function is invoked after each test function.
     */
    protected function tearDown(): void {
        unset($this->average);
    }

    /**
     * Test for an Exception if invalid argument type is passed.
     */
    public function testExceptionFromInvalidArgumentType(): void
    {
        $this->expectException(TypeError::class);

        $this->average->getAverage('string');
    }

    /**
     * Test for an Exception if invalid argument is passed.
     */
    public function testExceptionFromInvalidArgument(): void
    {
        $this->expectException(InvalidArgumentException::class);

        $this->average->getAverage([1, 'a', 3, 4, 5]);
    }

    /**
     * Test for an Error if an empty array is passed.
     */
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
```

### Test Doubles
When we are writing a test in which we cannot (or chose not to) use a real depended-on 
component (DOC), we can replace it with a Test Double. The Test Double doesn’t have to 
behave exactly like the real DOC; it merely has to provide the same API as the real one 
so that the system under test (SUT) thinks it is the real one!

The ```createStub``` and ```createMock``` methods can be used in a test to 
automatically generate an object that can act as a test double.

By default, all methods of the original class are replaced with a dummy implementation 
that returns null (without calling the original method). We can configure these dummy 
implementations to return a value when called Using the ```will($this->returnValue())``` 
 or simply ```willReturn``` method.

When the defaults used by the ```createStub``` and ```createMock``` methods do not match 
our needs then we can use the ```getMockBuilder``` method to customize the test double 
generation.

Please note that ```final```, ```private```, and ```static``` methods cannot be stubbed or mocked. 

#### Stubs
The practice of replacing an object with a test double that (optionally) returns configured 
return values is referred to as stubbing. You can use a stub to replace a real component 
on which the SUT depends so that the test has a control point for the indirect inputs of the SUT.

Let's stub ```ensureIsValidArrayOfIntegers``` method and skip validation.

tests/AverageTest.php
```php
public function testStub(): void
{
    /**
     * createStub stubs all the methods in the stubbed class.
     * Here, ensureIsValidArrayOfIntegers and getAverage methods 
     * won't be invoked from the Original Average class.
     */
    $stub = $this->createStub(Average::class);

    /**
     * Since we didn't specify the return values,
     * default values will be returned based on the functions return type.
     *
     * Return type of ensureIsValidArrayOfIntegers is void. So, nothing is returned.
     * Return type of getAverage is float. So, 0.0 is returned
     */
    $this->assertEmpty($stub->ensureIsValidArrayOfIntegers([1, 3.5, 3]));
    $this->assertEquals(0.0, round($stub->getAverage([1, 3.5, 3]), 2));
}
``` 

tests/AverageTest.php
```php
public function testStubUsingMockBuilder(): void
{
    /**
     * Here we used getMockBuilder to stub just one method: ensureIsValidArrayOfIntegers.
     * This method won't be invoked.
     */
    $stub = $this->getMockBuilder(Average::class)
        ->setMethods(['ensureIsValidArrayOfIntegers'])
        ->getMock();

    $this->assertEmpty($stub->ensureIsValidArrayOfIntegers([1, 3.5, 3]));

    /**
     * Since, ensureIsValidArrayOfIntegers method is stubbed,
     * we are able to get an average even if we don't pass a valid array of Integers.
     *
     * getAverage method of the original Average class is invoked.
     */
    $this->assertEquals(2.5, round($stub->getAverage([1, 3.5, 3]), 2));
}
```

#### Mock Objects
The practice of replacing an object with a test double that verifies expectations, for instance 
asserting that a method has been called, is referred to as mocking.

Let's create a class ```Logger``` that logs a string.

src/Logger.php
```php
<?php declare(strict_types=1);

class Logger
{
    public function log($text): void
    {
        echo $text;
    }
}
```

We will add a method to the ```Average``` class that uses Logger's log method to log average.

src/Average.php
```php
public function logAverage(array $numbers, Logger $logger): void
{
    $this->ensureIsValidArrayOfIntegers($numbers);

    $logger->log(array_sum($numbers) / count($numbers));
}
```

Now let's Mock ```Logger``` and test if ```log``` method is called.

tests/AverageTest.php
```php
public function testMock(): void
{
    /**
     * Here, we are mocking log method of Logger class,
     * just to ensure that it is called with the specified arguments.
     * The Average class does not need to verify what happens within the Logger log method.
     */
    $mockObject = $this->createMock(Logger::class);
    $mockObject->expects($this->once())
        ->method('log')
        ->with(2.0);

    $this->average->logAverage([1, 2, 3], $mockObject);
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
         
    <php>
        <server name="DOCUMENT_ROOT" value="ABSOLUTE_PATH_TO_DOCUMENT_ROOT"/>
    </php>
             
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

Output directory is set as ```report```. So, open ```report/index.html``` on a browser to see 
the code coverage.  

I hope this is a good introduction to the world of unit testing. Even though there are several 
topics I’ve not touched on, I’ve tried to give you a good point where you can start writing 
your tests.

[phpunit-link]: https://phpunit.de/
