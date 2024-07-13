Feature: Validate Login Functionality.

    @Smoke
    Scenario Outline:Verify user is able to login with correct credentials.
        Then I "VerifyPageTitle" "ParaBank | Welcome | Online Banking"
        And I "EnterValue" "<username>" for "TextField" with values "b,Username"
        And I "EnterValue" "<password>" for "TextField" with values "b,Password"
        And I "Click" on "TagWithAttribute" with values "input,value,Log In"
        Then I "VerifyPageTitle" "ParaBank | Accounts Overview"
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
            | username   | password      |
            | Shab430588 | Rain312645978 |