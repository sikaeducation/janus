Feature: Listing features

  Scenario: Default
    Given I'm on the activity manager page
    And I'm a coach
    Then I see these activities listed:
      | _type   | title       | published |
      | Article | Some title  | true      |
      | Article | Some title  | true      |
      | Article | Some title  | true      |
