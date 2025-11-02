# Star Wars Character App

### How to run project.
Follow the steps to run the project:
1. Open the terminal
2. Clone this repository using the follwing command: `git clone https://github.com/thakurhimself/star-wars-characters.git swc`
3. `cd swc`
4. Run the following command for production build: `npm run build`
5. `npm start`

Note - It is recommended that you run the production build which is working perfectly. Developement build is showing unexpected behaviour perhaps because of the recently released version of NextJS version 16.

### Features Implemented
Following features have been implemented:
1. Fetch and display characters.
    * Used /people endpoint to fetch list of characters with pagination
    * Implemented loading and error states for different outcomes of network call.
    ![home page](./public/home-page.png)

2. Character cards features.
    * Card shows name and a random image (fetched from lorem picsum) (see above image). 
    * Each card has distinct background color based on species (see above image)

3. Character details: In modal character details are shown including name, heigh (in meters), mass (in kg), date added, number of films the person appears in, birth year, homeworld details.
    ![Character details](./public/char-details.png)

4. Responsive for mobile, tablet, and desktop screens.

Bonus Features:

5. Allow search by character name.

6. Filter by homeword and film.

7. combination of character name search and homeworld and film filters.
    ![Character details](./public/search-and-filter.png)

8. Mock Authentication:
    * Simple login/logout feature with mocked jwt token. mock username: mando123    password: password123
    * Silent token refresh logic. Token refreshes every 20 seconds.
    ![login screen](./public/login-page.png)
    ![dashboard screen](./public/dashboard.png)

### Trade-offs and design choices
1. There are more than 30 species in the star war universe as of now. So fetching all species, which are paginated, per paginated page, and assigning each species with distinct color for character card would have caused performance issue. Since there are only 10 characters per paginated api call, I chose 10 colors - assuming the worst case scenario of getting all 10 characters of distinct species - and a default color for unknown species to represent Character card with different background colors based on species.

2. Bonus feature: Search - While implementing it, it was not clear whether to search character name from the current lot of characters or make a network call to fetch searched name. Documents were not clear on that. 
So I went with first option of searching character name among the currently displayed characters on the screen. 
I used debouncing to search instead of having a button to trigger search. It is better user interface.




