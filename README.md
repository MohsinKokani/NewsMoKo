
# NewsMoKo

NewsMoKo is a React application that allows users to fetch news from various categories using News API.

## Features
*  Left-side menu that can be toggled to select different categories
   * general
   * business
   * entertainment
   * health
   * science
   * sports
   * technology
* Home page | search page and a recent viewed page. The application also features a sliding effect when navigating between different routes and 
* Pagination functionality to browse through search results. 
* The user's search history is saved in local storage.

## Getting Started
1. Clone this repository using 
```
git clone https://github.com/MohsinKokani/NewsMoKo.git
```
2. Navigate into the project directory 
```
cd NewsMoKo
```
3. Install dependencies using 
```
npm install
```
4. Create an .env.local file in the root directory and add your News API key as follows:
```
REACT_APP_API_KEY='<yourapikey>'
```
5. Start the development server using 
```
npm start
```
6. Open the application in your browser at http://localhost:3000

## API Endpoints
The News API endpoints used in this application are:

Endpoint  | Description |
:------------- | :------------- |
https://newsapi.org/v2/top-headlines  | Returns the top headlines from various sources based on country and category. Parameters: country, category, and apiKey.|
https://newsapi.org/v2/everything  | Returns all articles matching a specific query or topic. Parameters: q, apiKey, and pageSize (optional).|
