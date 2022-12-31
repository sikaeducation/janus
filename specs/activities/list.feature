Feature: Listing features

  @skip
  Scenario: Default
    Given I'm a coach
    And these activities are saved:
      | _type   | title       | published |
      | Article | Some title  | true      |
      | Article | Some title  | true      |
      | Article | Some title  | true      |
    When I navigate to the activity manager page
    Then I see these activities listed:
      | _type   | title       | published |
      | Article | Some title  | true      |
      | Article | Some title  | true      |
      | Article | Some title  | true      |
