Feature: Activity Management

  Scenario: Listing
    Given I'm a coach
    And these activities are saved:
      | _id     | _type   | title        | published |
      | 1       | Article | Some title 1 | true      |
      | 2       | Article | Some title 2 | false     |
      | 3       | Article | Some title 3 | true      |
    When I go to the activity manager page
    Then I see these activities listed:
      | _id     | _type   | title        | published |
      | 1       | Article | Some title 1 | true      |
      | 2       | Article | Some title 2 | false     |
      | 3       | Article | Some title 3 | true      |

  Scenario: Creating
    Given I'm a coach
    And these activities are saved:
      | _id     | _type   | title        | published | post_slug | description | notes  |
      | 1       | Article | Some title 1 | true      | slug_1    | Some desc.  | Note 1 |
      | 2       | Article | Some title 2 | false     | slug_2    | Some desc.  | Note 2 |
    When I go to the activity manager page
    And I add this activity:
      | _id     | _type   | title        | post_slug | description | notes  |
      | 3       | Article | Some title 3 | slug_3    | Some desc.  | Note 3 |
    Then I see these activities listed:
      | _id     | _type   | title        | published | post_slug | description | notes  |
      | 1       | Article | Some title 1 | true      | slug_1    | Some desc.  | Note 1 |
      | 2       | Article | Some title 2 | false     | slug_2    | Some desc.  | Note 2 |
      | 3       | Article | Some title 3 | true      | slug_3    | Some desc.  | Note 3 |
