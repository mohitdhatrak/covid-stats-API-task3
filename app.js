const dateTimeOutput = document.querySelector("#stats-date-time");
const table = document.querySelector("#table");

// table not displayed until API response is received
table.style.display = "none";

const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "00324e1312msh927d326459a73e2p1c072ajsn7240432d9747",
        "X-RapidAPI-Host": "corona-virus-world-and-india-data.p.rapidapi.com",
    },
};

const apiURL = "https://corona-virus-world-and-india-data.p.rapidapi.com/api";

const fetchData = async () => {
    try {
        const response = await fetch(apiURL, options);
        const data = await response.json();
        console.log(data);

        // destructuring data object
        const { countries_stat, statistic_taken_at, world_total } = data;

        if (response.status === 429) {
            dateTimeOutput.innerText =
                "Too many requests sent, please refresh once!";
        } else {
            // to display table, date and time, only if no error in API response
            table.style.display = "block";
            dateTimeOutput.innerText = `(This data was last updated on ${statistic_taken_at})`;

            // making the table from array of objects
            for (let i = 0; i < countries_stat.length; i++) {
                // destructuring each object of array
                const {
                    country_name,
                    cases,
                    deaths,
                    total_recovered,
                    serious_critical,
                    active_cases,
                    total_tests,
                } = countries_stat[i];

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

// world_total: Object
// total_cases: "509,268,964"
// new_cases: "204,268"
// total_deaths: "6,242,509"
// new_deaths: "630"
// total_recovered: "461,827,849"
// active_cases: "41,198,606"
// serious_critical: "42,510"
// total_cases_per_1m_population: "65,334"
// deaths_per_1m_population: "800.9"
// statistic_taken_at: "2022-04-24 11:18:01"
