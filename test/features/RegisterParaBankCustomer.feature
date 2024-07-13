Feature: Validate user is able to register new customer.

    @Smoke1
    Scenario Outline:Verify user is able to register new customer.
        When I "Click" on "TagWithExactText" with values "a,Register"
        Then I "VerifyPageTitle" "ParaBank | Register for Free Online Account Access"
        When I "EnterValue" "<firstName>" for "TextField" with values "b,First Name"
        And I "EnterValue" "<lastName>" for "TextField" with values "b,Last Name"
        And I "EnterValue" "<address>" for "TextField" with values "b,Address"
        And I "EnterValue" "<city>" for "TextField" with values "b,City"
        And I "EnterValue" "<state>" for "TextField" with values "b,State"
        And I "EnterValue" "<zipCode>" for "TextField" with values "b,Zip Code"
        And I "EnterValue" "<phone>" for "TextField" with values "b,Phone"
        And I "EnterValue" "<ssn>" for "TextField" with values "b,SSN"
        And I "EnterValue" "<firstName><zipCode>" for "TagWithAttribute" with values "input,name,customer.username"
        And I "EnterValue" "<lastName><ssn>" for "TagWithAttribute" with values "input,name,customer.password"
        And I "EnterValue" "<lastName><ssn>" for "TextField" with values "b,Confirm"
        And I "Click" on "TagWithAttribute" with values "input,value,Register"
        Then I "VerifyPageTitle" "ParaBank | Customer Created"
        Then I "VerifyVisibility" is "true" for "TagWithExactText" with values "h1,Welcome <firstName><zipCode>"
        Then I "VerifyVisibility" is "true" for "TagWithExactText" with values "p,Your account was created successfully. You are now logged in."
        Then I "VerifyVisibility" is "true" for "TagWithExactText" with values "a,Open New Account"
        Then I "VerifyVisibility" is "true" for "TagWithExactText" with values "a,Accounts Overview"
        Then I "VerifyVisibility" is "true" for "TagWithExactText" with values "a,Transfer Funds"
        Then I "VerifyVisibility" is "true" for "TagWithExactText" with values "a,Bill Pay"
        Then I "VerifyVisibility" is "true" for "TagWithExactText" with values "a,Find Transactions"
        Then I "VerifyVisibility" is "true" for "TagWithExactText" with values "a,Update Contact Info"
        Then I "VerifyVisibility" is "true" for "TagWithExactText" with values "a,Request Loan"
        Then I "VerifyVisibility" is "true" for "TagWithExactText" with values "a,Log Out"
        When I "Click" on "TagWithExactText" with values "a,Log Out"
        Then I "VerifyPageTitle" "ParaBank | Welcome | Online Banking"

        Examples:
            | firstName | lastName | address   | city | state | zipCode | phone      | ssn       |
            | Shab      | Rain     | abc nagar | xyz  | mp    | 430588  | 1245788965 | 312645978 |