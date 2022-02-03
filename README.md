# Weather-Dashboard
An interactive dashboard showing weather updates for cities around the world.
The weather dashboard exercise was highly challenging but a great deal of new skills was accomplished as a result of this assigment. 

Firstly, we started to understand the fundamentals of scoping - ie where in js to log variables & calling of functions so that the js code reads the values correctly.
We faced issues which were caused by only minor errors by way of the scoping and positioning of our code. A simple fix and something to look out for in future. 

The api calling was a fun component of this exercise. We got to use api's in real time. In this case, we used a weather application available via the my weather app to pull data from the page. 
we learnt how to call these apis and then build functions around these apis so that data can be retrived.

We started to understand more about the role of objects against functions - ie:

 displayTodaysWeather(data.list[i], city); provides us with:
 
 a) the array data from the api (ie list) at every 8th interval (ie, i)
 b) the specific 'city' data located within the api, relating to the city selected from the user field.
 
 We then used these key values to create other objects in other functions that were calling from the (data.list, city) values we created. 
 It was important to our learning that we understood how these values intergrated, as this was critical to us successfully rendering information on the page. 
 
 We successfully deployed a for loop to set data for the upcoming 5 day forecast as well. 
 
However, we still have more to do on this project, including:

## Project Update Feb 3rd 2022

Over the past few weeks we successfully:

Created if statements to adjust UV's background color as per the rating of the variable.
Saved selections to local storage so the page maintains these in application. We then pulled this data so that further buttons can be created on the browser and displays results under the search bar.
Consolidated code and build functions within our main function callApi();.
Used bootstrap to style the page, including colors of todays weather card and future weather cards.

A very challenging assignment but many lessons learnt about javascript, api's, bootstrap and combining all learned skills.

Thanks,
Oscar
