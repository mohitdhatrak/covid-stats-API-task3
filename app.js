import { RAPID_API_KEY } from "/config.js";

const dateTimeOutput = document.querySelector("#stats-date-time");
const table = document.querySelector("#table");

// table not displayed until API response is received
table.style.display = "none";

const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": "corona-virus-world-and-india-data.p.rapidapi.com",
    },
};

const apiURL = "https://corona-virus-world-and-india-data.p.rapidapi.com/api";

const fetchData = async () => {
    try {
        const response = await fetch(apiURL, options);
        const data = await response.json();

        // destructuring data object
        const { countries_stat, statistic_taken_at } = data;

        if (response.status === 429) {
            dateTimeOutput.innerText =
                "Too many requests sent, please refresh once!";
        } else {
            // to display table, date and time, only if no error in API response
            table.style.display = "block";
            dateTimeOutput.innerText = `(This data was last updated on ${statistic_taken_at})`;

            // making the table from array of objects
            for (const countryObj of countries_stat) {
                // destructuring each object of array
                const {
                    country_name,
                    cases,
                    deaths,
                    total_recovered,
                    serious_critical,
                    active_cases,
                    total_tests,
                } = countryObj;

                // displaying all rows of table
                table.innerHTML += `<tr>
                                        <td>${country_name}</td>
                                        <td>${cases}</td>
                                        <td>${total_recovered}</td>
                                        <td>${deaths}</td>
                                        <td>${active_cases}</td>
                                        <td>${serious_critical}</td>
                                        <td>${total_tests}</td>
                                    </tr>`;
            }
        }
    } catch (err) {
        dateTimeOutput.innerText =
            "Some error has occured, please try again later!";
    }
};

fetchData();
