Feature: Listing features

  Scenario: Default
    Given I'm a coach
    And I'm on the activity manager page
    Then I see these activities listed:
      | Some heading |
      | Some value |
