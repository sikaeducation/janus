Feature: Listing features

  Scenario: Default
    Given I'm a coach
    And these activities are saved:
      | _id     | _type   | title       | published |
      | 1       | Article | Some title  | true      |
      | 2       | Article | Some title  | true      |
      | 3       | Article | Some title  | true      |
    When I go to the activity manager page
    Then I see these activities listed:
      | _id     | _type   | title       | published |
      | 1       | Article | Some title  | true      |
      | 2       | Article | Some title  | true      |
      | 3       | Article | Some title  | true      |
