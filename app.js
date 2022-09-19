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
            dateTimeOutput.innerHTML = `This data was taken at: <strong>${statistic_taken_at}</strong>`;

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
        <td class="box">${country_name}</td>
        <td class="box">${cases}</td>
        <td class="box">${total_recovered}</td>
        <td class="box">${deaths}</td>
        <td class="box">${active_cases}</td>
        <td class="box">${serious_critical}</td>
        <td class="box">${total_tests}</td>
      </tr>`;
            }
        }
    } catch (err) {
        dateTimeOutput.innerText =
            "Some error has occured, please try again later!";
    }
};

fetchData();
