# Test Naming

Test names should describe:

* What's being tested
* What behavior it should be have
* Under which conditions

Traditional test names fall into 3 different styles: Simple, RSpec, and xUnit.

## Naming Styles

### Simple Test Naming

A simple test follows the format `{name of what's being tested} {result} {behavior}`.

```js
test("add returns sum when given two positive integers", () => {
  // Test code
})
```

Test names are typically written in present tense declarative.

### RSpec-style Naming

RSpec-style naming typically uses `describe` blocks to group tests by things like class and method, and `it` blocks to describe individual test cases.

```ruby
describe Math do
  describe "#add" do
    it "should return sum when given two postive integers" do
      # Test code
    end
  end
end
```

This case should be read as as "Math#add should return sum when given two positive integers". By convention, static methods start with `.` and instance methods start with `#`. Additionally, it's common to start each test case with the word "should".

### xUnit-style Naming

Frameworks like `JUnit` and `xUnit.NET` are designed for OOP code, and each test case is written as an instance method. By convention, the names are written in three sections separated by underscores, such as `MethodBeingTested_ExpectedResult_Condition`.

```java
class MathTests extends Math {
  public void Add_ReturnsSum_WhenGivenTwoPositiveIntegers(){
    // Test code
  }
}
```

## Watch Out!

* The purpose of the naming guidelines is to help reduce the cognitive load of coming up with test naming conventions. jUltimately, as long as the test names communicate what the test is doing, don't worry too much if your tenses are correct or the name follows a precise pattern.
* Describe the behavior that's being tested, don't just repeat the contents of the assertion. "Add returns the sum of two positive integers" is a better test name that "Add returns 2 when given 1 and 1".
