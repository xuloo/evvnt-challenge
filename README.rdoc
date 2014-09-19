## Instructions for coding test

The following repository is an empty Rails 3.2.19 application with Rspec.
Please clone the repository, complete the exercise outlined below and provide us
access to your repository containing the solution.
Feel free to use any database and any version of Ruby (1.9 or greater).

## The exercise

The following endpoint lists event listings:

**https://api-sandbox-evvnt.herokuapp.com/events**

The endpoint is protected by Basic Auth and requires the following credentials to
access:

Username: evvntchallenge

Password: c2136849e524d6f43b90ac3d7e98e5dc



Build a system that periodically collects event listing data from the endpoint above, stores it in
a local database and provides a user interface to query the data. (This exercise is synonymous with
a simplified aggregate event listing platform, like Songkick or Eventful). The interface should allow a user to query the event listing data by:
* Start date (between range)
* Keyword
* Venue

All search operations should use AJAX where possible and paginate results.



We will be observing:
* The way you architect the overall application
* The way you model the data
* Use of clean, expressive, performant code


You may add new classes of any description to assist you. Any new classes
should have accompanying tests.

Make sure all tests are passing by running:

`rake`

**There is no time limit for this test.**